"use client";

import { motion } from "framer-motion";
import type { RBNode, RBVizState } from "@/lib/algorithms/redBlack";
import { cn } from "@/lib/utils";

interface PositionedNode {
  node: RBNode;
  x: number;
  y: number;
}

const NODE_R = 20;
const LEVEL_H = 68;

function layout(root: RBNode | null): { positioned: PositionedNode[]; width: number; height: number } {
  const positioned: PositionedNode[] = [];
  let counter = 0;
  let maxDepth = 0;

  function walk(node: RBNode | null, depth: number) {
    if (!node) return;
    walk(node.left, depth + 1);
    const x = counter * 60 + 40;
    counter++;
    positioned.push({ node, x, y: depth * LEVEL_H + 30 });
    maxDepth = Math.max(maxDepth, depth);
    walk(node.right, depth + 1);
  }
  walk(root, 0);

  const width = Math.max(counter * 60 + 20, 200);
  const height = (maxDepth + 1) * LEVEL_H + 20;
  return { positioned, width, height };
}

export default function RedBlackTreeView({ state }: { state: RBVizState }) {
  const { root, current, visited = [], found, fixing = [] } = state;
  const { positioned, width, height } = layout(root);
  const posById = new Map(positioned.map((p) => [p.node.id, p]));

  if (!root) {
    return <p className="text-sm text-text-muted">Tree is empty.</p>;
  }

  const edges: { from: PositionedNode; to: PositionedNode }[] = [];
  for (const p of positioned) {
    if (p.node.left) {
      const child = posById.get(p.node.left.id);
      if (child) edges.push({ from: p, to: child });
    }
    if (p.node.right) {
      const child = posById.get(p.node.right.id);
      if (child) edges.push({ from: p, to: child });
    }
  }

  return (
    <div className="w-full overflow-x-auto" role="img" aria-label="Red-black tree visualization">
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
        {positioned.map(({ node, x, y }) => {
          const isCurrent = current === node.id;
          const isVisited = visited.includes(node.id);
          const isFound = found === node.id;
          const isFixing = fixing.includes(node.id);
          // Node fill/border encode the RB color itself, not pointer state.
          const fillColor = node.color === "red" ? "rgba(239,68,68,0.22)" : "rgba(255,255,255,0.08)";
          const strokeColor = node.color === "red" ? "#ef4444" : "#e5e7eb";
          // Active/visited/target/fixing states are layered as an outer ring.
          const ringColor = isFound
            ? "#ffb020"
            : isFixing
              ? "#ffb020"
              : isCurrent
                ? "#00f0ff"
                : isVisited
                  ? "#a855f7"
                  : null;

          return (
            <motion.g
              key={node.id}
              layout
              initial={{ opacity: 0, scale: 0.7 }}
              animate={{ opacity: 1, scale: 1, x, y }}
              transition={{ type: "spring", stiffness: 260, damping: 24 }}
            >
              {ringColor && (
                <circle cx={0} cy={0} r={NODE_R + 5} fill="none" stroke={ringColor} strokeWidth={2} strokeDasharray={isFixing ? "3 3" : undefined} />
              )}
              <circle cx={0} cy={0} r={NODE_R} fill={fillColor} stroke={strokeColor} strokeWidth={2} />
              <text
                x={0}
                y={4}
                textAnchor="middle"
                className={cn(
                  "font-mono-data text-[11px] font-semibold",
                  node.color === "red" ? "fill-red-400" : "fill-foreground"
                )}
              >
                {node.value}
              </text>
            </motion.g>
          );
        })}
      </svg>
      <div className="flex items-center gap-4 mt-2 justify-center text-[10px] font-mono-data text-text-muted">
        <span className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full border-2 border-[#ef4444] bg-[#ef4444]/20" /> red
        </span>
        <span className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full border-2 border-[#e5e7eb] bg-white/10" /> black
        </span>
      </div>
    </div>
  );
}
