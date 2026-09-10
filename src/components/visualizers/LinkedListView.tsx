"use client";

import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight } from "lucide-react";
import type { LinkedListVizState } from "@/lib/algorithms/linkedList";
import { cn } from "@/lib/utils";

export default function LinkedListView({ state }: { state: LinkedListVizState }) {
  const { nodes, pointer, visited = [], found, removing, slow, fast } = state;
  const hasRaceMarkers = slow !== undefined || fast !== undefined;

  return (
    <div
      className="w-full flex items-center justify-center flex-wrap gap-1 py-6"
      role="img"
      aria-label="Linked list visualization"
    >
      <span className="text-[10px] font-mono-data text-text-muted mr-2">head →</span>
      <AnimatePresence mode="popLayout">
        {nodes.map((node, i) => {
          const isPointer = pointer === i;
          const isVisited = visited.includes(i);
          const isFound = found === i;
          const isRemoving = removing === i;
          const isSlow = slow === i;
          const isFast = fast === i;

          return (
            <motion.div
              key={node.id}
              layout
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: isRemoving ? 0.3 : 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.6 }}
              transition={{ type: "spring", stiffness: 300, damping: 24 }}
              className="flex flex-col items-center"
            >
              {hasRaceMarkers && (
                <div className="flex h-4 items-center gap-1 mb-0.5">
                  {isSlow && (
                    <span className="text-[9px] font-mono-data text-cyan">slow</span>
                  )}
                  {isFast && (
                    <span className="text-[9px] font-mono-data text-amber">fast</span>
                  )}
                </div>
              )}
              <div className="flex items-center">
                <div
                  className={cn(
                    "flex h-12 w-12 items-center justify-center rounded-lg border-2 font-mono-data text-sm font-semibold",
                    isFound
                      ? "bg-amber/25 border-amber text-amber glow-amber"
                      : isFast
                        ? "bg-amber/20 border-amber text-amber glow-amber"
                        : isSlow
                          ? "bg-cyan/20 border-cyan text-cyan glow-cyan"
                          : isPointer
                            ? "bg-cyan/20 border-cyan text-cyan glow-cyan"
                            : isVisited
                              ? "bg-violet/15 border-violet/60 text-violet"
                              : "bg-white/5 border-glass-border-token text-foreground"
                  )}
                >
                  {node.value}
                </div>
                {i < nodes.length - 1 && (
                  <ArrowRight size={16} className="mx-1 text-text-muted shrink-0" />
                )}
              </div>
            </motion.div>
          );
        })}
      </AnimatePresence>
      <span className="text-[10px] font-mono-data text-text-muted ml-2">→ null</span>
    </div>
  );
}
