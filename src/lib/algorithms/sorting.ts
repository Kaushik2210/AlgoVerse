import type { StepSequence } from "./types";

export interface SortVizState {
  array: number[];
  /** indices currently being compared — rendered cyan */
  comparing?: number[];
  /** indices currently being swapped/written — rendered cyan + glow */
  swapping?: number[];
  /** indices in their final sorted position — rendered violet */
  sorted?: number[];
  /** pivot / current-minimum index (quicksort, selection sort, heap sort) */
  pivot?: number;
  /** the active sub-range other elements are dimmed against (merge/quick sort) */
  range?: [number, number];
  /** running total — real counts, not placeholders, used for race-mode stats */
  comparisons: number;
  swaps: number;
}

type StepList = StepSequence<SortVizState>;

function range(a: number, b: number): number[] {
  const r: number[] = [];
  for (let i = a; i <= b; i++) r.push(i);
  return r;
}

function allIndices(n: number): number[] {
  return Array.from({ length: n }, (_, i) => i);
}

// ---------------------------------------------------------------------------
// Bubble sort
// ---------------------------------------------------------------------------

export function bubbleSortSteps(input: number[]): StepList {
  const arr = [...input];
  const n = arr.length;
  const steps: StepList = [];
  let comparisons = 0;
  let swaps = 0;
  const sortedIdx: number[] = [];

  const push = (extra: Partial<SortVizState>, narration: string, highlightedLine?: number) => {
    steps.push({
      state: { array: [...arr], comparisons, swaps, sorted: [...sortedIdx], ...extra },
      narration,
      highlightedLine,
      stats: { comparisons, swaps },
    });
  };

  push({}, "Starting bubble sort — repeatedly step through the array, swapping adjacent out-of-order pairs.", 1);

  for (let i = 0; i < n - 1; i++) {
    let swappedThisPass = false;
    for (let j = 0; j < n - 1 - i; j++) {
      comparisons++;
      push({ comparing: [j, j + 1] }, `Compare index ${j} (${arr[j]}) and ${j + 1} (${arr[j + 1]}).`, 4);
      if (arr[j] > arr[j + 1]) {
        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
        swaps++;
        swappedThisPass = true;
        push({ swapping: [j, j + 1] }, `Out of order — swap them.`, 5);
      }
    }
    sortedIdx.unshift(n - 1 - i);
    if (!swappedThisPass) break;
  }
  for (let k = 0; k < n; k++) if (!sortedIdx.includes(k)) sortedIdx.push(k);

  push({ sorted: allIndices(n) }, "Array fully sorted.", 9);
  return steps;
}

export const BUBBLE_SORT_CODE = `function bubbleSort(arr) {
  const n = arr.length;
  for (let i = 0; i < n - 1; i++) {
    let swapped = false;
    for (let j = 0; j < n - 1 - i; j++) {
      if (arr[j] > arr[j + 1]) {
        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
        swapped = true;
      }
    }
    if (!swapped) break;
  }
  return arr;
}`;

// ---------------------------------------------------------------------------
// Insertion sort
// ---------------------------------------------------------------------------

export function insertionSortSteps(input: number[]): StepList {
  const arr = [...input];
  const n = arr.length;
  const steps: StepList = [];
  let comparisons = 0;
  let swaps = 0;

  const push = (extra: Partial<SortVizState>, narration: string, highlightedLine?: number) => {
    steps.push({
      state: { array: [...arr], comparisons, swaps, ...extra },
      narration,
      highlightedLine,
      stats: { comparisons, swaps },
    });
  };

  push({ sorted: n > 0 ? [0] : [] }, "Starting insertion sort — grow a sorted prefix one element at a time.", 1);

  for (let i = 1; i < n; i++) {
    let j = i;
    push({ comparing: [i], sorted: range(0, i - 1) }, `Picking up index ${i} (${arr[i]}) to insert into the sorted prefix.`, 3);
    while (j > 0) {
      comparisons++;
      if (arr[j - 1] > arr[j]) {
        [arr[j - 1], arr[j]] = [arr[j], arr[j - 1]];
        swaps++;
        push({ comparing: [j - 1, j], sorted: range(0, i - 1) }, `${arr[j]} < ${arr[j - 1]} — shift it left.`, 6);
        j--;
      } else {
        break;
      }
    }
    push({ sorted: range(0, i) }, `Index ${i} is now in place within the sorted prefix.`, 8);
  }

  push({ sorted: range(0, n - 1) }, "Array fully sorted.", 10);
  return steps;
}

export const INSERTION_SORT_CODE = `function insertionSort(arr) {
  for (let i = 1; i < arr.length; i++) {
    let j = i;
    while (j > 0 && arr[j - 1] > arr[j]) {
      [arr[j - 1], arr[j]] = [arr[j], arr[j - 1]];
      j--;
    }
  }
  return arr;
}`;

// ---------------------------------------------------------------------------
// Selection sort
// ---------------------------------------------------------------------------

export function selectionSortSteps(input: number[]): StepList {
  const arr = [...input];
  const n = arr.length;
  const steps: StepList = [];
  let comparisons = 0;
  let swaps = 0;
  const sortedIdx: number[] = [];

  const push = (extra: Partial<SortVizState>, narration: string, highlightedLine?: number) => {
    steps.push({
      state: { array: [...arr], comparisons, swaps, sorted: [...sortedIdx], ...extra },
      narration,
      highlightedLine,
      stats: { comparisons, swaps },
    });
  };

  push({}, "Starting selection sort — find the minimum of the unsorted suffix, swap it to the front.", 1);

  for (let i = 0; i < n - 1; i++) {
    let minIdx = i;
    push({ comparing: [i], pivot: minIdx }, `Assume index ${i} (${arr[i]}) is the minimum of the remaining range.`, 3);
    for (let j = i + 1; j < n; j++) {
      comparisons++;
      push({ comparing: [j], pivot: minIdx }, `Compare index ${j} (${arr[j]}) against current min (${arr[minIdx]}).`, 5);
      if (arr[j] < arr[minIdx]) {
        minIdx = j;
        push({ comparing: [j], pivot: minIdx }, `New minimum at index ${j}.`, 6);
      }
    }
    if (minIdx !== i) {
      [arr[i], arr[minIdx]] = [arr[minIdx], arr[i]];
      swaps++;
      push({ swapping: [i, minIdx] }, `Swap index ${i} with the minimum found at index ${minIdx}.`, 9);
    }
    sortedIdx.push(i);
    push({ sorted: [...sortedIdx] }, `Index ${i} is finalized.`, 10);
  }
  sortedIdx.push(n - 1);

  push({ sorted: allIndices(n) }, "Array fully sorted.", 12);
  return steps;
}

export const SELECTION_SORT_CODE = `function selectionSort(arr) {
  const n = arr.length;
  for (let i = 0; i < n - 1; i++) {
    let minIdx = i;
    for (let j = i + 1; j < n; j++) {
      if (arr[j] < arr[minIdx]) minIdx = j;
    }
    if (minIdx !== i) {
      [arr[i], arr[minIdx]] = [arr[minIdx], arr[i]];
    }
  }
  return arr;
}`;

// ---------------------------------------------------------------------------
// Merge sort
// ---------------------------------------------------------------------------

export function mergeSortSteps(input: number[]): StepList {
  const arr = [...input];
  const n = arr.length;
  const steps: StepList = [];
  let comparisons = 0;
  let swaps = 0; // counts writes into the working array

  const push = (extra: Partial<SortVizState>, narration: string, highlightedLine?: number) => {
    steps.push({
      state: { array: [...arr], comparisons, swaps, ...extra },
      narration,
      highlightedLine,
      stats: { comparisons, writes: swaps },
    });
  };

  push({}, "Starting merge sort — divide the array in half recursively, then merge sorted halves.", 1);

  function merge(lo: number, mid: number, hi: number) {
    const left = arr.slice(lo, mid + 1);
    const right = arr.slice(mid + 1, hi + 1);
    let i = 0;
    let j = 0;
    let k = lo;
    push({ range: [lo, hi] }, `Merging sorted ranges [${lo}..${mid}] and [${mid + 1}..${hi}].`, 8);
    while (i < left.length && j < right.length) {
      comparisons++;
      if (left[i] <= right[j]) {
        arr[k] = left[i];
        i++;
      } else {
        arr[k] = right[j];
        j++;
      }
      swaps++;
      push({ range: [lo, hi], comparing: [k] }, `Place ${arr[k]} at index ${k}.`, 10);
      k++;
    }
    while (i < left.length) {
      arr[k] = left[i];
      i++;
      swaps++;
      push({ range: [lo, hi], comparing: [k] }, `Copy remaining left element ${arr[k]} to index ${k}.`, 12);
      k++;
    }
    while (j < right.length) {
      arr[k] = right[j];
      j++;
      swaps++;
      push({ range: [lo, hi], comparing: [k] }, `Copy remaining right element ${arr[k]} to index ${k}.`, 13);
      k++;
    }
    push({ range: [lo, hi], sorted: range(lo, hi) }, `Range [${lo}..${hi}] is fully merged and sorted.`, 15);
  }

  function mergeSort(lo: number, hi: number) {
    if (lo >= hi) return;
    const mid = Math.floor((lo + hi) / 2);
    mergeSort(lo, mid);
    mergeSort(mid + 1, hi);
    merge(lo, mid, hi);
  }

  mergeSort(0, n - 1);
  push({ sorted: allIndices(n) }, "Array fully sorted.", 18);
  return steps;
}

export const MERGE_SORT_CODE = `function mergeSort(arr, lo = 0, hi = arr.length - 1) {
  if (lo >= hi) return arr;
  const mid = Math.floor((lo + hi) / 2);
  mergeSort(arr, lo, mid);
  mergeSort(arr, mid + 1, hi);
  merge(arr, lo, mid, hi);
  return arr;
}

function merge(arr, lo, mid, hi) {
  const left = arr.slice(lo, mid + 1);
  const right = arr.slice(mid + 1, hi + 1);
  let i = 0, j = 0, k = lo;
  while (i < left.length && j < right.length) {
    arr[k++] = left[i] <= right[j] ? left[i++] : right[j++];
  }
  while (i < left.length) arr[k++] = left[i++];
  while (j < right.length) arr[k++] = right[j++];
}`;

// ---------------------------------------------------------------------------
// Quick sort (Lomuto partition scheme, last element as pivot)
// ---------------------------------------------------------------------------

export function quickSortSteps(input: number[]): StepList {
  const arr = [...input];
  const n = arr.length;
  const steps: StepList = [];
  let comparisons = 0;
  let swaps = 0;
  const sortedIdx: number[] = [];

  const push = (extra: Partial<SortVizState>, narration: string, highlightedLine?: number) => {
    steps.push({
      state: { array: [...arr], comparisons, swaps, sorted: [...sortedIdx], ...extra },
      narration,
      highlightedLine,
      stats: { comparisons, swaps },
    });
  };

  push({}, "Starting quicksort — partition the range around a pivot, then recurse on each side.", 1);

  function qs(lo: number, hi: number) {
    if (lo > hi) return;
    if (lo === hi) {
      sortedIdx.push(lo);
      return;
    }
    const pivotIdx = hi;
    const pivotVal = arr[pivotIdx];
    push({ pivot: pivotIdx, range: [lo, hi] }, `Pivot = index ${pivotIdx} (${pivotVal}).`, 5);
    let i = lo - 1;
    for (let j = lo; j < hi; j++) {
      comparisons++;
      push({ pivot: pivotIdx, comparing: [j], range: [lo, hi] }, `Compare index ${j} (${arr[j]}) to pivot ${pivotVal}.`, 8);
      if (arr[j] < pivotVal) {
        i++;
        if (i !== j) {
          [arr[i], arr[j]] = [arr[j], arr[i]];
          swaps++;
          push({ pivot: pivotIdx, swapping: [i, j], range: [lo, hi] }, `${arr[i]} belongs left of the pivot — swap index ${i} and ${j}.`, 10);
        }
      }
    }
    [arr[i + 1], arr[hi]] = [arr[hi], arr[i + 1]];
    swaps++;
    push({ pivot: i + 1, swapping: [i + 1, hi], range: [lo, hi] }, `Move the pivot into its final sorted position at index ${i + 1}.`, 14);
    sortedIdx.push(i + 1);
    qs(lo, i);
    qs(i + 2, hi);
  }

  qs(0, n - 1);
  push({ sorted: allIndices(n) }, "Array fully sorted.", 18);
  return steps;
}

export const QUICK_SORT_CODE = `function quickSort(arr, lo = 0, hi = arr.length - 1) {
  if (lo >= hi) return arr;
  const pivot = arr[hi];
  let i = lo - 1;
  for (let j = lo; j < hi; j++) {
    if (arr[j] < pivot) {
      i++;
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
  }
  [arr[i + 1], arr[hi]] = [arr[hi], arr[i + 1]];
  quickSort(arr, lo, i);
  quickSort(arr, i + 2, hi);
  return arr;
}`;

// ---------------------------------------------------------------------------
// Heap sort (binary max-heap over the array itself, no extra memory)
// ---------------------------------------------------------------------------

export function heapSortSteps(input: number[]): StepList {
  const arr = [...input];
  const n = arr.length;
  const steps: StepList = [];
  let comparisons = 0;
  let swaps = 0;
  const sortedIdx: number[] = [];

  const push = (extra: Partial<SortVizState>, narration: string, highlightedLine?: number) => {
    steps.push({
      state: { array: [...arr], comparisons, swaps, sorted: [...sortedIdx], ...extra },
      narration,
      highlightedLine,
      stats: { comparisons, swaps },
    });
  };

  push({}, "Starting heap sort — build a max-heap, then repeatedly move the max to the end and shrink the heap.", 1);

  function heapify(size: number, root: number) {
    let largest = root;
    const l = 2 * root + 1;
    const r = 2 * root + 2;
    if (l < size) {
      comparisons++;
      if (arr[l] > arr[largest]) largest = l;
    }
    if (r < size) {
      comparisons++;
      if (arr[r] > arr[largest]) largest = r;
    }
    push(
      { comparing: [root, l, r].filter((x) => x < size), pivot: largest },
      `Sift down from index ${root} — the largest of it and its children is index ${largest}.`,
      7
    );
    if (largest !== root) {
      [arr[root], arr[largest]] = [arr[largest], arr[root]];
      swaps++;
      push({ swapping: [root, largest] }, `Swap index ${root} and ${largest}.`, 9);
      heapify(size, largest);
    }
  }

  for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
    push({}, `Heapify the subtree rooted at index ${i}.`, 4);
    heapify(n, i);
  }
  push({}, "Max-heap built — the largest element now sits at index 0.", 11);

  for (let end = n - 1; end > 0; end--) {
    [arr[0], arr[end]] = [arr[end], arr[0]];
    swaps++;
    sortedIdx.push(end);
    push({ swapping: [0, end], sorted: [...sortedIdx] }, `Swap the max (index 0) with index ${end}, then shrink the heap and sift down.`, 15);
    heapify(end, 0);
  }
  sortedIdx.push(0);

  push({ sorted: allIndices(n) }, "Array fully sorted.", 19);
  return steps;
}

export const HEAP_SORT_CODE = `function heapSort(arr) {
  const n = arr.length;
  for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
    heapify(arr, n, i);
  }
  for (let end = n - 1; end > 0; end--) {
    [arr[0], arr[end]] = [arr[end], arr[0]];
    heapify(arr, end, 0);
  }
  return arr;
}

function heapify(arr, size, root) {
  let largest = root;
  const l = 2 * root + 1, r = 2 * root + 2;
  if (l < size && arr[l] > arr[largest]) largest = l;
  if (r < size && arr[r] > arr[largest]) largest = r;
  if (largest !== root) {
    [arr[root], arr[largest]] = [arr[largest], arr[root]];
    heapify(arr, size, largest);
  }
}`;

// ---------------------------------------------------------------------------
// Registry
// ---------------------------------------------------------------------------

export type SortAlgo = "bubble" | "insertion" | "selection" | "merge" | "quick" | "heap";

export const SORT_ALGOS: SortAlgo[] = ["bubble", "insertion", "selection", "merge", "quick", "heap"];

export const SORT_LABELS: Record<SortAlgo, string> = {
  bubble: "Bubble Sort",
  insertion: "Insertion Sort",
  selection: "Selection Sort",
  merge: "Merge Sort",
  quick: "Quick Sort",
  heap: "Heap Sort",
};

export const SORT_GENERATORS: Record<SortAlgo, (arr: number[]) => StepList> = {
  bubble: bubbleSortSteps,
  insertion: insertionSortSteps,
  selection: selectionSortSteps,
  merge: mergeSortSteps,
  quick: quickSortSteps,
  heap: heapSortSteps,
};

export const SORT_CODE: Record<SortAlgo, string> = {
  bubble: BUBBLE_SORT_CODE,
  insertion: INSERTION_SORT_CODE,
  selection: SELECTION_SORT_CODE,
  merge: MERGE_SORT_CODE,
  quick: QUICK_SORT_CODE,
  heap: HEAP_SORT_CODE,
};

export interface SortComplexity {
  best: string;
  average: string;
  worst: string;
  space: string;
  stable: string;
}

export const SORT_COMPLEXITY: Record<SortAlgo, SortComplexity> = {
  bubble: { best: "O(n)", average: "O(n²)", worst: "O(n²)", space: "O(1)", stable: "Yes" },
  insertion: { best: "O(n)", average: "O(n²)", worst: "O(n²)", space: "O(1)", stable: "Yes" },
  selection: { best: "O(n²)", average: "O(n²)", worst: "O(n²)", space: "O(1)", stable: "No" },
  merge: { best: "O(n log n)", average: "O(n log n)", worst: "O(n log n)", space: "O(n)", stable: "Yes" },
  quick: { best: "O(n log n)", average: "O(n log n)", worst: "O(n²)", space: "O(log n)", stable: "No" },
  heap: { best: "O(n log n)", average: "O(n log n)", worst: "O(n log n)", space: "O(1)", stable: "No" },
};

export const SORT_DEMO_ARRAY = [8, 3, 5, 1, 9, 2, 7, 4, 6];
