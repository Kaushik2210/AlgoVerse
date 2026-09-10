"use client";

import { motion } from "framer-motion";
import type { RecursionTreeNode } from "@/lib/algorithms/backtracking";
import { cn } from "@/lib/utils";

const NODE_R = 18;
const LEVEL_H = 60;
const NODE_SPACING = 50;

interface Positioned {
  id: string;
  x: number;
  y: number;
  node: RecursionTreeNode;
}

export default function RecursionTreeView({
  tree,
  activeId,
}: {
  tree: RecursionTreeNode[];
  activeId?: string;
}) {
  if (tree.length === 0) {
    return <p className="text-sm text-text-muted">No calls yet.</p>;
  }

  const byId = new Map(tree.map((t) => [t.id, t]));
  const children = new Map<string, string[]>();
  tree.forEach((t) => children.set(t.id, []));
  let root: RecursionTreeNode | undefined;
  for (const t of tree) {
    if (t.parentId === null) root = t;
    else children.get(t.parentId)?.push(t.id);
  }
  if (!root) return null;

  const positioned: Positioned[] = [];
  let counter = 0;
  let maxDepth = 0;

  function walk(id: string, depth: number): number {
    maxDepth = Math.max(maxDepth, depth);
    const kids = children.get(id) ?? [];
    const node = byId.get(id)!;
    if (kids.length === 0) {
      const x = counter * NODE_SPACING + 30;
      counter++;
      positioned.push({ id, x, y: depth * LEVEL_H + 26, node });
      return x;
    }
    const childXs = kids.map((k) => walk(k, depth + 1));
    const x = childXs.reduce((a, b) => a + b, 0) / childXs.length;
    positioned.push({ id, x, y: depth * LEVEL_H + 26, node });
    return x;
  }
  walk(root.id, 0);

  const width = Math.max(counter * NODE_SPACING + 30, 200);
  const height = (maxDepth + 1) * LEVEL_H + 20;
  const posById = new Map(positioned.map((p) => [p.id, p]));

  const edges: { from: Positioned; to: Positioned }[] = [];
  for (const p of positioned) {
    for (const cid of children.get(p.id) ?? []) {
      const c = posById.get(cid);
      if (c) edges.push({ from: p, to: c });
    }
  }

  return (
    <div className="w-full overflow-x-auto" role="img" aria-label="Recursion tree visualization">
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
        {positioned.map(({ id, x, y, node }) => {
          const isActive = activeId === id;
          const isSolution = node.status === "solution";
          const isReturned = node.status === "returned";
          const colorClass = isActive
            ? "text-cyan"
            : isSolution
              ? "text-amber"
              : isReturned
                ? "text-violet"
                : "text-text-muted";

          return (
            <motion.g
              key={id}
              initial={{ opacity: 0, scale: 0.6 }}
              animate={{ opacity: 1, scale: 1 }}
              style={{ originX: `${x}px`, originY: `${y}px` }}
            >
              <circle
                cx={x}
                cy={y}
                r={NODE_R}
                className={colorClass}
                fill="currentColor"
                fillOpacity={isActive ? 0.3 : isSolution ? 0.22 : isReturned ? 0.14 : 0.05}
                stroke="currentColor"
                strokeWidth={isActive ? 3 : 2}
              />
              <text
                x={x}
                y={y + 4}
                textAnchor="middle"
                className={cn("font-mono-data text-[11px] font-semibold", colorClass)}
                fill="currentColor"
              >
                {node.decision === "include" ? "+" : node.decision === "exclude" ? "−" : "∅"}
              </text>
            </motion.g>
          );
        })}
      </svg>
      <div className="flex flex-wrap items-center justify-center gap-4 text-[11px] font-mono-data text-text-muted mt-2">
        <span className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-cyan" /> active call
        </span>
        <span className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-amber" /> solution (leaf)
        </span>
        <span className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-violet" /> returned
        </span>
      </div>
    </div>
  );
}
