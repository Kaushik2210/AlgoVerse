"use client";

import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";
import GlassCard from "@/components/ui/GlassCard";
import { useProgressStore } from "@/lib/store/progress";
import { useMounted } from "@/lib/hooks/useMounted";

/**
 * "142 / 635 solved" headline stat + progress bar for the /leetcode index —
 * the core "see your real-time progress" ask. Reads solvedLeetcodeIds
 * straight from the local store (which SupabaseSyncProvider keeps synced
 * with the `solved_problems` table for signed-in users), so it updates the
 * instant a problem gets marked solved, with no extra fetch.
 */
export default function LeetCodeProgressStat({ total }: { total: number }) {
  const mounted = useMounted();
  const solvedCount = useProgressStore((s) => s.solvedLeetcodeIds.length);
  const count = mounted ? solvedCount : 0;
  const percent = total > 0 ? Math.round((count / total) * 100) : 0;

  return (
    <GlassCard className="flex flex-col gap-3" glow="cyan">
      <div className="flex items-center justify-between gap-3 flex-wrap">
        <div className="flex items-center gap-2">
          <CheckCircle2 size={16} className="text-cyan" />
          <h2 className="font-mono-data text-sm uppercase tracking-wider text-text-muted">
            Your Progress
          </h2>
        </div>
        <p className="font-mono-data text-lg font-bold">
          <span className="text-cyan">{count}</span>
          <span className="text-text-muted"> / {total} solved</span>
          <span className="ml-2 text-xs text-text-muted">({percent}%)</span>
        </p>
      </div>
      <div className="h-2 w-full overflow-hidden rounded-full bg-glass-border-token/60">
        <motion.div
          className="h-full rounded-full bg-cyan shadow-[0_0_10px_rgba(0,240,255,0.5)]"
          initial={{ width: 0 }}
          animate={{ width: `${percent}%` }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        />
      </div>
    </GlassCard>
  );
}
