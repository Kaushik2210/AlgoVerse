"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import { earnedBadgesForStreak, badgeById } from "@/lib/badges";

export interface ModuleProgress {
  /** 0-100 */
  percent: number;
  completed: boolean;
  quizScore?: number;
  quizTotal?: number;
  lastVisited?: string;
}

export type ActivityType = "module_complete" | "quiz" | "streak" | "badge";

export interface ActivityEvent {
  /** yyyy-mm-dd */
  date: string;
  type: ActivityType;
  /** XP earned by this event, or a count for non-XP events. */
  amount: number;
  label?: string;
}

interface ProgressState {
  xp: number;
  streak: number;
  longestStreak: number;
  lastActiveDate: string | null;
  modules: Record<string, ModuleProgress>;
  activityLog: ActivityEvent[];
  /** Badge ids already awarded/notified — prevents re-toasting on reload. */
  earnedBadgeIds: string[];
  /** LeetCode problem slugs the user has marked solved — backs the
   * LeetCode-milestone achievement plates. */
  solvedLeetcodeIds: string[];
  /** ISO date each badge id was first acknowledged — backs the "date
   * earned" shown on shareable certificate pages. Badges earned before
   * this field existed fall back to today's date the first time they're
   * looked up (see badges.ts consumers). */
  badgeEarnedAt: Record<string, string>;

  setModuleProgress: (slug: string, progress: Partial<ModuleProgress>) => void;
  completeModule: (slug: string, xpAward?: number) => void;
  recordQuizResult: (slug: string, score: number, total: number) => void;
  toggleLeetcodeSolved: (slug: string) => void;
  /** Unions a batch of slugs into solvedLeetcodeIds without touching
   * existing entries — used by the cloud-sync layer to merge solved
   * problems pulled from the `solved_problems` table into local state
   * without clobbering anything solved locally but not yet synced. */
  mergeSolvedLeetcode: (slugs: string[]) => void;
  touchStreak: () => void;
  totalXp: () => number;
  /** Marks a batch of newly-earned badges as acknowledged and grants their
   * XP bonus. Called once by the badge-unlock watcher after it decides
   * which thresholds were freshly crossed. */
  acknowledgeBadges: (ids: string[]) => void;
  /** Overwrites local progress with a snapshot pulled from Supabase.
   * Used only by the cloud-sync layer (SupabaseSyncProvider) right after a
   * user signs in on a device whose remote row already has data. */
  hydrateFromRemote: (snapshot: RemoteProgressSnapshot) => void;
}

/** Plain-object shape synced to/from the Supabase `progress` table — a
 * subset of ProgressState with just the fields that live server-side. */
export interface RemoteProgressSnapshot {
  xp: number;
  streak: number;
  longestStreak: number;
  lastActiveDate: string | null;
  modules: Record<string, ModuleProgress>;
  activityLog: ActivityEvent[];
  earnedBadgeIds: string[];
}

const XP_PER_MODULE = 100;
const XP_PER_QUIZ_POINT = 10;
/** Cap so a single session refresh can't balloon the log forever. */
const MAX_ACTIVITY_LOG = 2000;

function todayISO() {
  return new Date().toISOString().slice(0, 10);
}

function appendActivity(
  log: ActivityEvent[],
  event: ActivityEvent
): ActivityEvent[] {
  const next = [...log, event];
  return next.length > MAX_ACTIVITY_LOG ? next.slice(next.length - MAX_ACTIVITY_LOG) : next;
}

export const useProgressStore = create<ProgressState>()(
  persist(
    (set, get) => ({
      xp: 0,
      streak: 0,
      longestStreak: 0,
      lastActiveDate: null,
      modules: {},
      activityLog: [],
      earnedBadgeIds: [],
      solvedLeetcodeIds: [],
      badgeEarnedAt: {},

      setModuleProgress: (slug, progress) =>
        set((s) => {
          const base: ModuleProgress = s.modules[slug] ?? {
            percent: 0,
            completed: false,
          };
          return {
            modules: {
              ...s.modules,
              [slug]: { ...base, ...progress, lastVisited: todayISO() },
            },
          };
        }),

      completeModule: (slug, xpAward = XP_PER_MODULE) =>
        set((s) => {
          const base: ModuleProgress = s.modules[slug] ?? {
            percent: 0,
            completed: false,
          };
          const already = base.completed;
          return {
            xp: already ? s.xp : s.xp + xpAward,
            modules: {
              ...s.modules,
              [slug]: {
                ...base,
                percent: 100,
                completed: true,
                lastVisited: todayISO(),
              },
            },
            activityLog: already
              ? s.activityLog
              : appendActivity(s.activityLog, {
                  date: todayISO(),
                  type: "module_complete",
                  amount: xpAward,
                  label: slug,
                }),
          };
        }),

      recordQuizResult: (slug, score, total) =>
        set((s) => {
          const base: ModuleProgress = s.modules[slug] ?? {
            percent: 0,
            completed: false,
          };
          const xpGain = score * XP_PER_QUIZ_POINT;
          return {
            xp: s.xp + xpGain,
            modules: {
              ...s.modules,
              [slug]: {
                ...base,
                quizScore: score,
                quizTotal: total,
                lastVisited: todayISO(),
              },
            },
            activityLog: appendActivity(s.activityLog, {
              date: todayISO(),
              type: "quiz",
              amount: xpGain,
              label: slug,
            }),
          };
        }),

      toggleLeetcodeSolved: (slug) =>
        set((s) => {
          const solved = s.solvedLeetcodeIds.includes(slug);
          return {
            solvedLeetcodeIds: solved
              ? s.solvedLeetcodeIds.filter((id) => id !== slug)
              : [...s.solvedLeetcodeIds, slug],
          };
        }),

      mergeSolvedLeetcode: (slugs) =>
        set((s) => {
          if (slugs.length === 0) return {};
          const merged = new Set([...s.solvedLeetcodeIds, ...slugs]);
          if (merged.size === s.solvedLeetcodeIds.length) return {};
          return { solvedLeetcodeIds: Array.from(merged) };
        }),

      touchStreak: () =>
        set((s) => {
          const today = todayISO();
          if (s.lastActiveDate === today) return {};
          const yesterday = new Date(Date.now() - 86400000)
            .toISOString()
            .slice(0, 10);
          const nextStreak = s.lastActiveDate === yesterday ? s.streak + 1 : 1;
          return {
            streak: nextStreak,
            longestStreak: Math.max(s.longestStreak, nextStreak),
            lastActiveDate: today,
            activityLog: appendActivity(s.activityLog, {
              date: today,
              type: "streak",
              amount: 1,
            }),
          };
        }),

      totalXp: () => get().xp,

      acknowledgeBadges: (ids) =>
        set((s) => {
          const newIds = ids.filter((id) => !s.earnedBadgeIds.includes(id));
          if (newIds.length === 0) return {};
          const bonusXp = newIds.reduce((sum, id) => {
            const def = badgeById(id);
            return sum + (def?.xpBonus ?? 0);
          }, 0);
          const today = todayISO();
          let log = s.activityLog;
          const earnedAt = { ...s.badgeEarnedAt };
          for (const id of newIds) {
            const def = badgeById(id);
            log = appendActivity(log, {
              date: today,
              type: "badge",
              amount: def?.xpBonus ?? 0,
              label: id,
            });
            earnedAt[id] = today;
          }
          return {
            earnedBadgeIds: [...s.earnedBadgeIds, ...newIds],
            xp: s.xp + bonusXp,
            activityLog: log,
            badgeEarnedAt: earnedAt,
          };
        }),

      hydrateFromRemote: (snapshot) =>
        set({
          xp: snapshot.xp,
          streak: snapshot.streak,
          longestStreak: snapshot.longestStreak,
          lastActiveDate: snapshot.lastActiveDate,
          modules: snapshot.modules,
          activityLog: snapshot.activityLog,
          earnedBadgeIds: snapshot.earnedBadgeIds,
        }),
    }),
    {
      name: "algoverse-progress",
      // Bump-safe: older persisted state (pre-badge/heatmap) just gets the
      // new fields defaulted in by zustand/persist's shallow merge.
      version: 1,
      migrate: (persisted) => {
        const s = persisted as Partial<ProgressState>;
        return {
          ...s,
          longestStreak: s?.longestStreak ?? s?.streak ?? 0,
          activityLog: s?.activityLog ?? [],
          earnedBadgeIds:
            s?.earnedBadgeIds ??
            earnedBadgesForStreak(s?.longestStreak ?? s?.streak ?? 0).map((b) => b.id),
          solvedLeetcodeIds: s?.solvedLeetcodeIds ?? [],
          badgeEarnedAt: s?.badgeEarnedAt ?? {},
        };
      },
    }
  )
);
