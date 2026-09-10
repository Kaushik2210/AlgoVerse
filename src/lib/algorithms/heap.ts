import type { StepSequence } from "./types";

export type HeapKind = "min" | "max";

export interface HeapVizState {
  /** array representation of the heap, index 0 = root */
  array: number[];
  /** indices currently being compared */
  comparing?: number[];
  /** indices involved in a swap this step */
  swapping?: number[];
  /** index that just settled into its final spot */
  settled?: number;
  /** index of the node just inserted / extracted */
  target?: number;
}

function snap(state: HeapVizState): HeapVizState {
  return { ...state, array: [...state.array] };
}

const parentOf = (i: number) => Math.floor((i - 1) / 2);
const leftOf = (i: number) => i * 2 + 1;
const rightOf = (i: number) => i * 2 + 2;

function better(kind: HeapKind, a: number, b: number): boolean {
  return kind === "min" ? a < b : a > b;
}

// ---------------------------------------------------------------------------
// Insert — push to the end, bubble up
// ---------------------------------------------------------------------------
export function heapInsertSteps(
  initial: number[],
  value: number,
  kind: HeapKind
): StepSequence<HeapVizState> {
  const arr = [...initial];
  const steps: StepSequence<HeapVizState> = [];
  const cmp = kind === "min" ? "smaller" : "larger";

  steps.push({
    state: snap({ array: arr }),
    narration: `Inserting ${value} into the ${kind}-heap.`,
    highlightedLine: 1,
    stats: { size: arr.length },
  });

  arr.push(value);
  let i = arr.length - 1;
  steps.push({
    state: snap({ array: arr, target: i }),
    narration: `Place ${value} at the next free slot (index ${i}) — the end of the array.`,
    highlightedLine: 2,
    stats: { size: arr.length },
  });

  while (i > 0) {
    const p = parentOf(i);
    steps.push({
      state: snap({ array: arr, comparing: [i, p], target: i }),
      narration: `Compare ${arr[i]} (index ${i}) with parent ${arr[p]} (index ${p}).`,
      highlightedLine: 4,
      stats: { size: arr.length },
    });
    if (better(kind, arr[i], arr[p])) {
      steps.push({
        state: snap({ array: arr, swapping: [i, p], target: p }),
        narration: `${arr[i]} is ${cmp} than parent ${arr[p]} — swap up.`,
        highlightedLine: 5,
        stats: { size: arr.length },
      });
      [arr[i], arr[p]] = [arr[p], arr[i]];
      i = p;
    } else {
      steps.push({
        state: snap({ array: arr, settled: i }),
        narration: `Heap property holds — ${arr[i]} stays put.`,
        highlightedLine: 6,
        stats: { size: arr.length },
      });
      break;
    }
  }

  steps.push({
    state: snap({ array: arr, settled: i }),
    narration: `Insert complete. ${value} bubbled up to index ${i}.`,
    highlightedLine: 8,
    stats: { size: arr.length },
  });
  return steps;
}

// ---------------------------------------------------------------------------
// Extract root — swap last to root, pop, bubble down (heapify)
// ---------------------------------------------------------------------------
export function heapExtractSteps(
  initial: number[],
  kind: HeapKind
): StepSequence<HeapVizState> {
  const arr = [...initial];
  const steps: StepSequence<HeapVizState> = [];

  steps.push({
    state: snap({ array: arr }),
    narration: arr.length === 0 ? "Heap is empty — nothing to extract." : `Extracting the root: ${arr[0]}.`,
    highlightedLine: 1,
    stats: { size: arr.length },
  });

  if (arr.length === 0) return steps;

  if (arr.length === 1) {
    const root = arr.pop()!;
    steps.push({
      state: snap({ array: arr }),
      narration: `Only one node — removing it leaves an empty heap. Extracted ${root}.`,
      highlightedLine: 2,
      stats: { size: arr.length },
    });
    return steps;
  }

  const extracted = arr[0];
  const last = arr.pop()!;
  arr[0] = last;
  steps.push({
    state: snap({ array: arr, target: 0 }),
    narration: `Move the last element (${last}) to the root, replacing extracted value ${extracted}.`,
    highlightedLine: 3,
    stats: { size: arr.length },
  });

  let i = 0;
  const cmp = kind === "min" ? "smaller" : "larger";
  while (true) {
    const l = leftOf(i);
    const r = rightOf(i);
    let candidate = i;
    if (l < arr.length) {
      steps.push({
        state: snap({ array: arr, comparing: [candidate, l], target: i }),
        narration: `Compare ${arr[candidate]} (index ${candidate}) with left child ${arr[l]} (index ${l}).`,
        highlightedLine: 6,
        stats: { size: arr.length },
      });
      if (better(kind, arr[l], arr[candidate])) candidate = l;
    }
    if (r < arr.length) {
      steps.push({
        state: snap({ array: arr, comparing: [candidate, r], target: i }),
        narration: `Compare ${arr[candidate]} (index ${candidate}) with right child ${arr[r]} (index ${r}).`,
        highlightedLine: 7,
        stats: { size: arr.length },
      });
      if (better(kind, arr[r], arr[candidate])) candidate = r;
    }

    if (candidate === i) {
      steps.push({
        state: snap({ array: arr, settled: i }),
        narration: `${arr[i]} is already ${cmp === "smaller" ? "smaller than" : "larger than"} both children (or has none) — heapify-down done.`,
        highlightedLine: 9,
        stats: { size: arr.length },
      });
      break;
    }

    steps.push({
      state: snap({ array: arr, swapping: [i, candidate] }),
      narration: `Swap ${arr[i]} down with ${arr[candidate]} (index ${candidate}) to restore the heap property.`,
      highlightedLine: 10,
      stats: { size: arr.length },
    });
    [arr[i], arr[candidate]] = [arr[candidate], arr[i]];
    i = candidate;
  }

  steps.push({
    state: snap({ array: arr, settled: i }),
    narration: `Extraction complete. Removed root value: ${extracted}.`,
    highlightedLine: 12,
    stats: { size: arr.length, extracted },
  });
  return steps;
}

// ---------------------------------------------------------------------------
// Build a heap from an arbitrary array (bottom-up heapify) — used to seed a
// starting state for the visualizer's custom-input control.
// ---------------------------------------------------------------------------
export function buildHeap(values: number[], kind: HeapKind): number[] {
  const arr = [...values];
  for (let i = Math.floor(arr.length / 2) - 1; i >= 0; i--) {
    siftDown(arr, i, kind);
  }
  return arr;
}

function siftDown(arr: number[], start: number, kind: HeapKind) {
  let i = start;
  while (true) {
    const l = leftOf(i);
    const r = rightOf(i);
    let candidate = i;
    if (l < arr.length && better(kind, arr[l], arr[candidate])) candidate = l;
    if (r < arr.length && better(kind, arr[r], arr[candidate])) candidate = r;
    if (candidate === i) break;
    [arr[i], arr[candidate]] = [arr[candidate], arr[i]];
    i = candidate;
  }
}

export const HEAP_CODE: Record<string, string> = {
  insert: `function insert(heap, value, kind) {
  heap.push(value);
  let i = heap.length - 1;
  while (i > 0) {
    const p = Math.floor((i - 1) / 2);
    if (better(kind, heap[i], heap[p])) {
      [heap[i], heap[p]] = [heap[p], heap[i]];
      i = p;
    } else break;
  }
  return heap;
}`,
  extract: `function extractRoot(heap, kind) {
  const root = heap[0];
  const last = heap.pop();
  if (heap.length === 0) return root;
  heap[0] = last;

  let i = 0;
  while (true) {
    const l = 2 * i + 1, r = 2 * i + 2;
    let best = i;
    if (l < heap.length && better(kind, heap[l], heap[best])) best = l;
    if (r < heap.length && better(kind, heap[r], heap[best])) best = r;
    if (best === i) break;
    [heap[i], heap[best]] = [heap[best], heap[i]];
    i = best;
  }
  return root;
}`,
};
