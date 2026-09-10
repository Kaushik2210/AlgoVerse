import type { StepSequence } from "./types";
import type { GraphNode, GraphVizState, GraphEdge } from "./graph";

export interface WeightedEdge extends GraphEdge {
  weight: number;
}

export interface DijkstraVizState extends Omit<GraphVizState, "edges"> {
  edges: WeightedEdge[];
  /** current best known distance from the start node, null = infinity */
  dist: Record<string, number | null>;
  /** the predecessor on the current shortest known path, for readout */
  prev: Record<string, string | null>;
}

// A small 5-node undirected weighted demo graph, hand-picked so the trace
// updates the same node's tentative distance more than once (B and D both
// get relaxed twice) — that's the whole point of the "tentative" table.
export const DIJKSTRA_NODES: GraphNode[] = [
  { id: "A", label: "A" },
  { id: "B", label: "B" },
  { id: "C", label: "C" },
  { id: "D", label: "D" },
  { id: "E", label: "E" },
];

export const DIJKSTRA_EDGES: WeightedEdge[] = [
  { from: "A", to: "B", weight: 4 },
  { from: "A", to: "C", weight: 1 },
  { from: "B", to: "C", weight: 2 },
  { from: "B", to: "D", weight: 5 },
  { from: "C", to: "D", weight: 8 },
  { from: "C", to: "E", weight: 10 },
  { from: "D", to: "E", weight: 2 },
];

function buildWeightedAdjacency(nodes: GraphNode[], edges: WeightedEdge[]) {
  const adj = new Map<string, { to: string; weight: number }[]>();
  for (const n of nodes) adj.set(n.id, []);
  for (const e of edges) {
    adj.get(e.from)?.push({ to: e.to, weight: e.weight });
    adj.get(e.to)?.push({ to: e.from, weight: e.weight });
  }
  for (const [, list] of adj) list.sort((a, b) => a.to.localeCompare(b.to));
  return adj;
}

export function dijkstraSteps(
  nodes: GraphNode[],
  edges: WeightedEdge[],
  start: string
): StepSequence<DijkstraVizState> {
  const adj = buildWeightedAdjacency(nodes, edges);
  const steps: StepSequence<DijkstraVizState> = [];
  const dist: Record<string, number | null> = {};
  const prev: Record<string, string | null> = {};
  const visited: string[] = [];
  for (const n of nodes) {
    dist[n.id] = n.id === start ? 0 : null;
    prev[n.id] = null;
  }

  function frontierOf(): string[] {
    return nodes.map((n) => n.id).filter((id) => !visited.includes(id) && dist[id] !== null);
  }

  steps.push({
    state: { nodes, edges, dist: { ...dist }, prev: { ...prev }, visited: [], frontier: frontierOf(), order: [] },
    narration: `Initialize: distance to ${start} = 0, every other node = infinity. Nothing is finalized yet.`,
    highlightedLine: 3,
    stats: { finalized: 0 },
  });

  while (visited.length < nodes.length) {
    // pick the unvisited node with the smallest tentative distance
    let u: string | null = null;
    let best = Infinity;
    for (const n of nodes) {
      if (visited.includes(n.id)) continue;
      const d = dist[n.id];
      if (d !== null && d < best) {
        best = d;
        u = n.id;
      }
    }
    if (u === null) break; // remaining nodes are unreachable from start

    steps.push({
      state: { nodes, edges, current: u, dist: { ...dist }, prev: { ...prev }, visited: [...visited], frontier: frontierOf() },
      narration: `Pick the unvisited node with the smallest tentative distance: ${u} (dist = ${dist[u]}).`,
      highlightedLine: 6,
      stats: { finalized: visited.length, current: u },
    });

    const neighbors = adj.get(u) ?? [];
    for (const { to, weight } of neighbors) {
      if (visited.includes(to)) continue;
      const candidate = (dist[u] as number) + weight;
      const currentDist = dist[to];
      const improves = currentDist === null || candidate < currentDist;
      steps.push({
        state: {
          nodes,
          edges,
          current: u,
          dist: { ...dist },
          prev: { ...prev },
          visited: [...visited],
          frontier: frontierOf(),
          activeEdges: [[u, to]],
        },
        narration: `Relax edge ${u}→${to} (weight ${weight}): ${dist[u]} + ${weight} = ${candidate}, current dist[${to}] = ${currentDist === null ? "∞" : currentDist} → ${improves ? "improves, update" : "no improvement, keep"}.`,
        highlightedLine: 11,
        stats: { finalized: visited.length, current: u },
      });
      if (improves) {
        dist[to] = candidate;
        prev[to] = u;
        steps.push({
          state: {
            nodes,
            edges,
            current: u,
            dist: { ...dist },
            prev: { ...prev },
            visited: [...visited],
            frontier: frontierOf(),
            activeEdges: [[u, to]],
          },
          narration: `New shortest known distance to ${to}: ${candidate} (via ${u}).`,
          highlightedLine: 13,
          stats: { finalized: visited.length, current: u },
        });
      }
    }

    visited.push(u);
    steps.push({
      state: { nodes, edges, dist: { ...dist }, prev: { ...prev }, visited: [...visited], frontier: frontierOf(), order: [...visited] },
      narration: `${u}'s shortest distance is finalized at ${dist[u]} — no future relaxation can ever improve it. Mark it visited.`,
      highlightedLine: 17,
      stats: { finalized: visited.length },
    });
  }

  steps.push({
    state: { nodes, edges, dist: { ...dist }, prev: { ...prev }, visited: [...visited], frontier: [], order: [...visited] },
    narration: `Dijkstra complete. Shortest distances from ${start}: ${nodes.map((n) => `${n.id}=${dist[n.id]}`).join(", ")}`,
    highlightedLine: 19,
    stats: { finalized: visited.length },
  });

  return steps;
}

export const DIJKSTRA_CODE = `function dijkstra(adj, nodes, start) {
  const dist = {}, prev = {};
  const visited = new Set();
  for (const n of nodes) dist[n] = n === start ? 0 : Infinity;

  while (visited.size < nodes.length) {
    const u = unvisitedNodeWithMinDist(dist, visited);
    if (u === null) break; // remaining nodes unreachable

    for (const { to, weight } of adj.get(u)) {
      if (visited.has(to)) continue;
      const candidate = dist[u] + weight;
      if (candidate < dist[to]) {
        dist[to] = candidate;
        prev[to] = u;
      }
    }

    visited.add(u); // u's distance is now final
  }
  return dist;
}`;
