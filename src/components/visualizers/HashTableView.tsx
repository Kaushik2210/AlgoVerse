"use client";

import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight } from "lucide-react";
import type { HashTableVizState } from "@/lib/algorithms/hashTable";
import { cn } from "@/lib/utils";

export default function HashTableView({ state }: { state: HashTableVizState }) {
  const { buckets, size, numBuckets, loadFactor, activeBucket, activeEntry, hashLabel, justResized } = state;

  return (
    <div
      className="w-full flex flex-col gap-3 py-2"
      role="img"
      aria-label="Hash table visualization"
    >
      <div className="flex flex-wrap items-center justify-between gap-2 px-1">
        {hashLabel && (
          <span className="font-mono-data text-xs text-cyan">{hashLabel}</span>
        )}
        <span
          className={cn(
            "ml-auto font-mono-data text-xs",
            loadFactor > 0.75 ? "text-amber" : "text-text-muted"
          )}
        >
          load factor {loadFactor.toFixed(2)} ({size}/{numBuckets})
        </span>
      </div>

      {justResized && (
        <motion.div
          initial={{ opacity: 0, y: -6 }}
          animate={{ opacity: 1, y: 0 }}
          className="self-start text-[11px] font-mono-data text-amber glow-amber rounded-full border border-amber/40 bg-amber/10 px-2.5 py-1"
        >
          resized + rehashed
        </motion.div>
      )}

      <div className="flex flex-col gap-1.5 max-h-64 overflow-y-auto pr-1">
        {buckets.map((chain, bi) => {
          const isActiveBucket = activeBucket === bi;
          return (
            <div key={bi} className="flex items-center gap-2">
              <div
                className={cn(
                  "flex h-8 w-8 shrink-0 items-center justify-center rounded-md border-2 font-mono-data text-[11px] font-semibold",
                  isActiveBucket
                    ? "bg-cyan/20 border-cyan text-cyan glow-cyan"
                    : "bg-white/5 border-glass-border-token text-text-muted"
                )}
              >
                {bi}
              </div>
              <div className="flex items-center gap-1 flex-wrap min-h-8">
                <AnimatePresence mode="popLayout">
                  {chain.map((entry) => {
                    const isEntry = activeEntry === entry.id;
                    return (
                      <motion.div
                        key={entry.id}
                        layout
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.6 }}
                        transition={{ type: "spring", stiffness: 320, damping: 26 }}
                        className="flex items-center gap-1"
                      >
                        <div
                          className={cn(
                            "flex h-8 items-center justify-center rounded-md border-2 px-2.5 font-mono-data text-[11px] font-semibold",
                            isEntry
                              ? "bg-amber/25 border-amber text-amber glow-amber"
                              : "bg-violet/15 border-violet/60 text-violet"
                          )}
                        >
                          {entry.key}
                        </div>
                        <ArrowRight size={12} className="text-text-muted shrink-0" />
                      </motion.div>
                    );
                  })}
                </AnimatePresence>
                <span className="text-[10px] text-text-muted font-mono-data">null</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
