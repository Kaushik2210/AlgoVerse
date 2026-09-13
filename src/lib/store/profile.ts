"use client";

import { create } from "zustand";

interface ProfileState {
  username: string | null;
  displayName: string | null;
  setProfile: (p: { username: string | null; displayName: string | null }) => void;
  clear: () => void;
}

/**
 * Mirrors the signed-in user's `profiles` row (username/display_name only).
 * Populated by SupabaseSyncProvider right after sign-in and cleared on
 * sign-out. Deliberately not persisted — it's cheap to refetch and shouldn't
 * outlive the session it belongs to.
 *
 * Anywhere a real, database-backed username is needed (e.g. constructing a
 * certificate URL) should read from here rather than
 * `user.user_metadata.username` — that's only set when the person typed one
 * at signup, while `profiles.username` is guaranteed to exist (the signup
 * trigger in supabase/migrations/0001_init.sql always assigns one, falling
 * back to the email's local part).
 */
export const useProfileStore = create<ProfileState>()((set) => ({
  username: null,
  displayName: null,
  setProfile: (p) => set(p),
  clear: () => set({ username: null, displayName: null }),
}));
