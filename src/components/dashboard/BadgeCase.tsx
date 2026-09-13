"use client";

import { motion } from "framer-motion";
import { Lock, Award, Flame, Shield, Crown, Star } from "lucide-react";
import GlassCard from "@/components/ui/GlassCard";
import { useBadgeStates, useStreakInfo, type BadgeState } from "@/lib/store/selectors";
import { cn } from "@/lib/utils";
import type { BadgeDef } from "@/lib/badges";

const tierIcon: Record<BadgeDef["tier"], React.ElementType> = {
  bronze: Flame,
  silver: Shield,
  gold: Crown,
  legendary: Star,
};

const tierRing: Record<BadgeDef["tier"], string> = {
  bronze: "border-amber/50 text-amber shadow-[0_0_14px_rgba(255,176,32,0.35)]",
  silver: "border-amber/60 text-amber shadow-[0_0_16px_rgba(255,176,32,0.45)]",
  gold: "border-amber/70 text-amber shadow-[0_0_22px_rgba(255,176,32,0.6)]",
  legendary:
    "border-violet/70 text-violet shadow-[0_0_28px_rgba(168,85,247,0.6)] bg-gradient-to-br from-amber/10 to-violet/10",
};

/** Achievement showcase — the "badge case". Locked badges render dimmed
 * silhouettes; earned ones light up with the amber achievement accent
 * (violet for the legendary 365-day tier). */
export default function BadgeCase() {
  const badges = useBadgeStates();
  const { longestStreak } = useStreakInfo();

  return (
    <GlassCard className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Award size={16} className="text-amber" />
          <h3 className="font-mono-data text-sm uppercase tracking-wider">Badge Case</h3>
        </div>
        <span className="text-xs font-mono-data text-text-muted">
          Best streak: <span className="text-amber">{longestStreak}d</span>
        </span>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
        {badges.map((badge, i) => (
          <BadgeSlot key={badge.id} badge={badge} index={i} />
        ))}
      </div>
    </GlassCard>
  );
}

function BadgeSlot({ badge, index }: { badge: BadgeState; index: number }) {
  const Icon = tierIcon[badge.tier];

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.03, duration: 0.3 }}
      className={cn(
        "relative flex flex-col items-center gap-2 rounded-xl border p-3 text-center transition-transform",
        badge.earned
          ? cn("bg-white/5", tierRing[badge.tier])
          : "border-glass-border-token text-text-muted/50 grayscale opacity-60"
      )}
      title={badge.earned ? badge.description : `Locked — reach a ${badge.days}-day streak`}
    >
      <div
        className={cn(
          "flex h-11 w-11 items-center justify-center rounded-full border",
          badge.earned ? "border-current" : "border-glass-border-token"
        )}
      >
        {badge.earned ? <Icon size={18} /> : <Lock size={16} />}
      </div>
      <div>
        <p className={cn("text-[11px] font-mono-data font-semibold leading-tight", !badge.earned && "text-text-muted")}>
          {badge.name}
        </p>
        <p className="text-[10px] text-text-muted mt-0.5">{badge.days}-day streak</p>
      </div>
    </motion.div>
  );
}
