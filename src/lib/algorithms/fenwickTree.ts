import type { StepSequence } from "./types";

export interface FenwickVizState {
  /** 1-indexed backing array, tree[0] is unused padding so tree[i] lines up with index i */
  tree: number[];
  /** original values, 0-indexed, kept in sync for display */
  array: number[];
  /** index currently being visited on the jump walk */
  current?: number;
  /** full sequence of indices visited so far this operation, in order */
  path: number[];
  /** running prefix-sum total accumulated so far (query only) */
  result?: number;
  /** the delta being added at each stop (update only) */
  delta?: number;
  /** the query bound n, or the updated array index (0-indexed), for narration/highlighting */
  targetIndex?: number;
}

function snap(state: FenwickVizState): FenwickVizState {
  return { ...state, tree: [...state.tree], array: [...state.array], path: [...state.path] };
}

/** i & -i — the lowest set bit, i.e. the size of the range index i is responsible for. */
export function lowbit(i: number): number {
  return i & -i;
}

/** Plain build (no steps) — used to seed query/update silently. */
export function buildFenwick(array: number[]): number[] {
  const n = array.length;
  const tree = new Array(n + 1).fill(0);
  for (let i = 0; i < n; i++) {
    let idx = i + 1;
    while (idx <= n) {
      tree[idx] += array[i];
      idx += lowbit(idx);
    }
  }
  return tree;
}

/** Naive prefix sum, used only to cross-check correctness in tests/verification. */
export function naivePrefixSum(array: number[], n: number): number {
  let sum = 0;
  for (let i = 0; i < Math.min(n, array.length); i++) sum += array[i];
  return sum;
}

// ---------------------------------------------------------------------------
// Build — insert each element one at a time via point updates, each one
// showing the i += lowbit(i) climb through its ancestor indices.
// ---------------------------------------------------------------------------
export function buildSteps(array: number[]): StepSequence<FenwickVizState> {
  const n = array.length;
  const tree = new Array(n + 1).fill(0);
  const steps: StepSequence<FenwickVizState> = [];

  steps.push({
    state: snap({ tree, array, path: [] }),
    narration: `Building a Fenwick tree (BIT) over [${array.join(", ")}] — an implicit array of size n+1 where each index's responsibility range is determined by its lowest set bit.`,
    highlightedLine: 1,
  });

  for (let i = 0; i < n; i++) {
    let idx = i + 1;
    const path: number[] = [];
    while (idx <= n) {
      path.push(idx);
      tree[idx] += array[i];
      steps.push({
        state: snap({ tree, array, current: idx, path: [...path], delta: array[i], targetIndex: i }),
        narration: `Inserting array[${i}] = ${array[i]}: add to tree[${idx}] (now ${tree[idx]}), responsibility range width ${lowbit(idx)}. Next: ${idx} + lowbit(${idx}) = ${idx} + ${lowbit(idx)} = ${idx + lowbit(idx)}.`,
        highlightedLine: 4,
        stats: { index: idx, lowbit: lowbit(idx), next: idx + lowbit(idx) },
      });
      idx += lowbit(idx);
    }
  }

  steps.push({
    state: snap({ tree, array, path: [] }),
    narration: `Build complete — Fenwick array ready for O(log n) prefix-sum queries and point updates.`,
    highlightedLine: 6,
  });
  return steps;
}

// ---------------------------------------------------------------------------
// Prefix-sum query — walk i -= lowbit(i) from the query bound down to 0,
// accumulating tree[i] at each stop.
// ---------------------------------------------------------------------------
export function querySteps(array: number[], n: number): StepSequence<FenwickVizState> {
  const tree = buildFenwick(array);
  const clampedN = Math.max(0, Math.min(n, array.length));
  const steps: StepSequence<FenwickVizState> = [];
  const path: number[] = [];
  let result = 0;

  steps.push({
    state: snap({ tree, array, path: [], result: 0, targetIndex: clampedN }),
    narration: `Querying prefix sum of the first ${clampedN} element(s) — sum(array[0..${clampedN - 1}]).`,
    highlightedLine: 1,
  });

  let idx = clampedN;
  if (idx === 0) {
    steps.push({
      state: snap({ tree, array, path: [], result: 0, targetIndex: clampedN }),
      narration: `n = 0 — prefix sum is trivially 0, no indices to visit.`,
      highlightedLine: 2,
    });
  }
  while (idx > 0) {
    path.push(idx);
    result += tree[idx];
    steps.push({
      state: snap({ tree, array, current: idx, path: [...path], result, targetIndex: clampedN }),
      narration: `tree[${idx}] = ${tree[idx]} — running total ${result}. Next: ${idx} - lowbit(${idx}) = ${idx} - ${lowbit(idx)} = ${idx - lowbit(idx)}.`,
      highlightedLine: 4,
      stats: { index: idx, lowbit: lowbit(idx), next: idx - lowbit(idx), running: result },
    });
    idx -= lowbit(idx);
  }

  const naive = naivePrefixSum(array, clampedN);
  steps.push({
    state: snap({ tree, array, path: [...path], result, targetIndex: clampedN }),
    narration: `Query complete after visiting ${path.length} index(es) — prefix sum = ${result} (matches naive O(n) sum: ${naive}).`,
    highlightedLine: 6,
    stats: { result, naive, jumps: path.length },
  });
  return steps;
}

// ---------------------------------------------------------------------------
// Point update — walk i += lowbit(i) from the target index up to n,
// applying the delta at each stop.
// ---------------------------------------------------------------------------
export function updateSteps(array: number[], index: number, newValue: number): StepSequence<FenwickVizState> {
  const n = array.length;
  const tree = buildFenwick(array);
  const clampedIndex = Math.max(0, Math.min(index, n - 1));
  const oldValue = array[clampedIndex];
  const delta = newValue - oldValue;
  const steps: StepSequence<FenwickVizState> = [];
  const path: number[] = [];

  steps.push({
    state: snap({ tree, array, path: [], delta, targetIndex: clampedIndex }),
    narration: `Updating array[${clampedIndex}]: ${oldValue} → ${newValue} (delta ${delta >= 0 ? "+" : ""}${delta}). Add the delta to every ancestor index.`,
    highlightedLine: 1,
  });

  let idx = clampedIndex + 1;
  while (idx <= n) {
    path.push(idx);
    tree[idx] += delta;
    steps.push({
      state: snap({ tree, array, current: idx, path: [...path], delta, targetIndex: clampedIndex }),
      narration: `tree[${idx}] += ${delta} → ${tree[idx]}. Next: ${idx} + lowbit(${idx}) = ${idx} + ${lowbit(idx)} = ${idx + lowbit(idx)}.`,
      highlightedLine: 4,
      stats: { index: idx, lowbit: lowbit(idx), next: idx + lowbit(idx) },
    });
    idx += lowbit(idx);
  }

  const newArray = [...array];
  newArray[clampedIndex] = newValue;
  steps.push({
    state: snap({ tree, array: newArray, path: [...path], delta, targetIndex: clampedIndex }),
    narration: `Update propagated through ${path.length} ancestor index(es) — done.`,
    highlightedLine: 6,
    stats: { touched: path.length },
  });
  return steps;
}

export const FENWICK_TREE_CODE: Record<string, string> = {
  build: `function build(array) {
  const n = array.length;
  const tree = new Array(n + 1).fill(0);
  for (let i = 0; i < n; i++) update(tree, i, array[i]);
  return tree;
}`,
  query: `function prefixSum(tree, n) {
  let sum = 0;
  for (let i = n; i > 0; i -= i & -i) {
    sum += tree[i]; // i & -i is lowbit(i)
  }
  return sum;
}`,
  update: `function update(tree, index, delta) {
  for (let i = index + 1; i < tree.length; i += i & -i) {
    tree[i] += delta;
  }
}`,
};
