import type { StepSequence } from "./types";
import type { GraphNode, GraphVizState } from "./graph";
import type { WeightedEdge } from "./dijkstra";

export interface MstVizState extends Omit<GraphVizState, "edges"> {
  edges: WeightedEdge[];
  /** edges already accepted into the growing spanning tree */
  acceptedEdges: [string, string][];
  /** edges rejected because both endpoints were already connected (would form a cycle) */
  rejectedEdges: [string, string][];
  /** running total weight of the accepted edges so far */
  treeWeight: number;
}

// A small 6-node connected weighted undirected demo graph, hand-picked so
// Prim's (grown from A) and Kruskal's (sorted globally) are forced to
// consider edges in very different orders but land on the exact same
// minimum spanning tree — {A-C, B-C, B-D, D-E, D-F}, total weight 19.
export const MST_NODES: GraphNode[] = [
  { id: "A", label: "A" },
  { id: "B", label: "B" },
  { id: "C", label: "C" },
  { id: "D", label: "D" },
  { id: "E", label: "E" },
  { id: "F", label: "F" },
];

export const MST_EDGES: WeightedEdge[] = [
  { from: "A", to: "C", weight: 1 },
  { from: "B", to: "D", weight: 2 },
  { from: "B", to: "C", weight: 3 },
  { from: "A", to: "B", weight: 4 },
  { from: "C", to: "D", weight: 5 },
  { from: "D", to: "E", weight: 6 },
  { from: "D", to: "F", weight: 7 },
  { from: "C", to: "E", weight: 8 },
  { from: "E", to: "F", weight: 9 },
];

function buildAdjacency(nodes: GraphNode[], edges: WeightedEdge[]) {
  const adj = new Map<string, { to: string; weight: number; edge: WeightedEdge }[]>();
  for (const n of nodes) adj.set(n.id, []);
  for (const e of edges) {
    adj.get(e.from)?.push({ to: e.to, weight: e.weight, edge: e });
    adj.get(e.to)?.push({ to: e.from, weight: e.weight, edge: e });
  }
  for (const [, list] of adj) list.sort((a, b) => a.weight - b.weight || a.to.localeCompare(b.to));
  return adj;
}

// ---------------------------------------------------------------------------
// Prim's — grow a single tree from `start`, always crossing the frontier via
// the cheapest edge that reaches an outside node.
// ---------------------------------------------------------------------------
export function primSteps(
  nodes: GraphNode[],
  edges: WeightedEdge[],
  start: string
): StepSequence<MstVizState> {
  const adj = buildAdjacency(nodes, edges);
  const steps: StepSequence<MstVizState> = [];
  const inTree = new Set<string>([start]);
  const accepted: [string, string][] = [];
  let treeWeight = 0;

  steps.push({
    state: { nodes, edges, visited: [start], frontier: [], acceptedEdges: [], rejectedEdges: [], treeWeight: 0 },
    narration: `Start Prim's at ${start}. The tree currently contains just this one node — grow it by always crossing to the cheapest reachable outside node.`,
    highlightedLine: 2,
    stats: { treeWeight: 0, nodesInTree: 1 },
  });

  while (inTree.size < nodes.length) {
    // every edge with exactly one endpoint inside the tree
    const crossing: { from: string; to: string; weight: number }[] = [];
    for (const u of inTree) {
      for (const { to, weight } of adj.get(u) ?? []) {
        if (!inTree.has(to)) crossing.push({ from: u, to, weight });
      }
    }

    if (crossing.length === 0) break; // remaining nodes unreachable

    steps.push({
      state: {
        nodes,
        edges,
        visited: [...inTree],
        frontier: crossing.map((c) => c.to),
        acceptedEdges: [...accepted],
        rejectedEdges: [],
        treeWeight,
        activeEdges: crossing.map((c) => [c.from, c.to] as [string, string]),
      },
      narration: `Frontier edges crossing the tree boundary: ${crossing.map((c) => `${c.from}-${c.to} (${c.weight})`).join(", ")}. Pick the cheapest.`,
      highlightedLine: 5,
      stats: { treeWeight, nodesInTree: inTree.size },
    });

    let best = crossing[0];
    for (const c of crossing) if (c.weight < best.weight) best = c;

    inTree.add(best.to);
    accepted.push([best.from, best.to]);
    treeWeight += best.weight;

    steps.push({
      state: {
        nodes,
        edges,
        visited: [...inTree],
        current: best.to,
        frontier: [],
        acceptedEdges: [...accepted],
        rejectedEdges: [],
        treeWeight,
      },
      narration: `Cheapest crossing edge is ${best.from}-${best.to} (weight ${best.weight}) — accept it into the tree and add ${best.to}. Tree weight so far: ${treeWeight}.`,
      highlightedLine: 8,
      stats: { treeWeight, nodesInTree: inTree.size },
    });
  }

  steps.push({
    state: { nodes, edges, visited: [...inTree], acceptedEdges: [...accepted], rejectedEdges: [], treeWeight, order: accepted.map(([, to]) => to) },
    narration: `Prim's complete. Minimum spanning tree edges: ${accepted.map(([a, b]) => `${a}-${b}`).join(", ")}. Total weight: ${treeWeight}.`,
    highlightedLine: 11,
    stats: { treeWeight, nodesInTree: inTree.size },
  });

  return steps;
}

// ---------------------------------------------------------------------------
// Kruskal's — sort all edges globally by weight, then greedily accept any
// edge that connects two different components (union-find), skipping any
// edge that would close a cycle.
// ---------------------------------------------------------------------------
class UnionFind {
  parent = new Map<string, string>();
  rank = new Map<string, number>();
  constructor(nodes: GraphNode[]) {
    for (const n of nodes) {
      this.parent.set(n.id, n.id);
      this.rank.set(n.id, 0);
    }
  }
  find(x: string): string {
    let root = x;
    while (this.parent.get(root) !== root) root = this.parent.get(root)!;
    // path compression
    let cur = x;
    while (this.parent.get(cur) !== root) {
      const next = this.parent.get(cur)!;
      this.parent.set(cur, root);
      cur = next;
    }
    return root;
  }
  union(a: string, b: string) {
    const ra = this.find(a);
    const rb = this.find(b);
    if (ra === rb) return false;
    const rankA = this.rank.get(ra)!;
    const rankB = this.rank.get(rb)!;
    if (rankA < rankB) this.parent.set(ra, rb);
    else if (rankA > rankB) this.parent.set(rb, ra);
    else {
      this.parent.set(rb, ra);
      this.rank.set(ra, rankA + 1);
    }
    return true;
  }
}

export function kruskalSteps(
  nodes: GraphNode[],
  edges: WeightedEdge[]
): StepSequence<MstVizState> {
  const steps: StepSequence<MstVizState> = [];
  const sorted = [...edges].sort((a, b) => a.weight - b.weight);
  const uf = new UnionFind(nodes);
  const accepted: [string, string][] = [];
  const rejected: [string, string][] = [];
  let treeWeight = 0;

  steps.push({
    state: { nodes, edges, acceptedEdges: [], rejectedEdges: [], treeWeight: 0, visited: [] },
    narration: `Sort all edges by weight: ${sorted.map((e) => `${e.from}-${e.to} (${e.weight})`).join(", ")}. Process cheapest-first, using union-find to skip any edge that would close a cycle.`,
    highlightedLine: 2,
    stats: { treeWeight: 0, edgesAccepted: 0 },
  });

  for (const e of sorted) {
    const sameComponent = uf.find(e.from) === uf.find(e.to);
    steps.push({
      state: {
        nodes,
        edges,
        acceptedEdges: [...accepted],
        rejectedEdges: [...rejected],
        treeWeight,
        activeEdges: [[e.from, e.to]],
        visited: [...new Set(accepted.flat())],
      },
      narration: `Consider ${e.from}-${e.to} (weight ${e.weight}): find(${e.from}) = ${uf.find(e.from)}, find(${e.to}) = ${uf.find(e.to)} — ${sameComponent ? "already the same component, accepting would close a cycle" : "different components, safe to accept"}.`,
      highlightedLine: 5,
      stats: { treeWeight, edgesAccepted: accepted.length },
    });

    if (sameComponent) {
      rejected.push([e.from, e.to]);
      steps.push({
        state: {
          nodes,
          edges,
          acceptedEdges: [...accepted],
          rejectedEdges: [...rejected],
          treeWeight,
          visited: [...new Set(accepted.flat())],
        },
        narration: `Reject ${e.from}-${e.to} — it would form a cycle.`,
        highlightedLine: 7,
        stats: { treeWeight, edgesAccepted: accepted.length },
      });
    } else {
      uf.union(e.from, e.to);
      accepted.push([e.from, e.to]);
      treeWeight += e.weight;
      steps.push({
        state: {
          nodes,
          edges,
          acceptedEdges: [...accepted],
          rejectedEdges: [...rejected],
          treeWeight,
          visited: [...new Set(accepted.flat())],
        },
        narration: `Accept ${e.from}-${e.to} — merges two components. Tree weight so far: ${treeWeight}.`,
        highlightedLine: 9,
        stats: { treeWeight, edgesAccepted: accepted.length },
      });
    }
  }

  steps.push({
    state: {
      nodes,
      edges,
      acceptedEdges: [...accepted],
      rejectedEdges: [...rejected],
      treeWeight,
      visited: [...new Set(accepted.flat())],
      order: accepted.map(([, to]) => to),
    },
    narration: `Kruskal's complete. Minimum spanning tree edges: ${accepted.map(([a, b]) => `${a}-${b}`).join(", ")}. Total weight: ${treeWeight}.`,
    highlightedLine: 12,
    stats: { treeWeight, edgesAccepted: accepted.length },
  });

  return steps;
}

export const MST_CODE: Record<string, string> = {
  prim: `function prim(adj, nodes, start) {
  const inTree = new Set([start]);
  const accepted = [];

  while (inTree.size < nodes.length) {
    let best = null; // cheapest edge crossing the frontier
    for (const u of inTree) {
      for (const { to, weight } of adj.get(u)) {
        if (!inTree.has(to) && (!best || weight < best.weight)) {
          best = { from: u, to, weight };
        }
      }
    }
    if (!best) break; // graph disconnected

    inTree.add(best.to);
    accepted.push(best);
  }
  return accepted;
}`,
  kruskal: `function kruskal(nodes, edges) {
  const sorted = [...edges].sort((a, b) => a.weight - b.weight);
  const uf = new UnionFind(nodes);
  const accepted = [];

  for (const e of sorted) {
    if (uf.find(e.from) !== uf.find(e.to)) {
      uf.union(e.from, e.to);
      accepted.push(e); // safe: doesn't close a cycle
    }
    // else: reject, would form a cycle
  }
  return accepted;
}`,
};
