"use client";

import { useEffect, useMemo } from "react";
import Badge from "@/components/ui/Badge";
import GlassCard from "@/components/ui/GlassCard";
import { TheorySection, PitfallList } from "@/components/ui/TheorySection";
import ProblemList, { type Problem } from "@/components/ui/ProblemList";
import VisualizerEngine from "@/components/visualizers/VisualizerEngine";
import RecursionTreeView from "@/components/visualizers/RecursionTreeView";
import StackView from "@/components/visualizers/StackView";
import { subsetsSteps, BACKTRACKING_CODE } from "@/lib/algorithms/backtracking";
import { useProgressStore } from "@/lib/store/progress";
import problems from "@/data/problems.json";

const MODULE_SLUG = "subsets";
const DEMO_VALUES = [1, 2, 3];

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
        code={BACKTRACKING_CODE}
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

      <TheorySection title="Curated Problems">
        <ProblemList problems={problems["subsets"] as Problem[]} />
      </TheorySection>
    </div>
  );
}
