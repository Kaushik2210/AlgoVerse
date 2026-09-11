import type { StepSequence } from "./types";

/**
 * Shared visualization state for every DP example in this module. 1D
 * problems (Fibonacci) are just a table with `rows = 1` — the same
 * DPTableView renderer handles both 1D and 2D tables uniformly.
 */
export interface DPVizState {
  rows: number;
  cols: number;
  rowLabels: string[];
  colLabels: string[];
  /** current table contents; null = not yet computed */
  grid: (number | null)[][];
  /** the cell being computed this step */
  current?: [number, number];
  /** the earlier cell(s) `current` depends on — rendered with connecting highlight/arrows */
  deps?: [number, number][];
  /** the final answer cell, highlighted once the table is complete */
  resultCell?: [number, number];
}

function cloneGrid(grid: (number | null)[][]): (number | null)[][] {
  return grid.map((row) => [...row]);
}

// ---------------------------------------------------------------------------
// 1. Fibonacci — the simplest possible DP: a 1D table, each cell depending on
//    exactly the two before it. Good first example for memoization vs
//    tabulation intuition.
// ---------------------------------------------------------------------------

export function fibonacciSteps(n: number): StepSequence<DPVizState> {
  const cols = n + 1;
  const grid: (number | null)[][] = [Array(cols).fill(null)];
  const rowLabels = ["dp"];
  const colLabels = Array.from({ length: cols }, (_, i) => `${i}`);
  const steps: StepSequence<DPVizState> = [];

  const snapshot = (extra: Partial<DPVizState> = {}): DPVizState => ({
    rows: 1,
    cols,
    rowLabels,
    colLabels,
    grid: cloneGrid(grid),
    ...extra,
  });

  steps.push({
    state: snapshot(),
    narration: `Build a 1D table dp[0..${n}] — dp[i] will hold the i-th Fibonacci number. Bottom-up tabulation: fill it left to right instead of recursing top-down.`,
    highlightedLine: 2,
    stats: { n },
  });

  if (cols > 0) {
    grid[0][0] = 0;
    steps.push({
      state: snapshot({ current: [0, 0] }),
      narration: "Base case: dp[0] = 0.",
      highlightedLine: 3,
      stats: { i: 0, "dp[i]": 0 },
    });
  }
  if (cols > 1) {
    grid[0][1] = 1;
    steps.push({
      state: snapshot({ current: [0, 1] }),
      narration: "Base case: dp[1] = 1.",
      highlightedLine: 4,
      stats: { i: 1, "dp[i]": 1 },
    });
  }

  for (let i = 2; i <= n; i++) {
    steps.push({
      state: snapshot({ current: [0, i], deps: [[0, i - 1], [0, i - 2]] }),
      narration: `dp[${i}] depends on dp[${i - 1}] (${grid[0][i - 1]}) and dp[${i - 2}] (${grid[0][i - 2]}).`,
      highlightedLine: 5,
      stats: { i },
    });
    grid[0][i] = grid[0][i - 1]! + grid[0][i - 2]!;
    steps.push({
      state: snapshot({ current: [0, i], deps: [[0, i - 1], [0, i - 2]] }),
      narration: `dp[${i}] = dp[${i - 1}] + dp[${i - 2}] = ${grid[0][i]}.`,
      highlightedLine: 6,
      stats: { i, "dp[i]": grid[0][i]! },
    });
  }

  steps.push({
    state: snapshot({ resultCell: [0, n] }),
    narration: `Done. Fibonacci(${n}) = dp[${n}] = ${grid[0][n]}.`,
    highlightedLine: 8,
    stats: { answer: grid[0][n]! },
  });

  return steps;
}

export const FIBONACCI_CODE = `function fibonacci(n) {
  const dp = new Array(n + 1);
  dp[0] = 0;
  dp[1] = 1;
  for (let i = 2; i <= n; i++) {
    dp[i] = dp[i - 1] + dp[i - 2];
  }
  return dp[n];
}`;

// ---------------------------------------------------------------------------
// 2. 0/1 Knapsack — the canonical 2D DP: dp[i][w] = best value using the
//    first i items with capacity w. Each cell depends on the row above
//    (skip the item) and, if it fits, a cell further left on that same row
//    (take the item).
// ---------------------------------------------------------------------------

export interface KnapsackItem {
  name: string;
  weight: number;
  value: number;
}

// classic textbook instance — verified answer: 9 (items "B" + "C", weight
// 3+4=7, value 4+5=9; every other combination that fits capacity 7 scores lower)
export const KNAPSACK_ITEMS: KnapsackItem[] = [
  { name: "A", weight: 1, value: 1 },
  { name: "B", weight: 3, value: 4 },
  { name: "C", weight: 4, value: 5 },
  { name: "D", weight: 5, value: 7 },
];
export const KNAPSACK_CAPACITY = 7;

export function knapsackSteps(
  items: KnapsackItem[],
  capacity: number
): StepSequence<DPVizState> {
  const n = items.length;
  const rows = n + 1;
  const cols = capacity + 1;
  const grid: (number | null)[][] = Array.from({ length: rows }, () =>
    Array(cols).fill(null)
  );
  const rowLabels = ["∅", ...items.map((it) => it.name)];
  const colLabels = Array.from({ length: cols }, (_, w) => `${w}`);
  const steps: StepSequence<DPVizState> = [];

  const snapshot = (extra: Partial<DPVizState> = {}): DPVizState => ({
    rows,
    cols,
    rowLabels,
    colLabels,
    grid: cloneGrid(grid),
    ...extra,
  });

  steps.push({
    state: snapshot(),
    narration: `Build a (${n}+1) x (${capacity}+1) table. dp[i][w] = the max value achievable using only the first i items with total weight ≤ w.`,
    highlightedLine: 3,
    stats: { items: n, capacity },
  });

  for (let w = 0; w < cols; w++) grid[0][w] = 0;
  steps.push({
    state: snapshot(),
    narration: "Base row: with zero items available, the best value for any capacity is 0.",
    highlightedLine: 3,
    stats: { row: 0 },
  });

  for (let i = 1; i <= n; i++) {
    const item = items[i - 1];
    for (let w = 0; w < cols; w++) {
      const fits = item.weight <= w;
      const deps: [number, number][] = fits
        ? [[i - 1, w], [i - 1, w - item.weight]]
        : [[i - 1, w]];
      const skipValue = grid[i - 1][w]!;
      const takeValue = fits ? grid[i - 1][w - item.weight]! + item.value : null;

      steps.push({
        state: snapshot({ current: [i, w], deps }),
        narration: fits
          ? `Item ${item.name} (wt ${item.weight}, val ${item.value}) fits in capacity ${w}. Compare skipping it (dp[${i - 1}][${w}] = ${skipValue}) vs taking it (dp[${i - 1}][${w - item.weight}] + ${item.value} = ${takeValue}).`
          : `Item ${item.name} (wt ${item.weight}) doesn't fit in capacity ${w} — must skip: dp[${i}][${w}] = dp[${i - 1}][${w}] = ${skipValue}.`,
        highlightedLine: fits ? 11 : 9,
        stats: { i, w },
      });

      const value = takeValue === null ? skipValue : Math.max(skipValue, takeValue);
      grid[i][w] = value;

      steps.push({
        state: snapshot({ current: [i, w], deps }),
        narration: `dp[${i}][${w}] = ${value}${fits && takeValue !== null && takeValue > skipValue ? " (took the item)" : fits ? " (skipped — not worth it)" : ""}.`,
        highlightedLine: fits ? 11 : 9,
        stats: { i, w, "dp[i][w]": value },
      });
    }
  }

  steps.push({
    state: snapshot({ resultCell: [n, capacity] }),
    narration: `Done. With all ${n} items and capacity ${capacity}, the best achievable value is dp[${n}][${capacity}] = ${grid[n][capacity]}.`,
    highlightedLine: 16,
    stats: { answer: grid[n][capacity]! },
  });

  return steps;
}

export const KNAPSACK_CODE = `function knapsack(items, capacity) {
  const n = items.length;
  const dp = Array.from({ length: n + 1 }, () => new Array(capacity + 1).fill(0));

  for (let i = 1; i <= n; i++) {
    const { weight, value } = items[i - 1];
    for (let w = 0; w <= capacity; w++) {
      if (weight > w) {
        dp[i][w] = dp[i - 1][w];
      } else {
        dp[i][w] = Math.max(dp[i - 1][w], dp[i - 1][w - weight] + value);
      }
    }
  }

  return dp[n][capacity];
}`;

// ---------------------------------------------------------------------------
// 3. Longest Common Subsequence — the other canonical 2D DP shape, but with
//    a diagonal dependency on a match instead of "skip vs take". Extremely
//    visual: the diagonal streak of increments is easy to spot once filled.
// ---------------------------------------------------------------------------

// classic GeeksforGeeks instance — verified answer: 4 ("GTAB")
export const LCS_STRING_A = "AGGTAB";
export const LCS_STRING_B = "GXTXAYB";

export function lcsSteps(a: string, b: string): StepSequence<DPVizState> {
  const n = a.length;
  const m = b.length;
  const rows = n + 1;
  const cols = m + 1;
  const grid: (number | null)[][] = Array.from({ length: rows }, () =>
    Array(cols).fill(null)
  );
  const rowLabels = ["∅", ...a.split("")];
  const colLabels = ["∅", ...b.split("")];
  const steps: StepSequence<DPVizState> = [];

  const snapshot = (extra: Partial<DPVizState> = {}): DPVizState => ({
    rows,
    cols,
    rowLabels,
    colLabels,
    grid: cloneGrid(grid),
    ...extra,
  });

  steps.push({
    state: snapshot(),
    narration: `Build a (${n}+1) x (${m}+1) table comparing "${a}" against "${b}". dp[i][j] = the LCS length of the first i characters of a and the first j characters of b.`,
    highlightedLine: 3,
    stats: { lenA: n, lenB: m },
  });

  for (let i = 0; i < rows; i++) grid[i][0] = 0;
  for (let j = 0; j < cols; j++) grid[0][j] = 0;
  steps.push({
    state: snapshot(),
    narration: "Base row and column: comparing against an empty string always gives LCS length 0.",
    highlightedLine: 3,
    stats: {},
  });

  for (let i = 1; i < rows; i++) {
    for (let j = 1; j < cols; j++) {
      const match = a[i - 1] === b[j - 1];
      const deps: [number, number][] = match
        ? [[i - 1, j - 1]]
        : [[i - 1, j], [i, j - 1]];

      steps.push({
        state: snapshot({ current: [i, j], deps }),
        narration: match
          ? `'${a[i - 1]}' matches '${b[j - 1]}' — extend the diagonal: dp[${i}][${j}] = dp[${i - 1}][${j - 1}] + 1 = ${grid[i - 1][j - 1]} + 1.`
          : `'${a[i - 1]}' ≠ '${b[j - 1]}' — take the best of dropping either character: dp[${i}][${j}] = max(dp[${i - 1}][${j}], dp[${i}][${j - 1}]) = max(${grid[i - 1][j]}, ${grid[i][j - 1]}).`,
        highlightedLine: match ? 8 : 10,
        stats: { i, j },
      });

      grid[i][j] = match
        ? grid[i - 1][j - 1]! + 1
        : Math.max(grid[i - 1][j]!, grid[i][j - 1]!);

      steps.push({
        state: snapshot({ current: [i, j], deps }),
        narration: `dp[${i}][${j}] = ${grid[i][j]}.`,
        highlightedLine: match ? 8 : 10,
        stats: { i, j, "dp[i][j]": grid[i][j]! },
      });
    }
  }

  steps.push({
    state: snapshot({ resultCell: [n, m] }),
    narration: `Done. The longest common subsequence of "${a}" and "${b}" has length dp[${n}][${m}] = ${grid[n][m]}.`,
    highlightedLine: 15,
    stats: { answer: grid[n][m]! },
  });

  return steps;
}

export const LCS_CODE = `function longestCommonSubsequence(a, b) {
  const n = a.length, m = b.length;
  const dp = Array.from({ length: n + 1 }, () => new Array(m + 1).fill(0));

  for (let i = 1; i <= n; i++) {
    for (let j = 1; j <= m; j++) {
      if (a[i - 1] === b[j - 1]) {
        dp[i][j] = dp[i - 1][j - 1] + 1;
      } else {
        dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1]);
      }
    }
  }

  return dp[n][m];
}`;
