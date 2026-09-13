"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import { STREAK_BADGES, earnedBadgesForStreak } from "@/lib/badges";

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

  setModuleProgress: (slug: string, progress: Partial<ModuleProgress>) => void;
  completeModule: (slug: string, xpAward?: number) => void;
  recordQuizResult: (slug: string, score: number, total: number) => void;
  touchStreak: () => void;
  totalXp: () => number;
  /** Marks a batch of newly-earned badges as acknowledged and grants their
   * XP bonus. Called once by the badge-unlock watcher after it decides
   * which thresholds were freshly crossed. */
  acknowledgeBadges: (ids: string[]) => void;
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
            const def = STREAK_BADGES.find((b) => b.id === id);
            return sum + (def?.xpBonus ?? 0);
          }, 0);
          const today = todayISO();
          let log = s.activityLog;
          for (const id of newIds) {
            const def = STREAK_BADGES.find((b) => b.id === id);
            log = appendActivity(log, {
              date: today,
              type: "badge",
              amount: def?.xpBonus ?? 0,
              label: id,
            });
          }
          return {
            earnedBadgeIds: [...s.earnedBadgeIds, ...newIds],
            xp: s.xp + bonusXp,
            activityLog: log,
          };
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
        };
      },
    }
  )
);
