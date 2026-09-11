"use client";

import { motion } from "framer-motion";
import type { DPVizState } from "@/lib/algorithms/dp";
import { cn } from "@/lib/utils";

/**
 * Renders any DP table (1D or 2D — 1D is just rows=1) with the current
 * cell highlighted and its dependency cell(s) called out, so the "this
 * cell reads from these earlier cells" relationship is visible at every
 * step instead of just watching numbers appear.
 */
export default function DPTableView({ state }: { state: DPVizState }) {
  const { rows, cols, rowLabels, colLabels, grid, current, deps = [], resultCell } = state;

  const isDep = (i: number, j: number) => deps.some(([di, dj]) => di === i && dj === j);
  const isCurrent = (i: number, j: number) => !!current && current[0] === i && current[1] === j;
  const isResult = (i: number, j: number) =>
    !!resultCell && resultCell[0] === i && resultCell[1] === j;

  return (
    <div className="w-full flex flex-col items-center gap-3">
      <div className="w-full overflow-x-auto">
        <table className="mx-auto border-separate" style={{ borderSpacing: 4 }}>
          <thead>
            <tr>
              <th className="w-8 h-8" />
              {colLabels.map((label, j) => (
                <th
                  key={j}
                  className="font-mono-data text-xs font-semibold text-center px-1 text-text-muted min-w-8"
                >
                  {label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {Array.from({ length: rows }, (_, i) => (
              <tr key={i}>
                <th className="font-mono-data text-xs font-semibold text-right pr-2 text-text-muted">
                  {rowLabels[i]}
                </th>
                {Array.from({ length: cols }, (_, j) => {
                  const value = grid[i]?.[j] ?? null;
                  const currentCell = isCurrent(i, j);
                  const depCell = isDep(i, j);
                  const resultCellHit = isResult(i, j);

                  return (
                    <motion.td
                      key={j}
                      animate={currentCell ? { scale: [1, 1.15, 1] } : { scale: 1 }}
                      transition={{ duration: 0.3 }}
                      className={cn(
                        "min-w-9 h-9 text-center font-mono-data text-xs rounded-md border-2",
                        resultCellHit
                          ? "bg-amber/25 border-amber text-amber glow-amber"
                          : currentCell
                            ? "bg-cyan/20 border-cyan text-cyan glow-cyan"
                            : depCell
                              ? "bg-violet/15 border-violet/60 text-violet"
                              : value !== null
                                ? "bg-white/5 border-glass-border-token text-foreground/80"
                                : "bg-transparent border-glass-border-token/50 text-text-muted/40"
                      )}
                    >
                      {value === null ? "·" : value}
                    </motion.td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex flex-wrap items-center justify-center gap-4 text-[11px] font-mono-data text-text-muted">
        <span className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-cyan" /> computing now
        </span>
        <span className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-violet" /> depends on
        </span>
        <span className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-amber" /> final answer
        </span>
      </div>
    </div>
  );
}
