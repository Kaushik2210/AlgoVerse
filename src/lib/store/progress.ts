"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface ModuleProgress {
  /** 0-100 */
  percent: number;
  completed: boolean;
  quizScore?: number;
  quizTotal?: number;
  lastVisited?: string;
}

interface ProgressState {
  xp: number;
  streak: number;
  lastActiveDate: string | null;
  modules: Record<string, ModuleProgress>;
  setModuleProgress: (slug: string, progress: Partial<ModuleProgress>) => void;
  completeModule: (slug: string, xpAward?: number) => void;
  recordQuizResult: (slug: string, score: number, total: number) => void;
  touchStreak: () => void;
  totalXp: () => number;
}

const XP_PER_MODULE = 100;
const XP_PER_QUIZ_POINT = 10;

function todayISO() {
  return new Date().toISOString().slice(0, 10);
}

export const useProgressStore = create<ProgressState>()(
  persist(
    (set, get) => ({
      xp: 0,
      streak: 0,
      lastActiveDate: null,
      modules: {},

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
          };
        }),

      recordQuizResult: (slug, score, total) =>
        set((s) => {
          const base: ModuleProgress = s.modules[slug] ?? {
            percent: 0,
            completed: false,
          };
          return {
            xp: s.xp + score * XP_PER_QUIZ_POINT,
            modules: {
              ...s.modules,
              [slug]: {
                ...base,
                quizScore: score,
                quizTotal: total,
                lastVisited: todayISO(),
              },
            },
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
          return { streak: nextStreak, lastActiveDate: today };
        }),

      totalXp: () => get().xp,
    }),
    { name: "algoverse-progress" }
  )
);
