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

interface GraphViewProps {
  state: GraphVizState;
  /** render edges as directed arrows (e.g. topological sort, Bellman-Ford) instead of plain lines */
  directed?: boolean;
  /** edges accepted into a result set — rendered amber and thicker (e.g. MST edges) */
  acceptedEdges?: [string, string][];
  /** edges rejected/skipped (e.g. would form a cycle) — rendered dashed and muted */
  rejectedEdges?: [string, string][];
}

export default function GraphView({ state, directed = false, acceptedEdges = [], rejectedEdges = [] }: GraphViewProps) {
  const { nodes, edges, current, frontier = [], visited = [], activeEdges = [] } = state;
  const positions = circleLayout(nodes.length);
  const posById = new Map(nodes.map((n, i) => [n.id, positions[i]]));

  function matches(list: [string, string][], from: string, to: string, directionMatters: boolean) {
    return list.some(([a, b]) =>
      directionMatters ? a === from && b === to : (a === from && b === to) || (a === to && b === from)
    );
  }

  function isActiveEdge(from: string, to: string) {
    return matches(activeEdges, from, to, false);
  }
  function isAcceptedEdge(from: string, to: string) {
    return matches(acceptedEdges, from, to, false);
  }
  function isRejectedEdge(from: string, to: string) {
    return matches(rejectedEdges, from, to, false);
  }

  const hasLegendExtras = acceptedEdges.length > 0 || rejectedEdges.length > 0;

  return (
    <div className="w-full flex flex-col items-center gap-3">
      <div className="w-full overflow-x-auto" role="img" aria-label="Graph visualization">
        <svg width={WIDTH} height={HEIGHT} viewBox={`0 0 ${WIDTH} ${HEIGHT}`} className="mx-auto">
          <defs>
            <marker
              id="graph-arrow"
              viewBox="0 0 10 10"
              refX="8"
              refY="5"
              markerWidth="7"
              markerHeight="7"
              orient="auto-start-reverse"
            >
              <path d="M0,0 L10,5 L0,10 z" className="fill-text-muted" />
            </marker>
            <marker
              id="graph-arrow-active"
              viewBox="0 0 10 10"
              refX="8"
              refY="5"
              markerWidth="7"
              markerHeight="7"
              orient="auto-start-reverse"
            >
              <path d="M0,0 L10,5 L0,10 z" fill="#00f0ff" />
            </marker>
            <marker
              id="graph-arrow-accepted"
              viewBox="0 0 10 10"
              refX="8"
              refY="5"
              markerWidth="7"
              markerHeight="7"
              orient="auto-start-reverse"
            >
              <path d="M0,0 L10,5 L0,10 z" className="fill-amber" />
            </marker>
          </defs>
          {edges.map((e, i) => {
            const from = posById.get(e.from);
            const to = posById.get(e.to);
            if (!from || !to) return null;
            const active = isActiveEdge(e.from, e.to);
            const accepted = !active && isAcceptedEdge(e.from, e.to);
            const rejected = !active && !accepted && isRejectedEdge(e.from, e.to);

            // shorten the line so directed arrowheads land just outside the node circle
            let x1 = from.x, y1 = from.y, x2 = to.x, y2 = to.y;
            if (directed) {
              const dx = to.x - from.x;
              const dy = to.y - from.y;
              const len = Math.hypot(dx, dy) || 1;
              const ux = dx / len, uy = dy / len;
              x1 = from.x + ux * NODE_R;
              y1 = from.y + uy * NODE_R;
              x2 = to.x - ux * (NODE_R + 6);
              y2 = to.y - uy * (NODE_R + 6);
            }

            const midX = (from.x + to.x) / 2;
            const midY = (from.y + to.y) / 2;
            const stroke = active ? "#00f0ff" : accepted ? "var(--color-amber)" : "var(--color-glass-border)";
            const marker = directed
              ? active
                ? "url(#graph-arrow-active)"
                : accepted
                  ? "url(#graph-arrow-accepted)"
                  : "url(#graph-arrow)"
              : undefined;

            return (
              <g key={i}>
                <line
                  x1={x1}
                  y1={y1}
                  x2={x2}
                  y2={y2}
                  stroke={stroke}
                  strokeWidth={active || accepted ? 3 : 2}
                  strokeDasharray={rejected ? "4 3" : undefined}
                  opacity={rejected ? 0.35 : 1}
                  markerEnd={marker}
                />
                {e.weight !== undefined && (
                  <text
                    x={midX}
                    y={midY - 4}
                    textAnchor="middle"
                    className={cn(
                      "font-mono-data text-[10px] font-semibold",
                      active ? "fill-cyan" : accepted ? "fill-amber" : rejected ? "fill-text-muted" : "fill-text-muted"
                    )}
                    opacity={rejected ? 0.5 : 1}
                  >
                    {e.weight}
                  </text>
                )}
              </g>
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
        {hasLegendExtras && (
          <>
            <span className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-amber" /> accepted
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-white/10 border border-dashed border-text-muted" /> rejected
            </span>
          </>
        )}
      </div>
    </div>
  );
}
