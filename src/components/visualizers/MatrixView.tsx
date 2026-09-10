"use client";

import { motion } from "framer-motion";
import type { FloydWarshallVizState } from "@/lib/algorithms/floydWarshall";
import { cn } from "@/lib/utils";

export default function MatrixView({ state }: { state: FloydWarshallVizState }) {
  const { nodes, dist, k, i: activeI, j: activeJ, changed } = state;

  return (
    <div className="w-full flex flex-col items-center gap-3">
      <div className="w-full overflow-x-auto">
        <table className="mx-auto border-separate" style={{ borderSpacing: 4 }}>
          <thead>
            <tr>
              <th className="w-8 h-8" />
              {nodes.map((n, j) => (
                <th
                  key={n.id}
                  className={cn(
                    "font-mono-data text-xs font-semibold text-center px-1",
                    j === k ? "text-amber" : "text-text-muted"
                  )}
                >
                  {n.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {nodes.map((rowNode, i) => (
              <tr key={rowNode.id}>
                <th
                  className={cn(
                    "font-mono-data text-xs font-semibold text-right pr-2",
                    i === k ? "text-amber" : "text-text-muted"
                  )}
                >
                  {rowNode.label}
                </th>
                {nodes.map((colNode, j) => {
                  const value = dist[i]?.[j] ?? null;
                  const isActiveCell = i === activeI && j === activeJ;
                  const isChanged = changed && changed[0] === i && changed[1] === j;
                  const isPivotRowOrCol = i === k || j === k;
                  const isDiagonal = i === j;

                  return (
                    <motion.td
                      key={colNode.id}
                      animate={isChanged ? { scale: [1, 1.15, 1] } : { scale: 1 }}
                      transition={{ duration: 0.35 }}
                      className={cn(
                        "w-10 h-9 text-center font-mono-data text-xs rounded-md border-2",
                        isActiveCell
                          ? "bg-cyan/20 border-cyan text-cyan glow-cyan"
                          : isChanged
                            ? "bg-amber/20 border-amber text-amber"
                            : isPivotRowOrCol
                              ? "bg-violet/10 border-violet/40 text-violet"
                              : isDiagonal
                                ? "bg-white/5 border-glass-border-token text-text-muted"
                                : "bg-white/5 border-glass-border-token text-foreground/80"
                      )}
                    >
                      {value === null ? "∞" : value}
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
          <span className="w-2.5 h-2.5 rounded-full bg-cyan" /> checking (i, j)
        </span>
        <span className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-violet" /> pivot row/col (k)
        </span>
        <span className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-amber" /> just updated
        </span>
      </div>
    </div>
  );
}
