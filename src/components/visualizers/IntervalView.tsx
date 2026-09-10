"use client";

import { motion } from "framer-motion";
import type { IntervalVizState } from "@/lib/algorithms/patterns";
import { cn } from "@/lib/utils";

const ROW_H = 34;
const PADDING = 20;

export default function IntervalView({ state }: { state: IntervalVizState }) {
  const { intervals, comparing = [], merged = [], min, max } = state;
  const span = Math.max(max - min, 1);
  const width = 560;
  const usable = width - PADDING * 2;
  const scale = (v: number) => PADDING + ((v - min) / span) * usable;

  const height = intervals.length * ROW_H + 20;

  return (
    <div className="w-full overflow-x-auto" role="img" aria-label="Interval merge visualization">
      <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`} className="mx-auto">
        {/* baseline axis */}
        <line
          x1={PADDING}
          y1={height - 8}
          x2={width - PADDING}
          y2={height - 8}
          stroke="var(--color-glass-border)"
          strokeWidth={1}
        />
        {intervals.map((iv, i) => {
          const isComparing = comparing.includes(iv.id);
          const isMerged = merged.includes(iv.id);
          const colorClass = isComparing ? "text-cyan" : isMerged ? "text-violet" : "text-text-muted";
          const x1 = scale(iv.start);
          const x2 = scale(iv.end);
          const y = i * ROW_H + 16;

          return (
            <motion.g key={iv.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <motion.rect
                layout
                x={x1}
                y={y - 9}
                width={Math.max(x2 - x1, 4)}
                height={18}
                rx={9}
                className={colorClass}
                fill="currentColor"
                fillOpacity={isComparing ? 0.3 : isMerged ? 0.2 : 0.1}
                stroke="currentColor"
                strokeWidth={isComparing ? 2.5 : 1.5}
              />
              <text
                x={(x1 + x2) / 2}
                y={y + 4}
                textAnchor="middle"
                className={cn("font-mono-data text-[10px] font-semibold", colorClass)}
                fill="currentColor"
              >
                [{iv.start}, {iv.end}]
              </text>
            </motion.g>
          );
        })}
      </svg>
    </div>
  );
}
