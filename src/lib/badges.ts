/**
 * Achievement plate definitions — streak milestones, XP ranks, and LeetCode
 * problem-count milestones. Purely data — earned/locked state is derived
 * from store state (see src/lib/store/selectors.ts), never stored
 * redundantly here.
 *
 * Visual tiers map 1:1 onto BadgePlate's `tier` prop
 * (src/components/badges/BadgePlate.tsx), which owns the actual hex-shield
 * gradients/icons for each tier name.
 */

export type PlateTier = "copper" | "bronze" | "silver" | "gold" | "holo" | "rank" | "target";

export interface BadgeDef {
  id: string;
  /** Threshold this badge represents — days of streak, level, or problems solved. */
  threshold: number;
  /** One-word rank name shown large under the plate, e.g. "IGNITION". */
  name: string;
  /** Short pill label above/below the name, e.g. "COPPER · 3-DAY". */
  tierLabel: string;
  description: string;
  /** Bonus XP granted the moment this badge is earned. */
  xpBonus: number;
  tier: PlateTier;
}

/** Streak-milestone plates — earned daily, tier scales with commitment. */
export const STREAK_BADGES: BadgeDef[] = [
  {
    id: "streak-3",
    threshold: 3,
    name: "IGNITION",
    tierLabel: "COPPER · 3-DAY",
    description: "First spark. Three days straight.",
    xpBonus: 25,
    tier: "copper",
  },
  {
    id: "streak-10",
    threshold: 10,
    name: "MOMENTUM",
    tierLabel: "BRONZE · 10-DAY",
    description: "Ten days. The habit is forming.",
    xpBonus: 75,
    tier: "bronze",
  },
  {
    id: "streak-30",
    threshold: 30,
    name: "OVERCLOCKED",
    tierLabel: "SILVER · 30-DAY",
    description: "A full month. No skipped days.",
    xpBonus: 150,
    tier: "silver",
  },
  {
    id: "streak-60",
    threshold: 60,
    name: "UNSTOPPABLE",
    tierLabel: "GOLD · 60-DAY",
    description: "Sixty days. This is who you are now.",
    xpBonus: 300,
    tier: "gold",
  },
  {
    id: "streak-100",
    threshold: 100,
    name: "SINGULARITY",
    tierLabel: "HOLO · 100-DAY",
    description: "One hundred days. Elite tier. Rare.",
    xpBonus: 500,
    tier: "holo",
  },
  {
    id: "streak-365",
    threshold: 365,
    name: "IMMORTAL",
    tierLabel: "LOCKED · 365-DAY",
    description: "One full year. Very few reach this.",
    xpBonus: 1500,
    tier: "holo",
  },
];

/** XP-rank plates — one per promotion in src/lib/leveling.ts's RANKS list
 * (skipping "Recruit", the default rank everyone starts at). */
export const XP_RANK_BADGES: BadgeDef[] = [
  {
    id: "rank-operative",
    threshold: 6,
    name: "OPERATIVE",
    tierLabel: "RANK · LV 6",
    description: "Promoted via XP. First rank up.",
    xpBonus: 0,
    tier: "rank",
  },
  {
    id: "rank-specialist",
    threshold: 16,
    name: "SPECIALIST",
    tierLabel: "RANK · LV 16",
    description: "Promoted via XP. Rank up.",
    xpBonus: 0,
    tier: "rank",
  },
  {
    id: "rank-commander",
    threshold: 31,
    name: "COMMANDER",
    tierLabel: "RANK · LV 31",
    description: "Promoted via XP. Rank up.",
    xpBonus: 0,
    tier: "rank",
  },
  {
    id: "rank-architect",
    threshold: 51,
    name: "ARCHITECT",
    tierLabel: "RANK · LV 51",
    description: "Promoted via XP. Rank up.",
    xpBonus: 0,
    tier: "rank",
  },
  {
    id: "rank-ascendant",
    threshold: 76,
    name: "ASCENDANT",
    tierLabel: "RANK · LV 76",
    description: "Promoted via XP. Top rank.",
    xpBonus: 0,
    tier: "rank",
  },
];

/** LeetCode problem-solved milestone plates. */
export const LEETCODE_BADGES: BadgeDef[] = [
  {
    id: "leetcode-50",
    threshold: 50,
    name: "MARKSMAN",
    tierLabel: "SOLVED · 50",
    description: "50 LeetCode problems cleared.",
    xpBonus: 100,
    tier: "target",
  },
  {
    id: "leetcode-100",
    threshold: 100,
    name: "SHARPSHOOTER",
    tierLabel: "SOLVED · 100",
    description: "100 LeetCode problems cleared.",
    xpBonus: 200,
    tier: "target",
  },
  {
    id: "leetcode-250",
    threshold: 250,
    name: "PRECISION",
    tierLabel: "SOLVED · 250",
    description: "250 LeetCode problems cleared.",
    xpBonus: 400,
    tier: "target",
  },
  {
    id: "leetcode-500",
    threshold: 500,
    name: "DEADEYE",
    tierLabel: "SOLVED · 500",
    description: "500 LeetCode problems cleared.",
    xpBonus: 800,
    tier: "target",
  },
];

export const ALL_BADGES: BadgeDef[] = [...STREAK_BADGES, ...XP_RANK_BADGES, ...LEETCODE_BADGES];

export function badgeById(id: string): BadgeDef | undefined {
  return ALL_BADGES.find((b) => b.id === id);
}

export type BadgeCategory = "streak" | "rank" | "leetcode";

export function badgeCategory(id: string): BadgeCategory {
  if (id.startsWith("streak-")) return "streak";
  if (id.startsWith("rank-")) return "rank";
  return "leetcode";
}

/** The short center label a BadgePlate shows for this badge — a day/solved
 * count for streak & LeetCode plates, a 4-letter rank code for rank plates.
 * Shared by the badge case, the OG image route, and certificate pages so
 * all three render the exact same plate for a given badge id. */
export function plateValue(badge: BadgeDef): string {
  return badgeCategory(badge.id) === "rank"
    ? badge.name.slice(0, 4).toUpperCase()
    : String(badge.threshold);
}

/** Every streak badge whose threshold `streak` (or longer) satisfies, in ascending order. */
export function earnedBadgesForStreak(bestStreak: number): BadgeDef[] {
  return STREAK_BADGES.filter((b) => bestStreak >= b.threshold);
}

/** Every XP-rank badge whose threshold `level` (or higher) satisfies. */
export function earnedBadgesForLevel(level: number): BadgeDef[] {
  return XP_RANK_BADGES.filter((b) => level >= b.threshold);
}

/** Every LeetCode milestone badge whose threshold `solvedCount` (or more) satisfies. */
export function earnedBadgesForSolvedCount(solvedCount: number): BadgeDef[] {
  return LEETCODE_BADGES.filter((b) => solvedCount >= b.threshold);
}
