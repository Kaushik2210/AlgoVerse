"use client";

import { useEffect, useRef } from "react";
import { useProgressStore } from "@/lib/store/progress";
import { useToastStore } from "@/lib/store/toast";
import { useMounted } from "@/lib/hooks/useMounted";
import { earnedBadgesForStreak } from "@/lib/badges";
import { getLevelProgress } from "@/lib/leveling";

/**
 * Mounted once at the app root. Ticks the daily streak, then watches for
 * two kinds of "moments" and fires a toast + unlock animation for each:
 *  - a streak crossing a badge threshold for the first time
 *  - XP crossing into a new level
 *
 * All state reads go through useProgressStore directly here (this *is*
 * part of the store-access seam, alongside selectors.ts) — components
 * elsewhere should prefer the hooks in lib/store/selectors.ts.
 */
export default function ProgressWatcher() {
  const mounted = useMounted();
  const touchStreak = useProgressStore((s) => s.touchStreak);
  const longestStreak = useProgressStore((s) => s.longestStreak);
  const earnedBadgeIds = useProgressStore((s) => s.earnedBadgeIds);
  const acknowledgeBadges = useProgressStore((s) => s.acknowledgeBadges);
  const xp = useProgressStore((s) => s.xp);
  const push = useToastStore((s) => s.push);

  const prevLevel = useRef<number | null>(null);

  useEffect(() => {
    touchStreak();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Badge unlock detection
  useEffect(() => {
    if (!mounted) return;
    const nowEarned = earnedBadgesForStreak(longestStreak);
    const newlyEarned = nowEarned.filter((b) => !earnedBadgeIds.includes(b.id));
    if (newlyEarned.length === 0) return;

    acknowledgeBadges(newlyEarned.map((b) => b.id));
    for (const badge of newlyEarned) {
      push({
        title: `Badge unlocked: ${badge.name}`,
        description: `${badge.description} +${badge.xpBonus} XP`,
        variant: "amber",
        icon: "badge",
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mounted, longestStreak, earnedBadgeIds]);

  // Level-up detection
  useEffect(() => {
    if (!mounted) return;
    const level = getLevelProgress(xp).level;
    if (prevLevel.current === null) {
      prevLevel.current = level;
      return;
    }
    if (level > prevLevel.current) {
      const info = getLevelProgress(xp);
      push({
        title: `Level up — Level ${level}`,
        description: `Rank: ${info.rank}`,
        variant: "cyan",
        icon: "level",
      });
    }
    prevLevel.current = level;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mounted, xp]);

  return null;
}
