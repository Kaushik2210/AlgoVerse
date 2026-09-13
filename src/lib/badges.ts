/**
 * Streak-milestone badge definitions. Purely data — earned/locked state is
 * derived from store state (see src/lib/store/selectors.ts), never stored
 * redundantly here.
 */

export interface BadgeDef {
  id: string;
  days: number;
  name: string;
  description: string;
  /** Bonus XP granted the moment this badge is earned. */
  xpBonus: number;
  /** Visual tier — "legendary" gets the extra-special treatment in the case. */
  tier: "bronze" | "silver" | "gold" | "legendary";
}

export const STREAK_BADGES: BadgeDef[] = [
  {
    id: "streak-3",
    days: 3,
    name: "First Contact",
    description: "Sustained operations for 3 consecutive days.",
    xpBonus: 25,
    tier: "bronze",
  },
  {
    id: "streak-7",
    days: 7,
    name: "Holding the Line",
    description: "One full week of continuous operations.",
    xpBonus: 50,
    tier: "bronze",
  },
  {
    id: "streak-10",
    days: 10,
    name: "Deep Cover",
    description: "Ten consecutive days in the field.",
    xpBonus: 75,
    tier: "silver",
  },
  {
    id: "streak-30",
    days: 30,
    name: "Veteran Operative",
    description: "Thirty days of unbroken commitment.",
    xpBonus: 150,
    tier: "silver",
  },
  {
    id: "streak-60",
    days: 60,
    name: "Iron Discipline",
    description: "Sixty days without a single missed cycle.",
    xpBonus: 300,
    tier: "gold",
  },
  {
    id: "streak-100",
    days: 100,
    name: "Centurion",
    description: "One hundred consecutive days of operation.",
    xpBonus: 500,
    tier: "gold",
  },
  {
    id: "streak-365",
    days: 365,
    name: "Legend of the Verse",
    description: "A full year of unbroken dedication to the mission.",
    xpBonus: 1500,
    tier: "legendary",
  },
];

export function badgeById(id: string): BadgeDef | undefined {
  return STREAK_BADGES.find((b) => b.id === id);
}

/** Every badge whose threshold `streak` (or longer) satisfies, in ascending order. */
export function earnedBadgesForStreak(bestStreak: number): BadgeDef[] {
  return STREAK_BADGES.filter((b) => bestStreak >= b.days);
}
