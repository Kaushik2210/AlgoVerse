import type { StepSequence } from "./types";
import type { GraphNode, GraphEdge, GraphVizState } from "./graph";

export interface TopoVizState extends GraphVizState {
  /** remaining in-degree per node, live */
  inDegree: Record<string, number>;
}

// A small 6-node directed acyclic graph (DAG) — deliberately shaped so more
// than one node reaches in-degree zero at the same time (B and C after A is
// processed), which is exactly what makes the queue's role visible.
export const TOPO_NODES: GraphNode[] = [
  { id: "A", label: "A" },
  { id: "B", label: "B" },
  { id: "C", label: "C" },
  { id: "D", label: "D" },
  { id: "E", label: "E" },
  { id: "F", label: "F" },
];

export const TOPO_EDGES: GraphEdge[] = [
  { from: "A", to: "B" },
  { from: "A", to: "C" },
  { from: "B", to: "D" },
  { from: "C", to: "D" },
  { from: "C", to: "E" },
  { from: "D", to: "F" },
  { from: "E", to: "F" },
];

function buildDirectedAdjacency(nodes: GraphNode[], edges: GraphEdge[]) {
  const adj = new Map<string, string[]>();
  const inDegree: Record<string, number> = {};
  for (const n of nodes) {
    adj.set(n.id, []);
    inDegree[n.id] = 0;
  }
  for (const e of edges) {
    adj.get(e.from)?.push(e.to);
    inDegree[e.to] = (inDegree[e.to] ?? 0) + 1;
  }
  for (const [, list] of adj) list.sort();
  return { adj, inDegree };
}

// ---------------------------------------------------------------------------
// Kahn's algorithm — BFS-flavored: repeatedly peel off nodes with in-degree
// zero, decrementing their neighbors' in-degree as each is removed.
// ---------------------------------------------------------------------------
export function topologicalSortSteps(
  nodes: GraphNode[],
  edges: GraphEdge[]
): StepSequence<TopoVizState> {
  const { adj, inDegree } = buildDirectedAdjacency(nodes, edges);
  const steps: StepSequence<TopoVizState> = [];
  const order: string[] = [];
  const visited: string[] = [];
  const queue: string[] = nodes.filter((n) => inDegree[n.id] === 0).map((n) => n.id);

  steps.push({
    state: { nodes, edges, inDegree: { ...inDegree }, frontier: [...queue], visited: [], order: [] },
    narration: `Compute in-degree for every node. Nodes with in-degree 0 have no unmet prerequisites — enqueue them: [${queue.join(", ") || "none"}].`,
    highlightedLine: 2,
    stats: { processed: 0, remaining: nodes.length },
  });

  while (queue.length) {
    const node = queue.shift()!;
    visited.push(node);
    order.push(node);
    steps.push({
      state: { nodes, edges, current: node, inDegree: { ...inDegree }, frontier: [...queue], visited: [...visited], order: [...order] },
      narration: `Dequeue ${node} — it has no remaining prerequisites, so it's next in the ordering. Output so far: [${order.join(", ")}]`,
      highlightedLine: 5,
      stats: { processed: order.length, remaining: nodes.length - order.length },
    });

    const neighbors = adj.get(node) ?? [];
    for (const nb of neighbors) {
      inDegree[nb] -= 1;
      steps.push({
        state: {
          nodes,
          edges,
          current: node,
          inDegree: { ...inDegree },
          frontier: [...queue],
          visited: [...visited],
          order: [...order],
          activeEdges: [[node, nb]],
        },
        narration: `Remove edge ${node}→${nb}: in-degree[${nb}] drops to ${inDegree[nb]}${inDegree[nb] === 0 ? " — no prerequisites left, enqueue it" : "."}`,
        highlightedLine: 8,
        stats: { processed: order.length, remaining: nodes.length - order.length },
      });
      if (inDegree[nb] === 0) {
        queue.push(nb);
        steps.push({
          state: { nodes, edges, current: node, inDegree: { ...inDegree }, frontier: [...queue], visited: [...visited], order: [...order] },
          narration: `Enqueue ${nb}.`,
          highlightedLine: 9,
          stats: { processed: order.length, remaining: nodes.length - order.length },
        });
      }
    }
  }

  const hasCycle = order.length < nodes.length;
  steps.push({
    state: { nodes, edges, inDegree: { ...inDegree }, visited: [...visited], order: [...order], frontier: [] },
    narration: hasCycle
      ? `Only ${order.length} of ${nodes.length} nodes were processed — the remaining nodes' in-degree never reached 0, which means the graph has a cycle and no valid topological order exists.`
      : `Topological sort complete. A valid linear ordering respecting every edge: [${order.join(" → ")}]`,
    highlightedLine: 12,
    stats: { processed: order.length, remaining: nodes.length - order.length },
  });

  return steps;
}

export const TOPO_CODE = `function topologicalSort(adj, nodes) {
  const inDegree = computeInDegrees(adj, nodes);
  const queue = nodes.filter(n => inDegree[n] === 0);
  const order = [];

  while (queue.length) {
    const node = queue.shift();
    order.push(node);

    for (const nb of adj.get(node)) {
      inDegree[nb]--;
      if (inDegree[nb] === 0) queue.push(nb);
    }
  }

  if (order.length !== nodes.length) {
    throw new Error("graph has a cycle — no valid ordering");
  }
  return order;
}`;
