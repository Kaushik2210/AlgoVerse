"use client";

import { useEffect, useMemo, useState } from "react";
import GlassCard from "@/components/ui/GlassCard";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import ArrayInput from "@/components/ui/ArrayInput";
import ComplexityTable from "@/components/ui/ComplexityTable";
import { TheorySection, PitfallList, WhenToUse } from "@/components/ui/TheorySection";
import Quiz, { type QuizQuestion } from "@/components/ui/Quiz";
import VisualizerEngine from "@/components/visualizers/VisualizerEngine";
import ArrayBars from "@/components/visualizers/ArrayBars";
import {
  bubbleSortSteps,
  insertionSortSteps,
  mergeSortSteps,
  quickSortSteps,
  binarySearchSteps,
} from "@/lib/algorithms/arrays";
import { SORT_CODE_SAMPLES } from "@/lib/codeSamples/arrays";
import { useProgressStore } from "@/lib/store/progress";

const MODULE_SLUG = "arrays";

type Algo = "bubble" | "insertion" | "merge" | "quick" | "binarySearch";

const ALGO_LABELS: Record<Algo, string> = {
  bubble: "Bubble Sort",
  insertion: "Insertion Sort",
  merge: "Merge Sort",
  quick: "Quick Sort",
  binarySearch: "Binary Search",
};

const COMPLEXITY: Record<Algo, { best: string; average: string; worst: string; space: string }> = {
  bubble: { best: "O(n)", average: "O(n²)", worst: "O(n²)", space: "O(1)" },
  insertion: { best: "O(n)", average: "O(n²)", worst: "O(n²)", space: "O(1)" },
  merge: { best: "O(n log n)", average: "O(n log n)", worst: "O(n log n)", space: "O(n)" },
  quick: { best: "O(n log n)", average: "O(n log n)", worst: "O(n²)", space: "O(log n)" },
  binarySearch: { best: "O(1)", average: "O(log n)", worst: "O(log n)", space: "O(1)" },
};

const QUIZ: QuizQuestion[] = [
  {
    question: "Which sorting algorithm has the best worst-case time complexity?",
    options: ["Bubble sort", "Insertion sort", "Merge sort", "They're all the same"],
    correctIndex: 2,
    explanation:
      "Merge sort guarantees O(n log n) in every case because it always splits the array in half and merges, regardless of input order.",
  },
  {
    question: "Binary search requires the input array to be...",
    options: ["Sorted", "Unique values only", "A power-of-two length", "Reversed"],
    correctIndex: 0,
    explanation:
      "Binary search relies on being able to discard half the search space based on a comparison — that only works if the array is sorted.",
  },
  {
    question: "Why is quicksort's worst case O(n²)?",
    options: [
      "It uses extra memory",
      "A bad pivot choice can create maximally unbalanced partitions",
      "It's not actually a comparison sort",
      "It can't handle duplicate values",
    ],
    correctIndex: 1,
    explanation:
      "If the pivot is always the smallest or largest element (e.g. an already-sorted array with last-element pivoting), each partition only shrinks by one element, giving O(n²).",
  },
];

export default function ArraysPage() {
  const [algo, setAlgo] = useState<Algo>("bubble");
  const [values, setValues] = useState<number[]>([8, 3, 5, 1, 9, 2, 7]);
  const [target, setTarget] = useState(9);
  const setModuleProgress = useProgressStore((s) => s.setModuleProgress);

  useEffect(() => {
    setModuleProgress(MODULE_SLUG, { percent: 40 });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const sortedForSearch = useMemo(() => [...values].sort((a, b) => a - b), [values]);

  const steps = useMemo(() => {
    switch (algo) {
      case "bubble":
        return bubbleSortSteps(values);
      case "insertion":
        return insertionSortSteps(values);
      case "merge":
        return mergeSortSteps(values);
      case "quick":
        return quickSortSteps(values);
      case "binarySearch":
        return binarySearchSteps(sortedForSearch, target);
    }
  }, [algo, values, sortedForSearch, target]);

  const codeSamples = SORT_CODE_SAMPLES[algo];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[1fr_480px] gap-8 px-4 sm:px-6 py-8 max-w-[1400px] mx-auto">
      {/* left: theory */}
      <div className="flex flex-col gap-10 min-w-0">
        <header>
          <div className="flex items-center gap-2 mb-2">
            <Badge variant="cyan">Data Structure</Badge>
            <Badge variant="neutral">Beginner → Intermediate</Badge>
          </div>
          <h1 className="text-2xl font-bold font-mono-data">Arrays & Sorting</h1>
          <p className="text-text-muted mt-2 text-sm max-w-xl">
            The most fundamental data structure, and the algorithms that reorganize it —
            the foundation nearly every other structure and pattern builds on.
          </p>
        </header>

        <TheorySection title="Intuition">
          <p>
            An array is a contiguous block of memory holding elements of the same type,
            each reachable in constant time via its index. That single property —
            O(1) random access — is why arrays are the default choice for storing
            ordered data.
          </p>
          <p>
            Sorting algorithms exist because a huge number of downstream operations
            (binary search, deduplication, finding medians, merging datasets) become
            cheap once the data is ordered. The algorithms below trade off between
            simplicity, stability, and worst-case guarantees.
          </p>
        </TheorySection>

        <TheorySection title="Formal Definition">
          <p>
            <strong>Array:</strong> a fixed-size (or dynamically resized) sequence{" "}
            <code className="font-mono-data text-cyan">A[0..n-1]</code> such that{" "}
            <code className="font-mono-data text-cyan">A[i]</code> is accessible in
            O(1) via base address + <code className="font-mono-data text-cyan">i × elementSize</code>.
          </p>
          <p>
            <strong>Comparison sort:</strong> an algorithm that orders a sequence using
            only pairwise comparisons (<code className="font-mono-data text-cyan">&lt;</code>,{" "}
            <code className="font-mono-data text-cyan">&gt;</code>). Comparison sorts have a
            proven lower bound of Ω(n log n) — which is exactly why merge sort and quicksort
            are asymptotically optimal in the average case.
          </p>
        </TheorySection>

        <TheorySection title="Complexity">
          <ComplexityTable
            rows={Object.entries(ALGO_LABELS).map(([key, label]) => ({
              operation: label,
              ...COMPLEXITY[key as Algo],
            }))}
          />
        </TheorySection>

        <TheorySection title="Common Pitfalls">
          <PitfallList
            items={[
              "Forgetting binary search requires a sorted array — running it on unsorted data silently gives wrong answers instead of erroring.",
              "Off-by-one errors in loop bounds (lo <= hi vs lo < hi) are the #1 source of binary search bugs.",
              "Choosing quicksort's pivot poorly (always first/last element) degrades to O(n²) on already-sorted input.",
              "Assuming a sort is stable when it isn't — bubble/insertion/merge sort are stable, quicksort (as commonly implemented) is not.",
            ]}
          />
        </TheorySection>

        <TheorySection title="When to Use vs Not">
          <WhenToUse
            use={[
              "You need O(1) random access by index.",
              "Data size is known/bounded and mostly read-heavy.",
              "You want cache-friendly, contiguous memory layout.",
            ]}
            avoid={[
              "Frequent insertions/deletions in the middle (use a linked list instead).",
              "Size is highly unpredictable and grows unbounded (consider a dynamic structure).",
              "You need fast membership checks on huge datasets (a hash set beats O(n) scans).",
            ]}
          />
        </TheorySection>

        <TheorySection title="Quiz">
          <Quiz moduleSlug={MODULE_SLUG} questions={QUIZ} />
        </TheorySection>
      </div>

      {/* right: sticky visualizer */}
      <div className="lg:sticky lg:top-20 self-start flex flex-col gap-4 min-w-0">
        <GlassCard className="!py-3 !px-4">
          <div className="flex flex-wrap gap-2 mb-3">
            {(Object.keys(ALGO_LABELS) as Algo[]).map((a) => (
              <Button
                key={a}
                size="sm"
                variant={algo === a ? "primary" : "secondary"}
                onClick={() => setAlgo(a)}
              >
                {ALGO_LABELS[a]}
              </Button>
            ))}
          </div>
          <ArrayInput value={values} onApply={setValues} />
          {algo === "binarySearch" && (
            <div className="mt-3 flex items-center gap-2">
              <label htmlFor="target" className="text-xs font-mono-data text-text-muted">
                Target:
              </label>
              <input
                id="target"
                type="number"
                value={target}
                onChange={(e) => setTarget(Number(e.target.value))}
                className="w-20 glass rounded-lg px-2 py-1 text-sm font-mono-data outline-none"
              />
              <span className="text-[11px] text-text-muted">
                (searches sorted copy: [{sortedForSearch.join(", ")}])
              </span>
            </div>
          )}
        </GlassCard>

        {steps && (
          <VisualizerEngine
            key={`${algo}-${values.join(",")}-${target}`}
            steps={steps}
            codeSamples={codeSamples}
            onComplete={() => setModuleProgress(MODULE_SLUG, { percent: 80 })}
          >
            {(state) => <ArrayBars state={state} />}
          </VisualizerEngine>
        )}
      </div>
    </div>
  );
}
