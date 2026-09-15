"use client";

import { useEffect, useMemo } from "react";
import Badge from "@/components/ui/Badge";
import GlassCard from "@/components/ui/GlassCard";
import { TheorySection, PitfallList, WhenToUse } from "@/components/ui/TheorySection";
import ProblemList, { type Problem } from "@/components/ui/ProblemList";
import ComplexityTable from "@/components/ui/ComplexityTable";
import Quiz, { type QuizQuestion } from "@/components/ui/Quiz";
import VisualizerEngine from "@/components/visualizers/VisualizerEngine";
import ArrayBars from "@/components/visualizers/ArrayBars";
import { cyclicSortSteps } from "@/lib/algorithms/patterns";
import { PATTERN_CODE_SAMPLES } from "@/lib/codeSamples/patterns";
import { useProgressStore } from "@/lib/store/progress";
import problems from "@/data/problems.json";

const MODULE_SLUG = "cyclic-sort";
const DEMO_VALUES = [3, 1, 5, 4, 2];

const QUIZ: QuizQuestion[] = [
  {
    question: "Why does cyclic sort swap values instead of comparing and shifting elements the way insertion sort does?",
    options: [
      "Swapping is only used because the array happens to be small",
      "Every value in a 1..n array has exactly one correct home index (value - 1) — swapping a value directly to that index in O(1) does the job, and since every element only ever needs to reach one specific slot, there's no need for the general-purpose comparisons a full sort would require",
      "Cyclic sort doesn't actually use swaps",
      "Shifting is always faster than swapping",
    ],
    correctIndex: 1,
    explanation:
      "Cyclic sort exploits a very specific structure — values are a permutation (or near-permutation) of a known range 1..n — so it can compute exactly where each value belongs without any comparisons against other elements, which a general sort can't assume.",
  },
  {
    question: "In the cyclic sort loop, why does `i` only advance when `arr[i]` already equals `arr[correctIdx]` (i.e., a swap wasn't needed)?",
    options: [
      "It's an arbitrary implementation choice",
      "After a swap, the newly-placed value at index i hasn't been checked yet — it might also be out of place, so the loop must re-examine index i before moving forward; advancing i is only safe once the value there is confirmed correct (or a duplicate blocking further progress)",
      "i always advances by exactly one per iteration regardless of swaps",
      "The loop doesn't actually check arr[i] again after swapping",
    ],
    correctIndex: 1,
    explanation:
      "Swapping brings a *different* value into index i, and that value needs its own check. If the loop advanced i unconditionally, it could skip past a still-misplaced value. Only re-checking (not advancing) after a swap guarantees every index ends up correctly resolved in one overall linear pass.",
  },
  {
    question: "What's the time and space complexity of cyclic sort on an array of n elements holding values 1..n?",
    options: [
      "O(n log n) time, O(1) space — like an optimized comparison sort",
      "O(n) time, O(1) space — every element is swapped at most once into its final position, in place, with no extra memory",
      "O(n²) time, O(n) space",
      "O(n) time, O(n) space — a temporary array is required",
    ],
    correctIndex: 1,
    explanation:
      "Even though the swap loop is nested inside the outer while loop, each swap places at least one value into its final correct position permanently — so the total number of swaps across the whole run is bounded by n, giving O(n) time and O(1) extra space (sorted in place).",
  },
  {
    question:
      "\"Given an array of n integers where each integer is in the range [1, n] and some values appear twice while others are missing, find all the duplicates without using extra space.\" Why is cyclic sort a strong fit?",
    options: [
      "It isn't — this needs a hash set, which contradicts 'without extra space'",
      "The values are constrained to exactly the range [1, n], which is precisely the setup cyclic sort exploits — placing each value at index (value - 1) in one O(1)-space pass, after which any index still holding the 'wrong' value directly reveals a duplicate",
      "Cyclic sort only works when there are no duplicates at all",
      "This calls for a monotonic stack instead",
    ],
    correctIndex: 1,
    explanation:
      "'Values constrained to a known range matching the array's own indices' is the cyclic sort signal. After the sort pass, wherever index i doesn't hold value i+1, either that value's 'slot' was already taken by a duplicate — revealing exactly which values are duplicated, all in O(n) time and O(1) extra space.",
  },
];

export default function CyclicSortPage() {
  const setModuleProgress = useProgressStore((s) => s.setModuleProgress);
  const completeModule = useProgressStore((s) => s.completeModule);

  useEffect(() => {
    setModuleProgress(MODULE_SLUG, { percent: 50 });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const steps = useMemo(() => cyclicSortSteps(DEMO_VALUES), []);

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 flex flex-col gap-10">
      <header>
        <div className="flex items-center gap-2 mb-2">
          <Badge variant="violet">Pattern</Badge>
          <Badge variant="neutral">Arrays</Badge>
        </div>
        <h1 className="text-2xl font-bold font-mono-data">Cyclic Sort</h1>
        <p className="text-text-muted mt-2 text-sm max-w-xl">
          When an array holds values from a known, dense range (1..n or 0..n-1), place
          each value directly at its own index via swaps — no comparisons, no extra
          memory, sorted in a single O(n) pass.
        </p>
      </header>

      <TheorySection title="Recognition Signals">
        <PitfallList
          items={[
            "The array holds n integers from the range [1, n] (or [0, n-1]) — possibly with duplicates or missing values.",
            "The problem asks to find a missing number, a duplicate number, or the first missing positive, in O(n) time and O(1) extra space.",
            "A hash set solution works but uses O(n) extra space, and the problem explicitly rules that out.",
            "You're told the array 'should' contain every value in a range exactly once, and you need to find where it deviates from that.",
          ]}
        />
      </TheorySection>

      <TheorySection title="Visual Blueprint">
        <p>
          Below: sorting{" "}
          <code className="font-mono-data text-cyan">[{DEMO_VALUES.join(", ")}]</code>{" "}
          (a permutation of 1..5) using cyclic sort. At index i, the value that belongs
          there is <code className="font-mono-data text-cyan">i + 1</code>. If{" "}
          <code className="font-mono-data text-cyan">arr[i]</code> isn&apos;t already
          that value, swap it directly to its correct index{" "}
          <code className="font-mono-data text-cyan">arr[i] - 1</code> — and check index i
          again, since the swap just brought in a new, unchecked value. Only advance once
          the value at i is confirmed correct.
        </p>
        <p>
          Notice the pointer never moves backward — every swap places one more value into
          its permanent home, so even though it looks like nested loops, the total number
          of swaps across the whole run is bounded by n.
        </p>
      </TheorySection>

      <VisualizerEngine
        steps={steps}
        codeSamples={PATTERN_CODE_SAMPLES.cyclicSort}
        onComplete={() => completeModule(MODULE_SLUG)}
      >
        {(state) => <ArrayBars state={state} />}
      </VisualizerEngine>

      <TheorySection title="Annotated Code Template">
        <GlassCard>
          <pre className="font-mono-data text-xs leading-relaxed whitespace-pre-wrap">
{`function cyclicSortTemplate(nums) {
  let i = 0;
  while (i < nums.length) {
    // 1. Where does the value currently at i belong?
    const correctIdx = nums[i] - 1;

    if (nums[i] !== nums[correctIdx]) {
      // 2. Not home yet — swap it there and re-check index i
      [nums[i], nums[correctIdx]] = [nums[correctIdx], nums[i]];
    } else {
      // 3. Already correct (or a duplicate blocking the slot) — move on
      i++;
    }
  }

  // 4. One more pass: any index i where nums[i] !== i + 1
  //    directly reveals a missing/duplicate value
  return nums;
}`}
          </pre>
        </GlassCard>
      </TheorySection>

      <TheorySection title="Complexity">
        <ComplexityTable
          rows={[
            {
              operation: "Cyclic sort pass",
              best: "O(n)",
              average: "O(n)",
              worst: "O(n)",
              space: "O(1)",
            },
            {
              operation: "Find missing / duplicate (sort pass + one scan)",
              best: "O(n)",
              average: "O(n)",
              worst: "O(n)",
              space: "O(1)",
            },
          ]}
        />
        <p className="text-xs text-text-muted">
          Each swap places at least one value into its final position permanently, so the
          total swaps across the whole run can never exceed n — the nested-looking loop
          is still O(n) overall.
        </p>
      </TheorySection>

      <TheorySection title="When to Use vs Not">
        <WhenToUse
          use={[
            "The array's values are constrained to a known, dense range matching its own length (1..n or 0..n-1) — that's what lets you compute each value's 'home index' directly.",
            "The problem wants O(n) time and O(1) extra space, ruling out a hash set — cyclic sort achieves both by using the array itself as the lookup structure.",
            "You need to find missing, duplicate, or 'first missing positive' values in exactly such a range-constrained array.",
          ]}
          avoid={[
            "The values aren't constrained to a range matching the array length — cyclic sort has nothing to compute a 'home index' from if values can be arbitrary.",
            "You need a general-purpose sort for arbitrary values (not a known dense range) — a comparison sort or counting sort is the right tool instead.",
            "The array can't be mutated in place (e.g. it's a read-only input or shared across threads) — cyclic sort's core trick is destructive in-place swapping.",
          ]}
        />
      </TheorySection>

      <TheorySection title="Quiz">
        <Quiz moduleSlug={MODULE_SLUG} questions={QUIZ} />
      </TheorySection>

      <TheorySection title="Curated Problems">
        <ProblemList problems={problems["cyclic-sort"] as Problem[]} />
      </TheorySection>
    </div>
  );
}
