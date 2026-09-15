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
import { twoPointersDemoSteps } from "@/lib/algorithms/patterns";
import { PATTERN_CODE_SAMPLES } from "@/lib/codeSamples/patterns";
import { useProgressStore } from "@/lib/store/progress";
import problems from "@/data/problems.json";

const QUIZ: QuizQuestion[] = [
  {
    question:
      "In Container With Most Water, why does the algorithm always move the pointer at the shorter wall, never the taller one?",
    options: [
      "It's arbitrary — moving either pointer works equally well",
      "The area is capped by the shorter wall no matter what, so keeping it fixed and moving the other pointer can only shrink the width without any chance of raising the height limit — moving the shorter wall is the only move that could possibly find something bigger",
      "The taller wall must always be preserved because it's closer to the edges",
      "Moving the shorter wall guarantees the answer improves every step",
    ],
    correctIndex: 1,
    explanation:
      "The area between two walls is width × min(heights). If you keep the shorter wall in place and move the taller one inward, width shrinks while the limiting height stays the same or gets worse — the area can only go down. Moving the shorter wall is the only choice that has any chance of increasing the limiting height.",
  },
  {
    question: "Why does 3Sum sort the array before running two pointers for each fixed first element?",
    options: [
      "Sorting is unnecessary busywork left over from a naive solution",
      "Sorting lets the inner two-pointer sweep move monotonically toward the target sum, and makes skipping duplicate triplets a simple adjacent-element check instead of needing a hash set",
      "Sorting is only needed to compute the array's length correctly",
      "Sorting changes the answer, so it must be undone before returning results",
    ],
    correctIndex: 1,
    explanation:
      "Once sorted, fixing nums[i] and running left/right pointers over the remainder works exactly like Two Sum on a sorted array — and because equal values are now adjacent, you can skip past duplicates by comparing a value to its neighbor, avoiding duplicate triplets without extra memory.",
  },
  {
    question:
      "What's the time complexity of running two pointers once over a sorted array of n elements to find a single pair summing to a target?",
    options: ["O(1)", "O(log n)", "O(n)", "O(n²)"],
    correctIndex: 2,
    explanation:
      "Each pointer moves inward at most n times total across the whole scan (left only increases, right only decreases), so the total work is linear — O(n) — even though it looks like it could be nested.",
  },
  {
    question:
      "\"Given an unsorted array of integers and a target, return the indices of the two numbers that add up to the target.\" Why is this NOT a good fit for the two-pointers pattern as-is?",
    options: [
      "Two pointers can never be used on integer arrays",
      "The array is unsorted, and the problem asks for original indices — sorting would scramble those indices, so a hash map (single pass, O(n) time, no sort) is the better fit here instead",
      "The problem doesn't involve pairs, so two pointers doesn't apply",
      "Two pointers only works on strings, not numeric arrays",
    ],
    correctIndex: 1,
    explanation:
      "Two pointers relies on the array being sorted so pointer movement is monotonic. Here the array is unsorted and the answer must reference original indices — sorting destroys that information. A hash map recovers O(n) time without needing to sort, making it the better tool for this exact phrasing.",
  },
];

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
        codeSamples={PATTERN_CODE_SAMPLES.twoPointers}
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

      <TheorySection title="Complexity">
        <ComplexityTable
          rows={[
            {
              operation: "Single-pass scan (Two Sum II, Valid Palindrome, Container With Water)",
              best: "O(n)",
              average: "O(n)",
              worst: "O(n)",
              space: "O(1)",
            },
            {
              operation: "Fix one index + inner two-pointer sweep (3Sum, 3Sum Closest)",
              best: "O(n log n)",
              average: "O(n²)",
              worst: "O(n²)",
              space: "O(log n) — sort",
            },
            {
              operation: "In-place same-direction compaction (Remove Duplicates, Move Zeroes)",
              best: "O(n)",
              average: "O(n)",
              worst: "O(n)",
              space: "O(1)",
            },
          ]}
        />
      </TheorySection>

      <TheorySection title="When to Use vs Not">
        <WhenToUse
          use={[
            "The input is sorted (or cheap to sort) and you need a pair/triplet satisfying a condition — sortedness is what makes pointer movement provably monotonic.",
            "You need O(1) extra space and the brute force is a nested loop comparing every pair.",
            "You're compacting or partitioning an array in place (remove duplicates, move zeroes, Dutch national flag) rather than searching for a target value.",
          ]}
          avoid={[
            "The array is unsorted and sorting would destroy information you need, like original indices — a hash map often solves the same problem in one pass without sorting.",
            "You need every matching pair/triplet enumerated with duplicates preserved — two pointers is built for finding/skipping, not exhaustive multiset enumeration.",
            "The relationship between elements isn't monotonic — if moving a pointer inward can't be proven to never lose the optimal answer, the core two-pointers guarantee doesn't hold.",
          ]}
        />
      </TheorySection>

      <TheorySection title="Quiz">
        <Quiz moduleSlug={MODULE_SLUG} questions={QUIZ} />
      </TheorySection>

      <TheorySection title="Curated Problems">
        <ProblemList problems={problems["two-pointers"] as Problem[]} />
      </TheorySection>
    </div>
  );
}
