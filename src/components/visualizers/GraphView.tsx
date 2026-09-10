"use client";

import { motion } from "framer-motion";
import type { GraphVizState } from "@/lib/algorithms/graph";
import { cn } from "@/lib/utils";

const NODE_R = 22;
const WIDTH = 360;
const HEIGHT = 300;

function circleLayout(count: number) {
  const cx = WIDTH / 2;
  const cy = HEIGHT / 2;
  const radius = Math.min(WIDTH, HEIGHT) / 2 - NODE_R - 10;
  return Array.from({ length: count }, (_, i) => {
    const angle = (2 * Math.PI * i) / count - Math.PI / 2;
    return {
      x: cx + radius * Math.cos(angle),
      y: cy + radius * Math.sin(angle),
    };
  });
}

export default function GraphView({ state }: { state: GraphVizState }) {
  const { nodes, edges, current, frontier = [], visited = [] } = state;
  const positions = circleLayout(nodes.length);
  const posById = new Map(nodes.map((n, i) => [n.id, positions[i]]));

  return (
    <div className="w-full flex flex-col items-center gap-3">
      <div className="w-full overflow-x-auto" role="img" aria-label="Graph traversal visualization">
        <svg width={WIDTH} height={HEIGHT} viewBox={`0 0 ${WIDTH} ${HEIGHT}`} className="mx-auto">
          {edges.map((e, i) => {
            const from = posById.get(e.from);
            const to = posById.get(e.to);
            if (!from || !to) return null;
            return (
              <line
                key={i}
                x1={from.x}
                y1={from.y}
                x2={to.x}
                y2={to.y}
                stroke="var(--color-glass-border)"
                strokeWidth={2}
              />
            );
          })}
          {nodes.map((node) => {
            const pos = posById.get(node.id);
            if (!pos) return null;
            const isCurrent = current === node.id;
            const isFrontier = frontier.includes(node.id);
            const isVisited = visited.includes(node.id);
            const colorClass = isCurrent
              ? "text-cyan"
              : isFrontier
                ? "text-cyan/70"
                : isVisited
                  ? "text-violet"
                  : "text-text-muted";

            return (
              <motion.g
                key={node.id}
                initial={{ opacity: 0, scale: 0.7 }}
                animate={{ opacity: 1, scale: 1 }}
                style={{ originX: `${pos.x}px`, originY: `${pos.y}px` }}
              >
                <circle
                  cx={pos.x}
                  cy={pos.y}
                  r={NODE_R}
                  className={colorClass}
                  fill="currentColor"
                  fillOpacity={isCurrent ? 0.28 : isFrontier ? 0.16 : isVisited ? 0.15 : 0.05}
                  stroke="currentColor"
                  strokeWidth={isCurrent ? 3 : 2}
                />
                <text
                  x={pos.x}
                  y={pos.y + 5}
                  textAnchor="middle"
                  className={cn("font-mono-data text-sm font-semibold", colorClass)}
                  fill="currentColor"
                >
                  {node.label}
                </text>
              </motion.g>
            );
          })}
        </svg>
      </div>

      <div className="flex flex-wrap items-center justify-center gap-4 text-[11px] font-mono-data text-text-muted">
        <span className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-cyan" /> current
        </span>
        <span className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-cyan/40" /> frontier
        </span>
        <span className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-violet" /> visited
        </span>
        <span className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-white/20" /> unvisited
        </span>
      </div>
    </div>
  );
}
