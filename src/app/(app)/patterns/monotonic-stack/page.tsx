"use client";

import { useEffect, useMemo } from "react";
import Badge from "@/components/ui/Badge";
import GlassCard from "@/components/ui/GlassCard";
import { TheorySection, PitfallList } from "@/components/ui/TheorySection";
import ProblemList, { type Problem } from "@/components/ui/ProblemList";
import VisualizerEngine from "@/components/visualizers/VisualizerEngine";
import ArrayBars from "@/components/visualizers/ArrayBars";
import StackView from "@/components/visualizers/StackView";
import { monotonicStackDemoSteps, PATTERN_CODE } from "@/lib/algorithms/patterns";
import { useProgressStore } from "@/lib/store/progress";
import problems from "@/data/problems.json";

const MODULE_SLUG = "monotonic-stack";
const DEMO_VALUES = [2, 1, 2, 4, 3, 1];

export default function MonotonicStackPage() {
  const setModuleProgress = useProgressStore((s) => s.setModuleProgress);
  const completeModule = useProgressStore((s) => s.completeModule);

  useEffect(() => {
    setModuleProgress(MODULE_SLUG, { percent: 50 });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const steps = useMemo(() => monotonicStackDemoSteps(DEMO_VALUES), []);

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 flex flex-col gap-10">
      <header>
        <div className="flex items-center gap-2 mb-2">
          <Badge variant="violet">Pattern</Badge>
          <Badge variant="neutral">Arrays / Stacks</Badge>
        </div>
        <h1 className="text-2xl font-bold font-mono-data">Monotonic Stack</h1>
        <p className="text-text-muted mt-2 text-sm max-w-xl">
          Keep a stack whose values stay strictly increasing (or decreasing) as you
          scan an array. Whenever a new element breaks the ordering, everything it
          &quot;resolves&quot; gets popped — turning an O(n²) nested-loop scan into O(n).
        </p>
      </header>

      <TheorySection title="Recognition Signals">
        <PitfallList
          items={[
            "The problem asks for the 'next greater/smaller element' (or previous greater/smaller) for every position in an array.",
            "A brute-force solution checks every pair of elements — O(n²) — but each element only actually needs its nearest qualifying neighbor.",
            "You need to find, for each bar/temperature/value, how far away the next larger one is.",
            "Problems involving histograms, spans, or 'water trapped between bars' — the stack tracks candidate boundaries.",
          ]}
        />
      </TheorySection>

      <TheorySection title="Visual Blueprint">
        <p>
          Below: <strong>Next Greater Element</strong>. Scan left to right, pushing
          each index onto the stack. Before pushing, pop off every index whose value
          is smaller than the current one — the current value <em>is</em> their next
          greater element. Whatever&apos;s left on the stack at the end has no next greater
          element at all.
        </p>
        <p>
          The stack is always monotonic (here, strictly decreasing bottom-to-top) —
          that invariant is what makes the pop loop amortized O(1) per element across
          the whole scan, even though it looks like a nested loop.
        </p>
      </TheorySection>

      <VisualizerEngine
        steps={steps}
        code={PATTERN_CODE.monotonicStack}
        onComplete={() => completeModule(MODULE_SLUG)}
      >
        {(state) => (
          <div className="w-full flex flex-col gap-4">
            <div>
              <p className="text-[10px] font-mono-data uppercase tracking-wide text-text-muted mb-1">
                Array
              </p>
              <ArrayBars state={state.arr} />
            </div>
            <div className="border-t border-glass-border-token pt-2">
              <p className="text-[10px] font-mono-data uppercase tracking-wide text-text-muted mb-1">
                Stack (indices awaiting their next greater element)
              </p>
              <StackView state={state.stack} />
            </div>
          </div>
        )}
      </VisualizerEngine>

      <TheorySection title="Annotated Code Template">
        <GlassCard>
          <pre className="font-mono-data text-xs leading-relaxed whitespace-pre-wrap">
{`function monotonicStackTemplate(arr) {
  const stack = []; // indices, values monotonic bottom -> top
  const result = new Array(arr.length).fill(-1);

  for (let i = 0; i < arr.length; i++) {
    // 1. Pop everything the current element "resolves"
    while (stack.length && shouldPop(arr[stack.at(-1)], arr[i])) {
      const idx = stack.pop();
      result[idx] = arr[i]; // or i - idx, or whatever the problem asks for
    }

    // 2. Push the current index — it may resolve a later element
    stack.push(i);
  }

  return result;
}`}
          </pre>
        </GlassCard>
      </TheorySection>

      <TheorySection title="Curated Problems">
        <ProblemList problems={problems["monotonic-stack"] as Problem[]} />
      </TheorySection>
    </div>
  );
}
