import type { Metadata } from "next";
import { Trophy } from "lucide-react";
import LeaderboardBoard, { type LeaderboardRow } from "@/components/leaderboard/LeaderboardBoard";
import { createPublicClient } from "@/lib/supabase/public";

export const metadata: Metadata = {
  title: "Leaderboard — AlgoVerse",
  description: "Top operatives ranked by XP, streak, and problems solved.",
};

// The leaderboard is public data that changes slowly enough not to need a
// fresh render on every hit — same ISR-over-forced-SSR trade as the
// certificate pages (see src/app/c/[username]/[badgeId]/page.tsx), paired
// with the cookie-free public Supabase client below.
export const revalidate = 60;

async function fetchLeaderboard(): Promise<LeaderboardRow[]> {
  try {
    const supabase = createPublicClient();
    const { data, error } = await supabase
      .from("leaderboard")
      .select("username, display_name, xp, current_streak, longest_streak, solved_count")
      .order("xp", { ascending: false })
      .limit(100);

    if (error) {
      // Most likely cause on a fresh deploy: migration 0005 hasn't been run
      // yet. Degrade to an empty board instead of a broken page.
      console.error("[leaderboard] fetch failed:", error.message);
      return [];
    }
    return (data ?? []) as LeaderboardRow[];
  } catch (err) {
    console.error("[leaderboard] fetch threw:", err);
    return [];
  }
}

export default async function LeaderboardPage() {
  const rows = await fetchLeaderboard();

  return (
    <div className="px-6 py-10 sm:px-10">
      <div className="mx-auto max-w-4xl flex flex-col gap-8">
        <div className="flex items-center gap-3">
          <span className="glass flex h-11 w-11 items-center justify-center rounded-xl text-amber">
            <Trophy size={20} />
          </span>
          <div>
            <h1 className="font-mono-data text-2xl font-bold tracking-tight">Leaderboard</h1>
            <p className="text-sm text-text-muted mt-0.5">
              Top operatives, ranked by XP, streak, and problems solved.
            </p>
          </div>
        </div>

        <LeaderboardBoard rows={rows} />
      </div>
    </div>
  );
}
