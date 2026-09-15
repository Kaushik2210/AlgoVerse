"use client";

import { useEffect, useRef } from "react";
import { createClient } from "@/lib/supabase/client";
import { useAuthStore } from "@/lib/store/auth";
import { useProfileStore } from "@/lib/store/profile";
import { useProgressStore, type RemoteProgressSnapshot } from "@/lib/store/progress";
import {
  pullProgress,
  pushProgress,
  pushEarnedBadges,
  isEmptySnapshot,
  pullSolvedProblems,
  pushSolvedProblem,
  pushSolvedProblemsBatch,
} from "@/lib/supabase/progressSync";

const PUSH_DEBOUNCE_MS = 2500;

function snapshotFromLocal(): RemoteProgressSnapshot {
  const s = useProgressStore.getState();
  return {
    xp: s.xp,
    streak: s.streak,
    longestStreak: s.longestStreak,
    lastActiveDate: s.lastActiveDate,
    modules: s.modules,
    activityLog: s.activityLog,
    earnedBadgeIds: s.earnedBadgeIds,
  };
}

/** Every currently-earned badge, paired with the date it was earned
 * (falling back to today for badges earned before badgeEarnedAt existed). */
function earnedBadgeEntries() {
  const s = useProgressStore.getState();
  return s.earnedBadgeIds.map((id) => ({
    badgeId: id,
    earnedAt: s.badgeEarnedAt[id] ?? new Date().toISOString().slice(0, 10),
  }));
}

/**
 * Mounted once at the app root, alongside AuthProvider/ProgressWatcher.
 * Bridges the local Zustand progress store to Supabase when (and only when)
 * a user is signed in:
 *
 *  - On sign-in: pulls the user's remote `progress` row and `profiles` row.
 *    If progress already has data, the remote copy wins and overwrites local
 *    state (cross-device sync). If it's empty/missing but this device has
 *    real local progress, that local progress is pushed up once instead of
 *    being discarded ("claim your local progress" on first login). Either
 *    way, every badge the account now shows as earned gets certified into
 *    the permanent `earned_badges` table (safe to re-run — see
 *    pushEarnedBadges), so certificate pages always have a real record.
 *  - While signed in: any local progress change is pushed to Supabase,
 *    debounced so rapid XP ticks collapse into one write. Any *newly*
 *    earned badge (the same moment ProgressWatcher fires its unlock toast)
 *    is certified immediately, not debounced. Solved-problem toggles
 *    (src/lib/store/progress.ts solvedLeetcodeIds) sync the same way —
 *    immediately, diffed against the last-known-synced set — into the
 *    `solved_problems` table (supabase/migrations/0004_solved_problems.sql).
 *  - Signed out: does nothing — the app behaves exactly as it did before
 *    Supabase existed, fully local/anonymous. The profile store is cleared
 *    so stale username data can't leak into a later anonymous session.
 */
export default function SupabaseSyncProvider() {
  const user = useAuthStore((s) => s.user);
  const authLoading = useAuthStore((s) => s.loading);
  const setProfile = useProfileStore((s) => s.setProfile);
  const clearProfile = useProfileStore((s) => s.clear);
  const earnedBadgeIds = useProgressStore((s) => s.earnedBadgeIds);
  const solvedLeetcodeIds = useProgressStore((s) => s.solvedLeetcodeIds);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const syncingUserId = useRef<string | null>(null);
  const skipNextPush = useRef(false);
  const certifiedBadgeIds = useRef<Set<string>>(new Set());
  const syncedSolvedIds = useRef<Set<string>>(new Set());

  // Initial merge whenever the signed-in user changes (sign-in, or a
  // different account signs in on the same device).
  useEffect(() => {
    if (authLoading) return;
    if (!user) {
      syncingUserId.current = null;
      certifiedBadgeIds.current = new Set();
      syncedSolvedIds.current = new Set();
      clearProfile();
      return;
    }
    if (syncingUserId.current === user.id) return;

    let cancelled = false;
    const supabase = createClient();

    (async () => {
      const [remote, profileResult] = await Promise.all([
        pullProgress(supabase, user.id),
        supabase.from("profiles").select("username, display_name").eq("id", user.id).maybeSingle(),
      ]);
      if (cancelled) return;

      if (profileResult.data) {
        setProfile({
          username: profileResult.data.username ?? null,
          displayName: profileResult.data.display_name ?? null,
        });
      } else if (profileResult.error) {
        console.error("[SupabaseSyncProvider] profile fetch failed:", profileResult.error.message);
      }

      const local = snapshotFromLocal();

      if (remote && !isEmptySnapshot(remote)) {
        // Remote already has real progress — it wins. Avoid re-pushing the
        // very state we just pulled.
        skipNextPush.current = true;
        useProgressStore.getState().hydrateFromRemote(remote);
      } else if (!isEmptySnapshot(local)) {
        // Fresh/empty remote row but this device has local progress worth
        // keeping — claim it by pushing local up once.
        await pushProgress(supabase, user.id, local);
      } else {
        // Both empty — nothing to do, but make sure a row exists so future
        // pushes are upserts against a known row.
        await pushProgress(supabase, user.id, local);
      }

      // Certify every badge this account now shows as earned. Idempotent —
      // pushEarnedBadges ignores rows that already exist.
      const entries = earnedBadgeEntries();
      certifiedBadgeIds.current = new Set(entries.map((e) => e.badgeId));
      await pushEarnedBadges(supabase, user.id, entries);

      // Merge cloud-tracked solved problems with whatever's solved locally
      // on this device. Union rather than "remote wins" — a solved mark is
      // a fact that should only ever accumulate, never get discarded by a
      // cross-device sync. Any slug solved locally but missing remotely
      // gets backfilled up once (the same "claim your local progress" idea
      // as the progress-row branch above).
      const remoteSolved = await pullSolvedProblems(supabase, user.id);
      if (!cancelled) {
        const remoteSet = new Set(remoteSolved);
        const localSolvedNow = useProgressStore.getState().solvedLeetcodeIds;
        const localOnly = localSolvedNow.filter((slug) => !remoteSet.has(slug));
        // Set the "already synced" baseline before touching the store so
        // the toggle-diff effect below sees no work to do for slugs we
        // already know about.
        syncedSolvedIds.current = new Set([...remoteSolved, ...localOnly]);
        if (remoteSolved.length > 0) {
          useProgressStore.getState().mergeSolvedLeetcode(remoteSolved);
        }
        if (localOnly.length > 0) {
          await pushSolvedProblemsBatch(supabase, user.id, localOnly);
        }
      }

      if (!cancelled) syncingUserId.current = user.id;
    })();

    return () => {
      cancelled = true;
    };
  }, [user, authLoading, setProfile, clearProfile]);

  // Debounced push of progress on every local progress change, while signed in.
  useEffect(() => {
    if (!user) return;
    const supabase = createClient();

    const unsubscribe = useProgressStore.subscribe(() => {
      if (syncingUserId.current !== user.id) return; // initial merge not done yet
      if (skipNextPush.current) {
        skipNextPush.current = false;
        return;
      }
      if (debounceRef.current) clearTimeout(debounceRef.current);
      debounceRef.current = setTimeout(() => {
        pushProgress(supabase, user.id, snapshotFromLocal());
      }, PUSH_DEBOUNCE_MS);
    });

    return () => {
      unsubscribe();
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };
  }, [user]);

  // Certify newly-earned badges the moment they're acknowledged locally —
  // the same "badge just got earned" moment ProgressWatcher fires its
  // unlock toast for (src/components/providers/ProgressWatcher.tsx). Not
  // debounced: a certificate link should be valid as soon as the toast
  // appears.
  useEffect(() => {
    if (!user) return;
    if (syncingUserId.current !== user.id) return; // initial backfill not done yet

    const newIds = earnedBadgeIds.filter((id) => !certifiedBadgeIds.current.has(id));
    if (newIds.length === 0) return;

    const badgeEarnedAt = useProgressStore.getState().badgeEarnedAt;
    const entries = newIds.map((id) => ({
      badgeId: id,
      earnedAt: badgeEarnedAt[id] ?? new Date().toISOString().slice(0, 10),
    }));
    newIds.forEach((id) => certifiedBadgeIds.current.add(id));

    const supabase = createClient();
    pushEarnedBadges(supabase, user.id, entries);
  }, [user, earnedBadgeIds]);

  // Push individual "mark as solved" / "un-mark" toggles immediately, not
  // debounced with the rest of progress — a solved-problem toggle is a
  // discrete, deliberate click and should feel like it saved right away.
  // Diffs against the last-synced set (seeded by the initial merge above)
  // so only what actually changed gets written.
  useEffect(() => {
    if (!user) return;
    if (syncingUserId.current !== user.id) return; // initial merge not done yet

    const currentSet = new Set(solvedLeetcodeIds);
    const prevSet = syncedSolvedIds.current;
    const added = solvedLeetcodeIds.filter((slug) => !prevSet.has(slug));
    const removed = [...prevSet].filter((slug) => !currentSet.has(slug));
    if (added.length === 0 && removed.length === 0) return;

    syncedSolvedIds.current = currentSet;

    const supabase = createClient();
    for (const slug of added) pushSolvedProblem(supabase, user.id, slug, true);
    for (const slug of removed) pushSolvedProblem(supabase, user.id, slug, false);
  }, [user, solvedLeetcodeIds]);

  return null;
}
