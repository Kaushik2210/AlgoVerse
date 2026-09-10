import type { StepSequence } from "./types";

export interface StackItem {
  id: string;
  value: number | string;
}

export interface StackVizState {
  items: StackItem[];
  /** index (from the bottom) of the item just pushed — the new top */
  pushing?: number;
  /** index about to be popped */
  popping?: number;
  /** index being peeked at without removal */
  peeking?: number;
  /** index highlighted while scanning (e.g. balanced-parens walk) */
  cursor?: number;
}

let idCounter = 0;
function nid() {
  idCounter++;
  return `s${idCounter}`;
}

function toItems(values: (number | string)[]): StackItem[] {
  return values.map((v) => ({ id: nid(), value: v }));
}

function snap(state: StackVizState): StackVizState {
  return { ...state, items: [...state.items] };
}

// ---------------------------------------------------------------------------
// Push
// ---------------------------------------------------------------------------
export function pushSteps(initial: number[], value: number): StepSequence<StackVizState> {
  const items = toItems(initial);
  const steps: StepSequence<StackVizState> = [];

  steps.push({
    state: snap({ items }),
    narration: `Stack has ${items.length} item(s). Pushing ${value} onto the top.`,
    highlightedLine: 1,
    stats: { size: items.length },
  });

  const next = [...items, { id: nid(), value }];
  steps.push({
    state: snap({ items: next, pushing: next.length - 1 }),
    narration: `Pushed ${value}. It's now the top of the stack (LIFO — last in, first out).`,
    highlightedLine: 2,
    stats: { size: next.length },
  });

  return steps;
}

// ---------------------------------------------------------------------------
// Pop
// ---------------------------------------------------------------------------
export function popSteps(initial: number[]): StepSequence<StackVizState> {
  const items = toItems(initial);
  const steps: StepSequence<StackVizState> = [];

  steps.push({
    state: snap({ items }),
    narration:
      items.length === 0
        ? "Stack is empty — pop would underflow."
        : `Stack has ${items.length} item(s). Popping the top.`,
    highlightedLine: 1,
    stats: { size: items.length },
  });

  if (items.length === 0) return steps;

  const top = items[items.length - 1];
  steps.push({
    state: snap({ items, popping: items.length - 1 }),
    narration: `Top of stack is ${top.value} — removing it.`,
    highlightedLine: 2,
    stats: { size: items.length },
  });

  const next = items.slice(0, -1);
  steps.push({
    state: snap({ items: next }),
    narration: `Popped ${top.value}. New top is ${next[next.length - 1]?.value ?? "(empty)"}.`,
    highlightedLine: 3,
    stats: { size: next.length },
  });

  return steps;
}

// ---------------------------------------------------------------------------
// Peek
// ---------------------------------------------------------------------------
export function peekSteps(initial: number[]): StepSequence<StackVizState> {
  const items = toItems(initial);
  const steps: StepSequence<StackVizState> = [];

  steps.push({
    state: snap({ items }),
    narration:
      items.length === 0 ? "Stack is empty — nothing to peek." : "Looking at the top item without removing it.",
    highlightedLine: 1,
    stats: { size: items.length },
  });

  if (items.length === 0) return steps;

  steps.push({
    state: snap({ items, peeking: items.length - 1 }),
    narration: `Top of stack is ${items[items.length - 1].value}. Stack is unchanged.`,
    highlightedLine: 2,
    stats: { size: items.length },
  });

  return steps;
}

// ---------------------------------------------------------------------------
// Balanced parentheses — the canonical "stack as call-stack analogy" demo
// ---------------------------------------------------------------------------
const PAIRS: Record<string, string> = { ")": "(", "]": "[", "}": "{" };
const OPENERS = new Set(["(", "[", "{"]);

export function balancedParensSteps(expr: string): StepSequence<StackVizState> {
  const chars = expr.split("");
  const items: StackItem[] = [];
  const steps: StepSequence<StackVizState> = [];

  steps.push({
    state: snap({ items: [] }),
    narration: `Scanning "${expr}" — push every opener, pop-and-match every closer.`,
    highlightedLine: 1,
    stats: { size: 0 },
  });

  for (let i = 0; i < chars.length; i++) {
    const c = chars[i];
    if (OPENERS.has(c)) {
      items.push({ id: nid(), value: c });
      steps.push({
        state: snap({ items, pushing: items.length - 1, cursor: i }),
        narration: `'${c}' is an opener — push it.`,
        highlightedLine: 3,
        stats: { size: items.length },
      });
    } else if (c in PAIRS) {
      if (items.length === 0) {
        steps.push({
          state: snap({ items, cursor: i }),
          narration: `'${c}' has nothing to match — stack is empty. Unbalanced!`,
          highlightedLine: 5,
          stats: { size: 0 },
        });
        return steps;
      }
      const top = items[items.length - 1];
      if (top.value !== PAIRS[c]) {
        steps.push({
          state: snap({ items, peeking: items.length - 1, cursor: i }),
          narration: `'${c}' expected to match '${PAIRS[c]}' but top of stack is '${top.value}'. Unbalanced!`,
          highlightedLine: 6,
          stats: { size: items.length },
        });
        return steps;
      }
      steps.push({
        state: snap({ items, popping: items.length - 1, cursor: i }),
        narration: `'${c}' matches '${top.value}' — pop it.`,
        highlightedLine: 7,
        stats: { size: items.length },
      });
      items.pop();
      steps.push({
        state: snap({ items, cursor: i }),
        narration: `Matched pair closed. ${items.length} opener(s) still open.`,
        highlightedLine: 7,
        stats: { size: items.length },
      });
    } else {
      steps.push({
        state: snap({ items, cursor: i }),
        narration: `'${c}' is not a bracket — skip.`,
        highlightedLine: 2,
        stats: { size: items.length },
      });
    }
  }

  const balanced = items.length === 0;
  steps.push({
    state: snap({ items }),
    narration: balanced
      ? "Scan complete and the stack is empty — the expression is balanced!"
      : `Scan complete but ${items.length} opener(s) were never closed — unbalanced.`,
    highlightedLine: 10,
    stats: { size: items.length },
  });
  return steps;
}

export const STACK_CODE: Record<string, string> = {
  push: `function push(stack, value) {
  stack.push(value); // O(1) — grows from the top
  return stack;
}`,
  pop: `function pop(stack) {
  if (stack.length === 0) throw new Error("underflow");
  const top = stack[stack.length - 1];
  stack.pop();
  return top;
}`,
  peek: `function peek(stack) {
  if (stack.length === 0) return undefined;
  return stack[stack.length - 1];
}`,
  balanced: `function isBalanced(expr) {
  const pairs = { ")": "(", "]": "[", "}": "{" };
  const stack = [];
  for (const c of expr) {
    if ("([{".includes(c)) {
      stack.push(c);
    } else if (c in pairs) {
      if (stack.pop() !== pairs[c]) return false;
    }
  }
  return stack.length === 0;
}`,
};
