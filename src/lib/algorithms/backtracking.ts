import type { StepSequence } from "./types";
import type { StackItem, StackVizState } from "./stack";

export type CallDecision = "include" | "exclude" | "root";
export type CallStatus = "active" | "returned" | "solution";

export interface RecursionTreeNode {
  id: string;
  parentId: string | null;
  index: number;
  path: number[];
  decision: CallDecision;
  status: CallStatus;
}

export interface BacktrackingVizState {
  values: number[];
  tree: RecursionTreeNode[];
  callStack: StackVizState;
  solutions: number[][];
  activeId?: string;
}

let idCounter = 0;
function nid() {
  idCounter++;
  return `bt${idCounter}`;
}

// ---------------------------------------------------------------------------
// Subsets via include/exclude backtracking — the classic recursion-tree demo.
// For each index we branch two ways (include values[index], or don't), and
// a leaf (index === values.length) is a complete subset. Depth n, 2^n leaves.
// ---------------------------------------------------------------------------
export function subsetsSteps(values: number[]): StepSequence<BacktrackingVizState> {
  const steps: StepSequence<BacktrackingVizState> = [];
  const tree: RecursionTreeNode[] = [];
  const stackItems: StackItem[] = [];
  const solutions: number[][] = [];

  function snapshot(activeId?: string): BacktrackingVizState {
    return {
      values,
      tree: tree.map((t) => ({ ...t, path: [...t.path] })),
      callStack: { items: stackItems.map((s) => ({ ...s })) },
      solutions: solutions.map((s) => [...s]),
      activeId,
    };
  }

  const rootId = nid();
  tree.push({ id: rootId, parentId: null, index: 0, path: [], decision: "root", status: "active" });
  stackItems.push({ id: rootId, value: `backtrack(0)` });
  steps.push({
    state: snapshot(rootId),
    narration: `Call backtrack(0, []) — decide whether to include values[0] = ${values[0]}.`,
    highlightedLine: 3,
    stats: { calls: tree.length, solutions: 0 },
  });

  function markReturned(id: string) {
    const node = tree.find((t) => t.id === id)!;
    if (node.status === "active") node.status = "returned";
  }

  function backtrack(index: number, path: number[], nodeId: string) {
    if (index === values.length) {
      solutions.push([...path]);
      const node = tree.find((t) => t.id === nodeId)!;
      node.status = "solution";
      steps.push({
        state: snapshot(nodeId),
        narration: `index reached ${values.length} — record subset [${path.join(", ")}] as a complete solution.`,
        highlightedLine: 4,
        stats: { calls: tree.length, solutions: solutions.length },
      });
      return;
    }

    // Branch 1: include values[index]
    const includePath = [...path, values[index]];
    const includeId = nid();
    tree.push({ id: includeId, parentId: nodeId, index: index + 1, path: includePath, decision: "include", status: "active" });
    stackItems.push({ id: includeId, value: `backtrack(${index + 1})` });
    steps.push({
      state: snapshot(includeId),
      narration: `Include values[${index}] = ${values[index]} → recurse into backtrack(${index + 1}, [${includePath.join(", ")}]).`,
      highlightedLine: 8,
      stats: { calls: tree.length, solutions: solutions.length },
    });
    backtrack(index + 1, includePath, includeId);
    stackItems.pop();
    markReturned(includeId);
    steps.push({
      state: snapshot(nodeId),
      narration: `Backtrack: undo including ${values[index]} and return to backtrack(${index}, [${path.join(", ")}]).`,
      highlightedLine: 9,
      stats: { calls: tree.length, solutions: solutions.length },
    });

    // Branch 2: exclude values[index]
    const excludeId = nid();
    tree.push({ id: excludeId, parentId: nodeId, index: index + 1, path: [...path], decision: "exclude", status: "active" });
    stackItems.push({ id: excludeId, value: `backtrack(${index + 1})` });
    steps.push({
      state: snapshot(excludeId),
      narration: `Exclude values[${index}] = ${values[index]} → recurse into backtrack(${index + 1}, [${path.join(", ")}]).`,
      highlightedLine: 11,
      stats: { calls: tree.length, solutions: solutions.length },
    });
    backtrack(index + 1, path, excludeId);
    stackItems.pop();
    markReturned(excludeId);

    markReturned(nodeId);
    steps.push({
      state: snapshot(nodeId),
      narration: `Both branches from index ${index} fully explored — return up the call stack.`,
      highlightedLine: 12,
      stats: { calls: tree.length, solutions: solutions.length },
    });
  }

  backtrack(0, [], rootId);
  stackItems.pop();
  markReturned(rootId);

  steps.push({
    state: snapshot(),
    narration: `Recursion complete. Found all ${solutions.length} subsets of [${values.join(", ")}].`,
    highlightedLine: 15,
    stats: { calls: tree.length, solutions: solutions.length },
  });

  return steps;
}

export const BACKTRACKING_CODE = `function subsets(values) {
  const result = [];
  function backtrack(index, path) {
    if (index === values.length) {
      result.push([...path]);
      return;
    }

    path.push(values[index]);      // 1. include
    backtrack(index + 1, path);
    path.pop();                    // 2. undo — backtrack

    backtrack(index + 1, path);    // 3. exclude, recurse again
  }
  backtrack(0, []);
  return result;
}`;
