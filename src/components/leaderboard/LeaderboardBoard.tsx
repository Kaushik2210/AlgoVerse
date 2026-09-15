"use client";

import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Flame, Code2, Zap, Crown } from "lucide-react";
import GlassCard from "@/components/ui/GlassCard";
import { useAuthStore } from "@/lib/store/auth";
import { useProfileStore } from "@/lib/store/profile";
import { createClient } from "@/lib/supabase/client";
import { getLevelProgress } from "@/lib/leveling";
import { cn } from "@/lib/utils";

export interface LeaderboardRow {
  username: string;
  display_name: string | null;
  xp: number;
  current_streak: number;
  longest_streak: number;
  solved_count: number;
}

type SortKey = "xp" | "streak" | "solved";

const SORT_COLUMN: Record<SortKey, keyof LeaderboardRow> = {
  xp: "xp",
  streak: "longest_streak",
  solved: "solved_count",
};

const TABS: { key: SortKey; label: string; icon: React.ElementType }[] = [
  { key: "xp", label: "XP", icon: Zap },
  { key: "streak", label: "Streak", icon: Flame },
  { key: "solved", label: "Solved", icon: Code2 },
];

/**
 * Ranked leaderboard table with XP/streak/solved tabs. Sorting happens
 * client-side against the same fetched page of rows (the public `leaderboard`
 * view — supabase/migrations/0005_leaderboard.sql), so switching tabs is
 * instant. The signed-in user's own row (matched by username) gets a glow;
 * if it's outside the fetched page, a lightweight extra query works out
 * their exact rank ("your rank: #N") without pulling the whole table.
 */
export default function LeaderboardBoard({ rows }: { rows: LeaderboardRow[] }) {
  const [sortKey, setSortKey] = useState<SortKey>("xp");
  const user = useAuthStore((s) => s.user);
  const username = useProfileStore((s) => s.username);
  const [offListRank, setOffListRank] = useState<{ rank: number; row: LeaderboardRow } | null>(null);

  const sorted = useMemo(() => {
    const col = SORT_COLUMN[sortKey];
    return [...rows].sort((a, b) => (b[col] as number) - (a[col] as number));
  }, [rows, sortKey]);

  const yourIndex = username ? sorted.findIndex((r) => r.username === username) : -1;

  // Only fire when the signed-in user isn't visible in the current page of
  // rows — a targeted count() query instead of fetching the whole table.
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- clearing a stale off-list rank before a fresh (or no) lookup for the new sort/user
    setOffListRank(null);
    if (!user || !username || yourIndex !== -1) return;

    let cancelled = false;
    (async () => {
      const supabase = createClient();
      const { data: mine } = await supabase
        .from("leaderboard")
        .select("username, display_name, xp, current_streak, longest_streak, solved_count")
        .eq("username", username)
        .maybeSingle();
      if (cancelled || !mine) return;

      const col = SORT_COLUMN[sortKey];
      const { count } = await supabase
        .from("leaderboard")
        .select("*", { count: "exact", head: true })
        .gt(col, (mine as LeaderboardRow)[col] as number);
      if (cancelled) return;

      setOffListRank({ rank: (count ?? 0) + 1, row: mine as LeaderboardRow });
    })();

    return () => {
      cancelled = true;
    };
  }, [user, username, sortKey, yourIndex]);

  if (rows.length === 0) {
    return (
      <GlassCard className="py-16 text-center">
        <p className="text-sm text-text-muted">
          No rankings yet — be the first operative on the board.
        </p>
      </GlassCard>
    );
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="glass flex items-center gap-1 self-start rounded-xl p-1">
        {TABS.map(({ key, label, icon: Icon }) => (
          <button
            key={key}
            onClick={() => setSortKey(key)}
            className={cn(
              "flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-mono-data transition-colors",
              sortKey === key ? "bg-cyan/15 text-cyan" : "text-text-muted hover:text-foreground"
            )}
          >
            <Icon size={13} />
            {label}
          </button>
        ))}
      </div>

      <GlassCard className="flex flex-col gap-1.5 p-3 sm:p-4">
        {sorted.map((row, i) => (
          <LeaderboardEntry
            key={row.username}
            row={row}
            rank={i + 1}
            sortKey={sortKey}
            isYou={row.username === username}
          />
        ))}
      </GlassCard>

      {offListRank && (
        <GlassCard glow="cyan" className="flex items-center justify-between gap-3">
          <p className="text-xs font-mono-data text-text-muted">Your rank</p>
          <LeaderboardEntry
            row={offListRank.row}
            rank={offListRank.rank}
            sortKey={sortKey}
            isYou
            compact
          />
        </GlassCard>
      )}
    </div>
  );
}

function LeaderboardEntry({
  row,
  rank,
  sortKey,
  isYou,
  compact,
}: {
  row: LeaderboardRow;
  rank: number;
  sortKey: SortKey;
  isYou: boolean;
  compact?: boolean;
}) {
  const level = getLevelProgress(row.xp);
  const name = row.display_name || row.username;

  return (
    <motion.div
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25 }}
      className={cn(
        "flex items-center gap-3 rounded-xl px-3 py-2.5 transition-colors",
        isYou && "border border-cyan/50 bg-cyan/10 shadow-[0_0_14px_rgba(0,240,255,0.2)]",
        !isYou && !compact && "hover:bg-glass-border-token/30"
      )}
    >
      <span
        className={cn(
          "flex h-7 w-7 shrink-0 items-center justify-center rounded-full font-mono-data text-xs font-bold",
          rank === 1 && "bg-amber/20 text-amber",
          rank === 2 && "bg-text-muted/20 text-foreground",
          rank === 3 && "bg-amber/10 text-amber/80",
          rank > 3 && "bg-glass-border-token/40 text-text-muted"
        )}
      >
        {rank === 1 ? <Crown size={13} /> : rank}
      </span>

      <div className="min-w-0 flex-1">
        <p className="truncate text-sm font-semibold">
          {name}
          {isYou && <span className="ml-1.5 text-[10px] text-cyan font-mono-data">(you)</span>}
        </p>
        <p className="text-[10px] text-text-muted font-mono-data">
          Lv.{level.level} &middot; {level.rank}
        </p>
      </div>

      <div className="flex items-center gap-3 text-xs font-mono-data shrink-0">
        <Stat value={row.xp} label="XP" active={sortKey === "xp"} />
        <Stat value={row.longest_streak} label="streak" active={sortKey === "streak"} />
        <Stat value={row.solved_count} label="solved" active={sortKey === "solved"} />
      </div>
    </motion.div>
  );
}

function Stat({ value, label, active }: { value: number; label: string; active: boolean }) {
  return (
    <span className={cn("hidden sm:inline", active ? "text-cyan font-bold" : "text-text-muted")}>
      {value}
      <span className="ml-0.5 opacity-70">{label}</span>
    </span>
  );
}
