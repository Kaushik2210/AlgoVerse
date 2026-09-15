import type { SupabaseClient } from "@supabase/supabase-js";
import type { RemoteProgressSnapshot } from "@/lib/store/progress";

/** Row shape of the `progress` table (see supabase/migrations/0001_init.sql). */
interface ProgressRow {
  user_id: string;
  xp: number;
  current_streak: number;
  longest_streak: number;
  last_activity_date: string | null;
  earned_badge_ids: string[];
  modules: RemoteProgressSnapshot["modules"];
  activity_log: RemoteProgressSnapshot["activityLog"];
}

function rowToSnapshot(row: ProgressRow): RemoteProgressSnapshot {
  return {
    xp: row.xp,
    streak: row.current_streak,
    longestStreak: row.longest_streak,
    lastActiveDate: row.last_activity_date,
    modules: row.modules ?? {},
    activityLog: row.activity_log ?? [],
    earnedBadgeIds: row.earned_badge_ids ?? [],
  };
}

/** True if a snapshot has nothing worth keeping — used to decide whether a
 * fresh remote row should adopt the device's local progress instead. */
export function isEmptySnapshot(s: RemoteProgressSnapshot): boolean {
  return (
    s.xp === 0 &&
    s.streak === 0 &&
    s.longestStreak === 0 &&
    Object.keys(s.modules).length === 0 &&
    s.activityLog.length === 0 &&
    s.earnedBadgeIds.length === 0
  );
}

export async function pullProgress(
  supabase: SupabaseClient,
  userId: string
): Promise<RemoteProgressSnapshot | null> {
  const { data, error } = await supabase
    .from("progress")
    .select("*")
    .eq("user_id", userId)
    .maybeSingle();

  if (error) {
    console.error("[progressSync] pull failed:", error.message);
    return null;
  }
  if (!data) return null;
  return rowToSnapshot(data as ProgressRow);
}

export async function pushProgress(
  supabase: SupabaseClient,
  userId: string,
  snapshot: RemoteProgressSnapshot
): Promise<void> {
  const { error } = await supabase.from("progress").upsert({
    user_id: userId,
    xp: snapshot.xp,
    current_streak: snapshot.streak,
    longest_streak: snapshot.longestStreak,
    last_activity_date: snapshot.lastActiveDate,
    earned_badge_ids: snapshot.earnedBadgeIds,
    modules: snapshot.modules,
    activity_log: snapshot.activityLog,
  });

  if (error) {
    console.error("[progressSync] push failed:", error.message);
  }
}

export interface EarnedBadgeEntry {
  badgeId: string;
  /** ISO date/timestamp the badge was first earned locally. */
  earnedAt: string;
}

/**
 * Records newly-earned badges into the permanent `earned_badges` table —
 * the source of truth for the public /c/[username]/[badgeId] certificate
 * pages (see supabase/migrations/0003_public_certificates.sql). Upserts with
 * `ignoreDuplicates` so it's safe to call repeatedly (e.g. a full backfill on
 * every sign-in) without ever overwriting a badge's real original earn date.
 */
export async function pushEarnedBadges(
  supabase: SupabaseClient,
  userId: string,
  entries: EarnedBadgeEntry[]
): Promise<void> {
  if (entries.length === 0) return;

  const { error } = await supabase.from("earned_badges").upsert(
    entries.map((e) => ({
      user_id: userId,
      badge_id: e.badgeId,
      earned_at: e.earnedAt,
    })),
    { onConflict: "user_id,badge_id", ignoreDuplicates: true }
  );

  if (error) {
    console.error("[progressSync] earned badge push failed:", error.message);
  }
}

/**
 * Reads every problem slug the account has marked solved (see
 * supabase/migrations/0004_solved_problems.sql). Used once on sign-in to
 * merge cloud-tracked solves into local state.
 */
export async function pullSolvedProblems(
  supabase: SupabaseClient,
  userId: string
): Promise<string[]> {
  const { data, error } = await supabase
    .from("solved_problems")
    .select("problem_slug")
    .eq("user_id", userId);

  if (error) {
    console.error("[progressSync] solved problems pull failed:", error.message);
    return [];
  }
  return (data ?? []).map((row) => row.problem_slug as string);
}

/**
 * Pushes a single "mark as solved" / "un-mark" toggle immediately — a
 * discrete user action, not something that should wait for the debounced
 * xp/streak snapshot push. `solved: true` inserts (idempotent via
 * ignoreDuplicates), `solved: false` deletes the row outright — un-marking
 * is allowed here, unlike earned_badges.
 */
export async function pushSolvedProblem(
  supabase: SupabaseClient,
  userId: string,
  slug: string,
  solved: boolean
): Promise<void> {
  if (solved) {
    const { error } = await supabase.from("solved_problems").upsert(
      { user_id: userId, problem_slug: slug },
      { onConflict: "user_id,problem_slug", ignoreDuplicates: true }
    );
    if (error) {
      console.error("[progressSync] solved problem insert failed:", error.message);
    }
  } else {
    const { error } = await supabase
      .from("solved_problems")
      .delete()
      .eq("user_id", userId)
      .eq("problem_slug", slug);
    if (error) {
      console.error("[progressSync] solved problem delete failed:", error.message);
    }
  }
}

/**
 * Backfills a batch of locally-solved slugs that the remote account didn't
 * have yet — used once during the initial sign-in merge (claiming local-only
 * solves the same way pushEarnedBadges backfills local-only badges).
 */
export async function pushSolvedProblemsBatch(
  supabase: SupabaseClient,
  userId: string,
  slugs: string[]
): Promise<void> {
  if (slugs.length === 0) return;

  const { error } = await supabase.from("solved_problems").upsert(
    slugs.map((slug) => ({ user_id: userId, problem_slug: slug })),
    { onConflict: "user_id,problem_slug", ignoreDuplicates: true }
  );

  if (error) {
    console.error("[progressSync] solved problems batch push failed:", error.message);
  }
}
