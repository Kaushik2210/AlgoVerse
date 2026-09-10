"use client";

import { motion } from "framer-motion";
import type { BSTNode, BSTVizState } from "@/lib/algorithms/bst";
import { cn } from "@/lib/utils";

interface PositionedNode {
  node: BSTNode;
  x: number;
  y: number;
}

const NODE_R = 20;
const LEVEL_H = 64;

function layout(root: BSTNode | null): { positioned: PositionedNode[]; width: number; height: number } {
  const positioned: PositionedNode[] = [];
  let counter = 0;
  let maxDepth = 0;

  function walk(node: BSTNode | null, depth: number) {
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

export default function BSTView({ state }: { state: BSTVizState }) {
  const { root, current, visited = [], found } = state;
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
    <div className="w-full overflow-x-auto" role="img" aria-label="Binary search tree visualization">
      <svg
        width={width}
        height={height}
        viewBox={`0 0 ${width} ${height}`}
        className="mx-auto"
      >
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
          const fill = isFound
            ? "rgba(255,176,32,0.25)"
            : isCurrent
              ? "rgba(0,240,255,0.2)"
              : isVisited
                ? "rgba(168,85,247,0.15)"
                : "rgba(255,255,255,0.05)";
          const stroke = isFound
            ? "#ffb020"
            : isCurrent
              ? "#00f0ff"
              : isVisited
                ? "#a855f7"
                : "var(--color-glass-border)";

          return (
            <motion.g
              key={node.id}
              initial={{ opacity: 0, scale: 0.7 }}
              animate={{ opacity: 1, scale: 1 }}
              style={{ originX: `${x}px`, originY: `${y}px` }}
            >
              <circle cx={x} cy={y} r={NODE_R} fill={fill} stroke={stroke} strokeWidth={2} />
              <text
                x={x}
                y={y + 4}
                textAnchor="middle"
                className={cn(
                  "font-mono-data text-[11px] font-semibold",
                  isFound ? "fill-amber" : isCurrent ? "fill-cyan" : isVisited ? "fill-violet" : "fill-foreground"
                )}
              >
                {node.value}
              </text>
            </motion.g>
          );
        })}
      </svg>
    </div>
  );
}
