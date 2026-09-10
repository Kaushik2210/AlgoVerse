"use client";

import { motion } from "framer-motion";
import type { BloomFilterVizState } from "@/lib/algorithms/bloomFilter";
import { cn } from "@/lib/utils";

const HASH_COLORS = ["#00f0ff", "#a855f7", "#ffb020"];

export default function BloomFilterView({ state }: { state: BloomFilterVizState }) {
  const { bits, activeIndices = [], hashLabels = [], itemLabel, mode, allSet, isFalsePositive } = state;

  return (
    <div className="w-full flex flex-col gap-4" role="img" aria-label="Bloom filter visualization">
      <div>
        <p className="text-[10px] font-mono-data uppercase tracking-wide text-text-muted mb-2">
          Bit array (size {bits.length})
        </p>
        <div className="flex flex-wrap gap-1.5">
          {bits.map((bit, i) => {
            const activePos = activeIndices.indexOf(i);
            const isActive = activePos !== -1;
            const color = isActive ? HASH_COLORS[activePos % HASH_COLORS.length] : undefined;
            return (
              <motion.div
                key={i}
                layout
                animate={{ scale: isActive ? 1.12 : 1 }}
                className={cn(
                  "w-8 h-8 rounded-md border-2 flex flex-col items-center justify-center font-mono-data text-[11px] font-semibold",
                  !isActive && bit && "bg-violet/15 border-violet/60 text-violet",
                  !isActive && !bit && "bg-white/5 border-glass-border-token text-text-muted"
                )}
                style={
                  isActive
                    ? {
                        backgroundColor: `${color}33`,
                        borderColor: color,
                        color,
                        boxShadow: `0 0 10px ${color}55`,
                      }
                    : undefined
                }
              >
                <span>{bit ? 1 : 0}</span>
              </motion.div>
            );
          })}
        </div>
        <div className="flex flex-wrap gap-x-1.5 gap-y-0.5 mt-1">
          {bits.map((_, i) => (
            <span key={i} className="w-8 text-center text-[9px] font-mono-data text-text-muted">
              {i}
            </span>
          ))}
        </div>
      </div>

      {hashLabels.length > 0 && (
        <div className="border-t border-glass-border-token pt-3 flex flex-col gap-1">
          <p className="text-[10px] font-mono-data uppercase tracking-wide text-text-muted mb-1">
            Hash function results for &quot;{itemLabel}&quot;
          </p>
          {hashLabels.map((label, i) => (
            <div key={i} className="flex items-center gap-2 font-mono-data text-xs">
              <span
                className="w-2.5 h-2.5 rounded-full shrink-0"
                style={{ backgroundColor: HASH_COLORS[i % HASH_COLORS.length] }}
              />
              <span className="text-foreground/90">{label}</span>
            </div>
          ))}
        </div>
      )}

      {mode === "lookup" && allSet !== undefined && (
        <div
          className={cn(
            "border-t border-glass-border-token pt-3 font-mono-data text-xs",
            isFalsePositive ? "text-amber" : allSet ? "text-cyan" : "text-text-muted"
          )}
        >
          {!allSet && <span>result: definitely NOT a member (a bit was 0)</span>}
          {allSet && !isFalsePositive && <span>result: possibly a member (and it really was inserted)</span>}
          {isFalsePositive && (
            <span className="glow-amber">
              result: possibly a member — but this is a FALSE POSITIVE, &quot;{itemLabel}&quot; was never inserted
            </span>
          )}
        </div>
      )}
    </div>
  );
}
