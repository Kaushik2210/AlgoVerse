import type { StepSequence } from "./types";
import type { ArrayVizState } from "./arrays";
import { buildBST, type BSTVizState } from "./bst";
import type { LinkedListVizState, LinkedListNode } from "./linkedList";
import type { StackVizState } from "./stack";
import type { HeapVizState } from "./heap";

function snapshotArr(state: ArrayVizState): ArrayVizState {
  return { ...state, array: [...state.array] };
}

// ---------------------------------------------------------------------------
// Two Pointers — "Container With Most Water" as the demonstrative example
// ---------------------------------------------------------------------------
export function twoPointersDemoSteps(heights: number[]): StepSequence<ArrayVizState> {
  const arr = [...heights];
  const steps: StepSequence<ArrayVizState> = [];
  let left = 0;
  let right = arr.length - 1;
  let best = 0;
  let bestPair: [number, number] = [left, right];

  steps.push({
    state: snapshotArr({ array: arr, comparing: [left, right] }),
    narration: "Two pointers start at opposite ends of the array.",
    highlightedLine: 1,
    stats: { left, right, best },
  });

  while (left < right) {
    const width = right - left;
    const area = width * Math.min(arr[left], arr[right]);
    if (area > best) {
      best = area;
      bestPair = [left, right];
    }
    steps.push({
      state: snapshotArr({ array: arr, comparing: [left, right] }),
      narration: `Area between ${left} and ${right} = ${width} × min(${arr[left]}, ${arr[right]}) = ${area}.`,
      highlightedLine: 3,
      stats: { left, right, best },
    });
    if (arr[left] < arr[right]) {
      steps.push({
        state: snapshotArr({ array: arr, comparing: [left, right] }),
        narration: `Left wall (${arr[left]}) is shorter — moving left pointer inward.`,
        highlightedLine: 5,
        stats: { left, right, best },
      });
      left++;
    } else {
      steps.push({
        state: snapshotArr({ array: arr, comparing: [left, right] }),
        narration: `Right wall (${arr[right]}) is shorter or equal — moving right pointer inward.`,
        highlightedLine: 7,
        stats: { left, right, best },
      });
      right--;
    }
  }

  steps.push({
    state: snapshotArr({ array: arr, found: bestPair[0], sorted: [bestPair[1]] }),
    narration: `Pointers met. Best container area found: ${best}.`,
    highlightedLine: 9,
    stats: { best },
  });
  return steps;
}

// ---------------------------------------------------------------------------
// Sliding Window — fixed-size max-sum-subarray demonstration
// ---------------------------------------------------------------------------
export function slidingWindowDemoSteps(
  values: number[],
  k: number
): StepSequence<ArrayVizState> {
  const arr = [...values];
  const steps: StepSequence<ArrayVizState> = [];
  let sum = 0;
  for (let i = 0; i < k; i++) sum += arr[i];
  let best = sum;
  let bestStart = 0;

  steps.push({
    state: snapshotArr({ array: arr, range: [0, k - 1] }),
    narration: `Build the initial window of size ${k}. Sum = ${sum}.`,
    highlightedLine: 1,
    stats: { windowSum: sum, best },
  });

  for (let end = k; end < arr.length; end++) {
    const start = end - k + 1;
    sum += arr[end] - arr[end - k];
    steps.push({
      state: snapshotArr({ array: arr, range: [start, end], comparing: [end] }),
      narration: `Slide window: add index ${end} (${arr[end]}), drop index ${end - k} (${arr[end - k]}). Sum = ${sum}.`,
      highlightedLine: 4,
      stats: { windowSum: sum, best },
    });
    if (sum > best) {
      best = sum;
      bestStart = start;
    }
  }

  steps.push({
    state: snapshotArr({ array: arr, range: [bestStart, bestStart + k - 1], found: bestStart }),
    narration: `Best window sum found: ${best}, starting at index ${bestStart}.`,
    highlightedLine: 6,
    stats: { best },
  });
  return steps;
}

// ---------------------------------------------------------------------------
// Tree BFS — level-order traversal, visualized as a queue draining
// ---------------------------------------------------------------------------
export function treeBfsDemoSteps(values: number[]): StepSequence<BSTVizState> {
  const root = buildBST(values);
  const steps: StepSequence<BSTVizState> = [];
  if (!root) return steps;

  const order: number[] = [];
  const visited: string[] = [];
  const queue = [root];

  steps.push({
    state: { root, traversalOrder: [] },
    narration: "Enqueue the root. BFS explores level by level using a queue.",
    highlightedLine: 1,
  });

  while (queue.length) {
    const node = queue.shift()!;
    order.push(node.value);
    visited.push(node.id);
    steps.push({
      state: { root, current: node.id, visited: [...visited], traversalOrder: [...order] },
      narration: `Dequeue ${node.value}. Visit order so far: [${order.join(", ")}]`,
      highlightedLine: 3,
    });
    if (node.left) queue.push(node.left);
    if (node.right) queue.push(node.right);
  }

  steps.push({
    state: { root, traversalOrder: order },
    narration: `Level-order traversal complete: [${order.join(", ")}]`,
    highlightedLine: 6,
  });
  return steps;
}

// ---------------------------------------------------------------------------
// Fast & Slow Pointers — finding the middle of a linked list (Floyd's slow/
// fast technique; the same pointer race also detects cycles, covered in the
// theory section since a flat node list can't represent a real cycle).
// ---------------------------------------------------------------------------
let fastSlowIdCounter = 0;
function fastSlowNid() {
  fastSlowIdCounter++;
  return `fs${fastSlowIdCounter}`;
}

export function fastSlowMiddleSteps(values: number[]): StepSequence<LinkedListVizState> {
  const nodes: LinkedListNode[] = values.map((v) => ({ id: fastSlowNid(), value: v }));
  const n = nodes.length;
  const steps: StepSequence<LinkedListVizState> = [];
  let slow = 0;
  let fast = 0;

  steps.push({
    state: { nodes: [...nodes], slow, fast },
    narration: "Both pointers start at the head. Slow advances 1 node per tick, fast advances 2.",
    highlightedLine: 2,
    stats: { slow, fast },
  });

  while (fast < n - 1) {
    slow += 1;
    fast += 2;
    if (fast > n - 1) fast = n - 1;
    steps.push({
      state: { nodes: [...nodes], slow, fast },
      narration: `Slow hops to index ${slow}. Fast hops to index ${fast}.`,
      highlightedLine: 4,
      stats: { slow, fast },
    });
  }

  steps.push({
    state: { nodes: [...nodes], found: slow },
    narration: `Fast pointer ran out of room at the end — slow is sitting at the middle: index ${slow} (value ${nodes[slow]?.value}).`,
    highlightedLine: 7,
    stats: { slow, fast },
  });

  return steps;
}

// ---------------------------------------------------------------------------
// Monotonic Stack — Next Greater Element demonstration, rendered as an array
// (current scan position + resolved indices) alongside the stack of indices
// still waiting for their next greater element.
// ---------------------------------------------------------------------------
export interface MonotonicStackVizState {
  arr: ArrayVizState;
  stack: StackVizState;
}

let monoIdCounter = 0;
function monoNid() {
  monoIdCounter++;
  return `mono${monoIdCounter}`;
}

export function monotonicStackDemoSteps(values: number[]): StepSequence<MonotonicStackVizState> {
  const arr = [...values];
  const result: number[] = Array(arr.length).fill(-1);
  const stackIdx: number[] = [];
  const stackItems: { id: string; value: number }[] = [];
  const resolvedIdx: number[] = [];
  const steps: StepSequence<MonotonicStackVizState> = [];

  function snapshot(comparing?: number[]): MonotonicStackVizState {
    return {
      arr: { array: [...arr], comparing, sorted: [...resolvedIdx] },
      stack: { items: stackItems.map((it) => ({ ...it })) },
    };
  }

  steps.push({
    state: snapshot(),
    narration:
      "Scanning left to right. The stack holds indices still waiting to find their 'next greater element'.",
    highlightedLine: 1,
    stats: { stackSize: 0 },
  });

  for (let i = 0; i < arr.length; i++) {
    steps.push({
      state: snapshot([i]),
      narration: `Looking at index ${i} (value ${arr[i]}).`,
      highlightedLine: 3,
      stats: { stackSize: stackItems.length },
    });

    while (stackIdx.length > 0 && arr[stackIdx[stackIdx.length - 1]] < arr[i]) {
      const poppedIdx = stackIdx.pop()!;
      stackItems.pop();
      result[poppedIdx] = arr[i];
      resolvedIdx.push(poppedIdx);
      steps.push({
        state: snapshot([i]),
        narration: `${arr[i]} > ${arr[poppedIdx]} (index ${poppedIdx}) — pop it. Its next greater element is ${arr[i]}.`,
        highlightedLine: 5,
        stats: { stackSize: stackItems.length },
      });
    }

    stackIdx.push(i);
    stackItems.push({ id: monoNid(), value: arr[i] });
    steps.push({
      state: snapshot([i]),
      narration: `Push index ${i} (value ${arr[i]}) — its next greater element isn't known yet.`,
      highlightedLine: 8,
      stats: { stackSize: stackItems.length },
    });
  }

  steps.push({
    state: snapshot(),
    narration: `Scan complete. The ${stackItems.length} index(es) still on the stack have no next greater element (-1). Result: [${result.join(", ")}]`,
    highlightedLine: 10,
    stats: { stackSize: stackItems.length },
  });

  return steps;
}

// ---------------------------------------------------------------------------
// Merge Intervals — sort by start, sweep left to right, merge overlapping
// intervals into a running "current" interval.
// ---------------------------------------------------------------------------
export interface Interval {
  id: string;
  start: number;
  end: number;
}

export interface IntervalVizState {
  intervals: Interval[];
  /** ids currently being compared against the running merge */
  comparing?: string[];
  /** ids that are finalized, merged results */
  merged?: string[];
  min: number;
  max: number;
}

let intervalIdCounter = 0;
function intervalNid() {
  intervalIdCounter++;
  return `iv${intervalIdCounter}`;
}

export function mergeIntervalsSteps(raw: [number, number][]): StepSequence<IntervalVizState> {
  const sorted = [...raw].sort((a, b) => a[0] - b[0]);
  const intervals: Interval[] = sorted.map(([start, end]) => ({ id: intervalNid(), start, end }));
  const steps: StepSequence<IntervalVizState> = [];
  const min = Math.min(...sorted.map((s) => s[0]));
  const max = Math.max(...sorted.map((s) => s[1]));
  const mergedIds: string[] = [];

  function snapshot(comparing?: string[]): IntervalVizState {
    return { intervals: intervals.map((iv) => ({ ...iv })), comparing, merged: [...mergedIds], min, max };
  }

  steps.push({
    state: snapshot(),
    narration: `Sort ${intervals.length} intervals by start value, then sweep left to right.`,
    highlightedLine: 1,
    stats: { count: intervals.length },
  });

  if (intervals.length === 0) return steps;

  let current = intervals[0];
  mergedIds.push(current.id);
  steps.push({
    state: snapshot([current.id]),
    narration: `Start with [${current.start}, ${current.end}] as the running merged interval.`,
    highlightedLine: 3,
  });

  for (let i = 1; i < intervals.length; i++) {
    const next = intervals[i];
    steps.push({
      state: snapshot([current.id, next.id]),
      narration: `Compare running interval [${current.start}, ${current.end}] with [${next.start}, ${next.end}].`,
      highlightedLine: 5,
    });

    if (next.start <= current.end) {
      current.end = Math.max(current.end, next.end);
      next.start = current.start;
      next.end = current.end;
      mergedIds.push(next.id);
      steps.push({
        state: snapshot([current.id, next.id]),
        narration: `${next.start <= current.end ? "Overlaps" : "Touches"} — merge into [${current.start}, ${current.end}].`,
        highlightedLine: 6,
      });
    } else {
      steps.push({
        state: snapshot([current.id, next.id]),
        narration: `[${next.start}, ${next.end}] starts after the running interval ends — no overlap. Close out [${current.start}, ${current.end}] and start fresh.`,
        highlightedLine: 8,
      });
      current = next;
      mergedIds.push(current.id);
    }
  }

  steps.push({
    state: snapshot(),
    narration: "Sweep complete — every overlapping run has been merged into one interval.",
    highlightedLine: 10,
  });
  return steps;
}

// ---------------------------------------------------------------------------
// Top K Elements — maintain a size-k min-heap while scanning a stream; any
// value larger than the heap's root displaces the root, so the heap always
// holds the k largest values seen so far.
// ---------------------------------------------------------------------------
export interface TopKVizState {
  heap: HeapVizState;
  /** index into the stream currently being considered */
  streamIndex?: number;
  stream: number[];
}

function siftUpMin(arr: number[]) {
  let i = arr.length - 1;
  while (i > 0) {
    const p = Math.floor((i - 1) / 2);
    if (arr[i] < arr[p]) {
      [arr[i], arr[p]] = [arr[p], arr[i]];
      i = p;
    } else break;
  }
}

function siftDownMin(arr: number[]) {
  let i = 0;
  while (true) {
    const l = 2 * i + 1;
    const r = 2 * i + 2;
    let smallest = i;
    if (l < arr.length && arr[l] < arr[smallest]) smallest = l;
    if (r < arr.length && arr[r] < arr[smallest]) smallest = r;
    if (smallest === i) break;
    [arr[i], arr[smallest]] = [arr[smallest], arr[i]];
    i = smallest;
  }
}

export function topKSteps(stream: number[], k: number): StepSequence<TopKVizState> {
  const heap: number[] = [];
  const steps: StepSequence<TopKVizState> = [];

  function snapshot(streamIndex?: number, extra?: Partial<HeapVizState>): TopKVizState {
    return { heap: { array: [...heap], ...extra }, streamIndex, stream };
  }

  steps.push({
    state: snapshot(),
    narration: `Maintain a min-heap of size ${k}. It will always hold the ${k} largest values seen so far.`,
    highlightedLine: 1,
    stats: { k },
  });

  for (let i = 0; i < stream.length; i++) {
    const value = stream[i];
    steps.push({
      state: snapshot(i),
      narration: `Looking at ${value} (stream index ${i}).`,
      highlightedLine: 3,
      stats: { heapSize: heap.length },
    });

    if (heap.length < k) {
      heap.push(value);
      siftUpMin(heap);
      steps.push({
        state: snapshot(i, { target: heap.length - 1 }),
        narration: `Heap has fewer than ${k} elements — push ${value} straight in.`,
        highlightedLine: 4,
        stats: { heapSize: heap.length },
      });
    } else if (value > heap[0]) {
      steps.push({
        state: snapshot(i, { comparing: [0] }),
        narration: `${value} > heap root ${heap[0]} — it belongs in the top ${k}. Replace the root and heapify down.`,
        highlightedLine: 6,
        stats: { heapSize: heap.length },
      });
      heap[0] = value;
      siftDownMin(heap);
      steps.push({
        state: snapshot(i, { settled: 0 }),
        narration: `Root replaced with ${value} and sifted down to restore the min-heap property.`,
        highlightedLine: 7,
        stats: { heapSize: heap.length },
      });
    } else {
      steps.push({
        state: snapshot(i, { comparing: [0] }),
        narration: `${value} <= heap root ${heap[0]} — it's not in the top ${k}. Discard it.`,
        highlightedLine: 9,
        stats: { heapSize: heap.length },
      });
    }
  }

  steps.push({
    state: snapshot(undefined),
    narration: `Scan complete. The heap holds the ${k} largest values: [${[...heap].sort((a, b) => b - a).join(", ")}]`,
    highlightedLine: 11,
    stats: { heapSize: heap.length },
  });
  return steps;
}

// ---------------------------------------------------------------------------
// Modified Binary Search — search a rotated sorted array. There's no single
// sorted [lo, hi] range anymore, but at least one half of any window always
// is — check which, then decide whether the target could be in it.
// ---------------------------------------------------------------------------
export function modifiedBinarySearchSteps(
  input: number[],
  target: number
): StepSequence<ArrayVizState> {
  const array = [...input];
  const steps: StepSequence<ArrayVizState> = [];
  let lo = 0;
  let hi = array.length - 1;
  let comparisons = 0;

  steps.push({
    state: snapshotArr({ array, range: [lo, hi] }),
    narration: `Searching for ${target} in a rotated sorted array. There's no single sorted range — but at least one half of any [lo, hi] window is always sorted.`,
    highlightedLine: 2,
    stats: { comparisons },
  });

  while (lo <= hi) {
    const mid = Math.floor((lo + hi) / 2);
    comparisons++;
    steps.push({
      state: snapshotArr({ array, comparing: [mid], range: [lo, hi] }),
      narration: `mid = ${mid}, array[mid] = ${array[mid]}.`,
      highlightedLine: 4,
      stats: { comparisons },
    });

    if (array[mid] === target) {
      steps.push({
        state: snapshotArr({ array, found: mid }),
        narration: `Found ${target} at index ${mid}.`,
        highlightedLine: 5,
        stats: { comparisons },
      });
      return steps;
    }

    if (array[lo] <= array[mid]) {
      steps.push({
        state: snapshotArr({ array, comparing: [lo, mid], range: [lo, hi] }),
        narration: `array[lo]=${array[lo]} <= array[mid]=${array[mid]} → the left half [${lo}..${mid}] is sorted.`,
        highlightedLine: 8,
        stats: { comparisons },
      });
      if (array[lo] <= target && target < array[mid]) {
        steps.push({
          state: snapshotArr({ array, range: [lo, mid - 1] }),
          narration: `${target} falls inside the sorted left half [${array[lo]}, ${array[mid]}) → search there.`,
          highlightedLine: 9,
          stats: { comparisons },
        });
        hi = mid - 1;
      } else {
        steps.push({
          state: snapshotArr({ array, range: [mid + 1, hi] }),
          narration: `${target} is outside the sorted left half → it must be in the right half, if anywhere.`,
          highlightedLine: 11,
          stats: { comparisons },
        });
        lo = mid + 1;
      }
    } else {
      steps.push({
        state: snapshotArr({ array, comparing: [mid, hi], range: [lo, hi] }),
        narration: `array[lo]=${array[lo]} > array[mid]=${array[mid]} → the right half (${mid}..${hi}] is sorted instead.`,
        highlightedLine: 13,
        stats: { comparisons },
      });
      if (array[mid] < target && target <= array[hi]) {
        steps.push({
          state: snapshotArr({ array, range: [mid + 1, hi] }),
          narration: `${target} falls inside the sorted right half (${array[mid]}, ${array[hi]}] → search there.`,
          highlightedLine: 14,
          stats: { comparisons },
        });
        lo = mid + 1;
      } else {
        steps.push({
          state: snapshotArr({ array, range: [lo, mid - 1] }),
          narration: `${target} is outside the sorted right half → it must be in the left half, if anywhere.`,
          highlightedLine: 16,
          stats: { comparisons },
        });
        hi = mid - 1;
      }
    }
  }

  steps.push({
    state: snapshotArr({ array }),
    narration: `${target} is not in the array.`,
    highlightedLine: 19,
    stats: { comparisons },
  });
  return steps;
}

// ---------------------------------------------------------------------------
// Cyclic Sort — for arrays holding 1..n (or 0..n-1), place every value at its
// "correct" index via swaps instead of a general-purpose sort.
// ---------------------------------------------------------------------------
export function cyclicSortSteps(input: number[]): StepSequence<ArrayVizState> {
  const arr = [...input];
  const steps: StepSequence<ArrayVizState> = [];
  const settled: number[] = [];
  let i = 0;
  let swaps = 0;

  steps.push({
    state: snapshotArr({ array: arr }),
    narration: "Every value from 1..n belongs at index value-1. Walk the array once, swapping each value straight to its home index.",
    highlightedLine: 1,
    stats: { i, swaps },
  });

  while (i < arr.length) {
    const correctIdx = arr[i] - 1;
    if (arr[i] !== arr[correctIdx]) {
      steps.push({
        state: snapshotArr({ array: arr, comparing: [i, correctIdx], sorted: [...settled] }),
        narration: `arr[${i}] = ${arr[i]} belongs at index ${correctIdx} — swap it there.`,
        highlightedLine: 3,
        stats: { i, swaps },
      });
      [arr[i], arr[correctIdx]] = [arr[correctIdx], arr[i]];
      swaps++;
      steps.push({
        state: snapshotArr({ array: arr, swapping: [i, correctIdx], sorted: [...settled] }),
        narration: `Swapped. Index ${i} now holds ${arr[i]} — check it again before moving on.`,
        highlightedLine: 4,
        stats: { i, swaps },
      });
    } else {
      settled.push(i);
      steps.push({
        state: snapshotArr({ array: arr, sorted: [...settled] }),
        narration: `arr[${i}] = ${arr[i]} is already at its correct index — move on.`,
        highlightedLine: 6,
        stats: { i, swaps },
      });
      i++;
    }
  }

  steps.push({
    state: snapshotArr({ array: arr, sorted: arr.map((_, idx) => idx) }),
    narration: `Every value now sits at index (value - 1). Sorted in ${swaps} swaps, one linear pass.`,
    highlightedLine: 8,
    stats: { swaps },
  });
  return steps;
}

// ---------------------------------------------------------------------------
// Bit Manipulation — XOR every element together. Duplicates cancel out
// (x ^ x = 0), so whatever survives is the single non-duplicated value.
// ---------------------------------------------------------------------------
export function singleNumberXorSteps(nums: number[]): StepSequence<ArrayVizState> {
  const arr = [...nums];
  const steps: StepSequence<ArrayVizState> = [];
  let acc = 0;

  steps.push({
    state: snapshotArr({ array: arr }),
    narration: "XOR every element together. x ^ x = 0, so every number appearing twice cancels itself out completely.",
    highlightedLine: 1,
    stats: { xor: acc, binary: acc.toString(2) },
  });

  for (let i = 0; i < arr.length; i++) {
    const before = acc;
    acc ^= arr[i];
    steps.push({
      state: snapshotArr({ array: arr, comparing: [i] }),
      narration: `running XOR (${before}, binary ${before.toString(2)}) ^= arr[${i}] (${arr[i]}) → ${acc} (binary ${acc.toString(2)}).`,
      highlightedLine: 3,
      stats: { xor: acc, binary: acc.toString(2) },
    });
  }

  steps.push({
    state: snapshotArr({ array: arr, found: arr.lastIndexOf(acc) }),
    narration: `Every pair canceled to 0 — whatever's left, ${acc}, is the single number that never had a match.`,
    highlightedLine: 5,
    stats: { answer: acc },
  });
  return steps;
}

// ---------------------------------------------------------------------------
// Two Heaps — running median of a stream. A max-heap ("lower") holds the
// smaller half, a min-heap ("upper") holds the larger half, kept balanced so
// their roots are always the two middle values.
// ---------------------------------------------------------------------------
export interface TwoHeapsVizState {
  lower: HeapVizState;
  upper: HeapVizState;
  stream: number[];
  streamIndex?: number;
  median?: number;
}

function siftUpKind(arr: number[], kind: "min" | "max") {
  let i = arr.length - 1;
  const beats = (a: number, b: number) => (kind === "min" ? a < b : a > b);
  while (i > 0) {
    const p = Math.floor((i - 1) / 2);
    if (beats(arr[i], arr[p])) {
      [arr[i], arr[p]] = [arr[p], arr[i]];
      i = p;
    } else break;
  }
}

function siftDownKind(arr: number[], kind: "min" | "max") {
  const beats = (a: number, b: number) => (kind === "min" ? a < b : a > b);
  let i = 0;
  while (true) {
    const l = 2 * i + 1;
    const r = 2 * i + 2;
    let best = i;
    if (l < arr.length && beats(arr[l], arr[best])) best = l;
    if (r < arr.length && beats(arr[r], arr[best])) best = r;
    if (best === i) break;
    [arr[i], arr[best]] = [arr[best], arr[i]];
    i = best;
  }
}

export function twoHeapsMedianSteps(stream: number[]): StepSequence<TwoHeapsVizState> {
  const lower: number[] = []; // max-heap — the smaller half
  const upper: number[] = []; // min-heap — the larger half
  const steps: StepSequence<TwoHeapsVizState> = [];

  function median(): number | undefined {
    if (lower.length === 0 && upper.length === 0) return undefined;
    if (lower.length === upper.length) return (lower[0] + upper[0]) / 2;
    return lower.length > upper.length ? lower[0] : upper[0];
  }

  function snapshot(streamIndex?: number): TwoHeapsVizState {
    return {
      lower: { array: [...lower] },
      upper: { array: [...upper] },
      stream,
      streamIndex,
      median: median(),
    };
  }

  steps.push({
    state: snapshot(),
    narration:
      "Maintain a max-heap for the smaller half and a min-heap for the larger half, kept within one element of each other in size.",
    highlightedLine: 1,
    stats: { lowerSize: 0, upperSize: 0 },
  });

  for (let i = 0; i < stream.length; i++) {
    const value = stream[i];
    steps.push({
      state: snapshot(i),
      narration: `Insert ${value}. It goes into "lower" if it's <= lower's max (or lower is empty), otherwise into "upper".`,
      highlightedLine: 3,
      stats: { lowerSize: lower.length, upperSize: upper.length },
    });

    if (lower.length === 0 || value <= lower[0]) {
      lower.push(value);
      siftUpKind(lower, "max");
      steps.push({
        state: snapshot(i),
        narration: `${value} <= lower's max (or lower was empty) — added to the lower (max-)heap.`,
        highlightedLine: 4,
        stats: { lowerSize: lower.length, upperSize: upper.length },
      });
    } else {
      upper.push(value);
      siftUpKind(upper, "min");
      steps.push({
        state: snapshot(i),
        narration: `${value} > lower's max — added to the upper (min-)heap.`,
        highlightedLine: 6,
        stats: { lowerSize: lower.length, upperSize: upper.length },
      });
    }

    if (lower.length > upper.length + 1) {
      const moved = lower[0];
      lower[0] = lower[lower.length - 1];
      lower.pop();
      siftDownKind(lower, "max");
      upper.push(moved);
      siftUpKind(upper, "min");
      steps.push({
        state: snapshot(i),
        narration: `Lower grew too big — move its max (${moved}) over to upper to rebalance.`,
        highlightedLine: 9,
        stats: { lowerSize: lower.length, upperSize: upper.length },
      });
    } else if (upper.length > lower.length) {
      const moved = upper[0];
      upper[0] = upper[upper.length - 1];
      upper.pop();
      siftDownKind(upper, "min");
      lower.push(moved);
      siftUpKind(lower, "max");
      steps.push({
        state: snapshot(i),
        narration: `Upper grew too big — move its min (${moved}) over to lower to rebalance.`,
        highlightedLine: 11,
        stats: { lowerSize: lower.length, upperSize: upper.length },
      });
    }

    steps.push({
      state: snapshot(i),
      narration: `Median after inserting ${value}: ${median()}.`,
      highlightedLine: 13,
      stats: { median: median() ?? 0 },
    });
  }

  steps.push({
    state: snapshot(),
    narration: `Stream exhausted. Final median: ${median()}.`,
    highlightedLine: 15,
    stats: { median: median() ?? 0 },
  });
  return steps;
}

// ---------------------------------------------------------------------------
// K-way Merge — merge k already-sorted lists by always taking the smallest
// of the k current "head" values. (A real implementation uses a size-k
// min-heap of heads for O(log k) per step; this demo compares heads directly
// for clarity, which is equivalent for small, fixed k.)
// ---------------------------------------------------------------------------
export interface KWayMergeVizState {
  lists: ArrayVizState[];
  merged: ArrayVizState;
  pointers: number[];
  activeList?: number;
}

export function kWayMergeSteps(lists: number[][]): StepSequence<KWayMergeVizState> {
  const k = lists.length;
  const ptrs = new Array(k).fill(0);
  const merged: number[] = [];
  const steps: StepSequence<KWayMergeVizState> = [];

  function snapshot(activeList?: number): KWayMergeVizState {
    return {
      lists: lists.map((lst, li) => ({
        array: [...lst],
        comparing: ptrs[li] < lst.length ? [ptrs[li]] : undefined,
        sorted: Array.from({ length: ptrs[li] }, (_, idx) => idx),
      })),
      merged: { array: [...merged] },
      pointers: [...ptrs],
      activeList,
    };
  }

  steps.push({
    state: snapshot(),
    narration: `Merge ${k} sorted lists. Track one pointer per list — at every step, the smallest of the k pointed-at values is next in the merged output.`,
    highlightedLine: 1,
    stats: { merged: 0 },
  });

  while (ptrs.some((p, li) => p < lists[li].length)) {
    let bestList = -1;
    let bestVal = Infinity;
    for (let li = 0; li < k; li++) {
      if (ptrs[li] < lists[li].length && lists[li][ptrs[li]] < bestVal) {
        bestVal = lists[li][ptrs[li]];
        bestList = li;
      }
    }
    steps.push({
      state: snapshot(bestList),
      narration: `Compare current heads: [${lists
        .map((lst, li) => (ptrs[li] < lst.length ? lst[ptrs[li]] : "—"))
        .join(", ")}]. Smallest is ${bestVal}, from list ${bestList + 1}.`,
      highlightedLine: 3,
      stats: { merged: merged.length },
    });
    merged.push(bestVal);
    ptrs[bestList]++;
    steps.push({
      state: snapshot(bestList),
      narration: `Append ${bestVal} to the merged output and advance list ${bestList + 1}'s pointer.`,
      highlightedLine: 5,
      stats: { merged: merged.length },
    });
  }

  steps.push({
    state: snapshot(),
    narration: `All lists exhausted. Merged result: [${merged.join(", ")}]`,
    highlightedLine: 7,
    stats: { merged: merged.length },
  });
  return steps;
}

export const PATTERN_CODE = {
  twoPointers: `function maxArea(heights) {
  let left = 0, right = heights.length - 1;
  let best = 0;
  while (left < right) {
    const area = (right - left) * Math.min(heights[left], heights[right]);
    if (heights[left] < heights[right]) left++;
    else right--;
    best = Math.max(best, area);
  }
  return best;
}`,
  slidingWindow: `function maxSumSubarray(arr, k) {
  let sum = 0;
  for (let i = 0; i < k; i++) sum += arr[i];
  let best = sum;
  for (let end = k; end < arr.length; end++) {
    sum += arr[end] - arr[end - k];
    best = Math.max(best, sum);
  }
  return best;
}`,
  treeBfs: `function levelOrder(root) {
  const result = [];
  const queue = [root];
  while (queue.length) {
    const node = queue.shift();
    result.push(node.value);
    if (node.left) queue.push(node.left);
    if (node.right) queue.push(node.right);
  }
  return result;
}`,
  fastSlowMiddle: `function middleNode(head) {
  let slow = head;
  let fast = head;
  while (fast && fast.next) {
    slow = slow.next;
    fast = fast.next.next;
  }
  return slow; // the middle node
}`,
  fastSlowCycle: `function hasCycle(head) {
  let slow = head;
  let fast = head;
  while (fast && fast.next) {
    slow = slow.next;
    fast = fast.next.next;
    if (slow === fast) return true; // pointers met — cycle!
  }
  return false; // fast reached the end — no cycle
}`,
  monotonicStack: `function nextGreaterElements(arr) {
  const result = new Array(arr.length).fill(-1);
  const stack = []; // holds indices, values kept increasing bottom→top

  for (let i = 0; i < arr.length; i++) {
    while (stack.length && arr[stack[stack.length - 1]] < arr[i]) {
      const idx = stack.pop();
      result[idx] = arr[i];
    }
    stack.push(i);
  }
  return result;
}`,
  mergeIntervals: `function mergeIntervals(intervals) {
  intervals.sort((a, b) => a[0] - b[0]);
  const result = [intervals[0]];

  for (let i = 1; i < intervals.length; i++) {
    const current = result[result.length - 1];
    const next = intervals[i];
    if (next[0] <= current[1]) {
      current[1] = Math.max(current[1], next[1]);
    } else {
      result.push(next);
    }
  }
  return result;
}`,
  modifiedBinarySearch: `function search(nums, target) {
  let lo = 0, hi = nums.length - 1;
  while (lo <= hi) {
    const mid = Math.floor((lo + hi) / 2);
    if (nums[mid] === target) return mid;

    if (nums[lo] <= nums[mid]) {
      // left half [lo..mid] is sorted
      if (nums[lo] <= target && target < nums[mid]) {
        hi = mid - 1;
      } else {
        lo = mid + 1;
      }
    } else {
      // right half (mid..hi] is sorted
      if (nums[mid] < target && target <= nums[hi]) {
        lo = mid + 1;
      } else {
        hi = mid - 1;
      }
    }
  }
  return -1;
}`,
  topK: `function topKLargest(stream, k) {
  const minHeap = []; // size-k min-heap

  for (const value of stream) {
    if (minHeap.length < k) {
      heapPush(minHeap, value);
    } else if (value > minHeap[0]) {
      minHeap[0] = value;
      heapifyDown(minHeap);
    }
    // else: value can't be in the top k, discard
  }
  return minHeap; // the k largest values, in heap order
}`,
  cyclicSort: `function cyclicSort(nums) {
  let i = 0;
  while (i < nums.length) {
    const correct = nums[i] - 1;
    if (nums[i] !== nums[correct]) {
      [nums[i], nums[correct]] = [nums[correct], nums[i]];
    } else {
      i++;
    }
  }
  return nums;
}`,
  bitManipulation: `function singleNumber(nums) {
  let result = 0;
  for (const n of nums) {
    result ^= n; // duplicates cancel: x ^ x === 0
  }
  return result;
}`,
  twoHeaps: `class MedianFinder {
  constructor() {
    this.lower = new MaxHeap(); // smaller half
    this.upper = new MinHeap(); // larger half
  }

  addNum(num) {
    if (this.lower.isEmpty() || num <= this.lower.peek()) {
      this.lower.push(num);
    } else {
      this.upper.push(num);
    }

    if (this.lower.size() > this.upper.size() + 1) {
      this.upper.push(this.lower.pop());
    } else if (this.upper.size() > this.lower.size()) {
      this.lower.push(this.upper.pop());
    }
  }

  findMedian() {
    if (this.lower.size() === this.upper.size()) {
      return (this.lower.peek() + this.upper.peek()) / 2;
    }
    return this.lower.peek();
  }
}`,
  kWayMerge: `function mergeKLists(lists) {
  // minHeap holds {value, listIndex, elemIndex}, ordered by value
  const minHeap = new MinHeap((a, b) => a.value - b.value);
  lists.forEach((list, i) => {
    if (list.length) minHeap.push({ value: list[0], listIndex: i, elemIndex: 0 });
  });

  const merged = [];
  while (!minHeap.isEmpty()) {
    const { value, listIndex, elemIndex } = minHeap.pop();
    merged.push(value);
    const next = elemIndex + 1;
    if (next < lists[listIndex].length) {
      minHeap.push({ value: lists[listIndex][next], listIndex, elemIndex: next });
    }
  }
  return merged;
}`,
};
