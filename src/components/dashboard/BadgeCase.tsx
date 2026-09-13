"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Award } from "lucide-react";
import GlassCard from "@/components/ui/GlassCard";
import BadgePlate from "@/components/badges/BadgePlate";
import {
  useBadgeStates,
  useRankBadgeStates,
  useLeetcodeBadgeStates,
  useLeetcodeSolvedCount,
  useStreakInfo,
  type BadgeState,
} from "@/lib/store/selectors";
import { cn } from "@/lib/utils";
import { plateValue } from "@/lib/badges";

/** Achievement showcase — the "badge case". Locked plates render as a
 * dimmed hex-shield silhouette; earned ones light up in their tier's
 * metallic finish with the holo sheen / particle / icon-pulse animations
 * defined in globals.css. Earned plates link out to their public,
 * LinkedIn-shareable certificate page. */
export default function BadgeCase() {
  const streakBadges = useBadgeStates();
  const rankBadges = useRankBadgeStates();
  const leetcodeBadges = useLeetcodeBadgeStates();
  const { longestStreak } = useStreakInfo();
  const solvedCount = useLeetcodeSolvedCount();

  return (
    <GlassCard className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Award size={16} className="text-amber" />
          <h3 className="font-mono-data text-sm uppercase tracking-wider">Badge Case</h3>
        </div>
        <span className="text-xs font-mono-data text-text-muted">
          Best streak: <span className="text-amber">{longestStreak}d</span> · Solved:{" "}
          <span className="text-cyan">{solvedCount}</span>
        </span>
      </div>

      <BadgeRow label="Streak plates" badges={streakBadges} />
      <BadgeRow label="Rank plates" badges={rankBadges} />
      <BadgeRow label="LeetCode plates" badges={leetcodeBadges} />
    </GlassCard>
  );
}

function BadgeRow({ label, badges }: { label: string; badges: BadgeState[] }) {
  return (
    <div className="flex flex-col gap-3">
      <p className="text-[10px] font-mono-data uppercase tracking-widest text-text-muted">
        {label}
      </p>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
        {badges.map((badge, i) => (
          <BadgeSlot key={badge.id} badge={badge} value={plateValue(badge)} index={i} />
        ))}
      </div>
    </div>
  );
}

function BadgeSlot({
  badge,
  value,
  index,
}: {
  badge: BadgeState;
  value: string;
  index: number;
}) {
  const content = (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.03, duration: 0.3 }}
      className={cn(
        "flex flex-col items-center gap-1.5 rounded-xl p-2 text-center transition-transform",
        badge.earned && "hover:-translate-y-0.5"
      )}
      title={badge.earned ? badge.description : `Locked — ${badge.tierLabel}`}
    >
      <BadgePlate tier={badge.tier} earned={badge.earned} value={value} size={84} />
      <div>
        <p
          className={cn(
            "text-[10px] font-mono-data font-semibold leading-tight",
            !badge.earned && "text-text-muted/60"
          )}
        >
          {badge.name}
        </p>
        <p className="text-[9px] text-text-muted mt-0.5">{badge.tierLabel}</p>
      </div>
    </motion.div>
  );

  if (!badge.earned) return content;

  return (
    <Link href={`/c/${badge.id}`} className="rounded-xl focus:outline-none focus-visible:ring-1 focus-visible:ring-cyan">
      {content}
    </Link>
  );
}
