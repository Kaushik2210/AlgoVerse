import type { StepSequence } from "./types";
import type { GraphNode } from "./graph";
import type { WeightedEdge } from "./dijkstra";

export interface FloydWarshallVizState {
  nodes: GraphNode[];
  /** current NxN distance matrix, indexed by position in `nodes`; null = infinity */
  dist: (number | null)[][];
  /** the intermediate vertex currently being considered, as an index into `nodes` */
  k: number;
  /** the (i, j) cell currently being checked, as indices into `nodes` */
  i?: number;
  j?: number;
  /** the cell that just changed this step, if any */
  changed?: [number, number];
}

// The classic CLRS all-pairs demo graph — directed, has negative edges (but
// no negative cycle), and is small enough to read every cell of the 5x5
// matrix at a glance while still genuinely needing multiple intermediate
// vertices to reach the true shortest distance for several pairs.
export const FLOYD_WARSHALL_NODES: GraphNode[] = [
  { id: "A", label: "A" },
  { id: "B", label: "B" },
  { id: "C", label: "C" },
  { id: "D", label: "D" },
  { id: "E", label: "E" },
];

export const FLOYD_WARSHALL_EDGES: WeightedEdge[] = [
  { from: "A", to: "B", weight: 3 },
  { from: "A", to: "C", weight: 8 },
  { from: "A", to: "E", weight: -4 },
  { from: "B", to: "D", weight: 1 },
  { from: "B", to: "E", weight: 7 },
  { from: "C", to: "B", weight: 4 },
  { from: "D", to: "A", weight: 2 },
  { from: "D", to: "C", weight: -5 },
  { from: "E", to: "D", weight: 6 },
];

function buildMatrix(nodes: GraphNode[], edges: WeightedEdge[]): (number | null)[][] {
  const n = nodes.length;
  const idx = new Map(nodes.map((node, i) => [node.id, i]));
  const dist: (number | null)[][] = Array.from({ length: n }, () => Array(n).fill(null));
  for (let i = 0; i < n; i++) dist[i][i] = 0;
  for (const e of edges) {
    const i = idx.get(e.from)!;
    const j = idx.get(e.to)!;
    if (dist[i][j] === null || e.weight < dist[i][j]!) dist[i][j] = e.weight;
  }
  return dist;
}

export function floydWarshallSteps(
  nodes: GraphNode[],
  edges: WeightedEdge[]
): StepSequence<FloydWarshallVizState> {
  const n = nodes.length;
  const dist = buildMatrix(nodes, edges);
  const steps: StepSequence<FloydWarshallVizState> = [];

  steps.push({
    state: { nodes, dist: dist.map((r) => [...r]), k: -1 },
    narration: `Initialize the distance matrix directly from the edges: dist[i][j] = edge weight if one exists, 0 on the diagonal, infinity otherwise. No intermediate vertices considered yet.`,
    highlightedLine: 2,
    stats: { k: 0, of: n },
  });

  for (let k = 0; k < n; k++) {
    steps.push({
      state: { nodes, dist: dist.map((r) => [...r]), k },
      narration: `Consider ${nodes[k].label} as an intermediate vertex. For every pair (i, j), check whether routing i → ${nodes[k].label} → j beats the current dist[i][j].`,
      highlightedLine: 5,
      stats: { k: k + 1, of: n },
    });

    for (let i = 0; i < n; i++) {
      if (i === k) continue;
      for (let j = 0; j < n; j++) {
        if (j === k || j === i) continue;
        const dik = dist[i][k];
        const dkj = dist[k][j];
        const candidate = dik === null || dkj === null ? null : dik + dkj;
        const current = dist[i][j];
        const improves = candidate !== null && (current === null || candidate < current);
        steps.push({
          state: { nodes, dist: dist.map((r) => [...r]), k, i, j },
          narration: `dist[${nodes[i].label}][${nodes[j].label}] = min(${current === null ? "∞" : current}, dist[${nodes[i].label}][${nodes[k].label}] + dist[${nodes[k].label}][${nodes[j].label}] = ${
            dik === null ? "∞" : dik
          } + ${dkj === null ? "∞" : dkj}${candidate === null ? "" : ` = ${candidate}`}) → ${
            improves ? "shorter path found through " + nodes[k].label : "no improvement"
          }.`,
          highlightedLine: 7,
          stats: { k: k + 1, of: n },
        });
        if (improves) {
          dist[i][j] = candidate;
          steps.push({
            state: { nodes, dist: dist.map((r) => [...r]), k, i, j, changed: [i, j] },
            narration: `Update dist[${nodes[i].label}][${nodes[j].label}] = ${candidate}.`,
            highlightedLine: 8,
            stats: { k: k + 1, of: n },
          });
        }
      }
    }
  }

  steps.push({
    state: { nodes, dist: dist.map((r) => [...r]), k: n },
    narration: `Floyd-Warshall complete. Every cell dist[i][j] now holds the true shortest-path distance between every pair of nodes, considering all possible intermediate vertices.`,
    highlightedLine: 12,
    stats: { k: n, of: n },
  });

  return steps;
}

export const FLOYD_WARSHALL_CODE = `function floydWarshall(nodes, edges) {
  const n = nodes.length;
  const dist = initMatrixFromEdges(nodes, edges); // 0 on diagonal, weight or Infinity elsewhere

  for (let k = 0; k < n; k++) {
    for (let i = 0; i < n; i++) {
      for (let j = 0; j < n; j++) {
        if (dist[i][k] + dist[k][j] < dist[i][j]) {
          dist[i][j] = dist[i][k] + dist[k][j];
        }
      }
    }
  }

  // (optional) a negative value on the diagonal after this
  // means a negative-weight cycle exists
  return dist;
}`;
