"use client";

import { create } from "zustand";
import type { BadgeDef } from "@/lib/badges";

interface BadgeUnlockState {
  /** FIFO queue — BadgeUnlockOverlay shows queue[0] and calls advance()
   * when its sequence finishes, so multiple badges earned in the same
   * tick (e.g. a streak crossing two thresholds at once) still play one
   * at a time instead of stacking on top of each other. */
  queue: BadgeDef[];
  enqueue: (badges: BadgeDef[]) => void;
  advance: () => void;
}

/** Deliberately NOT persisted, same as useToastStore — this is ephemeral
 * "play this animation" state, not progress data. */
export const useBadgeUnlockStore = create<BadgeUnlockState>()((set) => ({
  queue: [],
  enqueue: (badges) => set((s) => ({ queue: [...s.queue, ...badges] })),
  advance: () => set((s) => ({ queue: s.queue.slice(1) })),
}));
