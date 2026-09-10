import type { StepSequence } from "./types";

export interface ArrayVizState {
  array: number[];
  /** indices currently being compared — rendered cyan */
  comparing?: number[];
  /** indices currently swapping */
  swapping?: number[];
  /** indices that are in their final sorted position — rendered violet */
  sorted?: number[];
  /** pivot index (quicksort) */
  pivot?: number;
  /** index found / target — rendered amber */
  found?: number;
  /** active search window [lo, hi] for binary search */
  range?: [number, number];
}

function snapshot(state: ArrayVizState): ArrayVizState {
  return { ...state, array: [...state.array] };
}

// ---------------------------------------------------------------------------
// Bubble sort
// ---------------------------------------------------------------------------
export function bubbleSortSteps(input: number[]): StepSequence<ArrayVizState> {
  const arr = [...input];
  const steps: StepSequence<ArrayVizState> = [];
  let comparisons = 0;
  let swaps = 0;
  const sorted: number[] = [];

  steps.push({
    state: snapshot({ array: arr }),
    narration: "Starting bubble sort — repeatedly step through the array, swapping adjacent out-of-order elements.",
    highlightedLine: 1,
    stats: { comparisons, swaps },
  });

  for (let i = 0; i < arr.length - 1; i++) {
    let swappedThisPass = false;
    for (let j = 0; j < arr.length - 1 - i; j++) {
      comparisons++;
      steps.push({
        state: snapshot({ array: arr, comparing: [j, j + 1], sorted: [...sorted] }),
        narration: `Comparing index ${j} (${arr[j]}) and index ${j + 1} (${arr[j + 1]}).`,
        highlightedLine: 4,
        stats: { comparisons, swaps },
      });
      if (arr[j] > arr[j + 1]) {
        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
        swaps++;
        swappedThisPass = true;
        steps.push({
          state: snapshot({ array: arr, swapping: [j, j + 1], sorted: [...sorted] }),
          narration: `${arr[j + 1]} > ${arr[j]} → swap.`,
          highlightedLine: 5,
          stats: { comparisons, swaps },
        });
      }
    }
    sorted.unshift(arr.length - 1 - i);
    if (!swappedThisPass) break;
  }
  for (let k = 0; k < arr.length; k++) if (!sorted.includes(k)) sorted.push(k);

  steps.push({
    state: snapshot({ array: arr, sorted: [...Array(arr.length).keys()] }),
    narration: "Array fully sorted.",
    highlightedLine: 9,
    stats: { comparisons, swaps },
  });
  return steps;
}

// ---------------------------------------------------------------------------
// Insertion sort
// ---------------------------------------------------------------------------
export function insertionSortSteps(input: number[]): StepSequence<ArrayVizState> {
  const arr = [...input];
  const steps: StepSequence<ArrayVizState> = [];
  let comparisons = 0;
  let shifts = 0;

  steps.push({
    state: snapshot({ array: arr, sorted: [0] }),
    narration: "Starting insertion sort — grow a sorted prefix one element at a time.",
    highlightedLine: 1,
    stats: { comparisons, shifts },
  });

  for (let i = 1; i < arr.length; i++) {
    const key = arr[i];
    let j = i - 1;
    steps.push({
      state: snapshot({ array: arr, comparing: [i], sorted: range(0, i - 1) }),
      narration: `Picking up index ${i} (${key}) to insert into the sorted prefix.`,
      highlightedLine: 3,
      stats: { comparisons, shifts },
    });
    while (j >= 0 && arr[j] > key) {
      comparisons++;
      arr[j + 1] = arr[j];
      shifts++;
      steps.push({
        state: snapshot({ array: arr, comparing: [j, j + 1], sorted: range(0, i - 1) }),
        narration: `${arr[j]} > ${key} → shift right.`,
        highlightedLine: 6,
        stats: { comparisons, shifts },
      });
      j--;
    }
    comparisons++;
    arr[j + 1] = key;
    steps.push({
      state: snapshot({ array: arr, sorted: range(0, i) }),
      narration: `Inserted ${key} at index ${j + 1}.`,
      highlightedLine: 8,
      stats: { comparisons, shifts },
    });
  }

  steps.push({
    state: snapshot({ array: arr, sorted: range(0, arr.length - 1) }),
    narration: "Array fully sorted.",
    highlightedLine: 10,
    stats: { comparisons, shifts },
  });
  return steps;
}

// ---------------------------------------------------------------------------
// Merge sort (bottom-level visualization operates on the flat working array)
// ---------------------------------------------------------------------------
export function mergeSortSteps(input: number[]): StepSequence<ArrayVizState> {
  const arr = [...input];
  const steps: StepSequence<ArrayVizState> = [];
  let comparisons = 0;
  let merges = 0;

  steps.push({
    state: snapshot({ array: arr }),
    narration: "Starting merge sort — divide the array in half recursively, then merge sorted halves.",
    highlightedLine: 1,
    stats: { comparisons, merges },
  });

  function mergeSort(lo: number, hi: number) {
    if (hi - lo <= 0) return;
    const mid = Math.floor((lo + hi) / 2);
    steps.push({
      state: snapshot({ array: arr, range: [lo, hi] }),
      narration: `Splitting [${lo}..${hi}] at mid ${mid}.`,
      highlightedLine: 3,
      stats: { comparisons, merges },
    });
    mergeSort(lo, mid);
    mergeSort(mid + 1, hi);

    const left = arr.slice(lo, mid + 1);
    const right = arr.slice(mid + 1, hi + 1);
    let i = 0;
    let j = 0;
    let k = lo;
    while (i < left.length && j < right.length) {
      comparisons++;
      steps.push({
        state: snapshot({ array: arr, comparing: [lo + i, mid + 1 + j], range: [lo, hi] }),
        narration: `Comparing ${left[i]} and ${right[j]}.`,
        highlightedLine: 8,
        stats: { comparisons, merges },
      });
      if (left[i] <= right[j]) arr[k++] = left[i++];
      else arr[k++] = right[j++];
    }
    while (i < left.length) arr[k++] = left[i++];
    while (j < right.length) arr[k++] = right[j++];
    merges++;
    steps.push({
      state: snapshot({ array: arr, sorted: range(lo, hi) }),
      narration: `Merged [${lo}..${hi}].`,
      highlightedLine: 12,
      stats: { comparisons, merges },
    });
  }

  mergeSort(0, arr.length - 1);
  steps.push({
    state: snapshot({ array: arr, sorted: range(0, arr.length - 1) }),
    narration: "Array fully sorted.",
    highlightedLine: 14,
    stats: { comparisons, merges },
  });
  return steps;
}

// ---------------------------------------------------------------------------
// Quick sort (Lomuto partition)
// ---------------------------------------------------------------------------
export function quickSortSteps(input: number[]): StepSequence<ArrayVizState> {
  const arr = [...input];
  const steps: StepSequence<ArrayVizState> = [];
  let comparisons = 0;
  let swaps = 0;
  const finalized: Set<number> = new Set();

  steps.push({
    state: snapshot({ array: arr }),
    narration: "Starting quicksort — pick a pivot, partition around it, recurse.",
    highlightedLine: 1,
    stats: { comparisons, swaps },
  });

  function swap(a: number, b: number) {
    [arr[a], arr[b]] = [arr[b], arr[a]];
    swaps++;
  }

  function partition(lo: number, hi: number): number {
    const pivot = arr[hi];
    steps.push({
      state: snapshot({ array: arr, pivot: hi, sorted: [...finalized] }),
      narration: `Pivot chosen: ${pivot} (index ${hi}).`,
      highlightedLine: 4,
      stats: { comparisons, swaps },
    });
    let i = lo - 1;
    for (let j = lo; j < hi; j++) {
      comparisons++;
      steps.push({
        state: snapshot({ array: arr, comparing: [j, hi], pivot: hi, sorted: [...finalized] }),
        narration: `${arr[j]} ${arr[j] < pivot ? "<" : ">="} pivot ${pivot}.`,
        highlightedLine: 6,
        stats: { comparisons, swaps },
      });
      if (arr[j] < pivot) {
        i++;
        if (i !== j) {
          swap(i, j);
          steps.push({
            state: snapshot({ array: arr, swapping: [i, j], pivot: hi, sorted: [...finalized] }),
            narration: `Swapped index ${i} and ${j}.`,
            highlightedLine: 8,
            stats: { comparisons, swaps },
          });
        }
      }
    }
    swap(i + 1, hi);
    finalized.add(i + 1);
    steps.push({
      state: snapshot({ array: arr, sorted: [...finalized], found: i + 1 }),
      narration: `Pivot placed at final position ${i + 1}.`,
      highlightedLine: 10,
      stats: { comparisons, swaps },
    });
    return i + 1;
  }

  function quickSort(lo: number, hi: number) {
    if (lo >= hi) {
      if (lo === hi) finalized.add(lo);
      return;
    }
    const p = partition(lo, hi);
    quickSort(lo, p - 1);
    quickSort(p + 1, hi);
  }

  quickSort(0, arr.length - 1);
  steps.push({
    state: snapshot({ array: arr, sorted: range(0, arr.length - 1) }),
    narration: "Array fully sorted.",
    highlightedLine: 13,
    stats: { comparisons, swaps },
  });
  return steps;
}

// ---------------------------------------------------------------------------
// Binary search
// ---------------------------------------------------------------------------
export function binarySearchSteps(
  sortedInput: number[],
  target: number
): StepSequence<ArrayVizState> {
  const arr = [...sortedInput];
  const steps: StepSequence<ArrayVizState> = [];
  let lo = 0;
  let hi = arr.length - 1;
  let comparisons = 0;

  steps.push({
    state: snapshot({ array: arr, range: [lo, hi] }),
    narration: `Searching for ${target} in a sorted array of ${arr.length}.`,
    highlightedLine: 1,
    stats: { comparisons },
  });

  while (lo <= hi) {
    const mid = Math.floor((lo + hi) / 2);
    comparisons++;
    steps.push({
      state: snapshot({ array: arr, comparing: [mid], range: [lo, hi] }),
      narration: `Midpoint index ${mid} = ${arr[mid]}.`,
      highlightedLine: 4,
      stats: { comparisons },
    });
    if (arr[mid] === target) {
      steps.push({
        state: snapshot({ array: arr, found: mid }),
        narration: `Found ${target} at index ${mid}.`,
        highlightedLine: 6,
        stats: { comparisons },
      });
      return steps;
    } else if (arr[mid] < target) {
      steps.push({
        state: snapshot({ array: arr, range: [mid + 1, hi] }),
        narration: `${arr[mid]} < ${target} → search right half.`,
        highlightedLine: 8,
        stats: { comparisons },
      });
      lo = mid + 1;
    } else {
      steps.push({
        state: snapshot({ array: arr, range: [lo, mid - 1] }),
        narration: `${arr[mid]} > ${target} → search left half.`,
        highlightedLine: 10,
        stats: { comparisons },
      });
      hi = mid - 1;
    }
  }

  steps.push({
    state: snapshot({ array: arr }),
    narration: `${target} is not in the array.`,
    highlightedLine: 13,
    stats: { comparisons },
  });
  return steps;
}

function range(lo: number, hi: number): number[] {
  const out: number[] = [];
  for (let i = lo; i <= hi; i++) out.push(i);
  return out;
}

export const SORT_CODE: Record<string, string> = {
  bubble: `function bubbleSort(arr) {
  for (let i = 0; i < arr.length - 1; i++) {
    for (let j = 0; j < arr.length - 1 - i; j++) {
      if (arr[j] > arr[j + 1]) {
        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
      }
    }
  }
  return arr;
}`,
  insertion: `function insertionSort(arr) {
  for (let i = 1; i < arr.length; i++) {
    const key = arr[i];
    let j = i - 1;
    while (j >= 0 && arr[j] > key) {
      arr[j + 1] = arr[j];
      j--;
    }
    arr[j + 1] = key;
  }
  return arr;
}`,
  merge: `function mergeSort(arr, lo = 0, hi = arr.length - 1) {
  if (hi - lo <= 0) return arr;
  const mid = Math.floor((lo + hi) / 2);
  mergeSort(arr, lo, mid);
  mergeSort(arr, mid + 1, hi);
  const left = arr.slice(lo, mid + 1);
  const right = arr.slice(mid + 1, hi + 1);
  let i = 0, j = 0, k = lo;
  while (i < left.length && j < right.length) {
    arr[k++] = left[i] <= right[j] ? left[i++] : right[j++];
  }
  while (i < left.length) arr[k++] = left[i++];
  while (j < right.length) arr[k++] = right[j++];
  return arr;
}`,
  quick: `function quickSort(arr, lo = 0, hi = arr.length - 1) {
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
}`,
  binarySearch: `function binarySearch(arr, target) {
  let lo = 0, hi = arr.length - 1;
  while (lo <= hi) {
    const mid = Math.floor((lo + hi) / 2);
    if (arr[mid] === target) return mid;
    else if (arr[mid] < target) lo = mid + 1;
    else hi = mid - 1;
  }
  return -1;
}`,
};
