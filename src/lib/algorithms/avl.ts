import type { StepSequence } from "./types";

export interface AVLNode {
  id: string;
  value: number;
  left: AVLNode | null;
  right: AVLNode | null;
  height: number;
}

export interface AVLVizState {
  root: AVLNode | null;
  /** id of the node currently being visited */
  current?: string;
  /** ids visited so far this operation */
  visited?: string[];
  /** id of a found / target node */
  found?: string;
  /** ids of nodes involved in the rotation currently being highlighted */
  rotating?: string[];
}

let idCounter = 0;
function nid() {
  idCounter++;
  return `a${idCounter}`;
}

function makeNode(value: number): AVLNode {
  return { id: nid(), value, left: null, right: null, height: 1 };
}

function cloneTree(node: AVLNode | null): AVLNode | null {
  if (!node) return null;
  return { ...node, left: cloneTree(node.left), right: cloneTree(node.right) };
}

function snap(state: AVLVizState): AVLVizState {
  return { ...state, root: cloneTree(state.root) };
}

function h(node: AVLNode | null): number {
  return node ? node.height : 0;
}

function updateHeight(node: AVLNode) {
  node.height = 1 + Math.max(h(node.left), h(node.right));
}

function balanceFactor(node: AVLNode | null): number {
  return node ? h(node.left) - h(node.right) : 0;
}

function rotateRight(y: AVLNode): AVLNode {
  const x = y.left!;
  const t2 = x.right;
  x.right = y;
  y.left = t2;
  updateHeight(y);
  updateHeight(x);
  return x;
}

function rotateLeft(x: AVLNode): AVLNode {
  const y = x.right!;
  const t2 = y.left;
  y.left = x;
  x.right = t2;
  updateHeight(x);
  updateHeight(y);
  return y;
}

/** Plain AVL insert used to silently build the starting tree (no step recording). */
function insertNode(node: AVLNode | null, value: number): AVLNode {
  if (!node) return makeNode(value);
  if (value < node.value) node.left = insertNode(node.left, value);
  else if (value > node.value) node.right = insertNode(node.right, value);
  else return node;

  updateHeight(node);
  const bf = balanceFactor(node);

  if (bf > 1 && node.left && value < node.left.value) return rotateRight(node);
  if (bf > 1 && node.left) {
    node.left = rotateLeft(node.left);
    return rotateRight(node);
  }
  if (bf < -1 && node.right && value > node.right.value) return rotateLeft(node);
  if (bf < -1 && node.right) {
    node.right = rotateRight(node.right);
    return rotateLeft(node);
  }
  return node;
}

export function buildAVL(values: number[]): AVLNode | null {
  let root: AVLNode | null = null;
  for (const v of values) root = insertNode(root, v);
  return root;
}

// ---------------------------------------------------------------------------
// Insert (with step recording: descent, height/balance recompute, rotations)
// ---------------------------------------------------------------------------
export function insertSteps(
  initialValues: number[],
  value: number
): StepSequence<AVLVizState> {
  const initialRoot = buildAVL(initialValues);
  const rootBox: { node: AVLNode | null } = { node: initialRoot };
  const steps: StepSequence<AVLVizState> = [];
  const visited: string[] = [];

  steps.push({
    state: snap({ root: rootBox.node }),
    narration: `Inserting ${value} — descend like a normal BST insert first.`,
    highlightedLine: 1,
  });

  function ins(node: AVLNode | null, depth: number): AVLNode {
    if (!node) {
      const created = makeNode(value);
      if (depth === 0) rootBox.node = created;
      steps.push({
        state: snap({ root: rootBox.node, found: created.id, visited: [...visited] }),
        narration: `Empty slot found — insert ${value} here as a new leaf.`,
        highlightedLine: 3,
      });
      return created;
    }

    visited.push(node.id);
    steps.push({
      state: snap({ root: rootBox.node, current: node.id, visited: [...visited] }),
      narration:
        value === node.value
          ? `${value} already exists in the tree — AVL insert is a no-op.`
          : `${value} ${value < node.value ? "<" : ">"} ${node.value} → go ${value < node.value ? "left" : "right"}.`,
      highlightedLine: value < node.value ? 5 : 6,
    });

    if (value === node.value) return node;
    if (value < node.value) node.left = ins(node.left, depth + 1);
    else node.right = ins(node.right, depth + 1);

    updateHeight(node);
    const bf = balanceFactor(node);
    if (depth === 0) rootBox.node = node;
    steps.push({
      state: snap({ root: rootBox.node, current: node.id, visited: [...visited] }),
      narration: `Back at ${node.value}: recomputed height=${node.height}, balance factor=${bf}.`,
      highlightedLine: 9,
    });

    if (bf > 1 && node.left && value < node.left.value) {
      // LL case — single right rotation
      const rotIds = [node.id, node.left.id];
      steps.push({
        state: snap({ root: rootBox.node, rotating: rotIds }),
        narration: `Balance factor ${bf} at ${node.value} (LL case) — single right rotation.`,
        highlightedLine: 11,
      });
      node = rotateRight(node);
      if (depth === 0) rootBox.node = node;
      steps.push({
        state: snap({ root: rootBox.node, rotating: [node.id, ...rotIds] }),
        narration: `Right rotation complete — ${node.value} is now this subtree's root.`,
        highlightedLine: 11,
      });
    } else if (bf > 1 && node.left) {
      // LR case — left rotate child, then right rotate node
      const rotIds = [node.id, node.left.id, node.left.right ? node.left.right.id : ""].filter(Boolean);
      steps.push({
        state: snap({ root: rootBox.node, rotating: rotIds }),
        narration: `Balance factor ${bf} at ${node.value} (LR case) — left rotation on ${node.left.value}, then right rotation on ${node.value}.`,
        highlightedLine: 13,
      });
      node.left = rotateLeft(node.left);
      node = rotateRight(node);
      if (depth === 0) rootBox.node = node;
      steps.push({
        state: snap({ root: rootBox.node, rotating: [node.id] }),
        narration: `LR double rotation complete — ${node.value} is now this subtree's root.`,
        highlightedLine: 14,
      });
    } else if (bf < -1 && node.right && value > node.right.value) {
      // RR case — single left rotation
      const rotIds = [node.id, node.right.id];
      steps.push({
        state: snap({ root: rootBox.node, rotating: rotIds }),
        narration: `Balance factor ${bf} at ${node.value} (RR case) — single left rotation.`,
        highlightedLine: 16,
      });
      node = rotateLeft(node);
      if (depth === 0) rootBox.node = node;
      steps.push({
        state: snap({ root: rootBox.node, rotating: [node.id, ...rotIds] }),
        narration: `Left rotation complete — ${node.value} is now this subtree's root.`,
        highlightedLine: 16,
      });
    } else if (bf < -1 && node.right) {
      // RL case — right rotate child, then left rotate node
      const rotIds = [node.id, node.right.id, node.right.left ? node.right.left.id : ""].filter(Boolean);
      steps.push({
        state: snap({ root: rootBox.node, rotating: rotIds }),
        narration: `Balance factor ${bf} at ${node.value} (RL case) — right rotation on ${node.right.value}, then left rotation on ${node.value}.`,
        highlightedLine: 18,
      });
      node.right = rotateRight(node.right);
      node = rotateLeft(node);
      if (depth === 0) rootBox.node = node;
      steps.push({
        state: snap({ root: rootBox.node, rotating: [node.id] }),
        narration: `RL double rotation complete — ${node.value} is now this subtree's root.`,
        highlightedLine: 19,
      });
    }

    return node;
  }

  ins(initialRoot, 0);
  steps.push({
    state: snap({ root: rootBox.node }),
    narration: `Insertion complete — the tree stays height-balanced.`,
    highlightedLine: 21,
  });
  return steps;
}

// ---------------------------------------------------------------------------
// Search (identical descent to a plain BST — AVL only changes insert/delete)
// ---------------------------------------------------------------------------
export function searchSteps(
  initialValues: number[],
  target: number
): StepSequence<AVLVizState> {
  const root = buildAVL(initialValues);
  const steps: StepSequence<AVLVizState> = [];
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

export const AVL_CODE: Record<string, string> = {
  insert: `function insert(node, value) {
  if (!node) return makeNode(value);
  if (value < node.value) node.left = insert(node.left, value);
  else if (value > node.value) node.right = insert(node.right, value);
  else return node;

  updateHeight(node);
  const bf = balanceFactor(node); // height(left) - height(right)

  if (bf > 1 && value < node.left.value) return rotateRight(node);        // LL
  if (bf > 1) { node.left = rotateLeft(node.left); return rotateRight(node); } // LR
  if (bf < -1 && value > node.right.value) return rotateLeft(node);       // RR
  if (bf < -1) { node.right = rotateRight(node.right); return rotateLeft(node); } // RL
  return node;
}`,
  search: `function search(node, target) {
  if (!node) return null;
  if (target === node.value) return node;
  return target < node.value
    ? search(node.left, target)
    : search(node.right, target);
}`,
};
