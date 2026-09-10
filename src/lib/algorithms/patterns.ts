import type { StepSequence } from "./types";
import type { ArrayVizState } from "./arrays";
import { buildBST, type BSTVizState } from "./bst";

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
};
