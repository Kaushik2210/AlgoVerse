"use client";

import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight } from "lucide-react";
import type { LRUVizState } from "@/lib/algorithms/lruCache";
import { cn } from "@/lib/utils";

export default function LRUCacheView({ state }: { state: LRUVizState }) {
  const { capacity, order, map, current, evicted, opLabel } = state;
  const entries = Object.entries(map);

  return (
    <div className="w-full flex flex-col gap-5" role="img" aria-label="LRU cache visualization">
      {opLabel && (
        <span className="self-start font-mono-data text-xs text-cyan">{opLabel}</span>
      )}

      {/* Hash map: key -> node pointer */}
      <div>
        <p className="text-[10px] font-mono-data uppercase tracking-wide text-text-muted mb-2">
          Hash map (key {"->"} node)
        </p>
        <div className="flex flex-wrap gap-1.5">
          {entries.length === 0 && <p className="text-sm text-text-muted">Empty.</p>}
          <AnimatePresence mode="popLayout">
            {entries.map(([key, nodeId]) => {
              const isActive = current === nodeId;
              return (
                <motion.div
                  key={key}
                  layout
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.6 }}
                  transition={{ type: "spring", stiffness: 320, damping: 26 }}
                  className={cn(
                    "flex items-center gap-1.5 rounded-md border-2 px-2.5 py-1.5 font-mono-data text-[11px] font-semibold",
                    isActive
                      ? "bg-cyan/20 border-cyan text-cyan glow-cyan"
                      : "bg-violet/15 border-violet/60 text-violet"
                  )}
                >
                  <span>{key}</span>
                  <ArrowRight size={11} className="text-text-muted shrink-0" />
                  <span className="text-text-muted">{nodeId}</span>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>
      </div>

      {/* Doubly linked list: recency order, MRU at front */}
      <div className="border-t border-glass-border-token pt-3">
        <p className="text-[10px] font-mono-data uppercase tracking-wide text-text-muted mb-2">
          Recency list (MRU {"->"} LRU), capacity {capacity}
        </p>
        <div className="flex items-center flex-wrap gap-1 py-2">
          <span className="text-[10px] font-mono-data text-text-muted mr-1">MRU →</span>
          <AnimatePresence mode="popLayout">
            {order.map((node, i) => {
              const isActive = current === node.id;
              const isBack = i === order.length - 1 && order.length === capacity;
              return (
                <motion.div
                  key={node.id}
                  layout
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.6 }}
                  transition={{ type: "spring", stiffness: 300, damping: 24 }}
                  className="flex items-center"
                >
                  <div className="flex flex-col items-center gap-1">
                    {isBack && (
                      <span className="text-[9px] font-mono-data text-amber">LRU</span>
                    )}
                    <div
                      className={cn(
                        "flex h-12 min-w-14 items-center justify-center rounded-lg border-2 px-2 font-mono-data text-xs font-semibold",
                        isActive
                          ? "bg-cyan/20 border-cyan text-cyan glow-cyan"
                          : isBack
                            ? "bg-amber/10 border-amber/50 text-amber"
                            : "bg-white/5 border-glass-border-token text-foreground"
                      )}
                    >
                      {node.key}:{node.value}
                    </div>
                  </div>
                  {i < order.length - 1 && (
                    <ArrowRight size={16} className="mx-1 text-text-muted shrink-0" />
                  )}
                </motion.div>
              );
            })}
          </AnimatePresence>
          {order.length === 0 && <span className="text-sm text-text-muted">Empty.</span>}
          <span className="text-[10px] font-mono-data text-text-muted ml-2">→ LRU</span>
        </div>

        {evicted && (
          <motion.div
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-2 inline-flex items-center gap-1.5 text-[11px] font-mono-data text-amber glow-amber rounded-full border border-amber/40 bg-amber/10 px-2.5 py-1"
          >
            evicted: {evicted.key}:{evicted.value}
          </motion.div>
        )}
      </div>
    </div>
  );
}
