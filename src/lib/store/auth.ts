"use client";

import { create } from "zustand";
import type { User } from "@supabase/supabase-js";

interface AuthState {
  user: User | null;
  /** True until the first getSession()/onAuthStateChange callback resolves. */
  loading: boolean;
  setUser: (user: User | null) => void;
  setLoading: (loading: boolean) => void;
}

/**
 * Deliberately NOT persisted — Supabase's own client keeps the session in
 * cookies/localStorage under the hood; this store just mirrors the current
 * user for React components to read, populated by AuthProvider.
 */
export const useAuthStore = create<AuthState>()((set) => ({
  user: null,
  loading: true,
  setUser: (user) => set({ user }),
  setLoading: (loading) => set({ loading }),
}));
