"use client";

import { useEffect, useMemo } from "react";
import Badge from "@/components/ui/Badge";
import GlassCard from "@/components/ui/GlassCard";
import { TheorySection, PitfallList } from "@/components/ui/TheorySection";
import ProblemList, { type Problem } from "@/components/ui/ProblemList";
import VisualizerEngine from "@/components/visualizers/VisualizerEngine";
import ArrayBars from "@/components/visualizers/ArrayBars";
import { modifiedBinarySearchSteps } from "@/lib/algorithms/patterns";
import { PATTERN_CODE_SAMPLES } from "@/lib/codeSamples/patterns";
import { useProgressStore } from "@/lib/store/progress";
import problems from "@/data/problems.json";

const MODULE_SLUG = "modified-binary-search";
const DEMO_ARRAY = [4, 5, 6, 7, 0, 1, 2];
const TARGET = 0;

export default function ModifiedBinarySearchPage() {
  const setModuleProgress = useProgressStore((s) => s.setModuleProgress);
  const completeModule = useProgressStore((s) => s.completeModule);

  useEffect(() => {
    setModuleProgress(MODULE_SLUG, { percent: 50 });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const steps = useMemo(() => modifiedBinarySearchSteps(DEMO_ARRAY, TARGET), []);

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 flex flex-col gap-10">
      <header>
        <div className="flex items-center gap-2 mb-2">
          <Badge variant="violet">Pattern</Badge>
          <Badge variant="neutral">Arrays</Badge>
        </div>
        <h1 className="text-2xl font-bold font-mono-data">Modified Binary Search</h1>
        <p className="text-text-muted mt-2 text-sm max-w-xl">
          Plain binary search needs a fully sorted array. This pattern
          extends the same halving idea to arrays that are <em>almost</em>{" "}
          sorted — rotated, or with an unknown boundary — by first figuring
          out which half of the current window is guaranteed sorted.
        </p>
      </header>

      <TheorySection title="Recognition Signals">
        <PitfallList
          items={[
            "The array was sorted, then rotated at some unknown pivot — a plain 'nums[mid] < target' comparison no longer tells you which side to search.",
            "A brute-force linear scan is O(n) when the array's structure (even if not fully sorted) should allow O(log n).",
            "The problem asks to find a rotation point, a peak, or the minimum in a rotated array — not necessarily a specific target value.",
            "You're searching over an answer space (like 'smallest speed that works') rather than a literal array — binary search on a monotonic predicate.",
          ]}
        />
      </TheorySection>

      <TheorySection title="Visual Blueprint">
        <p>
          Below: searching for <strong>{TARGET}</strong> in the rotated
          sorted array <code className="font-mono-data text-cyan">[{DEMO_ARRAY.join(", ")}]</code>.
          At every step, exactly one of the two halves around{" "}
          <code className="font-mono-data text-cyan">mid</code> is internally
          sorted (compare <code className="font-mono-data text-cyan">nums[lo]</code>{" "}
          against <code className="font-mono-data text-cyan">nums[mid]</code>{" "}
          to tell which). Once you know which half is sorted, a simple range
          check tells you whether the target could be in it — if not, it must
          be in the other half.
        </p>
        <p>
          This is still binary search: the window halves every iteration.
          The only new work is one extra comparison per step to figure out
          which half&apos;s sortedness you can actually trust.
        </p>
      </TheorySection>

      <VisualizerEngine
        steps={steps}
        codeSamples={PATTERN_CODE_SAMPLES.modifiedBinarySearch}
        onComplete={() => completeModule(MODULE_SLUG)}
      >
        {(state) => <ArrayBars state={state} />}
      </VisualizerEngine>

      <TheorySection title="Annotated Code Template">
        <GlassCard>
          <pre className="font-mono-data text-xs leading-relaxed whitespace-pre-wrap">
{`function search(nums, target) {
  let lo = 0, hi = nums.length - 1;
  while (lo <= hi) {
    const mid = Math.floor((lo + hi) / 2);
    if (nums[mid] === target) return mid;

    // 1. Which half is guaranteed sorted?
    if (nums[lo] <= nums[mid]) {
      // left half [lo..mid] is sorted
      if (nums[lo] <= target && target < nums[mid]) {
        hi = mid - 1;   // target in the sorted left half
      } else {
        lo = mid + 1;   // must be in the other half
      }
    } else {
      // right half (mid..hi] is sorted instead
      if (nums[mid] < target && target <= nums[hi]) {
        lo = mid + 1;   // target in the sorted right half
      } else {
        hi = mid - 1;   // must be in the other half
      }
    }
  }
  return -1;
}`}
          </pre>
        </GlassCard>
      </TheorySection>

      <TheorySection title="Curated Problems">
        <ProblemList problems={problems["modified-binary-search"] as Problem[]} />
      </TheorySection>
    </div>
  );
}
