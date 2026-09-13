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
