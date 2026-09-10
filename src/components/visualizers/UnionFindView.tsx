"use client";

import { motion } from "framer-motion";
import type { UnionFindVizState } from "@/lib/algorithms/unionFind";
import { cn } from "@/lib/utils";

const NODE_R = 20;
const LEVEL_H = 70;
const NODE_SPACING = 56;

interface Positioned {
  id: number;
  x: number;
  y: number;
}

function layoutTree(root: number, children: Map<number, number[]>, xOffset: number) {
  const positioned: Positioned[] = [];
  let counter = 0;
  let maxDepth = 0;

  function walk(node: number, depth: number): number {
    maxDepth = Math.max(maxDepth, depth);
    const kids = children.get(node) ?? [];
    if (kids.length === 0) {
      const x = xOffset + counter * NODE_SPACING;
      counter++;
      positioned.push({ id: node, x, y: depth * LEVEL_H + 30 });
      return x;
    }
    const childXs = kids.map((k) => walk(k, depth + 1));
    const x = childXs.reduce((a, b) => a + b, 0) / childXs.length;
    positioned.push({ id: node, x, y: depth * LEVEL_H + 30 });
    return x;
  }

  walk(root, 0);
  const width = Math.max(counter, 1) * NODE_SPACING;
  return { positioned, width, maxDepth };
}

// Groups the forest into per-root trees and lays them out side by side —
// every disjoint set gets its own little tree instead of one shared canvas.
function layoutForest(parent: number[]) {
  const n = parent.length;
  const children = new Map<number, number[]>();
  for (let i = 0; i < n; i++) children.set(i, []);
  const roots: number[] = [];
  for (let i = 0; i < n; i++) {
    if (parent[i] === i) roots.push(i);
    else children.get(parent[i])?.push(i);
  }

  let xOffset = 30;
  let allPositioned: Positioned[] = [];
  let maxDepth = 0;
  for (const r of roots) {
    const { positioned, width, maxDepth: d } = layoutTree(r, children, xOffset);
    allPositioned = allPositioned.concat(positioned);
    maxDepth = Math.max(maxDepth, d);
    xOffset += width + 44;
  }

  return {
    positioned: allPositioned,
    width: xOffset,
    height: (maxDepth + 1) * LEVEL_H + 20,
    roots,
  };
}

export default function UnionFindView({ state }: { state: UnionFindVizState }) {
  const { parent, labels, current, path = [], compressed = [], unionPair, mergedRoot } = state;
  const { positioned, width, height, roots } = layoutForest(parent);
  const posById = new Map(positioned.map((p) => [p.id, p]));

  const edges: { from: Positioned; to: Positioned; isCompressed: boolean }[] = [];
  for (let i = 0; i < parent.length; i++) {
    if (parent[i] === i) continue;
    const from = posById.get(i);
    const to = posById.get(parent[i]);
    if (from && to) edges.push({ from, to, isCompressed: compressed.includes(i) });
  }

  return (
    <div className="w-full flex flex-col items-center gap-3">
      <div
        className="w-full overflow-x-auto"
        role="img"
        aria-label="Union-Find forest visualization"
      >
        <svg
          width={Math.max(width, 200)}
          height={Math.max(height, 120)}
          viewBox={`0 0 ${Math.max(width, 200)} ${Math.max(height, 120)}`}
          className="mx-auto"
        >
          {edges.map((e) => (
            <line
              key={`${e.from.id}-${e.to.id}`}
              x1={e.from.x}
              y1={e.from.y}
              x2={e.to.x}
              y2={e.to.y}
              stroke={e.isCompressed ? "#00f0ff" : "var(--color-glass-border)"}
              strokeWidth={e.isCompressed ? 2.5 : 2}
            />
          ))}
          {positioned.map(({ id, x, y }) => {
            const label = labels[id];
            const isRoot = roots.includes(id);
            const isCurrent = current === id;
            const isPath = path.includes(id);
            const isCompressed = compressed.includes(id);
            const isUnionPair = unionPair?.includes(id);
            const isMergedRoot = mergedRoot === id;

            const colorClass = isCurrent
              ? "text-cyan"
              : isCompressed
                ? "text-cyan"
                : isMergedRoot
                  ? "text-amber"
                  : isPath
                    ? "text-violet"
                    : isRoot
                      ? "text-amber/80"
                      : isUnionPair
                        ? "text-cyan/80"
                        : "text-text-muted";

            return (
              <motion.g
                key={id}
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
                  fillOpacity={isCurrent ? 0.28 : isPath || isCompressed ? 0.18 : isRoot ? 0.12 : 0.05}
                  stroke="currentColor"
                  strokeWidth={isCurrent || isRoot ? 3 : 2}
                />
                <text
                  x={x}
                  y={y + 5}
                  textAnchor="middle"
                  className={cn("font-mono-data text-xs font-semibold", colorClass)}
                  fill="currentColor"
                >
                  {label}
                </text>
                {isRoot && (
                  <text
                    x={x}
                    y={y - NODE_R - 8}
                    textAnchor="middle"
                    className="font-mono-data text-[9px] fill-amber/80"
                  >
                    root
                  </text>
                )}
              </motion.g>
            );
          })}
        </svg>
      </div>

      <div className="flex flex-wrap items-center justify-center gap-4 text-[11px] font-mono-data text-text-muted">
        <span className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-cyan" /> current / compressing
        </span>
        <span className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-violet" /> on find() path
        </span>
        <span className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-amber" /> root
        </span>
      </div>
    </div>
  );
}
