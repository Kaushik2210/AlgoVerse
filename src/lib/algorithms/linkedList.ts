import type { StepSequence } from "./types";

export interface LinkedListNode {
  id: string;
  value: number;
}

export interface LinkedListVizState {
  nodes: LinkedListNode[];
  /** index of the node currently pointed at by the traversal cursor */
  pointer?: number;
  /** index of a node that has already been visited this pass */
  visited?: number[];
  /** index of the found / target / newly-inserted node */
  found?: number;
  /** index being removed */
  removing?: number;
  /** index of the slow pointer (fast & slow pointers pattern) */
  slow?: number;
  /** index of the fast pointer (fast & slow pointers pattern) */
  fast?: number;
}

let idCounter = 0;
function nid() {
  idCounter++;
  return `n${idCounter}`;
}

function toNodes(values: number[]): LinkedListNode[] {
  return values.map((v) => ({ id: nid(), value: v }));
}

function snap(state: LinkedListVizState): LinkedListVizState {
  return { ...state, nodes: [...state.nodes] };
}

export function traverseSearchSteps(
  values: number[],
  target: number
): StepSequence<LinkedListVizState> {
  const nodes = toNodes(values);
  const steps: StepSequence<LinkedListVizState> = [];
  const visited: number[] = [];

  steps.push({
    state: snap({ nodes }),
    narration: `Searching for ${target}, starting at head.`,
    highlightedLine: 1,
    stats: { hops: 0 },
  });

  for (let i = 0; i < nodes.length; i++) {
    steps.push({
      state: snap({ nodes, pointer: i, visited: [...visited] }),
      narration: `At node ${nodes[i].value} (index ${i}).`,
      highlightedLine: 3,
      stats: { hops: i },
    });
    if (nodes[i].value === target) {
      steps.push({
        state: snap({ nodes, found: i, visited: [...visited] }),
        narration: `Found ${target} at index ${i}.`,
        highlightedLine: 4,
        stats: { hops: i },
      });
      return steps;
    }
    visited.push(i);
  }

  steps.push({
    state: snap({ nodes, visited }),
    narration: `Reached the end — ${target} is not in the list.`,
    highlightedLine: 7,
    stats: { hops: nodes.length },
  });
  return steps;
}

export function insertAtEndSteps(
  values: number[],
  value: number
): StepSequence<LinkedListVizState> {
  const nodes = toNodes(values);
  const steps: StepSequence<LinkedListVizState> = [];

  steps.push({
    state: snap({ nodes }),
    narration: `Inserting ${value} at the end of the list.`,
    highlightedLine: 1,
  });

  for (let i = 0; i < nodes.length; i++) {
    steps.push({
      state: snap({ nodes, pointer: i, visited: range(0, i - 1) }),
      narration: `Walking to node ${nodes[i].value} (index ${i}).`,
      highlightedLine: 3,
    });
  }

  const newNode: LinkedListNode = { id: nid(), value };
  const next = [...nodes, newNode];
  steps.push({
    state: snap({ nodes: next, found: next.length - 1, visited: range(0, nodes.length - 1) }),
    narration: `Appended ${value} as the new tail.`,
    highlightedLine: 5,
  });
  return steps;
}

export function deleteValueSteps(
  values: number[],
  target: number
): StepSequence<LinkedListVizState> {
  const nodes = toNodes(values);
  const steps: StepSequence<LinkedListVizState> = [];

  steps.push({
    state: snap({ nodes }),
    narration: `Deleting the first node with value ${target}.`,
    highlightedLine: 1,
  });

  let idx = -1;
  for (let i = 0; i < nodes.length; i++) {
    steps.push({
      state: snap({ nodes, pointer: i, visited: range(0, i - 1) }),
      narration: `At node ${nodes[i].value} (index ${i}).`,
      highlightedLine: 3,
    });
    if (nodes[i].value === target) {
      idx = i;
      break;
    }
  }

  if (idx === -1) {
    steps.push({
      state: snap({ nodes }),
      narration: `${target} was not found — nothing to delete.`,
      highlightedLine: 7,
    });
    return steps;
  }

  steps.push({
    state: snap({ nodes, removing: idx }),
    narration: `Relinking previous node's next pointer to skip index ${idx}.`,
    highlightedLine: 5,
  });

  const next = nodes.filter((_, i) => i !== idx);
  steps.push({
    state: snap({ nodes: next }),
    narration: `Node ${target} removed. List now has ${next.length} nodes.`,
    highlightedLine: 6,
  });
  return steps;
}

export function reverseListSteps(values: number[]): StepSequence<LinkedListVizState> {
  const nodes = toNodes(values);
  const steps: StepSequence<LinkedListVizState> = [];

  steps.push({
    state: snap({ nodes }),
    narration: "Reversing the list in place using prev/curr/next pointers.",
    highlightedLine: 1,
  });

  const order = [...nodes];
  const reversedSoFar: LinkedListNode[] = [];
  for (let i = 0; i < order.length; i++) {
    reversedSoFar.unshift(order[i]);
    const display = [...reversedSoFar, ...order.slice(i + 1)];
    steps.push({
      state: snap({ nodes: display, pointer: reversedSoFar.length - 1 }),
      narration: `Reversed pointer for node ${order[i].value}. It now points backward.`,
      highlightedLine: 5,
    });
  }

  steps.push({
    state: snap({ nodes: reversedSoFar, found: 0 }),
    narration: `List fully reversed — new head is ${reversedSoFar[0]?.value}.`,
    highlightedLine: 9,
  });
  return steps;
}

function range(lo: number, hi: number): number[] {
  const out: number[] = [];
  for (let i = lo; i <= hi; i++) out.push(i);
  return out;
}

export const LINKED_LIST_CODE: Record<string, string> = {
  search: `function search(head, target) {
  let curr = head;
  while (curr) {
    if (curr.value === target) return curr;
    curr = curr.next;
  }
  return null;
}`,
  insert: `function insertAtEnd(head, value) {
  const node = { value, next: null };
  if (!head) return node;
  let curr = head;
  while (curr.next) curr = curr.next;
  curr.next = node;
  return head;
}`,
  delete: `function deleteValue(head, target) {
  if (!head) return null;
  if (head.value === target) return head.next;
  let curr = head;
  while (curr.next && curr.next.value !== target) {
    curr = curr.next;
  }
  if (curr.next) curr.next = curr.next.next;
  return head;
}`,
  reverse: `function reverse(head) {
  let prev = null;
  let curr = head;
  while (curr) {
    const next = curr.next;
    curr.next = prev;
    prev = curr;
    curr = next;
  }
  return prev;
}`,
};
