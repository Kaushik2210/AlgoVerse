import type { StepSequence } from "./types";

export type RBColor = "red" | "black";

export interface RBNode {
  id: string;
  value: number;
  color: RBColor;
  left: RBNode | null;
  right: RBNode | null;
  parent: RBNode | null;
}

export interface RBVizState {
  root: RBNode | null;
  /** id of the node currently being visited */
  current?: string;
  /** ids visited so far this operation */
  visited?: string[];
  /** id of a found / target node */
  found?: string;
  /** ids of nodes involved in the fixup step currently being highlighted */
  fixing?: string[];
}

let idCounter = 0;
function nid() {
  idCounter++;
  return `r${idCounter}`;
}

function makeNode(value: number): RBNode {
  return { id: nid(), value, color: "red", left: null, right: null, parent: null };
}

/**
 * Clone the tree WITHOUT parent back-references (they'd make this circular
 * and unusable as plain state/JSON). Parent pointers exist only on the live
 * working tree used during insertion/fixup.
 */
function cloneForSnapshot(node: RBNode | null): RBNode | null {
  if (!node) return null;
  return {
    id: node.id,
    value: node.value,
    color: node.color,
    left: cloneForSnapshot(node.left),
    right: cloneForSnapshot(node.right),
    parent: null,
  };
}

function snap(state: RBVizState): RBVizState {
  return { ...state, root: cloneForSnapshot(state.root) };
}

function isRed(node: RBNode | null): boolean {
  return !!node && node.color === "red";
}

// ---------------------------------------------------------------------------
// Rotations (maintain parent pointers on the live tree)
// ---------------------------------------------------------------------------
function rotateLeft(rootBox: { node: RBNode | null }, x: RBNode) {
  const y = x.right!;
  x.right = y.left;
  if (y.left) y.left.parent = x;
  y.parent = x.parent;
  if (!x.parent) rootBox.node = y;
  else if (x === x.parent.left) x.parent.left = y;
  else x.parent.right = y;
  y.left = x;
  x.parent = y;
}

function rotateRight(rootBox: { node: RBNode | null }, x: RBNode) {
  const y = x.left!;
  x.left = y.right;
  if (y.right) y.right.parent = x;
  y.parent = x.parent;
  if (!x.parent) rootBox.node = y;
  else if (x === x.parent.right) x.parent.right = y;
  else x.parent.left = y;
  y.right = x;
  x.parent = y;
}

/** Plain BST insert (linking a fresh red node), used both for silent tree building and live insert. */
function bstInsert(rootBox: { node: RBNode | null }, value: number): RBNode {
  const created = makeNode(value);
  if (!rootBox.node) {
    rootBox.node = created;
    return created;
  }
  let cur: RBNode | null = rootBox.node;
  let parent: RBNode = cur;
  while (cur) {
    parent = cur;
    if (value === cur.value) return cur; // duplicate, no-op
    cur = value < cur.value ? cur.left : cur.right;
  }
  created.parent = parent;
  if (value < parent.value) parent.left = created;
  else parent.right = created;
  return created;
}

/** Standard CLRS-style insertion fixup, no step recording — used to silently build the starting tree. */
function fixupSilent(rootBox: { node: RBNode | null }, node: RBNode) {
  let z = node;
  while (z.parent && z.parent.color === "red") {
    const parent = z.parent;
    const grandparent = parent.parent;
    if (!grandparent) break;
    if (parent === grandparent.left) {
      const uncle = grandparent.right;
      if (isRed(uncle)) {
        parent.color = "black";
        uncle!.color = "black";
        grandparent.color = "red";
        z = grandparent;
      } else {
        if (z === parent.right) {
          z = parent;
          rotateLeft(rootBox, z);
        }
        z.parent!.color = "black";
        z.parent!.parent!.color = "red";
        rotateRight(rootBox, z.parent!.parent!);
      }
    } else {
      const uncle = grandparent.left;
      if (isRed(uncle)) {
        parent.color = "black";
        uncle!.color = "black";
        grandparent.color = "red";
        z = grandparent;
      } else {
        if (z === parent.left) {
          z = parent;
          rotateRight(rootBox, z);
        }
        z.parent!.color = "black";
        z.parent!.parent!.color = "red";
        rotateLeft(rootBox, z.parent!.parent!);
      }
    }
  }
  rootBox.node!.color = "black";
}

export function buildRB(values: number[]): RBNode | null {
  const rootBox: { node: RBNode | null } = { node: null };
  for (const v of values) {
    const created = bstInsert(rootBox, v);
    fixupSilent(rootBox, created);
  }
  return rootBox.node;
}

// ---------------------------------------------------------------------------
// Insert (with step recording: BST insert as red, then fixup cases)
// ---------------------------------------------------------------------------
export function insertSteps(
  initialValues: number[],
  value: number
): StepSequence<RBVizState> {
  const rootBox: { node: RBNode | null } = { node: buildRB(initialValues) };
  const steps: StepSequence<RBVizState> = [];
  const visited: string[] = [];

  steps.push({
    state: snap({ root: rootBox.node }),
    narration: `Inserting ${value} — descend like a normal BST insert first.`,
    highlightedLine: 1,
  });

  // Descent narration (mirrors bstInsert's walk).
  let cur: RBNode | null = rootBox.node;
  while (cur) {
    visited.push(cur.id);
    if (value === cur.value) {
      steps.push({
        state: snap({ root: rootBox.node, current: cur.id, visited: [...visited] }),
        narration: `${value} already exists — red-black insert is a no-op.`,
        highlightedLine: 3,
      });
      return steps;
    }
    steps.push({
      state: snap({ root: rootBox.node, current: cur.id, visited: [...visited] }),
      narration: `${value} ${value < cur.value ? "<" : ">"} ${cur.value} → go ${value < cur.value ? "left" : "right"}.`,
      highlightedLine: value < cur.value ? 5 : 6,
    });
    cur = value < cur.value ? cur.left : cur.right;
  }

  const created = bstInsert(rootBox, value);
  steps.push({
    state: snap({ root: rootBox.node, found: created.id, visited: [...visited] }),
    narration: `Inserted ${value} as a new RED leaf (every new node starts red).`,
    highlightedLine: 8,
  });

  // Fixup with step recording — mirrors fixupSilent exactly.
  let z = created;
  while (z.parent && z.parent.color === "red") {
    const parent = z.parent;
    const grandparent = parent.parent;
    if (!grandparent) break;

    if (parent === grandparent.left) {
      const uncle = grandparent.right;
      if (isRed(uncle)) {
        steps.push({
          state: snap({ root: rootBox.node, fixing: [parent.id, uncle!.id, grandparent.id] }),
          narration: `Parent ${parent.value} and uncle ${uncle!.value} are both red — recolor parent & uncle black, grandparent ${grandparent.value} red, continue fixup from there.`,
          highlightedLine: 11,
        });
        parent.color = "black";
        uncle!.color = "black";
        grandparent.color = "red";
        z = grandparent;
        steps.push({
          state: snap({ root: rootBox.node, fixing: [z.id] }),
          narration: `Recolor complete — continuing fixup from ${z.value}.`,
          highlightedLine: 14,
        });
      } else {
        if (z === parent.right) {
          steps.push({
            state: snap({ root: rootBox.node, fixing: [parent.id, z.id] }),
            narration: `Uncle is black, ${z.value} is a "triangle" (right child of a left child) — left-rotate at ${parent.value} to straighten it into a line.`,
            highlightedLine: 17,
          });
          z = parent;
          rotateLeft(rootBox, z);
        }
        steps.push({
          state: snap({ root: rootBox.node, fixing: [z.id, z.parent!.id, z.parent!.parent!.id] }),
          narration: `Uncle is black, straight line case — recolor and right-rotate at grandparent ${z.parent!.parent!.value}.`,
          highlightedLine: 19,
        });
        z.parent!.color = "black";
        z.parent!.parent!.color = "red";
        rotateRight(rootBox, z.parent!.parent!);
        steps.push({
          state: snap({ root: rootBox.node, fixing: [z.id] }),
          narration: `Rotation + recolor complete.`,
          highlightedLine: 21,
        });
      }
    } else {
      const uncle = grandparent.left;
      if (isRed(uncle)) {
        steps.push({
          state: snap({ root: rootBox.node, fixing: [parent.id, uncle!.id, grandparent.id] }),
          narration: `Parent ${parent.value} and uncle ${uncle!.value} are both red — recolor parent & uncle black, grandparent ${grandparent.value} red, continue fixup from there.`,
          highlightedLine: 11,
        });
        parent.color = "black";
        uncle!.color = "black";
        grandparent.color = "red";
        z = grandparent;
        steps.push({
          state: snap({ root: rootBox.node, fixing: [z.id] }),
          narration: `Recolor complete — continuing fixup from ${z.value}.`,
          highlightedLine: 14,
        });
      } else {
        if (z === parent.left) {
          steps.push({
            state: snap({ root: rootBox.node, fixing: [parent.id, z.id] }),
            narration: `Uncle is black, ${z.value} is a "triangle" (left child of a right child) — right-rotate at ${parent.value} to straighten it into a line.`,
            highlightedLine: 24,
          });
          z = parent;
          rotateRight(rootBox, z);
        }
        steps.push({
          state: snap({ root: rootBox.node, fixing: [z.id, z.parent!.id, z.parent!.parent!.id] }),
          narration: `Uncle is black, straight line case — recolor and left-rotate at grandparent ${z.parent!.parent!.value}.`,
          highlightedLine: 26,
        });
        z.parent!.color = "black";
        z.parent!.parent!.color = "red";
        rotateLeft(rootBox, z.parent!.parent!);
        steps.push({
          state: snap({ root: rootBox.node, fixing: [z.id] }),
          narration: `Rotation + recolor complete.`,
          highlightedLine: 28,
        });
      }
    }
  }

  rootBox.node!.color = "black";
  steps.push({
    state: snap({ root: rootBox.node }),
    narration: `Fixup complete — root is recolored black. No red-red violations remain.`,
    highlightedLine: 31,
  });
  return steps;
}

// ---------------------------------------------------------------------------
// Search
// ---------------------------------------------------------------------------
export function searchSteps(
  initialValues: number[],
  target: number
): StepSequence<RBVizState> {
  const root = buildRB(initialValues);
  const steps: StepSequence<RBVizState> = [];
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

export const RB_CODE: Record<string, string> = {
  insert: `function insert(tree, value) {
  const z = bstInsert(tree, value); // z starts RED
  fixup(tree, z);
}

function fixup(tree, z) {
  while (z.parent && z.parent.color === "red") {
    const parent = z.parent, grandparent = parent.parent;
    if (parent === grandparent.left) {
      const uncle = grandparent.right;
      if (isRed(uncle)) {
        parent.color = uncle.color = "black";     // recolor
        grandparent.color = "red";
        z = grandparent;                          // continue from grandparent
      } else {
        if (z === parent.right) { z = parent; rotateLeft(tree, z); }   // triangle -> line
        z.parent.color = "black";
        z.parent.parent.color = "red";
        rotateRight(tree, z.parent.parent);        // line case
      }
    } else {
      // mirror image with left/right swapped
    }
  }
  tree.root.color = "black";
}`,
  search: `function search(node, target) {
  if (!node) return null;
  if (target === node.value) return node;
  return target < node.value
    ? search(node.left, target)
    : search(node.right, target);
}`,
};
