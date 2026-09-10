"use client";

import { useEffect, useMemo } from "react";
import Badge from "@/components/ui/Badge";
import GlassCard from "@/components/ui/GlassCard";
import { TheorySection, PitfallList } from "@/components/ui/TheorySection";
import ProblemList, { type Problem } from "@/components/ui/ProblemList";
import VisualizerEngine from "@/components/visualizers/VisualizerEngine";
import ArrayBars from "@/components/visualizers/ArrayBars";
import { twoPointersDemoSteps, PATTERN_CODE } from "@/lib/algorithms/patterns";
import { useProgressStore } from "@/lib/store/progress";
import problems from "@/data/problems.json";

const MODULE_SLUG = "two-pointers";
const DEMO_HEIGHTS = [1, 8, 6, 2, 5, 4, 8, 3, 7];

export default function TwoPointersPage() {
  const setModuleProgress = useProgressStore((s) => s.setModuleProgress);
  const completeModule = useProgressStore((s) => s.completeModule);

  useEffect(() => {
    setModuleProgress(MODULE_SLUG, { percent: 50 });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const steps = useMemo(() => twoPointersDemoSteps(DEMO_HEIGHTS), []);

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 flex flex-col gap-10">
      <header>
        <div className="flex items-center gap-2 mb-2">
          <Badge variant="violet">Pattern</Badge>
          <Badge variant="neutral">Arrays / Strings</Badge>
        </div>
        <h1 className="text-2xl font-bold font-mono-data">Two Pointers</h1>
        <p className="text-text-muted mt-2 text-sm max-w-xl">
          Use two indices moving through a structure — toward each other, or in the
          same direction — to avoid nested loops and cut an O(n²) scan down to O(n).
        </p>
      </header>

      <TheorySection title="Recognition Signals">
        <PitfallList
          items={[
            "The input is sorted, or can cheaply be sorted, and you're looking for a pair/triplet meeting some condition.",
            "You're comparing elements from both ends of a sequence (palindromes, container problems).",
            "You need to partition or compact an array in place without extra memory.",
            "A brute-force nested loop solution is O(n²) but the relationship between elements is monotonic.",
          ]}
        />
      </TheorySection>

      <TheorySection title="Visual Blueprint">
        <p>
          Below: <strong>Container With Most Water</strong>. Two pointers start at
          the opposite ends of the array. At each step, the shorter wall is always
          the bottleneck — so the pointer at the shorter wall moves inward, since
          keeping it in place can never produce a larger area.
        </p>
      </TheorySection>

      <VisualizerEngine
        steps={steps}
        code={PATTERN_CODE.twoPointers}
        onComplete={() => completeModule(MODULE_SLUG)}
      >
        {(state) => <ArrayBars state={state} />}
      </VisualizerEngine>

      <TheorySection title="Annotated Code Template">
        <GlassCard>
          <pre className="font-mono-data text-xs leading-relaxed whitespace-pre-wrap">
{`function twoPointerTemplate(arr) {
  let left = 0;
  let right = arr.length - 1;

  while (left < right) {
    // 1. Evaluate the current pair
    const result = evaluate(arr[left], arr[right]);

    // 2. Decide which pointer to move based on the
    //    problem's monotonic condition
    if (shouldMoveLeft(arr[left], arr[right])) left++;
    else right--;
  }
}`}
          </pre>
        </GlassCard>
      </TheorySection>

      <TheorySection title="Curated Problems">
        <ProblemList problems={problems["two-pointers"] as Problem[]} />
      </TheorySection>
    </div>
  );
}
