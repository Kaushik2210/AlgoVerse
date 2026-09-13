"use client";

import { motion } from "framer-motion";
import { Zap } from "lucide-react";
import GlassCard from "@/components/ui/GlassCard";
import { useLevelProgress } from "@/lib/store/selectors";

/** Prominent level/rank/XP display — the dashboard's centerpiece. Bar fill
 * animates on mount and whenever xp changes, mirroring ProgressRing's
 * animation conventions elsewhere in the app. */
export default function XPBar() {
  const level = useLevelProgress();

  return (
    <GlassCard glow="violet" className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <div>
          <p className="font-mono-data text-[11px] uppercase tracking-wider text-text-muted">
            Operative Status
          </p>
          <div className="flex items-baseline gap-2 mt-1">
            <span className="text-3xl font-bold font-mono-data text-violet text-glow-cyan">
              Lv.{level.level}
            </span>
            <span className="text-lg font-semibold">{level.rank}</span>
          </div>
        </div>
        <div className="flex items-center gap-1.5 rounded-lg border border-amber/30 bg-amber/10 px-3 py-1.5 text-amber font-mono-data text-sm">
          <Zap size={14} />
          {level.xp.toLocaleString()} XP
        </div>
      </div>

      <div>
        <div className="h-3 w-full rounded-full bg-white/5 overflow-hidden border border-glass-border-token">
          <motion.div
            className="h-full rounded-full bg-gradient-to-r from-violet to-cyan"
            style={{ boxShadow: "0 0 10px rgba(168,85,247,0.5)" }}
            initial={{ width: 0 }}
            animate={{ width: `${level.percentToNextLevel}%` }}
            transition={{ duration: 0.9, ease: "easeOut" }}
          />
        </div>
        <div className="flex justify-between mt-1.5 text-[11px] font-mono-data text-text-muted">
          <span>
            {level.xpIntoLevel.toLocaleString()} / {level.xpForNextLevel.toLocaleString()} XP to Lv.
            {level.level + 1}
          </span>
          {level.nextRank && (
            <span>
              {level.levelsToNextRank} level{level.levelsToNextRank === 1 ? "" : "s"} to{" "}
              <span className="text-violet">{level.nextRank}</span>
            </span>
          )}
        </div>
      </div>
    </GlassCard>
  );
}
