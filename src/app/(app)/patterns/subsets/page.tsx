"use client";

import { useEffect, useMemo } from "react";
import Badge from "@/components/ui/Badge";
import GlassCard from "@/components/ui/GlassCard";
import { TheorySection, PitfallList, WhenToUse } from "@/components/ui/TheorySection";
import ProblemList, { type Problem } from "@/components/ui/ProblemList";
import ComplexityTable from "@/components/ui/ComplexityTable";
import Quiz, { type QuizQuestion } from "@/components/ui/Quiz";
import VisualizerEngine from "@/components/visualizers/VisualizerEngine";
import RecursionTreeView from "@/components/visualizers/RecursionTreeView";
import StackView from "@/components/visualizers/StackView";
import { subsetsSteps } from "@/lib/algorithms/backtracking";
import { BACKTRACKING_CODE_SAMPLES } from "@/lib/codeSamples/backtracking";
import { useProgressStore } from "@/lib/store/progress";
import problems from "@/data/problems.json";

const MODULE_SLUG = "subsets";
const DEMO_VALUES = [1, 2, 3];

const QUIZ: QuizQuestion[] = [
  {
    question: "Why does the include/exclude template generate exactly 2ⁿ subsets for an input of n elements?",
    options: [
      "Because each subset requires a separate function call from main",
      "Each of the n elements makes an independent binary decision (in or out), and the recursion tree has exactly one leaf per unique combination of those n binary decisions — 2 choices × 2 choices × ... n times = 2ⁿ",
      "2ⁿ is just a coincidence of the specific input used",
      "Because the array has n elements and n! orderings",
    ],
    correctIndex: 1,
    explanation:
      "Every root-to-leaf path is a sequence of n independent binary choices (include element i, or don't), and every distinct sequence of choices produces a distinct leaf/subset. The count of distinct sequences of n binary choices is exactly 2ⁿ.",
  },
  {
    question: "Why must `path.pop()` run immediately after the recursive call that included an element, before trying the 'exclude' branch?",
    options: [
      "It's optional — the algorithm works fine without it",
      "Without popping, `path` would still contain the included element when the 'exclude' branch runs, corrupting every subset generated in that branch and beyond — popping restores `path` to the exact state it was in before this element was considered, which is what makes backtracking correct",
      "Popping is only needed for performance, not correctness",
      "It prevents a stack overflow",
    ],
    correctIndex: 1,
    explanation:
      "This is the defining move of backtracking: 'undo the choice' before trying the next one. `path` is a single shared, mutated array across the whole recursion — if you don't pop after exploring the include-branch, the exclude-branch (and every branch after it) would incorrectly still have this element mixed in.",
  },
  {
    question: "What's the time complexity of generating all subsets of an n-element array, and why?",
    options: [
      "O(n) — one operation per element",
      "O(n · 2ⁿ) — there are 2ⁿ subsets total, and each one costs up to O(n) to copy into the result (path.push/slice)",
      "O(2ⁿ) — copying subsets is free",
      "O(n²) — comparing each pair of elements",
    ],
    correctIndex: 1,
    explanation:
      "There are 2ⁿ subsets, which is already the dominant exponential factor — but each subset can have up to n elements, and materializing it (e.g. [...path]) costs O(n). So total work is O(n · 2ⁿ) once you account for actually producing the output, not just visiting the recursion tree.",
  },
  {
    question:
      "\"Given a set of distinct integers, return all possible combinations that sum to a target, where the same number can be reused unlimited times.\" How does this differ from the base subsets template shown here?",
    options: [
      "It's unrelated to subsets/backtracking entirely",
      "It's the same include/exclude recursion shape with two changes: a pruning condition (stop exploring once the running sum exceeds the target) and, since reuse is allowed, the 'include' branch recurses on the same index instead of index + 1",
      "It requires switching to dynamic programming instead of recursion",
      "It requires sorting to a different order and using two pointers",
    ],
    correctIndex: 1,
    explanation:
      "This is Combination Sum — a direct variant of the subsets template. The core include/exclude recursion stays, but a sum-based pruning condition cuts off invalid branches early, and allowing element reuse means the 'include' branch calls backtrack(index, ...) instead of backtrack(index + 1, ...), since the same element can be chosen again.",
  },
];

export default function SubsetsPage() {
  const setModuleProgress = useProgressStore((s) => s.setModuleProgress);
  const completeModule = useProgressStore((s) => s.completeModule);

  useEffect(() => {
    setModuleProgress(MODULE_SLUG, { percent: 50 });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const steps = useMemo(() => subsetsSteps(DEMO_VALUES), []);

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 flex flex-col gap-10">
      <header>
        <div className="flex items-center gap-2 mb-2">
          <Badge variant="violet">Pattern</Badge>
          <Badge variant="neutral">Backtracking</Badge>
        </div>
        <h1 className="text-2xl font-bold font-mono-data">Subsets (Backtracking)</h1>
        <p className="text-text-muted mt-2 text-sm max-w-xl">
          For every element, branch two ways — include it, or don&apos;t —
          and recurse. Every root-to-leaf path through the resulting
          recursion tree is exactly one subset, so this one simple template
          generates all 2ⁿ of them.
        </p>
      </header>

      <TheorySection title="Recognition Signals">
        <PitfallList
          items={[
            "The problem asks for all subsets, combinations, or power-set-style enumeration of a collection.",
            "Each element has a binary decision attached to it — in or out — with no ordering constraint between decisions.",
            "A brute-force bitmask solution would work (2ⁿ bitmasks) but you want the same result via clean recursion.",
            "The problem is a variant that adds a constraint — a target sum, no duplicates, must-be-contiguous — layered on top of this same include/exclude shape.",
          ]}
        />
      </TheorySection>

      <TheorySection title="Visual Blueprint">
        <p>
          Below: generating every subset of{" "}
          <code className="font-mono-data text-cyan">[{DEMO_VALUES.join(", ")}]</code>.
          The recursion tree grows a level per index — left branch includes
          the current element, right branch excludes it — and a leaf
          (index === length) is a finished subset. The call stack panel
          mirrors exactly what&apos;s &quot;in flight&quot; at each moment: only
          one root-to-leaf path is ever live at once.
        </p>
        <p>
          This is the same shape used for permutations, combination-sum, and
          palindrome partitioning — only what counts as a &quot;choice&quot; and
          what (if anything) gets pruned changes between problems.
        </p>
      </TheorySection>

      <VisualizerEngine
        steps={steps}
        codeSamples={BACKTRACKING_CODE_SAMPLES}
        onComplete={() => completeModule(MODULE_SLUG)}
      >
        {(state) => (
          <div className="w-full flex flex-col gap-4">
            <div>
              <p className="text-[10px] font-mono-data uppercase tracking-wide text-text-muted mb-1">
                Recursion tree
              </p>
              <RecursionTreeView tree={state.tree} activeId={state.activeId} />
            </div>
            <div className="border-t border-glass-border-token pt-2">
              <p className="text-[10px] font-mono-data uppercase tracking-wide text-text-muted mb-1">
                Call stack
              </p>
              <StackView state={state.callStack} />
            </div>
          </div>
        )}
      </VisualizerEngine>

      <TheorySection title="Annotated Code Template">
        <GlassCard>
          <pre className="font-mono-data text-xs leading-relaxed whitespace-pre-wrap">
{`function subsetsTemplate(values) {
  const result = [];

  function backtrack(index, path) {
    if (index === values.length) {
      // 1. Base case — every decision made, record this path
      result.push([...path]);
      return;
    }

    path.push(values[index]);      // 2. Choose: include
    backtrack(index + 1, path);
    path.pop();                    // 3. Un-choose — backtrack

    backtrack(index + 1, path);    // 4. Choose: exclude, recurse again
  }

  backtrack(0, []);
  return result;
}`}
          </pre>
        </GlassCard>
      </TheorySection>

      <TheorySection title="Complexity">
        <ComplexityTable
          rows={[
            {
              operation: "Generate all subsets (power set)",
              best: "O(n · 2ⁿ)",
              average: "O(n · 2ⁿ)",
              worst: "O(n · 2ⁿ)",
              space: "O(n) — recursion depth, excluding output",
            },
            {
              operation: "Generate all subsets with pruning (e.g. target-sum constraint)",
              best: "O(n)",
              average: "somewhere between O(n) and O(n · 2ⁿ)",
              worst: "O(n · 2ⁿ)",
              space: "O(n)",
            },
          ]}
        />
        <p className="text-xs text-text-muted">
          2ⁿ is unavoidable for generating every subset — that&apos;s the size of the
          output. Pruning (cutting a branch once it can&apos;t possibly succeed) is what
          keeps real problems from always hitting the worst case.
        </p>
      </TheorySection>

      <TheorySection title="When to Use vs Not">
        <WhenToUse
          use={[
            "The problem asks for all subsets, combinations, permutations, or power-set-style enumeration of a collection.",
            "Each element has a binary (or small, discrete) decision attached to it, explored independently with no shortcut around visiting every combination.",
            "The problem is a variant that layers a constraint — target sum, no duplicates, must stay contiguous — on top of this same include/exclude shape, where pruning can cut off invalid branches early.",
          ]}
          avoid={[
            "You only need to know whether at least one subset satisfies a condition (existence), or need an optimal value (min/max) rather than every subset — DP often answers these in polynomial time without enumerating 2ⁿ possibilities.",
            "n is large enough that 2ⁿ is intractable and the problem doesn't offer meaningful pruning — that's a signal to look for a DP or greedy reformulation instead of brute-force backtracking.",
            "The problem has overlapping subproblems that backtracking would recompute redundantly — if smaller subsets' answers could be reused, DP is the better fit.",
          ]}
        />
      </TheorySection>

      <TheorySection title="Quiz">
        <Quiz moduleSlug={MODULE_SLUG} questions={QUIZ} />
      </TheorySection>

      <TheorySection title="Curated Problems">
        <ProblemList problems={problems["subsets"] as Problem[]} />
      </TheorySection>
    </div>
  );
}
