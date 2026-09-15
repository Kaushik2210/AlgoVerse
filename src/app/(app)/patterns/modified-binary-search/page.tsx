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
import { modifiedBinarySearchSteps } from "@/lib/algorithms/patterns";
import { PATTERN_CODE_SAMPLES } from "@/lib/codeSamples/patterns";
import { useProgressStore } from "@/lib/store/progress";
import problems from "@/data/problems.json";

const MODULE_SLUG = "modified-binary-search";
const DEMO_ARRAY = [4, 5, 6, 7, 0, 1, 2];
const TARGET = 0;

const QUIZ: QuizQuestion[] = [
  {
    question: "In a rotated sorted array, how do you determine which half of [lo, mid] and [mid, hi] is guaranteed sorted?",
    options: [
      "Always assume the left half is sorted",
      "Compare nums[lo] to nums[mid] — if nums[lo] <= nums[mid], the left half is internally sorted; otherwise the rotation point is in the left half, so the right half must be sorted instead",
      "Check whether mid is even or odd",
      "Binary search can't be applied to rotated arrays at all",
    ],
    correctIndex: 1,
    explanation:
      "A sorted (non-rotated) half always has its first element <= its last element. Comparing nums[lo] and nums[mid] tells you which side that holds true for — that side is guaranteed sorted, and you can safely check if the target's range falls within it.",
  },
  {
    question: "Once you know which half is sorted, how do you decide whether the target could be in it?",
    options: [
      "Always search the sorted half first regardless of the target",
      "Check whether the target falls within that sorted half's value range (e.g. nums[lo] <= target < nums[mid]) — if it does, search there; if not, it must be in the other, still-unsorted-but-still-searchable half",
      "The sorted half never contains the target by definition",
      "Randomly pick a half to search",
    ],
    correctIndex: 1,
    explanation:
      "Knowing a half is sorted lets you do a normal range check against its two endpoints. If the target's value falls inside that range, it must be there (since it's sorted). If not, by elimination it must be in the other half — even though that half isn't fully sorted, the same logic recurses into it.",
  },
  {
    question: "What's the time complexity of searching a rotated sorted array of n elements for a target value?",
    options: ["O(n)", "O(log n)", "O(n log n)", "O(√n)"],
    correctIndex: 1,
    explanation:
      "Despite the extra 'which half is sorted' check, the search space still halves every iteration — exactly like standard binary search — so it remains O(log n), just with a small constant-factor overhead per step.",
  },
  {
    question:
      "\"You can call an API that tells you whether a given day had a bug (isBadVersion). Find the first bad version, given versions are numbered 1..n and once a version is bad, all later versions are also bad.\" Why is this binary search, even with no array in sight?",
    options: [
      "It isn't — this needs a linear scan since there's no array to index into",
      "The predicate isBadVersion(v) is monotonic (false...false, then true...true) over the ordered range 1..n, so binary search on that predicate finds the boundary in O(log n) API calls — the 'array' is really just the conceptual range [1, n]",
      "This requires a monotonic stack, since versions are sequential",
      "It calls for sliding window since versions form a contiguous range",
    ],
    correctIndex: 1,
    explanation:
      "'Binary search on the answer' generalizes the pattern beyond arrays: whenever there's a monotonic predicate over an ordered range — here, isBadVersion flips from false to true exactly once — binary search finds the flip point in O(log n) evaluations, without ever needing an actual array.",
  },
];

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

      <TheorySection title="Complexity">
        <ComplexityTable
          rows={[
            {
              operation: "Search rotated sorted array",
              best: "O(1)",
              average: "O(log n)",
              worst: "O(log n)",
              space: "O(1)",
            },
            {
              operation: "Find minimum / rotation point",
              best: "O(1)",
              average: "O(log n)",
              worst: "O(log n)",
              space: "O(1)",
            },
            {
              operation: "Binary search on a monotonic predicate ('search on the answer')",
              best: "O(1)",
              average: "O(log range)",
              worst: "O(log range)",
              space: "O(1)",
            },
          ]}
        />
      </TheorySection>

      <TheorySection title="When to Use vs Not">
        <WhenToUse
          use={[
            "The array was sorted, then rotated at an unknown pivot — a plain nums[mid] < target check no longer tells you which side to search, but one extra comparison recovers it.",
            "You need to find a rotation point, peak, or minimum in an almost-sorted array — not necessarily a specific target value.",
            "You're searching over an answer space with a monotonic predicate (e.g. 'smallest capacity that works') rather than a literal sorted array.",
          ]}
          avoid={[
            "The array has no exploitable order or monotonicity at all — binary search fundamentally needs some way to discard half the search space each step; without that, it degrades to no better than linear scan.",
            "There are heavy duplicates that break the 'which half is sorted' determination (nums[lo] == nums[mid] == nums[hi] gives no information) — worst case degrades to O(n), and the problem may need a different approach or an explicit fallback.",
            "You need every occurrence of a value, not just existence or one boundary — that's better served by finding both boundaries explicitly (two binary searches) or a direct scan once you're near the target.",
          ]}
        />
      </TheorySection>

      <TheorySection title="Quiz">
        <Quiz moduleSlug={MODULE_SLUG} questions={QUIZ} />
      </TheorySection>

      <TheorySection title="Curated Problems">
        <ProblemList problems={problems["modified-binary-search"] as Problem[]} />
      </TheorySection>
    </div>
  );
}
