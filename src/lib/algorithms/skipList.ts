import type { StepSequence } from "./types";

export interface SkipListNode {
  id: string;
  value: number;
  /** number of levels this node participates in, 1 = bottom level only */
  height: number;
}

/** Sentinel id used for the head pointer at every level (no value of its own). */
export const HEAD = "__head__";

export interface SkipListVizState {
  /** levels[0] = bottom (every node), levels[maxLevel - 1] = top (fewest nodes) */
  levels: SkipListNode[][];
  maxLevel: number;
  /** current traversal pointer: which level, and which node (or HEAD) it's sitting at */
  current?: { level: number; nodeId: string };
  /** every position visited this operation, in order — draws the zigzag drop-down path */
  path: { level: number; nodeId: string; action: "right" | "drop" }[];
  found?: boolean;
  target?: number;
  /** node just inserted, if this is an insert operation */
  insertedId?: string;
}

const MAX_LEVEL = 4;

let idCounter = 0;
function nid() {
  idCounter++;
  return `sl${idCounter}`;
}

// Deterministic seeded PRNG (mulberry32) so heights — and therefore the whole
// skip list shape — are reproducible across renders and easy to hand-verify.
function mulberry32(seed: number) {
  let a = seed;
  return function () {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function randomHeight(rng: () => number, maxLevel: number): number {
  let h = 1;
  while (rng() < 0.5 && h < maxLevel) h++;
  return h;
}

function buildLevels(nodes: SkipListNode[], maxLevel: number): SkipListNode[][] {
  const levels: SkipListNode[][] = [];
  for (let l = 0; l < maxLevel; l++) {
    levels.push(
      nodes.filter((n) => n.height > l).sort((a, b) => a.value - b.value)
    );
  }
  return levels;
}

function snap(state: SkipListVizState): SkipListVizState {
  return { ...state, levels: state.levels.map((l) => [...l]), path: [...state.path] };
}

/** Plain construction (no steps) — sorted unique values, deterministic heights. */
export function buildSkipList(values: number[], seed = 42): { nodes: SkipListNode[]; maxLevel: number } {
  const rng = mulberry32(seed);
  const unique = Array.from(new Set(values)).sort((a, b) => a - b);
  const nodes = unique.map((value) => ({ id: nid(), value, height: randomHeight(rng, MAX_LEVEL) }));
  return { nodes, maxLevel: MAX_LEVEL };
}

// ---------------------------------------------------------------------------
// Build — insert each sorted-unique value one at a time, showing the height
// coin-flip result and the growing layered structure.
// ---------------------------------------------------------------------------
export function buildSteps(values: number[], seed = 42): StepSequence<SkipListVizState> {
  const rng = mulberry32(seed);
  const unique = Array.from(new Set(values)).sort((a, b) => a - b);
  const nodes: SkipListNode[] = [];
  const steps: StepSequence<SkipListVizState> = [];

  steps.push({
    state: snap({ levels: buildLevels(nodes, MAX_LEVEL), maxLevel: MAX_LEVEL, path: [] }),
    narration: `Building a skip list from [${unique.join(", ")}] — each node gets a random height (a coin-flip per extra level) that decides how many levels it appears in.`,
    highlightedLine: 1,
  });

  for (const value of unique) {
    const height = randomHeight(rng, MAX_LEVEL);
    const node: SkipListNode = { id: nid(), value, height };
    nodes.push(node);
    steps.push({
      state: snap({ levels: buildLevels(nodes, MAX_LEVEL), maxLevel: MAX_LEVEL, path: [], insertedId: node.id }),
      narration: `Insert ${value}: coin flips gave it height ${height} — it appears on level${height > 1 ? "s" : ""} 0${height > 1 ? `-${height - 1}` : ""}.`,
      highlightedLine: 3,
      stats: { value, height },
    });
  }

  steps.push({
    state: snap({ levels: buildLevels(nodes, MAX_LEVEL), maxLevel: MAX_LEVEL, path: [] }),
    narration: `Build complete — ${nodes.length} node(s) across ${MAX_LEVEL} levels. Higher levels have fewer nodes, letting search skip ahead.`,
    highlightedLine: 5,
  });
  return steps;
}

// ---------------------------------------------------------------------------
// Search — the core visual: start top-left at the head, move right while the
// next node's value is still below target, and drop down a level whenever
// you can't move right anymore. This right/right/.../drop zigzag is exactly
// how a skip list beats a plain linked list's O(n) search.
// ---------------------------------------------------------------------------
export function searchSteps(values: number[], target: number, seed = 42): StepSequence<SkipListVizState> {
  const { nodes, maxLevel } = buildSkipList(values, seed);
  const levels = buildLevels(nodes, maxLevel);
  const steps: StepSequence<SkipListVizState> = [];
  const path: SkipListVizState["path"] = [];

  steps.push({
    state: snap({ levels, maxLevel, path: [], current: { level: maxLevel - 1, nodeId: HEAD }, target }),
    narration: `Searching for ${target}. Start at the head, top level (level ${maxLevel - 1}).`,
    highlightedLine: 1,
  });

  let currentId = HEAD;
  for (let level = maxLevel - 1; level >= 0; level--) {
    const arr = levels[level];
    let i = currentId === HEAD ? 0 : arr.findIndex((n) => n.id === currentId) + 1;

    while (i < arr.length && arr[i].value < target) {
      currentId = arr[i].id;
      path.push({ level, nodeId: currentId, action: "right" });
      steps.push({
        state: snap({ levels, maxLevel, path: [...path], current: { level, nodeId: currentId }, target }),
        narration: `Level ${level}: ${arr[i].value} < ${target} — step right to ${arr[i].value}.`,
        highlightedLine: 3,
      });
      i++;
    }

    const blockedBy = i < arr.length ? arr[i].value : "end of level";
    if (level > 0) {
      path.push({ level, nodeId: currentId, action: "drop" });
      steps.push({
        state: snap({ levels, maxLevel, path: [...path], current: { level: level - 1, nodeId: currentId }, target }),
        narration: `Level ${level}: next is ${blockedBy} — can't go further right without overshooting ${target}. Drop down to level ${level - 1}.`,
        highlightedLine: 5,
      });
    } else {
      const found = i < arr.length && arr[i].value === target;
      steps.push({
        state: snap({
          levels,
          maxLevel,
          path: [...path],
          current: { level: 0, nodeId: found ? arr[i].id : currentId },
          target,
          found,
        }),
        narration: found
          ? `Level 0: next node is ${target} — found it!`
          : `Level 0: next is ${blockedBy} — ${target} is not in the skip list.`,
        highlightedLine: 7,
      });
    }
  }

  return steps;
}

// ---------------------------------------------------------------------------
// Insert — same top-down search to find each level's predecessor, then
// splice the new node in at every level up to its random height.
// ---------------------------------------------------------------------------
export function insertSteps(values: number[], newValue: number, seed = 42): StepSequence<SkipListVizState> {
  const { nodes, maxLevel } = buildSkipList(values, seed);
  const levels = buildLevels(nodes, maxLevel);
  const steps: StepSequence<SkipListVizState> = [];
  const path: SkipListVizState["path"] = [];
  const predecessors: string[] = new Array(maxLevel).fill(HEAD);

  steps.push({
    state: snap({ levels, maxLevel, path: [], current: { level: maxLevel - 1, nodeId: HEAD } }),
    narration: `Inserting ${newValue} — first find the predecessor at every level, same top-down walk as search.`,
    highlightedLine: 1,
  });

  let currentId = HEAD;
  for (let level = maxLevel - 1; level >= 0; level--) {
    const arr = levels[level];
    let i = currentId === HEAD ? 0 : arr.findIndex((n) => n.id === currentId) + 1;
    while (i < arr.length && arr[i].value < newValue) {
      currentId = arr[i].id;
      path.push({ level, nodeId: currentId, action: "right" });
      steps.push({
        state: snap({ levels, maxLevel, path: [...path], current: { level, nodeId: currentId } }),
        narration: `Level ${level}: step right to ${arr[i].value}.`,
        highlightedLine: 3,
      });
      i++;
    }
    predecessors[level] = currentId;
    if (level > 0) {
      path.push({ level, nodeId: currentId, action: "drop" });
      steps.push({
        state: snap({ levels, maxLevel, path: [...path], current: { level: level - 1, nodeId: currentId } }),
        narration: `Level ${level}: predecessor is ${currentId === HEAD ? "head" : arr.find((n) => n.id === currentId)?.value}. Drop down to level ${level - 1}.`,
        highlightedLine: 5,
      });
    }
  }

  const rng = mulberry32(seed + newValue * 7919);
  const height = randomHeight(rng, maxLevel);
  const node: SkipListNode = { id: nid(), value: newValue, height };
  const newNodes = [...nodes, node];
  const newLevels = buildLevels(newNodes, maxLevel);

  steps.push({
    state: snap({ levels: newLevels, maxLevel, path: [...path], insertedId: node.id }),
    narration: `${newValue} gets height ${height} — spliced in right after each level's predecessor, from level 0 up to level ${height - 1}.`,
    highlightedLine: 8,
    stats: { value: newValue, height },
  });

  return steps;
}

export const SKIP_LIST_CODE: Record<string, string> = {
  build: `function insert(list, value) {
  const height = randomHeight();       // coin flip per extra level
  const node = { value, height, forward: [] };
  splice(list, node);                  // link in at every level 0..height-1
}`,
  search: `function search(list, target) {
  let x = list.head;
  for (let level = list.maxLevel - 1; level >= 0; level--) {
    while (x.forward[level] && x.forward[level].value < target) {
      x = x.forward[level];            // move right
    }
    // otherwise: drop down a level, x stays put
  }
  x = x.forward[0];
  return x && x.value === target ? x : null;
}`,
  insert: `function insert(list, value) {
  const update = new Array(list.maxLevel); // predecessor at each level
  let x = list.head;
  for (let level = list.maxLevel - 1; level >= 0; level--) {
    while (x.forward[level] && x.forward[level].value < value) x = x.forward[level];
    update[level] = x;
  }
  const height = randomHeight();
  const node = { value, height, forward: [] };
  for (let level = 0; level < height; level++) {
    node.forward[level] = update[level].forward[level];
    update[level].forward[level] = node;
  }
}`,
};
