import type { StepSequence } from "./types";
import type { ArrayVizState } from "./arrays";
import { buildBST, type BSTVizState } from "./bst";
import type { LinkedListVizState, LinkedListNode } from "./linkedList";
import type { StackVizState } from "./stack";

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
};
