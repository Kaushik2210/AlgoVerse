"use client";

import { motion } from "framer-motion";
import type { ArrayVizState } from "@/lib/algorithms/arrays";
import { cn } from "@/lib/utils";

export default function ArrayBars({ state }: { state: ArrayVizState }) {
  const { array, comparing = [], swapping = [], sorted = [], pivot, found, range } = state;
  const max = Math.max(...array, 1);

  return (
    <div className="w-full flex items-end justify-center gap-1.5 h-52" role="img" aria-label="Array visualization">
      {array.map((value, i) => {
        const inRange = !range || (i >= range[0] && i <= range[1]);
        const isComparing = comparing.includes(i);
        const isSwapping = swapping.includes(i);
        const isSorted = sorted.includes(i);
        const isPivot = pivot === i;
        const isFound = found === i;

        return (
          <motion.div
            key={i}
            layout
            transition={{ type: "spring", stiffness: 300, damping: 26 }}
            className="flex flex-col items-center gap-1.5"
            style={{ opacity: inRange ? 1 : 0.25 }}
          >
            <motion.div
              layout
              className={cn(
                "w-8 rounded-t-md border-2 flex items-start justify-center pt-1 font-mono-data text-[11px] font-semibold",
                isFound
                  ? "bg-amber/25 border-amber text-amber glow-amber"
                  : isPivot
                    ? "bg-amber/15 border-amber/70 text-amber"
                    : isSwapping || isComparing
                      ? "bg-cyan/20 border-cyan text-cyan glow-cyan"
                      : isSorted
                        ? "bg-violet/15 border-violet/60 text-violet"
                        : "bg-white/5 border-glass-border-token text-text-muted"
              )}
              style={{ height: `${(value / max) * 160 + 24}px` }}
            >
              {value}
            </motion.div>
            <span className="text-[10px] text-text-muted font-mono-data">{i}</span>
          </motion.div>
        );
      })}
    </div>
  );
}
