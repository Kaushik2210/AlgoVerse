"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { HEAD, type SkipListVizState } from "@/lib/algorithms/skipList";
import { cn } from "@/lib/utils";

type NodeState = "found" | "current" | "path" | "idle";

function nodeState(id: string, state: SkipListVizState, level: number): NodeState {
  const { current, path, found } = state;
  if (found && current?.nodeId === id && current.level === level) return "found";
  if (current?.nodeId === id && current.level === level) return "current";
  if (path.some((p) => p.nodeId === id && p.level === level)) return "path";
  return "idle";
}

export default function SkipListView({ state }: { state: SkipListVizState }) {
  const { levels, maxLevel, insertedId } = state;

  return (
    <div className="w-full flex flex-col gap-3 py-2" role="img" aria-label="Skip list visualization">
      {Array.from({ length: maxLevel }, (_, i) => maxLevel - 1 - i).map((level) => {
        const nodesAtLevel = levels[level];
        const headState = nodeState(HEAD, state, level);
        return (
          <div key={level} className="flex items-center gap-2">
            <span className="w-14 shrink-0 text-[10px] font-mono-data text-text-muted uppercase tracking-wide">
              L{level}
            </span>
            <div className="flex items-center gap-1.5 flex-wrap">
              <div
                className={cn(
                  "flex h-9 items-center justify-center rounded-md border-2 px-2.5 font-mono-data text-[10px] font-semibold",
                  headState === "current" || headState === "path"
                    ? "bg-cyan/20 border-cyan text-cyan glow-cyan"
                    : "bg-white/5 border-glass-border-token text-text-muted"
                )}
              >
                head
              </div>
              <ArrowRight size={14} className="text-text-muted shrink-0" />
              {nodesAtLevel.length === 0 && (
                <span className="text-[10px] font-mono-data text-text-muted">null</span>
              )}
              {nodesAtLevel.map((node, i) => {
                const ns = nodeState(node.id, state, level);
                const isNew = insertedId === node.id;
                return (
                  <div key={node.id} className="flex items-center gap-1.5">
                    <motion.div
                      layout
                      initial={{ opacity: 0, scale: 0.7 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ type: "spring", stiffness: 300, damping: 24 }}
                      className={cn(
                        "flex h-9 min-w-9 items-center justify-center rounded-md border-2 px-2 font-mono-data text-xs font-semibold",
                        ns === "found"
                          ? "bg-amber/25 border-amber text-amber glow-amber"
                          : ns === "current"
                            ? "bg-cyan/20 border-cyan text-cyan glow-cyan"
                            : ns === "path"
                              ? "bg-violet/15 border-violet/60 text-violet"
                              : isNew
                                ? "bg-amber/10 border-amber/50 text-amber"
                                : "bg-white/5 border-glass-border-token text-foreground"
                      )}
                    >
                      {node.value}
                    </motion.div>
                    {i < nodesAtLevel.length - 1 && (
                      <ArrowRight size={14} className="text-text-muted shrink-0" />
                    )}
                  </div>
                );
              })}
              {nodesAtLevel.length > 0 && (
                <>
                  <ArrowRight size={14} className="text-text-muted shrink-0" />
                  <span className="text-[10px] font-mono-data text-text-muted">null</span>
                </>
              )}
            </div>
          </div>
        );
      })}

      {state.target !== undefined && (
        <div className="border-t border-glass-border-token pt-2 mt-1 font-mono-data text-xs text-text-muted">
          target <span className="text-amber font-semibold">{state.target}</span>
          {state.found !== undefined && (
            <span className={cn("ml-3", state.found ? "text-amber" : "text-text-muted")}>
              {state.found ? "found" : "not found"}
            </span>
          )}
        </div>
      )}
    </div>
  );
}
