"use client";

import { motion } from "framer-motion";
import type { TrieNode, TrieVizState } from "@/lib/algorithms/trie";
import { cn } from "@/lib/utils";

interface PositionedNode {
  node: TrieNode;
  x: number;
  y: number;
}

const NODE_R = 18;
const LEVEL_H = 60;
const LEAF_GAP = 46;

function layout(root: TrieNode): { positioned: PositionedNode[]; edges: { from: PositionedNode; to: PositionedNode }[]; width: number; height: number } {
  const positioned: PositionedNode[] = [];
  let counter = 0;
  let maxDepth = 0;

  function walk(node: TrieNode, depth: number): number {
    const keys = Object.keys(node.children).sort();
    if (keys.length === 0) {
      const x = counter * LEAF_GAP + 30;
      counter++;
      positioned.push({ node, x, y: depth * LEVEL_H + 30 });
      maxDepth = Math.max(maxDepth, depth);
      return x;
    }
    const childXs = keys.map((k) => walk(node.children[k], depth + 1));
    const x = childXs.reduce((a, b) => a + b, 0) / childXs.length;
    positioned.push({ node, x, y: depth * LEVEL_H + 30 });
    maxDepth = Math.max(maxDepth, depth);
    return x;
  }
  walk(root, 0);

  const posById = new Map(positioned.map((p) => [p.node.id, p]));
  const edges: { from: PositionedNode; to: PositionedNode }[] = [];
  for (const p of positioned) {
    for (const child of Object.values(p.node.children)) {
      const c = posById.get(child.id);
      if (c) edges.push({ from: p, to: c });
    }
  }

  const width = Math.max(counter * LEAF_GAP + 20, 200);
  const height = (maxDepth + 1) * LEVEL_H + 20;
  return { positioned, edges, width, height };
}

export default function TrieView({ state }: { state: TrieVizState }) {
  const { root, current, path = [] } = state;
  const { positioned, edges, width, height } = layout(root);

  return (
    <div className="w-full overflow-x-auto" role="img" aria-label="Trie visualization">
      <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`} className="mx-auto">
        {edges.map((e, i) => {
          const litUp = path.includes(e.from.node.id) && path.includes(e.to.node.id);
          return (
            <line
              key={i}
              x1={e.from.x}
              y1={e.from.y}
              x2={e.to.x}
              y2={e.to.y}
              stroke={litUp ? "#00f0ff" : "var(--color-glass-border)"}
              strokeWidth={litUp ? 2.5 : 2}
            />
          );
        })}
        {positioned.map(({ node, x, y }) => {
          const isCurrent = current === node.id;
          const onPath = path.includes(node.id);
          const isRoot = node.char === "";
          const colorClass = isCurrent ? "text-cyan" : onPath ? "text-violet" : "text-text-muted";

          return (
            <motion.g
              key={node.id}
              initial={{ opacity: 0, scale: 0.7 }}
              animate={{ opacity: 1, scale: 1 }}
              style={{ originX: `${x}px`, originY: `${y}px` }}
            >
              <circle
                cx={x}
                cy={y}
                r={NODE_R}
                className={colorClass}
                fill="currentColor"
                fillOpacity={isCurrent ? 0.25 : onPath ? 0.15 : 0.05}
                stroke="currentColor"
                strokeWidth={isCurrent ? 3 : 2}
              />
              {node.isEnd && (
                <circle
                  cx={x}
                  cy={y}
                  r={NODE_R + 4}
                  fill="none"
                  className="text-amber"
                  stroke="currentColor"
                  strokeWidth={1.5}
                  strokeDasharray="3 2"
                />
              )}
              <text
                x={x}
                y={y + 4}
                textAnchor="middle"
                className={cn("font-mono-data text-[11px] font-semibold", colorClass)}
                fill="currentColor"
              >
                {isRoot ? "•" : node.char}
              </text>
            </motion.g>
          );
        })}
      </svg>
    </div>
  );
}
