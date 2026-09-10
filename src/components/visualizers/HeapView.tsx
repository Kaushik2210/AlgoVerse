"use client";

import { motion } from "framer-motion";
import type { HeapVizState } from "@/lib/algorithms/heap";
import { cn } from "@/lib/utils";

const NODE_R = 20;
const LEVEL_H = 64;

interface TreePos {
  index: number;
  x: number;
  y: number;
}

function treeLayout(array: number[]): { positions: TreePos[]; width: number; height: number } {
  if (array.length === 0) return { positions: [], width: 200, height: 80 };
  const depth = Math.floor(Math.log2(array.length));
  const width = Math.max((1 << depth) * 56 + 40, 200);
  const positions: TreePos[] = array.map((_, i) => {
    const level = Math.floor(Math.log2(i + 1));
    const indexInLevel = i + 1 - (1 << level);
    const slots = 1 << level;
    const slotWidth = width / slots;
    const x = slotWidth * indexInLevel + slotWidth / 2;
    const y = level * LEVEL_H + 30;
    return { index: i, x, y };
  });
  const height = (depth + 1) * LEVEL_H + 20;
  return { positions, width, height };
}

type CellState = "swapping" | "comparing" | "target" | "settled" | "idle";

function cellState(
  i: number,
  { comparing = [], swapping = [], settled, target }: HeapVizState
): CellState {
  if (swapping.includes(i)) return "swapping";
  if (comparing.includes(i)) return "comparing";
  if (target === i) return "target";
  if (settled === i) return "settled";
  return "idle";
}

/** classes for the flat div-based array cells */
const DIV_CLASSES: Record<CellState, string> = {
  swapping: "bg-cyan/25 border-cyan text-cyan glow-cyan",
  comparing: "bg-cyan/15 border-cyan/70 text-cyan",
  target: "bg-amber/20 border-amber text-amber",
  settled: "bg-violet/15 border-violet/60 text-violet",
  idle: "bg-white/5 border-glass-border-token text-foreground",
};

/** currentColor-driven text classes for SVG circle/text (fill uses currentColor) */
const SVG_CLASSES: Record<CellState, string> = {
  swapping: "text-cyan",
  comparing: "text-cyan",
  target: "text-amber",
  settled: "text-violet",
  idle: "text-text-muted",
};

export default function HeapView({ state }: { state: HeapVizState }) {
  const { array } = state;
  const { positions, width, height } = treeLayout(array);
  const edges: { from: TreePos; to: TreePos }[] = [];
  for (const p of positions) {
    const l = p.index * 2 + 1;
    const r = p.index * 2 + 2;
    if (l < positions.length) edges.push({ from: p, to: positions[l] });
    if (r < positions.length) edges.push({ from: p, to: positions[r] });
  }

  return (
    <div className="w-full flex flex-col gap-5">
      {/* Tree representation */}
      <div>
        <p className="text-[10px] font-mono-data uppercase tracking-wide text-text-muted mb-1">
          Tree view
        </p>
        {array.length === 0 ? (
          <p className="text-sm text-text-muted">Heap is empty.</p>
        ) : (
          <div className="w-full overflow-x-auto" role="img" aria-label="Heap tree visualization">
            <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`} className="mx-auto">
              {edges.map((e, i) => (
                <line
                  key={i}
                  x1={e.from.x}
                  y1={e.from.y}
                  x2={e.to.x}
                  y2={e.to.y}
                  stroke="var(--color-glass-border)"
                  strokeWidth={2}
                />
              ))}
              {positions.map(({ index, x, y }) => {
                const svgClass = SVG_CLASSES[cellState(index, state)];
                return (
                  <motion.g
                    key={index}
                    initial={{ opacity: 0, scale: 0.7 }}
                    animate={{ opacity: 1, scale: 1 }}
                    style={{ originX: `${x}px`, originY: `${y}px` }}
                  >
                    <circle
                      cx={x}
                      cy={y}
                      r={NODE_R}
                      className={svgClass}
                      fill="currentColor"
                      fillOpacity={0.15}
                      stroke="currentColor"
                      strokeWidth={2}
                    />
                    <text
                      x={x}
                      y={y + 4}
                      textAnchor="middle"
                      className={cn("font-mono-data text-[11px] font-semibold", svgClass)}
                      fill="currentColor"
                    >
                      {array[index]}
                    </text>
                  </motion.g>
                );
              })}
            </svg>
          </div>
        )}
      </div>

      {/* Array representation, kept in sync with the same indices */}
      <div className="border-t border-glass-border-token pt-3">
        <p className="text-[10px] font-mono-data uppercase tracking-wide text-text-muted mb-2">
          Array view (same underlying data)
        </p>
        <div className="w-full flex items-center gap-1.5 overflow-x-auto" role="img" aria-label="Heap array visualization">
          {array.length === 0 && <p className="text-sm text-text-muted">Empty.</p>}
          {array.map((value, i) => (
            <motion.div key={i} layout className="flex flex-col items-center gap-1">
              <motion.div
                layout
                className={cn(
                  "w-10 h-10 rounded-lg border-2 flex items-center justify-center font-mono-data text-xs font-semibold",
                  DIV_CLASSES[cellState(i, state)]
                )}
              >
                {value}
              </motion.div>
              <span className="text-[10px] text-text-muted font-mono-data">{i}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
