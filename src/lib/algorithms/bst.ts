import type { StepSequence } from "./types";

export interface BSTNode {
  id: string;
  value: number;
  left: BSTNode | null;
  right: BSTNode | null;
}

export interface BSTVizState {
  root: BSTNode | null;
  /** id of the node currently being visited */
  current?: string;
  /** ids visited so far this operation */
  visited?: string[];
  /** id of a found / target node */
  found?: string;
  /** ids visited in-order so far (for traversal visualizations) */
  traversalOrder?: number[];
}

let idCounter = 0;
function nid() {
  idCounter++;
  return `b${idCounter}`;
}

function makeNode(value: number): BSTNode {
  return { id: nid(), value, left: null, right: null };
}

function cloneTree(node: BSTNode | null): BSTNode | null {
  if (!node) return null;
  return { ...node, left: cloneTree(node.left), right: cloneTree(node.right) };
}

function snap(state: BSTVizState): BSTVizState {
  return { ...state, root: cloneTree(state.root) };
}

export function buildBST(values: number[]): BSTNode | null {
  let root: BSTNode | null = null;
  for (const v of values) root = insertNode(root, v);
  return root;
}

function insertNode(root: BSTNode | null, value: number): BSTNode {
  if (!root) return makeNode(value);
  if (value < root.value) root.left = insertNode(root.left, value);
  else if (value > root.value) root.right = insertNode(root.right, value);
  return root;
}

// ---------------------------------------------------------------------------
// Insert (with step recording)
// ---------------------------------------------------------------------------
export function insertSteps(
  initialValues: number[],
  value: number
): StepSequence<BSTVizState> {
  const root = buildBST(initialValues);
  const steps: StepSequence<BSTVizState> = [];
  const visited: string[] = [];

  steps.push({
    state: snap({ root }),
    narration: `Inserting ${value} — start comparing at the root.`,
    highlightedLine: 1,
  });

  function walk(node: BSTNode | null, parent: BSTNode | null, dir: "left" | "right" | null): BSTNode {
    if (!node) {
      const created = makeNode(value);
      if (parent) parent[dir!] = created;
      const newRoot = parent ? root! : created;
      steps.push({
        state: snap({ root: newRoot, found: created.id, visited: [...visited] }),
        narration: `Empty slot found — insert ${value} here.`,
        highlightedLine: 3,
      });
      return created;
    }
    visited.push(node.id);
    steps.push({
      state: snap({ root: root!, current: node.id, visited: [...visited] }),
      narration:
        value === node.value
          ? `${value} already exists in the tree.`
          : `${value} ${value < node.value ? "<" : ">"} ${node.value} → go ${value < node.value ? "left" : "right"}.`,
      highlightedLine: value < node.value ? 5 : 6,
    });
    if (value === node.value) return node;
    if (value < node.value) node.left = walk(node.left, node, "left");
    else node.right = walk(node.right, node, "right");
    return node;
  }

  if (!root) {
    const created = makeNode(value);
    steps.push({
      state: snap({ root: created, found: created.id }),
      narration: `Tree was empty — ${value} becomes the root.`,
      highlightedLine: 3,
    });
  } else {
    walk(root, null, null);
  }
  return steps;
}

// ---------------------------------------------------------------------------
// Search
// ---------------------------------------------------------------------------
export function searchSteps(
  initialValues: number[],
  target: number
): StepSequence<BSTVizState> {
  const root = buildBST(initialValues);
  const steps: StepSequence<BSTVizState> = [];
  const visited: string[] = [];

  steps.push({
    state: snap({ root }),
    narration: `Searching for ${target}, starting at the root.`,
    highlightedLine: 1,
  });

  let node = root;
  while (node) {
    visited.push(node.id);
    if (target === node.value) {
      steps.push({
        state: snap({ root, found: node.id, visited: [...visited] }),
        narration: `Found ${target}.`,
        highlightedLine: 3,
      });
      return steps;
    }
    steps.push({
      state: snap({ root, current: node.id, visited: [...visited] }),
      narration: `${target} ${target < node.value ? "<" : ">"} ${node.value} → go ${target < node.value ? "left" : "right"}.`,
      highlightedLine: target < node.value ? 5 : 6,
    });
    node = target < node.value ? node.left : node.right;
  }

  steps.push({
    state: snap({ root, visited }),
    narration: `${target} is not in the tree.`,
    highlightedLine: 8,
  });
  return steps;
}

// ---------------------------------------------------------------------------
// Delete
// ---------------------------------------------------------------------------
export function deleteSteps(
  initialValues: number[],
  target: number
): StepSequence<BSTVizState> {
  let root = buildBST(initialValues);
  const steps: StepSequence<BSTVizState> = [];
  const visited: string[] = [];

  steps.push({
    state: snap({ root }),
    narration: `Deleting ${target}.`,
    highlightedLine: 1,
  });

  function minValueNode(node: BSTNode): BSTNode {
    let curr = node;
    while (curr.left) curr = curr.left;
    return curr;
  }

  function remove(node: BSTNode | null, value: number): BSTNode | null {
    if (!node) return null;
    visited.push(node.id);
    if (value < node.value) {
      steps.push({
        state: snap({ root: root!, current: node.id, visited: [...visited] }),
        narration: `${value} < ${node.value} → go left.`,
        highlightedLine: 4,
      });
      node.left = remove(node.left, value);
      return node;
    }
    if (value > node.value) {
      steps.push({
        state: snap({ root: root!, current: node.id, visited: [...visited] }),
        narration: `${value} > ${node.value} → go right.`,
        highlightedLine: 5,
      });
      node.right = remove(node.right, value);
      return node;
    }

    steps.push({
      state: snap({ root: root!, current: node.id, visited: [...visited] }),
      narration: `Found ${value} — removing it.`,
      highlightedLine: 6,
    });

    if (!node.left && !node.right) return null;
    if (!node.left) return node.right;
    if (!node.right) return node.left;

    const successor = minValueNode(node.right);
    steps.push({
      state: snap({ root: root!, current: successor.id, visited: [...visited] }),
      narration: `Two children — replace with in-order successor ${successor.value}.`,
      highlightedLine: 9,
    });
    node.value = successor.value;
    node.right = remove(node.right, successor.value);
    return node;
  }

  root = remove(root, target);
  steps.push({
    state: snap({ root }),
    narration: `Deletion complete.`,
    highlightedLine: 11,
  });
  return steps;
}

// ---------------------------------------------------------------------------
// Traversals
// ---------------------------------------------------------------------------
export function inorderSteps(initialValues: number[]): StepSequence<BSTVizState> {
  const root = buildBST(initialValues);
  const steps: StepSequence<BSTVizState> = [];
  const order: number[] = [];

  steps.push({ state: snap({ root }), narration: "In-order traversal: left, node, right.", highlightedLine: 1 });

  function walk(node: BSTNode | null) {
    if (!node) return;
    walk(node.left);
    order.push(node.value);
    steps.push({
      state: snap({ root, current: node.id, traversalOrder: [...order] }),
      narration: `Visit ${node.value}. Order so far: [${order.join(", ")}]`,
      highlightedLine: 3,
    });
    walk(node.right);
  }
  walk(root);
  return steps;
}

export const BST_CODE: Record<string, string> = {
  insert: `function insert(node, value) {
  if (!node) return { value, left: null, right: null };
  if (value < node.value) node.left = insert(node.left, value);
  else if (value > node.value) node.right = insert(node.right, value);
  return node;
}`,
  search: `function search(node, target) {
  if (!node) return null;
  if (target === node.value) return node;
  return target < node.value
    ? search(node.left, target)
    : search(node.right, target);
}`,
  delete: `function remove(node, value) {
  if (!node) return null;
  if (value < node.value) node.left = remove(node.left, value);
  else if (value > node.value) node.right = remove(node.right, value);
  else {
    if (!node.left) return node.right;
    if (!node.right) return node.left;
    const succ = minValueNode(node.right);
    node.value = succ.value;
    node.right = remove(node.right, succ.value);
  }
  return node;
}`,
  inorder: `function inorder(node, out = []) {
  if (!node) return out;
  inorder(node.left, out);
  out.push(node.value);
  inorder(node.right, out);
  return out;
}`,
};
