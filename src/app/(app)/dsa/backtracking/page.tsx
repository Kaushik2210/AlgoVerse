"use client";

import { useEffect, useMemo, useState } from "react";
import GlassCard from "@/components/ui/GlassCard";
import Badge from "@/components/ui/Badge";
import ComplexityTable from "@/components/ui/ComplexityTable";
import { TheorySection, PitfallList, WhenToUse } from "@/components/ui/TheorySection";
import Quiz, { type QuizQuestion } from "@/components/ui/Quiz";
import VisualizerEngine from "@/components/visualizers/VisualizerEngine";
import RecursionTreeView from "@/components/visualizers/RecursionTreeView";
import StackView from "@/components/visualizers/StackView";
import { subsetsSteps, BACKTRACKING_CODE } from "@/lib/algorithms/backtracking";
import { useProgressStore } from "@/lib/store/progress";

const MODULE_SLUG = "backtracking";
const DEFAULT_VALUES = "1, 2, 3";

const QUIZ: QuizQuestion[] = [
  {
    question: "What is the defining shape of a backtracking algorithm?",
    options: [
      "It always uses a hash map to memoize results",
      "It builds a solution incrementally, and undoes ('backtracks') the most recent choice when a branch is exhausted or invalid",
      "It sorts the input before processing",
      "It only works on tree-structured data",
    ],
    correctIndex: 1,
    explanation:
      "Backtracking is depth-first exploration with undo: make a choice, recurse, then undo that exact choice before trying the next one — which is exactly what the call stack in the visualization is doing.",
  },
  {
    question: "In the subsets recursion tree above, what does a leaf node (where index === values.length) represent?",
    options: [
      "An invalid branch that got pruned",
      "A completed decision for every element — a full subset, ready to record",
      "An error in the recursion",
      "The start of a new recursive call",
    ],
    correctIndex: 1,
    explanation:
      "Once every index has been decided (included or excluded), there's nothing left to choose — the current path is a complete, valid subset, so it gets recorded as a solution.",
  },
  {
    question: "Why does the call stack in the visualization shrink back down after reaching a leaf?",
    options: [
      "The visualization has a bug",
      "Recording a solution automatically clears all pending calls",
      "The function returns after recording, popping its stack frame, and control goes back to the parent call to try its next branch",
      "The stack only grows, it never shrinks",
    ],
    correctIndex: 2,
    explanation:
      "This is the 'backtrack' in backtracking — reaching a leaf just means this particular path is done. The recursive call returns, its frame pops off the stack, and the parent call resumes to explore its other branch.",
  },
  {
    question: "For n elements, how many leaves does the subsets recursion tree have, and what does that tell you about complexity?",
    options: [
      "n leaves — O(n) total subsets",
      "n² leaves — O(n²) total time",
      "2^n leaves — there are 2^n possible subsets, so backtracking here is inherently exponential",
      "log(n) leaves — backtracking is always logarithmic",
    ],
    correctIndex: 2,
    explanation:
      "Every element independently is either in or out, so there are exactly 2^n possible subsets — and generating all of them necessarily visits 2^n leaves. This is why backtracking is often exponential unless pruning cuts branches short.",
  },
];

function parseValues(text: string): number[] {
  return text
    .split(",")
    .map((s) => Number(s.trim()))
    .filter((n) => Number.isFinite(n));
}

export default function BacktrackingPage() {
  const [valuesText, setValuesText] = useState(DEFAULT_VALUES);
  const setModuleProgress = useProgressStore((s) => s.setModuleProgress);

  useEffect(() => {
    setModuleProgress(MODULE_SLUG, { percent: 40 });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const values = useMemo(() => parseValues(valuesText), [valuesText]);
  const steps = useMemo(() => (values.length > 0 && values.length <= 5 ? subsetsSteps(values) : undefined), [values]);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[1fr_480px] gap-8 px-4 sm:px-6 py-8 max-w-[1400px] mx-auto">
      <div className="flex flex-col gap-10 min-w-0">
        <header>
          <div className="flex items-center gap-2 mb-2">
            <Badge variant="cyan">Data Structure</Badge>
            <Badge variant="neutral">Advanced</Badge>
          </div>
          <h1 className="text-2xl font-bold font-mono-data">Backtracking</h1>
          <p className="text-text-muted mt-2 text-sm max-w-xl">
            A depth-first exploration strategy: make a choice, recurse into
            it, then <strong>undo</strong> the choice before trying the next
            one. The recursion tree below grows as calls are made and
            collapses as they return — synced live against the actual call
            stack.
          </p>
        </header>

        <TheorySection title="Intuition">
          <p>
            Backtracking is what you&apos;d do exploring a maze by hand: try a
            path, and if it doesn&apos;t pan out (or once you&apos;ve fully
            explored it), walk back to the last fork and try the other
            direction. The &quot;walking back&quot; is literal — it&apos;s just a
            function returning, which pops its stack frame and resumes the
            caller exactly where it left off.
          </p>
          <p>
            This module uses <strong>generating subsets</strong> as the
            demonstrative example: for each element, branch into two calls —
            one that includes it, one that excludes it. Every root-to-leaf
            path through the tree is one complete decision sequence, i.e. one
            subset.
          </p>
        </TheorySection>

        <TheorySection title="Formal Definition">
          <p>
            A backtracking algorithm explores a state space via depth-first
            recursion. At each state, it enumerates the available choices; for
            each choice it <strong>applies</strong> it, <strong>recurses</strong>{" "}
            into the resulting state, then <strong>undoes</strong> the choice
            before trying the next one. A branch that violates a constraint
            (or, as here, simply exhausts the input) terminates that recursive
            call, and control returns to the parent to continue with its
            remaining choices.
          </p>
          <p>
            When branches can be discarded early because they can&apos;t
            possibly lead to a valid solution — e.g. a partial sum already
            exceeding a target — that&apos;s called <strong>pruning</strong>,
            and it&apos;s what keeps backtracking from being pure brute force
            in constrained problems (N-Queens, Sudoku, combination-sum with a
            target). Plain subset generation has no invalid states to prune,
            so every branch runs to completion.
          </p>
        </TheorySection>

        <TheorySection title="Complexity">
          <ComplexityTable
            rows={[
              { operation: "Generate all subsets (n elements)", best: "O(2ⁿ)", average: "O(2ⁿ)", worst: "O(2ⁿ)", space: "O(n)" },
              { operation: "Call stack depth", best: "O(n)", average: "O(n)", worst: "O(n)", space: "O(n)" },
              { operation: "With effective pruning", best: "O(n)", average: "problem-dependent", worst: "O(2ⁿ) unpruned bound", space: "O(n)" },
            ]}
          />
          <p className="text-xs text-text-muted">
            The recursion tree has exactly 2ⁿ leaves for subset generation —
            there&apos;s no way around visiting all of them if you need every
            subset. Space stays O(n) because only one root-to-leaf path is
            &quot;in flight&quot; (on the call stack) at any moment.
          </p>
        </TheorySection>

        <TheorySection title="Common Pitfalls">
          <PitfallList
            items={[
              "Forgetting to undo a mutation (like popping a shared 'path' array) before trying the next branch — this leaks state between sibling calls.",
              "Not identifying a real pruning opportunity — checking a constraint only at the leaf instead of as early as possible wastes exponential work exploring doomed branches.",
              "Confusing backtracking with plain recursion — the defining trait is the explicit undo step between branches, not just 'a function that calls itself'.",
              "Building the full result eagerly in memory for very large n — 2ⁿ subsets grows fast; consider yielding/streaming solutions instead.",
            ]}
          />
        </TheorySection>

        <TheorySection title="When to Use vs Not">
          <WhenToUse
            use={[
              "You need to enumerate all valid configurations — subsets, permutations, combinations, N-Queens placements, Sudoku solutions.",
              "The problem has a natural 'make a choice, recurse, undo' structure and constraints that let you prune invalid branches early.",
              "You need any valid solution (not necessarily optimal) and can stop as soon as one is found.",
            ]}
            avoid={[
              "The state space is enormous and unprunable — brute-force backtracking without pruning is exponential and won't finish.",
              "You need an optimal solution under overlapping subproblems — dynamic programming (memoizing backtracking) is usually the better fit.",
              "A greedy or direct formula solves the problem — backtracking is a fallback for when no simpler structure exists.",
            ]}
          />
        </TheorySection>

        <TheorySection title="Quiz">
          <Quiz moduleSlug={MODULE_SLUG} questions={QUIZ} />
        </TheorySection>
      </div>

      <div className="lg:sticky lg:top-20 self-start flex flex-col gap-4 min-w-0">
        <GlassCard className="!py-3 !px-4">
          <div className="flex flex-col gap-1.5">
            <label htmlFor="values" className="text-xs font-mono-data text-text-muted">
              Values to generate subsets of (max 5, comma separated):
            </label>
            <input
              id="values"
              value={valuesText}
              onChange={(e) => setValuesText(e.target.value)}
              className="glass rounded-lg px-3 py-2 text-sm font-mono-data outline-none focus:border-cyan/50"
              placeholder="e.g. 1, 2, 3"
            />
            {values.length > 5 && (
              <p className="text-[11px] font-mono-data text-amber">
                Keep it to 5 or fewer values — the tree has 2ⁿ leaves.
              </p>
            )}
          </div>
        </GlassCard>

        {steps && (
          <VisualizerEngine
            key={valuesText}
            steps={steps}
            code={BACKTRACKING_CODE}
            onComplete={() => setModuleProgress(MODULE_SLUG, { percent: 80 })}
          >
            {(state) => (
              <div className="w-full flex flex-col gap-4">
                <div>
                  <p className="text-[10px] font-mono-data uppercase tracking-wide text-text-muted mb-1">
                    Recursion tree
                  </p>
                  <RecursionTreeView tree={state.tree} activeId={state.activeId} />
                </div>
                <div className="border-t border-glass-border-token pt-3">
                  <p className="text-[10px] font-mono-data uppercase tracking-wide text-text-muted mb-1">
                    Call stack ({state.callStack.items.length} frame{state.callStack.items.length === 1 ? "" : "s"})
                  </p>
                  <StackView state={state.callStack} />
                </div>
                <div className="border-t border-glass-border-token pt-3">
                  <p className="text-[10px] font-mono-data uppercase tracking-wide text-text-muted mb-1">
                    Solutions found ({state.solutions.length})
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {state.solutions.map((s, i) => (
                      <span
                        key={i}
                        className="px-2 py-1 rounded-md bg-amber/10 border border-amber/30 text-amber font-mono-data text-[11px]"
                      >
                        {`{${s.join(", ")}}`}
                      </span>
                    ))}
                    {state.solutions.length === 0 && (
                      <span className="text-[11px] font-mono-data text-text-muted">none yet</span>
                    )}
                  </div>
                </div>
              </div>
            )}
          </VisualizerEngine>
        )}
      </div>
    </div>
  );
}
