"use client";

import { motion } from "framer-motion";
import type { FenwickVizState } from "@/lib/algorithms/fenwickTree";
import { lowbit } from "@/lib/algorithms/fenwickTree";
import { cn } from "@/lib/utils";

/** Cell state derived from where index i sits in the current jump path. */
type CellState = "current" | "visited" | "idle";

function cellState(index: number, state: FenwickVizState): CellState {
  if (state.current === index) return "current";
  if (state.path.includes(index)) return "visited";
  return "idle";
}

export default function FenwickTreeView({ state }: { state: FenwickVizState }) {
  const { tree, array, path, result, delta, current } = state;

  return (
    <div className="w-full flex flex-col gap-5" role="img" aria-label="Fenwick tree visualization">
      {/* Implicit tree array (1-indexed), each cell shows its responsibility range */}
      <div>
        <p className="text-[10px] font-mono-data uppercase tracking-wide text-text-muted mb-2">
          Fenwick array (1-indexed) — cell width = lowbit(i) responsibility range
        </p>
        <div className="flex items-end gap-1.5 overflow-x-auto pb-1">
          {tree.slice(1).map((value, zi) => {
            const i = zi + 1;
            const cs = cellState(i, state);
            const rangeStart = i - lowbit(i) + 1;
            return (
              <motion.div key={i} layout className="flex flex-col items-center gap-1 shrink-0">
                <span className="text-[9px] font-mono-data text-text-muted">
                  [{rangeStart},{i}]
                </span>
                <motion.div
                  layout
                  animate={{ scale: cs === "current" ? 1.08 : 1 }}
                  className={cn(
                    "min-w-11 h-11 px-1 rounded-lg border-2 flex items-center justify-center font-mono-data text-xs font-semibold",
                    cs === "current"
                      ? "bg-cyan/20 border-cyan text-cyan glow-cyan"
                      : cs === "visited"
                        ? "bg-violet/15 border-violet/60 text-violet"
                        : "bg-white/5 border-glass-border-token text-foreground"
                  )}
                >
                  {value}
                </motion.div>
                <span className="text-[10px] text-text-muted font-mono-data">{i}</span>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Index-jump sequence for this operation */}
      <div className="border-t border-glass-border-token pt-3">
        <p className="text-[10px] font-mono-data uppercase tracking-wide text-text-muted mb-2">
          Index jump sequence (i {"±"} lowbit(i))
        </p>
        {path.length === 0 ? (
          <p className="text-sm text-text-muted">No jumps yet.</p>
        ) : (
          <div className="flex items-center gap-2 flex-wrap">
            {path.map((idx, i) => (
              <div key={i} className="flex items-center gap-2">
                <div
                  className={cn(
                    "flex h-9 w-9 items-center justify-center rounded-md border-2 font-mono-data text-xs font-semibold",
                    idx === current
                      ? "bg-cyan/20 border-cyan text-cyan glow-cyan"
                      : "bg-amber/15 border-amber/60 text-amber"
                  )}
                >
                  {idx}
                </div>
                {i < path.length - 1 && <span className="text-text-muted text-xs font-mono-data">→</span>}
              </div>
            ))}
          </div>
        )}
        <div className="flex flex-wrap gap-x-6 gap-y-1 mt-3 font-mono-data text-xs">
          {result !== undefined && (
            <span className="text-text-muted">
              running total <span className="text-cyan font-semibold">{result}</span>
            </span>
          )}
          {delta !== undefined && (
            <span className="text-text-muted">
              delta <span className="text-amber font-semibold">{delta >= 0 ? `+${delta}` : delta}</span>
            </span>
          )}
          {current !== undefined && (
            <span className="text-text-muted">
              lowbit({current}) = <span className="text-violet font-semibold">{lowbit(current)}</span>
            </span>
          )}
        </div>
      </div>

      {/* Backing array, same indices the tree was built over */}
      <div className="border-t border-glass-border-token pt-3">
        <p className="text-[10px] font-mono-data uppercase tracking-wide text-text-muted mb-2">
          Original array (0-indexed)
        </p>
        <div className="flex items-center gap-1.5 overflow-x-auto">
          {array.map((value, i) => {
            const isTarget = state.targetIndex === i && delta !== undefined;
            const isInQueryRange =
              state.targetIndex !== undefined && delta === undefined && i < state.targetIndex;
            return (
              <div key={i} className="flex flex-col items-center gap-1">
                <div
                  className={cn(
                    "w-9 h-9 rounded-lg border-2 flex items-center justify-center font-mono-data text-xs font-semibold",
                    isTarget
                      ? "bg-amber/20 border-amber text-amber"
                      : isInQueryRange
                        ? "bg-cyan/10 border-cyan/40 text-cyan"
                        : "bg-white/5 border-glass-border-token text-foreground"
                  )}
                >
                  {value}
                </div>
                <span className="text-[10px] text-text-muted font-mono-data">{i}</span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
