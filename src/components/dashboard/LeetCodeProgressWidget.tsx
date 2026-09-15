"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Code2, ArrowUpRight } from "lucide-react";
import GlassCard from "@/components/ui/GlassCard";
import { useLeetcodeSolvedCount } from "@/lib/store/selectors";
import { leetcodeIndex } from "@/lib/leetcode-index";

/**
 * LeetCode progress widget for the dashboard. Deliberately just count +
 * percentage — the generated index (scripts/generate-leetcode-index.mjs)
 * doesn't carry difficulty or topic tags, so there's no real data to back a
 * difficulty/topic breakdown without fabricating one.
 */
export default function LeetCodeProgressWidget() {
  const solvedCount = useLeetcodeSolvedCount();
  const total = leetcodeIndex.length;
  const percent = total > 0 ? Math.round((solvedCount / total) * 100) : 0;

  return (
    <GlassCard className="flex flex-col gap-3" tilt>
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <span className="glass flex h-8 w-8 items-center justify-center rounded-lg text-cyan">
            <Code2 size={15} />
          </span>
          <h3 className="font-mono-data text-sm uppercase tracking-wider">LeetCode Progress</h3>
        </div>
        <Link
          href="/leetcode"
          className="flex items-center gap-1 text-xs font-mono-data text-text-muted hover:text-cyan transition-colors"
        >
          Browse <ArrowUpRight size={12} />
        </Link>
      </div>

      <div className="flex items-baseline gap-2">
        <span className="font-mono-data text-3xl font-bold text-cyan">{solvedCount}</span>
        <span className="text-sm text-text-muted">/ {total} solved</span>
        <span className="ml-auto text-xs text-text-muted font-mono-data">{percent}%</span>
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
