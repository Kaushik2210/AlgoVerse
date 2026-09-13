"use client";

import { useEffect, useRef } from "react";
import { createClient } from "@/lib/supabase/client";
import { useAuthStore } from "@/lib/store/auth";
import { useProgressStore, type RemoteProgressSnapshot } from "@/lib/store/progress";
import { pullProgress, pushProgress, isEmptySnapshot } from "@/lib/supabase/progressSync";

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

/**
 * Mounted once at the app root, alongside AuthProvider/ProgressWatcher.
 * Bridges the local Zustand progress store to Supabase when (and only when)
 * a user is signed in:
 *
 *  - On sign-in: pulls the user's remote `progress` row. If it already has
 *    data, the remote copy wins and overwrites local state (cross-device
 *    sync). If it's empty/missing but this device has real local progress,
 *    that local progress is pushed up once instead of being discarded
 *    ("claim your local progress" on first login).
 *  - While signed in: any local progress change is pushed to Supabase,
 *    debounced so rapid XP ticks collapse into one write.
 *  - Signed out: does nothing — the app behaves exactly as it did before
 *    Supabase existed, fully local/anonymous.
 */
export default function SupabaseSyncProvider() {
  const user = useAuthStore((s) => s.user);
  const authLoading = useAuthStore((s) => s.loading);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const syncingUserId = useRef<string | null>(null);
  const skipNextPush = useRef(false);

  // Initial merge whenever the signed-in user changes (sign-in, or a
  // different account signs in on the same device).
  useEffect(() => {
    if (authLoading) return;
    if (!user) {
      syncingUserId.current = null;
      return;
    }
    if (syncingUserId.current === user.id) return;

    let cancelled = false;
    const supabase = createClient();

    (async () => {
      const remote = await pullProgress(supabase, user.id);
      if (cancelled) return;

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

      if (!cancelled) syncingUserId.current = user.id;
    })();

    return () => {
      cancelled = true;
    };
  }, [user, authLoading]);

  // Debounced push on every local progress change, while signed in.
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

  return null;
}
