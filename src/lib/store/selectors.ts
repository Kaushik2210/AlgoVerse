"use client";

import { useMemo } from "react";
import { useProgressStore } from "@/lib/store/progress";
import { useMounted } from "@/lib/hooks/useMounted";
import { getLevelProgress, type LevelProgress } from "@/lib/leveling";
import {
  STREAK_BADGES,
  XP_RANK_BADGES,
  LEETCODE_BADGES,
  earnedBadgesForStreak,
  earnedBadgesForLevel,
  earnedBadgesForSolvedCount,
  type BadgeDef,
} from "@/lib/badges";

/**
 * Single seam between UI components and the persisted progress store.
 * Every dashboard/gamification component reads through one of these hooks
 * instead of touching useProgressStore (or localStorage) directly, so that
 * swapping the backing store for a real backend later (Supabase) only
 * means rewriting these functions' bodies — no component changes.
 *
 * Every hook here is SSR-safe: it returns a neutral/zeroed value until
 * client hydration finishes (via useMounted), matching the server-rendered
 * markup so there's no hydration mismatch.
 */

const EMPTY_LEVEL: LevelProgress = {
  level: 1,
  rank: "Recruit",
  xp: 0,
  xpIntoLevel: 0,
  xpForNextLevel: 50,
  percentToNextLevel: 0,
  nextRank: "Operative",
  levelsToNextRank: 5,
};

export function useLevelProgress(): LevelProgress {
  const xp = useProgressStore((s) => s.xp);
  const mounted = useMounted();
  return useMemo(() => (mounted ? getLevelProgress(xp) : EMPTY_LEVEL), [mounted, xp]);
}

export function useStreakInfo() {
  const streak = useProgressStore((s) => s.streak);
  const longestStreak = useProgressStore((s) => s.longestStreak);
  const mounted = useMounted();
  return {
    streak: mounted ? streak : 0,
    longestStreak: mounted ? longestStreak : 0,
  };
}

export interface BadgeState extends BadgeDef {
  earned: boolean;
}

/** All defined badges annotated with earned/locked, in threshold order. */
export function useBadgeStates(): BadgeState[] {
  const longestStreak = useProgressStore((s) => s.longestStreak);
  const mounted = useMounted();
  return useMemo(() => {
    const best = mounted ? longestStreak : 0;
    const earnedIds = new Set(earnedBadgesForStreak(best).map((b) => b.id));
    return STREAK_BADGES.map((b) => ({ ...b, earned: earnedIds.has(b.id) }));
  }, [mounted, longestStreak]);
}

/** XP-rank badges annotated with earned/locked, in threshold order. */
export function useRankBadgeStates(): BadgeState[] {
  const xp = useProgressStore((s) => s.xp);
  const mounted = useMounted();
  return useMemo(() => {
    const level = mounted ? getLevelProgress(xp).level : 1;
    const earnedIds = new Set(earnedBadgesForLevel(level).map((b) => b.id));
    return XP_RANK_BADGES.map((b) => ({ ...b, earned: earnedIds.has(b.id) }));
  }, [mounted, xp]);
}

/** Number of LeetCode problems the user has marked solved. */
export function useLeetcodeSolvedCount(): number {
  const solved = useProgressStore((s) => s.solvedLeetcodeIds);
  const mounted = useMounted();
  return mounted ? solved.length : 0;
}

/** LeetCode problem-count milestone badges annotated with earned/locked. */
export function useLeetcodeBadgeStates(): BadgeState[] {
  const solvedCount = useLeetcodeSolvedCount();
  return useMemo(() => {
    const earnedIds = new Set(earnedBadgesForSolvedCount(solvedCount).map((b) => b.id));
    return LEETCODE_BADGES.map((b) => ({ ...b, earned: earnedIds.has(b.id) }));
  }, [solvedCount]);
}

/** ISO date a given badge id was earned, or null if it hasn't been. */
export function useBadgeEarnedAt(badgeId: string): string | null {
  const earnedAt = useProgressStore((s) => s.badgeEarnedAt[badgeId]);
  const mounted = useMounted();
  return mounted ? (earnedAt ?? null) : null;
}

/** Badge ids the store has already recorded as earned (persisted, used to
 * detect *newly* crossed thresholds for the unlock-toast watcher). */
export function useAcknowledgedBadgeIds(): string[] {
  return useProgressStore((s) => s.earnedBadgeIds);
}

export function useAcknowledgeBadges() {
  return useProgressStore((s) => s.acknowledgeBadges);
}

export function useActivityLog() {
  const log = useProgressStore((s) => s.activityLog);
  const mounted = useMounted();
  return useMemo(() => (mounted ? log : []), [mounted, log]);
}

export interface ModuleStats {
  completedCount: number;
  totalXp: number;
}

export function useModuleStats(): ModuleStats {
  const modules = useProgressStore((s) => s.modules);
  const xp = useProgressStore((s) => s.xp);
  const mounted = useMounted();
  return useMemo(() => {
    if (!mounted) return { completedCount: 0, totalXp: 0 };
    const completedCount = Object.values(modules).filter((m) => m.completed).length;
    return { completedCount, totalXp: xp };
  }, [mounted, modules, xp]);
}
