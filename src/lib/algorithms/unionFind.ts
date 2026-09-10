import type { StepSequence } from "./types";

export interface UnionFindVizState {
  parent: number[];
  rank: number[];
  labels: string[];
  /** node currently being visited while walking up during find() */
  current?: number;
  /** nodes visited so far on the current find() walk, root included */
  path?: number[];
  /** nodes whose parent pointer was just rewired straight to the root (path compression) */
  compressed?: number[];
  /** the two elements being unioned this step */
  unionPair?: [number, number];
  /** the two roots identified before merging */
  roots?: [number, number];
  /** the root that "won" a union this step */
  mergedRoot?: number;
}

function snap(state: UnionFindVizState): UnionFindVizState {
  return { ...state, parent: [...state.parent], rank: [...state.rank] };
}

function findRoot(parent: number[], x: number): number {
  while (parent[x] !== x) x = parent[x];
  return x;
}

export const DSU_LABELS = ["A", "B", "C", "D", "E", "F"];

export function makeSingletons(n: number): { parent: number[]; rank: number[] } {
  return { parent: Array.from({ length: n }, (_, i) => i), rank: Array(n).fill(0) };
}

// ---------------------------------------------------------------------------
// Union by rank — find each element's root, then attach the shorter tree
// under the taller tree's root (ties bump the winning root's rank by one).
// ---------------------------------------------------------------------------
export function unionManySteps(
  labels: string[],
  pairs: [number, number][]
): StepSequence<UnionFindVizState> {
  const { parent, rank } = makeSingletons(labels.length);
  const steps: StepSequence<UnionFindVizState> = [];
  let setCount = labels.length;

  steps.push({
    state: snap({ parent, rank, labels }),
    narration: `Start with ${labels.length} singleton sets — every element is its own parent (a tree of size 1).`,
    highlightedLine: 1,
    stats: { sets: setCount },
  });

  for (const [a, b] of pairs) {
    steps.push({
      state: snap({ parent, rank, labels, unionPair: [a, b] }),
      narration: `union(${labels[a]}, ${labels[b]}) — find each element's root first.`,
      highlightedLine: 2,
      stats: { sets: setCount },
    });

    const ra = findRoot(parent, a);
    const rb = findRoot(parent, b);

    if (ra === rb) {
      steps.push({
        state: snap({ parent, rank, labels, unionPair: [a, b], roots: [ra, rb] }),
        narration: `${labels[a]} and ${labels[b]} both lead to root ${labels[ra]} — already in the same set, nothing to do.`,
        highlightedLine: 4,
        stats: { sets: setCount },
      });
      continue;
    }

    steps.push({
      state: snap({ parent, rank, labels, unionPair: [a, b], roots: [ra, rb] }),
      narration: `Roots differ: ${labels[a]} → ${labels[ra]} (rank ${rank[ra]}), ${labels[b]} → ${labels[rb]} (rank ${rank[rb]}). Attach the lower-rank tree under the higher-rank root.`,
      highlightedLine: 6,
      stats: { sets: setCount },
    });

    let winner: number;
    let loser: number;
    let tie = false;
    if (rank[ra] < rank[rb]) {
      winner = rb;
      loser = ra;
    } else if (rank[ra] > rank[rb]) {
      winner = ra;
      loser = rb;
    } else {
      winner = ra;
      loser = rb;
      tie = true;
      rank[winner]++;
    }
    parent[loser] = winner;
    setCount--;

    steps.push({
      state: snap({ parent, rank, labels, mergedRoot: winner }),
      narration: tie
        ? `Equal rank — attach ${labels[loser]}'s tree under ${labels[winner]} and bump ${labels[winner]}'s rank to ${rank[winner]}.`
        : `${labels[loser]}'s tree is now attached under root ${labels[winner]}.`,
      highlightedLine: 11,
      stats: { sets: setCount },
    });
  }

  steps.push({
    state: snap({ parent, rank, labels }),
    narration: `Done. ${setCount} disjoint set(s) remain.`,
    highlightedLine: 14,
    stats: { sets: setCount },
  });
  return steps;
}

// ---------------------------------------------------------------------------
// Find with path compression — walk up to the root, then rewire every node
// visited along the way to point directly at that root.
// ---------------------------------------------------------------------------
export function findPathCompressionSteps(
  labels: string[],
  initialParent: number[],
  target: number
): StepSequence<UnionFindVizState> {
  const parent = [...initialParent];
  const rank = Array(labels.length).fill(0);
  const steps: StepSequence<UnionFindVizState> = [];

  steps.push({
    state: snap({ parent, rank, labels }),
    narration: `find(${labels[target]}) — walk up parent pointers until reaching a node that is its own parent (the root).`,
    highlightedLine: 1,
    stats: { depth: 0 },
  });

  const path: number[] = [];
  let x = target;
  while (parent[x] !== x) {
    path.push(x);
    steps.push({
      state: snap({ parent, rank, labels, current: x, path: [...path] }),
      narration: `${labels[x]}'s parent is ${labels[parent[x]]} — keep walking up.`,
      highlightedLine: 2,
      stats: { depth: path.length },
    });
    x = parent[x];
  }
  const root = x;
  path.push(root);
  steps.push({
    state: snap({ parent, rank, labels, current: root, path: [...path] }),
    narration: `Reached ${labels[root]} — its own parent, so it's the root. Path length before compression: ${path.length}.`,
    highlightedLine: 2,
    stats: { depth: path.length },
  });

  const toCompress = path.slice(0, -1);
  if (toCompress.length > 1) {
    steps.push({
      state: snap({ parent, rank, labels, path: [...path] }),
      narration: `Path compression: point every node visited on this walk directly at root ${labels[root]} — the next find() on any of them becomes O(1).`,
      highlightedLine: 3,
      stats: { depth: path.length },
    });
  }
  for (const node of toCompress) parent[node] = root;

  steps.push({
    state: snap({ parent, rank, labels, compressed: [...toCompress], current: root }),
    narration:
      toCompress.length > 1
        ? `Path compressed — ${toCompress.map((n) => labels[n]).join(", ")} now point directly at root ${labels[root]}. The tree just flattened from depth ${path.length - 1} to depth 1.`
        : `${labels[target]} was already directly under the root — nothing to compress.`,
    highlightedLine: 3,
    stats: { depth: 1 },
  });

  return steps;
}

/** A deliberately chain-shaped forest — A→B→C→D→E→F(root) — so find()'s
 * path compression has something dramatic to flatten. */
export function buildChainDemo(labels: string[]): number[] {
  return labels.map((_, i) => (i === labels.length - 1 ? i : i + 1));
}

export const UNION_FIND_CODE: Record<string, string> = {
  union: `function union(parent, rank, a, b) {
  const ra = find(parent, a);
  const rb = find(parent, b);
  if (ra === rb) return; // already in the same set

  if (rank[ra] < rank[rb]) {
    parent[ra] = rb;
  } else if (rank[ra] > rank[rb]) {
    parent[rb] = ra;
  } else {
    parent[rb] = ra;
    rank[ra]++;
  }
}`,
  find: `function find(parent, x) {
  if (parent[x] !== x) {
    parent[x] = find(parent, parent[x]); // path compression
  }
  return parent[x];
}`,
};
