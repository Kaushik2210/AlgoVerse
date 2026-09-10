"use client";

import { motion } from "framer-motion";
import type { SegTreeNode, SegTreeVizState } from "@/lib/algorithms/segmentTree";
import { cn } from "@/lib/utils";

interface PositionedNode {
  node: SegTreeNode;
  x: number;
  y: number;
}

const NODE_W = 56;
const NODE_H = 34;
const LEVEL_H = 62;

function layout(root: SegTreeNode | null): { positioned: PositionedNode[]; width: number; height: number } {
  const positioned: PositionedNode[] = [];
  let counter = 0;
  let maxDepth = 0;

  function walk(node: SegTreeNode | null, depth: number) {
    if (!node) return;
    walk(node.left, depth + 1);
    const x = counter * 66 + 40;
    counter++;
    positioned.push({ node, x, y: depth * LEVEL_H + 26 });
    maxDepth = Math.max(maxDepth, depth);
    walk(node.right, depth + 1);
  }
  walk(root, 0);

  const width = Math.max(counter * 66 + 20, 220);
  const height = (maxDepth + 1) * LEVEL_H + 20;
  return { positioned, width, height };
}

type NodeState = "fullyInRange" | "outOfRange" | "current" | "updated" | "visited" | "idle";

function nodeState(id: string, state: SegTreeVizState): NodeState {
  const { current, fullyInRange = [], outOfRange = [], updatedPath = [], visited = [] } = state;
  if (current === id) return "current";
  if (updatedPath.includes(id)) return "updated";
  if (fullyInRange.includes(id)) return "fullyInRange";
  if (outOfRange.includes(id)) return "outOfRange";
  if (visited.includes(id)) return "visited";
  return "idle";
}

const FILL: Record<NodeState, string> = {
  current: "rgba(0,240,255,0.2)",
  updated: "rgba(255,176,32,0.22)",
  fullyInRange: "rgba(255,176,32,0.2)",
  outOfRange: "rgba(255,255,255,0.03)",
  visited: "rgba(168,85,247,0.14)",
  idle: "rgba(255,255,255,0.05)",
};

const STROKE: Record<NodeState, string> = {
  current: "#00f0ff",
  updated: "#ffb020",
  fullyInRange: "#ffb020",
  outOfRange: "var(--color-glass-border)",
  visited: "#a855f7",
  idle: "var(--color-glass-border)",
};

const TEXT_CLASS: Record<NodeState, string> = {
  current: "fill-cyan",
  updated: "fill-amber",
  fullyInRange: "fill-amber",
  outOfRange: "fill-text-muted",
  visited: "fill-violet",
  idle: "fill-foreground",
};

export default function SegmentTreeView({ state }: { state: SegTreeVizState }) {
  const { root, array, updatedIndex } = state;
  const { positioned, width, height } = layout(root);
  const posById = new Map(positioned.map((p) => [p.node.id, p]));

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
    <div className="w-full flex flex-col gap-5">
      {/* Tree representation */}
      <div>
        <p className="text-[10px] font-mono-data uppercase tracking-wide text-text-muted mb-1">
          Tree view (range: aggregate)
        </p>
        {!root ? (
          <p className="text-sm text-text-muted">Tree is empty.</p>
        ) : (
          <div className="w-full overflow-x-auto" role="img" aria-label="Segment tree visualization">
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
                const ns = nodeState(node.id, state);
                return (
                  <motion.g
                    key={node.id}
                    layout
                    initial={{ opacity: 0, scale: 0.7 }}
                    animate={{ opacity: 1, scale: 1, x, y }}
                    transition={{ type: "spring", stiffness: 260, damping: 24 }}
                  >
                    <rect
                      x={-NODE_W / 2}
                      y={-NODE_H / 2}
                      width={NODE_W}
                      height={NODE_H}
                      rx={8}
                      fill={FILL[ns]}
                      stroke={STROKE[ns]}
                      strokeWidth={ns === "current" || ns === "updated" || ns === "fullyInRange" ? 2.5 : 2}
                    />
                    <text x={0} y={-4} textAnchor="middle" className={cn("font-mono-data text-[9px]", TEXT_CLASS[ns])}>
                      [{node.lo},{node.hi}]
                    </text>
                    <text x={0} y={10} textAnchor="middle" className={cn("font-mono-data text-[11px] font-semibold", TEXT_CLASS[ns])}>
                      {node.sum}
                    </text>
                  </motion.g>
                );
              })}
            </svg>
          </div>
        )}
      </div>

      {/* Array representation, kept in sync with the leaves above */}
      <div className="border-t border-glass-border-token pt-3">
        <p className="text-[10px] font-mono-data uppercase tracking-wide text-text-muted mb-2">
          Array view (original data — same indices as the leaves)
        </p>
        <div className="w-full flex items-center gap-1.5 overflow-x-auto" role="img" aria-label="Segment tree backing array">
          {array.length === 0 && <p className="text-sm text-text-muted">Empty.</p>}
          {array.map((value, i) => {
            const isUpdated = updatedIndex === i;
            return (
              <motion.div key={i} layout className="flex flex-col items-center gap-1">
                <motion.div
                  layout
                  className={cn(
                    "w-10 h-10 rounded-lg border-2 flex items-center justify-center font-mono-data text-xs font-semibold",
                    isUpdated
                      ? "bg-amber/20 border-amber text-amber"
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
    </div>
  );
}
