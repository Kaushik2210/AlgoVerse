import type { StepSequence } from "./types";

export interface GraphNode {
  id: string;
  label: string;
}

export interface GraphEdge {
  from: string;
  to: string;
}

export interface GraphVizState {
  nodes: GraphNode[];
  edges: GraphEdge[];
  /** node currently being processed */
  current?: string;
  /** nodes in the frontier (queue/stack) awaiting processing */
  frontier?: string[];
  /** nodes already fully visited */
  visited?: string[];
  /** visit order so far, for the readout */
  order?: string[];
}

// A small fixed 6-node demo graph — undirected, connected, a couple of cycles
// so BFS/DFS orderings are genuinely different and instructive.
export const DEMO_NODES: GraphNode[] = [
  { id: "A", label: "A" },
  { id: "B", label: "B" },
  { id: "C", label: "C" },
  { id: "D", label: "D" },
  { id: "E", label: "E" },
  { id: "F", label: "F" },
];

export const DEMO_EDGES: GraphEdge[] = [
  { from: "A", to: "B" },
  { from: "A", to: "C" },
  { from: "B", to: "D" },
  { from: "C", to: "D" },
  { from: "C", to: "E" },
  { from: "D", to: "F" },
  { from: "E", to: "F" },
];

export function buildAdjacency(
  nodes: GraphNode[],
  edges: GraphEdge[]
): Map<string, string[]> {
  const adj = new Map<string, string[]>();
  for (const n of nodes) adj.set(n.id, []);
  for (const e of edges) {
    adj.get(e.from)?.push(e.to);
    adj.get(e.to)?.push(e.from);
  }
  // keep neighbor lists in a stable, readable order
  for (const [, list] of adj) list.sort();
  return adj;
}

// ---------------------------------------------------------------------------
// BFS — frontier is a queue (FIFO)
// ---------------------------------------------------------------------------
export function bfsSteps(
  nodes: GraphNode[],
  edges: GraphEdge[],
  start: string
): StepSequence<GraphVizState> {
  const adj = buildAdjacency(nodes, edges);
  const steps: StepSequence<GraphVizState> = [];
  const visited: string[] = [];
  const order: string[] = [];
  const queue: string[] = [start];
  const queued = new Set([start]);

  steps.push({
    state: { nodes, edges, frontier: [...queue], visited: [], order: [] },
    narration: `Start BFS at ${start}. Enqueue it — BFS explores neighbor-by-neighbor, level by level.`,
    highlightedLine: 1,
  });

  while (queue.length) {
    const node = queue.shift()!;
    queued.delete(node);
    visited.push(node);
    order.push(node);
    steps.push({
      state: { nodes, edges, current: node, frontier: [...queue], visited: [...visited], order: [...order] },
      narration: `Dequeue ${node} and visit it. Order so far: [${order.join(", ")}]`,
      highlightedLine: 3,
    });

    const neighbors = adj.get(node) ?? [];
    for (const nb of neighbors) {
      if (visited.includes(nb) || queued.has(nb)) continue;
      queue.push(nb);
      queued.add(nb);
      steps.push({
        state: { nodes, edges, current: node, frontier: [...queue], visited: [...visited], order: [...order] },
        narration: `${node} → ${nb} is unvisited — enqueue ${nb}.`,
        highlightedLine: 6,
      });
    }
  }

  steps.push({
    state: { nodes, edges, visited, order },
    narration: `BFS complete. Visit order: [${order.join(", ")}]`,
    highlightedLine: 9,
  });
  return steps;
}

// ---------------------------------------------------------------------------
// DFS — frontier is a stack (LIFO), implemented iteratively so the frontier
// is visible just like BFS's queue.
// ---------------------------------------------------------------------------
export function dfsSteps(
  nodes: GraphNode[],
  edges: GraphEdge[],
  start: string
): StepSequence<GraphVizState> {
  const adj = buildAdjacency(nodes, edges);
  const steps: StepSequence<GraphVizState> = [];
  const visited: string[] = [];
  const order: string[] = [];
  const stack: string[] = [start];

  steps.push({
    state: { nodes, edges, frontier: [...stack], visited: [], order: [] },
    narration: `Start DFS at ${start}. Push it — DFS dives as deep as possible before backtracking.`,
    highlightedLine: 1,
  });

  while (stack.length) {
    const node = stack.pop()!;
    if (visited.includes(node)) {
      steps.push({
        state: { nodes, edges, frontier: [...stack], visited: [...visited], order: [...order] },
        narration: `${node} was already visited via another path — skip it.`,
        highlightedLine: 3,
      });
      continue;
    }
    visited.push(node);
    order.push(node);
    steps.push({
      state: { nodes, edges, current: node, frontier: [...stack], visited: [...visited], order: [...order] },
      narration: `Pop ${node} and visit it. Order so far: [${order.join(", ")}]`,
      highlightedLine: 4,
    });

    const neighbors = adj.get(node) ?? [];
    // push in reverse so the alphabetically-first neighbor is explored first
    for (let i = neighbors.length - 1; i >= 0; i--) {
      const nb = neighbors[i];
      if (visited.includes(nb)) continue;
      stack.push(nb);
      steps.push({
        state: { nodes, edges, current: node, frontier: [...stack], visited: [...visited], order: [...order] },
        narration: `${node} → ${nb} is unvisited — push ${nb}.`,
        highlightedLine: 8,
      });
    }
  }

  steps.push({
    state: { nodes, edges, visited, order },
    narration: `DFS complete. Visit order: [${order.join(", ")}]`,
    highlightedLine: 11,
  });
  return steps;
}

export const GRAPH_CODE: Record<string, string> = {
  bfs: `function bfs(adj, start) {
  const visited = new Set([start]);
  const order = [];
  const queue = [start];

  while (queue.length) {
    const node = queue.shift();
    order.push(node);

    for (const nb of adj.get(node)) {
      if (!visited.has(nb)) {
        visited.add(nb);
        queue.push(nb);
      }
    }
  }
  return order;
}`,
  dfs: `function dfs(adj, start) {
  const visited = new Set();
  const order = [];
  const stack = [start];

  while (stack.length) {
    const node = stack.pop();
    if (visited.has(node)) continue;
    visited.add(node);
    order.push(node);

    for (const nb of adj.get(node)) {
      if (!visited.has(nb)) stack.push(nb);
    }
  }
  return order;
}`,
};
