import type { StepSequence } from "./types";

export interface TrieNode {
  id: string;
  char: string; // "" for the root
  children: Record<string, TrieNode>;
  isEnd: boolean;
}

export interface TrieVizState {
  root: TrieNode;
  /** id of the node currently being visited */
  current?: string;
  /** ids of nodes along the path lit up so far */
  path?: string[];
  /** whether the last search/insert succeeded — for the final step's narration styling */
  result?: "found" | "not-found" | "inserted";
}

let idCounter = 0;
function nid() {
  idCounter++;
  return `t${idCounter}`;
}

function makeNode(char: string): TrieNode {
  return { id: nid(), char, children: {}, isEnd: false };
}

function cloneNode(node: TrieNode): TrieNode {
  const children: Record<string, TrieNode> = {};
  for (const [k, v] of Object.entries(node.children)) children[k] = cloneNode(v);
  return { ...node, children };
}

function snap(state: TrieVizState): TrieVizState {
  return { ...state, root: cloneNode(state.root) };
}

export function buildTrie(words: string[]): TrieNode {
  const root = makeNode("");
  for (const w of words) {
    let node = root;
    for (const c of w) {
      if (!node.children[c]) node.children[c] = makeNode(c);
      node = node.children[c];
    }
    node.isEnd = true;
  }
  return root;
}

// ---------------------------------------------------------------------------
// Insert — walk/create character by character, mark the final node as a word end
// ---------------------------------------------------------------------------
export function trieInsertSteps(initialWords: string[], word: string): StepSequence<TrieVizState> {
  const root = buildTrie(initialWords);
  const steps: StepSequence<TrieVizState> = [];
  const path: string[] = [root.id];

  steps.push({
    state: snap({ root, current: root.id, path: [...path] }),
    narration: `Inserting "${word}" — start at the root.`,
    highlightedLine: 1,
  });

  let node = root;
  for (let i = 0; i < word.length; i++) {
    const c = word[i];
    let created = false;
    if (!node.children[c]) {
      node.children[c] = makeNode(c);
      created = true;
    }
    node = node.children[c];
    path.push(node.id);
    steps.push({
      state: snap({ root, current: node.id, path: [...path] }),
      narration: created
        ? `'${c}' doesn't exist under this node — create a new child.`
        : `'${c}' already exists here — reuse the existing child (shared prefix).`,
      highlightedLine: created ? 4 : 3,
    });
  }

  node.isEnd = true;
  steps.push({
    state: snap({ root, current: node.id, path: [...path], result: "inserted" }),
    narration: `Mark this node as the end of a word. "${word}" is now in the trie.`,
    highlightedLine: 6,
  });

  return steps;
}

// ---------------------------------------------------------------------------
// Search — walk character by character; word exists only if the final node
// is marked isEnd (a prefix match alone doesn't count).
// ---------------------------------------------------------------------------
export function trieSearchSteps(initialWords: string[], word: string): StepSequence<TrieVizState> {
  const root = buildTrie(initialWords);
  const steps: StepSequence<TrieVizState> = [];
  const path: string[] = [root.id];

  steps.push({
    state: snap({ root, current: root.id, path: [...path] }),
    narration: `Searching for "${word}" — start at the root.`,
    highlightedLine: 1,
  });

  let node = root;
  for (let i = 0; i < word.length; i++) {
    const c = word[i];
    const next = node.children[c];
    if (!next) {
      steps.push({
        state: snap({ root, current: node.id, path: [...path], result: "not-found" }),
        narration: `No child '${c}' here — "${word}" is not in the trie.`,
        highlightedLine: 3,
      });
      return steps;
    }
    node = next;
    path.push(node.id);
    steps.push({
      state: snap({ root, current: node.id, path: [...path] }),
      narration: `Follow '${c}' — matches so far: "${word.slice(0, i + 1)}"`,
      highlightedLine: 4,
    });
  }

  const found = node.isEnd;
  steps.push({
    state: snap({ root, current: node.id, path: [...path], result: found ? "found" : "not-found" }),
    narration: found
      ? `Reached the end of "${word}" and this node is marked end-of-word — found!`
      : `Reached the end of "${word}" but this node is not marked end-of-word — it's only a prefix of other words, not found.`,
    highlightedLine: 6,
  });
  return steps;
}

export const TRIE_CODE: Record<string, string> = {
  insert: `function insert(root, word) {
  let node = root;
  for (const c of word) {
    if (!node.children[c]) {
      node.children[c] = createNode();
    }
    node = node.children[c];
  }
  node.isEnd = true;
}`,
  search: `function search(root, word) {
  let node = root;
  for (const c of word) {
    if (!node.children[c]) return false;
    node = node.children[c];
  }
  return node.isEnd;
}`,
};
