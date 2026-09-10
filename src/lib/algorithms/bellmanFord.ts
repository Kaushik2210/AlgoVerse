import type { StepSequence } from "./types";
import type { GraphNode, GraphVizState } from "./graph";
import type { WeightedEdge } from "./dijkstra";

export interface BellmanFordVizState extends Omit<GraphVizState, "edges"> {
  edges: WeightedEdge[];
  /** current best known distance from the start node, null = infinity */
  dist: Record<string, number | null>;
  /** which pass (1-indexed) is currently running; -1 = the negative-cycle detection pass */
  pass: number;
  /** true once a negative cycle has been confirmed reachable from the start */
  negativeCycleDetected: boolean;
}

// The classic CLRS-style demo graph (directed, has negative edges but no
// negative cycle) — relaxation genuinely needs multiple passes because C's
// shortest path only stabilizes after B (its cheaper predecessor) does.
export const BELLMAN_FORD_NODES: GraphNode[] = [
  { id: "A", label: "A" },
  { id: "B", label: "B" },
  { id: "C", label: "C" },
  { id: "D", label: "D" },
  { id: "E", label: "E" },
];

export const BELLMAN_FORD_EDGES: WeightedEdge[] = [
  { from: "A", to: "B", weight: 6 },
  { from: "A", to: "D", weight: 7 },
  { from: "B", to: "C", weight: 5 },
  { from: "B", to: "D", weight: 8 },
  { from: "B", to: "E", weight: -4 },
  { from: "C", to: "B", weight: -2 },
  { from: "D", to: "C", weight: -3 },
  { from: "D", to: "E", weight: 9 },
  { from: "E", to: "A", weight: 2 },
  { from: "E", to: "C", weight: 7 },
];

// A small directed graph whose only cycle (B → C → D → B) sums to -3 — a
// genuine negative cycle reachable from the start, verified to keep
// improving after the standard V-1 relaxation passes.
export const BELLMAN_FORD_NEG_CYCLE_NODES: GraphNode[] = [
  { id: "A", label: "A" },
  { id: "B", label: "B" },
  { id: "C", label: "C" },
  { id: "D", label: "D" },
];

export const BELLMAN_FORD_NEG_CYCLE_EDGES: WeightedEdge[] = [
  { from: "A", to: "B", weight: 1 },
  { from: "B", to: "C", weight: -1 },
  { from: "C", to: "D", weight: -1 },
  { from: "D", to: "B", weight: -1 },
];

export function bellmanFordSteps(
  nodes: GraphNode[],
  edges: WeightedEdge[],
  start: string
): StepSequence<BellmanFordVizState> {
  const steps: StepSequence<BellmanFordVizState> = [];
  const dist: Record<string, number | null> = {};
  for (const n of nodes) dist[n.id] = n.id === start ? 0 : null;

  steps.push({
    state: { nodes, edges, dist: { ...dist }, pass: 0, negativeCycleDetected: false, visited: [] },
    narration: `Initialize: distance to ${start} = 0, every other node = infinity. Unlike Dijkstra, edges may be negative, so we relax every edge, every pass — no greedy shortcuts.`,
    highlightedLine: 2,
    stats: { pass: 0, of: nodes.length - 1 },
  });

  for (let pass = 1; pass <= nodes.length - 1; pass++) {
    let changedThisPass = false;
    steps.push({
      state: { nodes, edges, dist: { ...dist }, pass, negativeCycleDetected: false, visited: [] },
      narration: `Pass ${pass} of ${nodes.length - 1}: relax every edge in the graph, in order.`,
      highlightedLine: 4,
      stats: { pass, of: nodes.length - 1 },
    });

    for (const e of edges) {
      const du = dist[e.from];
      const candidate = du === null ? null : du + e.weight;
      const dv = dist[e.to];
      const improves = candidate !== null && (dv === null || candidate < dv);
      steps.push({
        state: {
          nodes,
          edges,
          dist: { ...dist },
          pass,
          negativeCycleDetected: false,
          activeEdges: [[e.from, e.to]],
          visited: [],
        },
        narration: `Relax ${e.from}→${e.to} (weight ${e.weight}): dist[${e.from}] = ${du === null ? "∞" : du}${
          candidate === null ? "" : ` + ${e.weight} = ${candidate}`
        }, current dist[${e.to}] = ${dv === null ? "∞" : dv} → ${improves ? "improves, update" : "no improvement"}.`,
        highlightedLine: 6,
        stats: { pass, of: nodes.length - 1 },
      });
      if (improves) {
        dist[e.to] = candidate;
        changedThisPass = true;
        steps.push({
          state: { nodes, edges, dist: { ...dist }, pass, negativeCycleDetected: false, activeEdges: [[e.from, e.to]], visited: [] },
          narration: `New shortest known distance to ${e.to}: ${candidate} (via ${e.from}).`,
          highlightedLine: 8,
          stats: { pass, of: nodes.length - 1 },
        });
      }
    }

    if (!changedThisPass) {
      steps.push({
        state: { nodes, edges, dist: { ...dist }, pass, negativeCycleDetected: false, visited: [] },
        narration: `No edge relaxed this pass — distances have stabilized early. Safe to stop before using all ${nodes.length - 1} passes.`,
        highlightedLine: 11,
        stats: { pass, of: nodes.length - 1 },
      });
      break;
    }
  }

  // extra pass: if anything can still be relaxed, a negative cycle is
  // reachable from `start` and no finite shortest-path distance exists.
  let negativeCycleDetected = false;
  const culprits: string[] = [];
  for (const e of edges) {
    const du = dist[e.from];
    const candidate = du === null ? null : du + e.weight;
    const dv = dist[e.to];
    if (candidate !== null && (dv === null || candidate < dv)) {
      negativeCycleDetected = true;
      culprits.push(e.to);
    }
  }

  steps.push({
    state: { nodes, edges, dist: { ...dist }, pass: -1, negativeCycleDetected, visited: [] },
    narration: negativeCycleDetected
      ? `Extra relaxation pass (V-th pass): edge(s) into [${culprits.join(", ")}] would STILL improve — that's only possible if a negative-weight cycle is reachable from ${start}. No finite shortest-path distance exists for those nodes.`
      : `Extra relaxation pass (V-th pass): nothing improves. All distances are confirmed final — no negative cycle is reachable from ${start}.`,
    highlightedLine: negativeCycleDetected ? 15 : 13,
    stats: { pass: nodes.length, of: nodes.length - 1 },
  });

  if (!negativeCycleDetected) {
    steps.push({
      state: { nodes, edges, dist: { ...dist }, pass: -1, negativeCycleDetected: false, visited: nodes.map((n) => n.id) },
      narration: `Bellman-Ford complete. Shortest distances from ${start}: ${nodes.map((n) => `${n.id}=${dist[n.id] === null ? "∞" : dist[n.id]}`).join(", ")}`,
      highlightedLine: 17,
      stats: { pass: nodes.length, of: nodes.length - 1 },
    });
  }

  return steps;
}

export const BELLMAN_FORD_CODE = `function bellmanFord(nodes, edges, start) {
  const dist = {};
  for (const n of nodes) dist[n] = n === start ? 0 : Infinity;

  for (let i = 0; i < nodes.length - 1; i++) {
    let changed = false;
    for (const { from: u, to: v, weight } of edges) {
      if (dist[u] + weight < dist[v]) {
        dist[v] = dist[u] + weight;
        changed = true;
      }
    }
    if (!changed) break; // stabilized early
  }

  // one more pass: if anything still relaxes, there's a
  // negative-weight cycle reachable from start
  for (const { from: u, to: v, weight } of edges) {
    if (dist[u] + weight < dist[v]) {
      throw new Error("negative-weight cycle detected");
    }
  }

  return dist;
}`;
