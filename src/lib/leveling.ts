/**
 * XP curve and rank titles for the mission-control leveling system.
 *
 * Curve: cumulative XP required to REACH level L (L starts at 1, which
 * needs 0 XP) is:
 *
 *   totalXpForLevel(L) = 50 * (L - 1)^2
 *
 * A pure quadratic rather than exponential — early levels come fast (50xp
 * for level 2, one quiz-and-a-half) so new users feel immediate momentum,
 * but the gap between consecutive levels still grows linearly
 * (50*(2L-1) xp per level), so late-game leveling meaningfully slows down
 * without ever requiring a gate-keeping wall. Completing a module (100xp)
 * and acing its quiz (10xp/point) are the two main sources, so a handful
 * of modules gets you through the early ranks naturally.
 */

export interface RankInfo {
  title: string;
  minLevel: number;
}

/** Mission-control rank titles, in ascending order. Matches the site's
 * existing "Mission Map" framing — you're advancing through a chain of
 * command, not just leveling up a number. */
export const RANKS: RankInfo[] = [
  { title: "Recruit", minLevel: 1 },
  { title: "Operative", minLevel: 6 },
  { title: "Specialist", minLevel: 16 },
  { title: "Commander", minLevel: 31 },
  { title: "Architect", minLevel: 51 },
  { title: "Ascendant", minLevel: 76 },
];

export function totalXpForLevel(level: number): number {
  return 50 * (level - 1) * (level - 1);
}

/** Highest level whose XP requirement `xp` satisfies. Uncapped — the curve
 * keeps working indefinitely for as much XP as a user can accumulate. */
export function levelForXp(xp: number): number {
  let level = 1;
  // totalXpForLevel is monotonic increasing, so a simple climb is fine —
  // levels stay in the low hundreds even for very dedicated users.
  while (totalXpForLevel(level + 1) <= xp) {
    level++;
  }
  return level;
}

export function rankForLevel(level: number): string {
  let rank = RANKS[0].title;
  for (const r of RANKS) {
    if (level >= r.minLevel) rank = r.title;
  }
  return rank;
}

export interface LevelProgress {
  level: number;
  rank: string;
  xp: number;
  /** XP earned within the current level. */
  xpIntoLevel: number;
  /** XP needed to go from the current level to the next. */
  xpForNextLevel: number;
  /** 0-100 */
  percentToNextLevel: number;
  nextRank: string | null;
  levelsToNextRank: number | null;
}

export function getLevelProgress(xp: number): LevelProgress {
  const level = levelForXp(xp);
  const currentFloor = totalXpForLevel(level);
  const nextCeiling = totalXpForLevel(level + 1);
  const xpIntoLevel = xp - currentFloor;
  const xpForNextLevel = nextCeiling - currentFloor;
  const percentToNextLevel = xpForNextLevel > 0
    ? Math.min(100, Math.round((xpIntoLevel / xpForNextLevel) * 100))
    : 100;

  const rank = rankForLevel(level);
  const nextRankInfo = RANKS.find((r) => r.minLevel > level) ?? null;

  return {
    level,
    rank,
    xp,
    xpIntoLevel,
    xpForNextLevel,
    percentToNextLevel,
    nextRank: nextRankInfo?.title ?? null,
    levelsToNextRank: nextRankInfo ? nextRankInfo.minLevel - level : null,
  };
}
