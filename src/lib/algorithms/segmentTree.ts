import type { StepSequence } from "./types";

export interface SegTreeNode {
  id: string;
  lo: number;
  hi: number;
  sum: number;
  left: SegTreeNode | null;
  right: SegTreeNode | null;
}

export interface SegTreeVizState {
  root: SegTreeNode | null;
  array: number[];
  /** id of the node currently being visited */
  current?: string;
  /** ids visited so far this operation */
  visited?: string[];
  /** ids of nodes that are fully inside the query range and contribute directly */
  fullyInRange?: string[];
  /** ids of nodes that are fully outside the query range and get skipped */
  outOfRange?: string[];
  /** array index currently being updated */
  updatedIndex?: number;
  /** ids of nodes already recomputed on the update propagation path */
  updatedPath?: string[];
  /** running/query result so far */
  result?: number;
}

let idCounter = 0;
function nid() {
  idCounter++;
  return `s${idCounter}`;
}

function cloneTree(node: SegTreeNode | null): SegTreeNode | null {
  if (!node) return null;
  return { ...node, left: cloneTree(node.left), right: cloneTree(node.right) };
}

function snap(state: SegTreeVizState): SegTreeVizState {
  return { ...state, root: cloneTree(state.root), array: [...state.array] };
}

/** Plain build, no step recording — used to silently construct the tree for query/update. */
function build(array: number[], lo: number, hi: number): SegTreeNode {
  if (lo === hi) return { id: nid(), lo, hi, sum: array[lo], left: null, right: null };
  const mid = Math.floor((lo + hi) / 2);
  const left = build(array, lo, mid);
  const right = build(array, mid + 1, hi);
  return { id: nid(), lo, hi, sum: left.sum + right.sum, left, right };
}

export function buildSegmentTree(array: number[]): SegTreeNode | null {
  if (array.length === 0) return null;
  return build(array, 0, array.length - 1);
}

// ---------------------------------------------------------------------------
// Build (with step recording — bottom-up: leaves first, then each combine)
// ---------------------------------------------------------------------------
export function buildSteps(array: number[]): StepSequence<SegTreeVizState> {
  const steps: StepSequence<SegTreeVizState> = [];
  if (array.length === 0) {
    steps.push({ state: snap({ root: null, array }), narration: "Empty array — nothing to build.", highlightedLine: 1 });
    return steps;
  }

  steps.push({
    state: snap({ root: null, array }),
    narration: `Building a segment tree over [${array.join(", ")}] — each leaf holds one array element, each internal node holds the sum of its two children.`,
    highlightedLine: 1,
  });

  // Each step below snapshots just the subtree built so far at this call —
  // narration and the tree pane focus on the piece currently being assembled,
  // growing bottom-up (leaves first, then each parent combine).
  function recordBuild(lo: number, hi: number): SegTreeNode {
    if (lo === hi) {
      const leaf: SegTreeNode = { id: nid(), lo, hi, sum: array[lo], left: null, right: null };
      steps.push({
        state: snap({ root: leaf, array, current: leaf.id }),
        narration: `Leaf [${lo},${hi}]: value = ${array[lo]}.`,
        highlightedLine: 3,
      });
      return leaf;
    }
    const mid = Math.floor((lo + hi) / 2);
    const left = recordBuild(lo, mid);
    const right = recordBuild(mid + 1, hi);
    const node: SegTreeNode = { id: nid(), lo, hi, sum: left.sum + right.sum, left, right };
    steps.push({
      state: snap({ root: node, array, current: node.id }),
      narration: `Internal node [${lo},${hi}]: sum = ${left.sum} + ${right.sum} = ${node.sum}.`,
      highlightedLine: 6,
    });
    return node;
  }

  const finalRoot = recordBuild(0, array.length - 1);
  steps.push({
    state: snap({ root: finalRoot, array }),
    narration: `Build complete — root covers [0,${array.length - 1}] with total sum ${finalRoot.sum}.`,
    highlightedLine: 8,
  });
  return steps;
}

// ---------------------------------------------------------------------------
// Range sum query
// ---------------------------------------------------------------------------
export function querySteps(
  array: number[],
  left: number,
  right: number
): StepSequence<SegTreeVizState> {
  const root = buildSegmentTree(array);
  const steps: StepSequence<SegTreeVizState> = [];
  const visited: string[] = [];
  const fullyInRange: string[] = [];
  const outOfRange: string[] = [];
  let result = 0;

  steps.push({
    state: snap({ root, array }),
    narration: `Querying range sum for [${left},${right}].`,
    highlightedLine: 1,
  });

  function rec(node: SegTreeNode | null): number {
    if (!node) return 0;
    visited.push(node.id);

    if (node.hi < left || node.lo > right) {
      outOfRange.push(node.id);
      steps.push({
        state: snap({ root, array, current: node.id, visited: [...visited], fullyInRange: [...fullyInRange], outOfRange: [...outOfRange], result }),
        narration: `Node [${node.lo},${node.hi}] is entirely outside [${left},${right}] — skip.`,
        highlightedLine: 3,
      });
      return 0;
    }

    if (node.lo >= left && node.hi <= right) {
      fullyInRange.push(node.id);
      result += node.sum;
      steps.push({
        state: snap({ root, array, current: node.id, visited: [...visited], fullyInRange: [...fullyInRange], outOfRange: [...outOfRange], result }),
        narration: `Node [${node.lo},${node.hi}] is fully inside [${left},${right}] — contribute its sum ${node.sum} directly. Running total: ${result}.`,
        highlightedLine: 5,
      });
      return node.sum;
    }

    steps.push({
      state: snap({ root, array, current: node.id, visited: [...visited], fullyInRange: [...fullyInRange], outOfRange: [...outOfRange], result }),
      narration: `Node [${node.lo},${node.hi}] partially overlaps [${left},${right}] — recurse into both children.`,
      highlightedLine: 8,
    });
    return rec(node.left) + rec(node.right);
  }

  const total = rec(root);
  steps.push({
    state: snap({ root, array, visited: [...visited], fullyInRange: [...fullyInRange], outOfRange: [...outOfRange], result: total }),
    narration: `Query complete — sum of [${left},${right}] = ${total}.`,
    highlightedLine: 10,
  });
  return steps;
}

// ---------------------------------------------------------------------------
// Point update
// ---------------------------------------------------------------------------
export function updateSteps(
  array: number[],
  index: number,
  newValue: number
): StepSequence<SegTreeVizState> {
  const root = buildSegmentTree(array);
  const steps: StepSequence<SegTreeVizState> = [];
  const updatedPath: string[] = [];
  const oldValue = array[index];

  steps.push({
    state: snap({ root, array, updatedIndex: index }),
    narration: `Updating index ${index}: ${oldValue} → ${newValue}. Descend to the matching leaf first.`,
    highlightedLine: 1,
  });

  function rec(node: SegTreeNode | null): void {
    if (!node) return;
    if (node.lo === node.hi) {
      node.sum = newValue;
      updatedPath.push(node.id);
      steps.push({
        state: snap({ root, array, current: node.id, updatedIndex: index, updatedPath: [...updatedPath] }),
        narration: `Reached leaf [${node.lo},${node.hi}] — set value to ${newValue}.`,
        highlightedLine: 3,
      });
      return;
    }
    steps.push({
      state: snap({ root, array, current: node.id, updatedIndex: index, updatedPath: [...updatedPath] }),
      narration: `Node [${node.lo},${node.hi}]: index ${index} is ${index <= (node.left?.hi ?? -1) ? "in the left half" : "in the right half"} — recurse.`,
      highlightedLine: 5,
    });
    if (index <= (node.left?.hi ?? -1)) rec(node.left);
    else rec(node.right);

    node.sum = (node.left?.sum ?? 0) + (node.right?.sum ?? 0);
    updatedPath.push(node.id);
    steps.push({
      state: snap({ root, array, current: node.id, updatedIndex: index, updatedPath: [...updatedPath] }),
      narration: `Recomputed node [${node.lo},${node.hi}]: sum = ${node.left?.sum ?? 0} + ${node.right?.sum ?? 0} = ${node.sum}.`,
      highlightedLine: 8,
    });
  }

  rec(root);
  const newArray = [...array];
  newArray[index] = newValue;
  steps.push({
    state: snap({ root, array: newArray, updatedIndex: index, updatedPath: [...updatedPath] }),
    narration: `Update propagated to the root — new root sum is ${root ? root.sum : 0}.`,
    highlightedLine: 10,
  });
  return steps;
}

export const SEGMENT_TREE_CODE: Record<string, string> = {
  build: `function build(array, lo, hi) {
  if (lo === hi) return { lo, hi, sum: array[lo], left: null, right: null };
  const mid = (lo + hi) >> 1;
  const left = build(array, lo, mid);
  const right = build(array, mid + 1, hi);
  return { lo, hi, sum: left.sum + right.sum, left, right };
}`,
  query: `function query(node, left, right) {
  if (!node) return 0;
  if (node.hi < left || node.lo > right) return 0;         // out of range — skip
  if (node.lo >= left && node.hi <= right) return node.sum; // fully in range — take directly
  return query(node.left, left, right) + query(node.right, left, right); // partial — recurse
}`,
  update: `function update(node, index, value) {
  if (node.lo === node.hi) { node.sum = value; return; }
  if (index <= node.left.hi) update(node.left, index, value);
  else update(node.right, index, value);
  node.sum = node.left.sum + node.right.sum; // recompute on the way back up
}`,
};
