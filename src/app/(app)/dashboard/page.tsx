"use client";

import { motion } from "framer-motion";
import { Flame, TrendingUp, CheckCircle2, Code2 } from "lucide-react";
import GlassCard from "@/components/ui/GlassCard";
import XPBar from "@/components/dashboard/XPBar";
import BadgeCase from "@/components/dashboard/BadgeCase";
import ActivityHeatmap from "@/components/dashboard/ActivityHeatmap";
import { useStreakInfo, useModuleStats } from "@/lib/store/selectors";
import { STRUCTURE_ITEMS, PATTERN_ITEMS } from "@/lib/nav";
import { leetcodeIndex } from "@/lib/leetcode-index";

const TOTAL_MODULES = STRUCTURE_ITEMS.length + PATTERN_ITEMS.length;

export default function DashboardPage() {
  const { streak, longestStreak } = useStreakInfo();
  const { completedCount } = useModuleStats();

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 flex flex-col gap-6">
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <p className="font-mono-data text-xs uppercase tracking-wider text-cyan">
          Mission Control
        </p>
        <h1 className="text-2xl sm:text-3xl font-bold mt-1">Dashboard</h1>
        <p className="text-sm text-text-muted mt-1">
          Your operative record — level, streaks, badges, and daily activity.
        </p>
      </motion.div>

      <XPBar />

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatTile
          icon={Flame}
          color="amber"
          label="Current Streak"
          value={`${streak}d`}
        />
        <StatTile
          icon={TrendingUp}
          color="amber"
          label="Longest Streak"
          value={`${longestStreak}d`}
        />
        <StatTile
          icon={CheckCircle2}
          color="violet"
          label="Modules Completed"
          value={`${completedCount}/${TOTAL_MODULES}`}
        />
        <StatTile
          icon={Code2}
          color="cyan"
          label="LeetCode Problems"
          value={`${leetcodeIndex.length}`}
        />
      </div>

      <BadgeCase />

      <ActivityHeatmap />
    </div>
  );
}

function StatTile({
  icon: Icon,
  color,
  label,
  value,
}: {
  icon: React.ElementType;
  color: "cyan" | "violet" | "amber";
  label: string;
  value: string;
}) {
  const colorClasses = {
    cyan: "text-cyan",
    violet: "text-violet",
    amber: "text-amber",
  }[color];

  return (
    <GlassCard className="flex flex-col gap-2" tilt>
      <div className={`flex items-center gap-1.5 ${colorClasses}`}>
        <Icon size={14} />
        <span className="font-mono-data text-[11px] uppercase tracking-wide text-text-muted">
          {label}
        </span>
      </div>
      <p className="text-2xl font-bold font-mono-data">{value}</p>
    </GlassCard>
  );
}
