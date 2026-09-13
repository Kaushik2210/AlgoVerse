"use client";

import { create } from "zustand";

export interface ToastItem {
  id: string;
  title: string;
  description?: string;
  variant: "amber" | "cyan" | "violet";
  icon?: "badge" | "level";
}

interface ToastState {
  toasts: ToastItem[];
  push: (toast: Omit<ToastItem, "id">) => void;
  dismiss: (id: string) => void;
}

/** Deliberately NOT persisted — toasts are ephemeral UI, not progress data. */
export const useToastStore = create<ToastState>()((set) => ({
  toasts: [],
  push: (toast) =>
    set((s) => ({
      toasts: [...s.toasts, { ...toast, id: `${Date.now()}-${Math.random().toString(36).slice(2)}` }],
    })),
  dismiss: (id) => set((s) => ({ toasts: s.toasts.filter((t) => t.id !== id) })),
}));
