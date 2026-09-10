"use client";

import { motion } from "framer-motion";
import type { AVLNode, AVLVizState } from "@/lib/algorithms/avl";
import { cn } from "@/lib/utils";

interface PositionedNode {
  node: AVLNode;
  x: number;
  y: number;
}

const NODE_R = 20;
const LEVEL_H = 68;

function layout(root: AVLNode | null): { positioned: PositionedNode[]; width: number; height: number } {
  const positioned: PositionedNode[] = [];
  let counter = 0;
  let maxDepth = 0;

  function walk(node: AVLNode | null, depth: number) {
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

function height(node: AVLNode | null): number {
  return node ? node.height : 0;
}

export default function AVLTreeView({ state }: { state: AVLVizState }) {
  const { root, current, visited = [], found, rotating = [] } = state;
  const { positioned, width, height: h } = layout(root);
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
    <div className="w-full overflow-x-auto" role="img" aria-label="AVL tree visualization">
      <svg width={width} height={h} viewBox={`0 0 ${width} ${h}`} className="mx-auto">
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
          const isRotating = rotating.includes(node.id);
          const balance = height(node.left) - height(node.right);
          const fill = isFound
            ? "rgba(255,176,32,0.25)"
            : isRotating
              ? "rgba(255,176,32,0.18)"
              : isCurrent
                ? "rgba(0,240,255,0.2)"
                : isVisited
                  ? "rgba(168,85,247,0.15)"
                  : "rgba(255,255,255,0.05)";
          const stroke = isFound
            ? "#ffb020"
            : isRotating
              ? "#ffb020"
              : isCurrent
                ? "#00f0ff"
                : isVisited
                  ? "#a855f7"
                  : "var(--color-glass-border)";

          return (
            <motion.g
              key={node.id}
              layout
              initial={{ opacity: 0, scale: 0.7 }}
              animate={{ opacity: 1, scale: 1, x, y }}
              transition={{ type: "spring", stiffness: 260, damping: 24 }}
            >
              <circle cx={0} cy={0} r={NODE_R} fill={fill} stroke={stroke} strokeWidth={isRotating ? 3 : 2} />
              <text
                x={0}
                y={4}
                textAnchor="middle"
                className={cn(
                  "font-mono-data text-[11px] font-semibold",
                  isFound ? "fill-amber" : isRotating ? "fill-amber" : isCurrent ? "fill-cyan" : isVisited ? "fill-violet" : "fill-foreground"
                )}
              >
                {node.value}
              </text>
              <text
                x={0}
                y={-NODE_R - 6}
                textAnchor="middle"
                className="font-mono-data text-[9px] fill-text-muted"
              >
                bf={balance}
              </text>
            </motion.g>
          );
        })}
      </svg>
    </div>
  );
}
