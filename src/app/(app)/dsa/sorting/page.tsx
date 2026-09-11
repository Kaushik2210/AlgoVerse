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
import SortRaceView from "@/components/visualizers/SortRaceView";
import {
  SORT_ALGOS,
  SORT_LABELS,
  SORT_GENERATORS,
  SORT_COMPLEXITY,
  SORT_DEMO_ARRAY,
  type SortAlgo,
} from "@/lib/algorithms/sorting";
import { SORT_CODE_SAMPLES } from "@/lib/codeSamples/sorting";
import { useProgressStore } from "@/lib/store/progress";
import { cn } from "@/lib/utils";

const MODULE_SLUG = "sorting";

const QUIZ: QuizQuestion[] = [
  {
    question: "Which of these sorts is NOT stable by default?",
    options: ["Merge sort", "Insertion sort", "Selection sort", "Bubble sort"],
    correctIndex: 2,
    explanation:
      "Selection sort swaps the minimum into place from potentially far away, which can jump an equal element past another equal element — breaking stability. Merge, insertion, and bubble sort are all naturally stable (they only ever swap adjacent equal-or-out-of-order elements, or merge without reordering equal keys).",
  },
  {
    question: "Why is quicksort's average case O(n log n) but its worst case O(n²)?",
    options: [
      "It uses extra memory in the worst case",
      "A good pivot splits the array into two roughly equal halves each time (log n levels of n work); a bad pivot (e.g. always the smallest/largest, like on an already-sorted array with last-element pivoting) creates maximally unbalanced partitions, degrading to n levels of work",
      "It's not actually a comparison sort",
      "Worst case only happens with duplicate values",
    ],
    correctIndex: 1,
    explanation:
      "Partition quality is everything for quicksort. Balanced partitions give the same recursion depth as merge sort (log n); a consistently bad pivot choice makes each partition shrink by only one element, giving n levels — hence O(n²).",
  },
  {
    question: "Heap sort and merge sort are both guaranteed O(n log n) in every case. What's heap sort's advantage?",
    options: [
      "Heap sort is stable and merge sort isn't",
      "Heap sort sorts in-place with O(1) extra space; merge sort needs O(n) auxiliary space for the merge step",
      "Heap sort is always faster in practice",
      "Merge sort can't handle duplicate values",
    ],
    correctIndex: 1,
    explanation:
      "Heap sort builds its max-heap directly inside the input array and never needs a second array — O(1) space. Merge sort's merge step needs to materialize the two halves being merged, which costs O(n) auxiliary space (it trades that space for being stable, which heap sort isn't).",
  },
  {
    question: "In the race view, two different sorts are given the same array. Why might one visibly finish in far fewer steps?",
    options: [
      "The visualizer is buggy",
      "Different algorithms do genuinely different amounts of work for the same input — e.g. insertion sort on a nearly-sorted array can approach O(n), while selection sort always does O(n²) comparisons regardless of existing order",
      "Steps are randomly assigned",
      "It only depends on array length, which is identical for both",
    ],
    correctIndex: 1,
    explanation:
      "This is exactly why 'it depends on the input' matters in practice, not just in Big-O tables. Some algorithms (insertion sort, bubble sort with an early-exit) adapt to how sorted the input already is; others (selection sort) always do the same amount of work no matter what.",
  },
];

export default function SortingPage() {
  const [values, setValues] = useState<number[]>(SORT_DEMO_ARRAY);
  const [algo, setAlgo] = useState<SortAlgo>("quick");
  const [raceAlgos, setRaceAlgos] = useState<SortAlgo[]>(["bubble", "insertion", "quick"]);
  const [mode, setMode] = useState<"single" | "race">("single");
  const setModuleProgress = useProgressStore((s) => s.setModuleProgress);

  useEffect(() => {
    setModuleProgress(MODULE_SLUG, { percent: 40 });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const steps = useMemo(() => SORT_GENERATORS[algo](values), [algo, values]);

  const raceSteps = useMemo(
    () => raceAlgos.map((a) => ({ algo: a, steps: SORT_GENERATORS[a](values) })),
    [raceAlgos, values]
  );

  function toggleRaceAlgo(a: SortAlgo) {
    setRaceAlgos((prev) => {
      if (prev.includes(a)) {
        if (prev.length <= 2) return prev; // keep at least 2 racers
        return prev.filter((x) => x !== a);
      }
      if (prev.length >= 3) return prev; // cap at 3 racers
      return [...prev, a];
    });
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[1fr_480px] gap-8 px-4 sm:px-6 py-8 max-w-[1400px] mx-auto">
      <div className="flex flex-col gap-10 min-w-0">
        <header>
          <div className="flex items-center gap-2 mb-2">
            <Badge variant="cyan">Algorithm</Badge>
            <Badge variant="neutral">Essential — FAANG interviews</Badge>
          </div>
          <h1 className="text-2xl font-bold font-mono-data">Sorting Algorithms</h1>
          <p className="text-text-muted mt-2 text-sm max-w-xl">
            Six ways to put an array in order, from the O(n²) basics to the O(n log n)
            workhorses — and a race mode that runs several side by side on the same
            input so the complexity differences stop being abstract.
          </p>
        </header>

        <TheorySection title="Intuition">
          <p>
            Every comparison-based sort answers the same question — &quot;is this pair in
            the right order?&quot; — repeatedly, and differs only in <em>which pairs</em> it
            compares and <em>how it uses each answer</em>. Bubble, insertion, and selection
            sort all do roughly O(n²) comparisons because they only ever look at small
            local neighborhoods or scan linearly for a minimum. Merge and quick sort both
            get to O(n log n) by using divide-and-conquer — splitting the problem in half
            (roughly log n times) and doing O(n) work per level.
          </p>
          <p>
            Heap sort gets the same O(n log n) guarantee from a completely different angle:
            build a binary max-heap (a tree packed into an array, where every parent is
            ≥ its children), then repeatedly pull the max off the top and restore the
            heap property in O(log n).
          </p>
        </TheorySection>

        <TheorySection title="Formal Definition">
          <p>
            A sorting algorithm is <strong>stable</strong> if it preserves the relative
            order of elements with equal keys. It&apos;s <strong>in-place</strong> if it uses
            O(1) extra memory beyond the input array (not counting recursion stack). A{" "}
            <strong>comparison sort</strong> only learns about element order via pairwise
            comparisons — all six algorithms here are comparison sorts, which means none
            of them can beat Ω(n log n) worst-case time in general (a well-known
            information-theoretic lower bound: sorting n items has n! possible orderings,
            and each comparison only cuts the remaining possibilities in half).
          </p>
        </TheorySection>

        <TheorySection title="Complexity — all six, side by side">
          <ComplexityTable
            rows={SORT_ALGOS.map((a) => ({
              operation: `${SORT_LABELS[a]} (stable: ${SORT_COMPLEXITY[a].stable})`,
              best: SORT_COMPLEXITY[a].best,
              average: SORT_COMPLEXITY[a].average,
              worst: SORT_COMPLEXITY[a].worst,
              space: SORT_COMPLEXITY[a].space,
            }))}
          />
          <p className="text-xs text-text-muted">
            In practice: insertion sort beats the O(n log n) algorithms on small or
            nearly-sorted inputs (low constant factor, adapts to existing order) — which
            is why production sort implementations often switch to insertion sort below
            some small size threshold (e.g. Timsort, introsort).
          </p>
        </TheorySection>

        <TheorySection title="Common Pitfalls">
          <PitfallList
            items={[
              "Assuming O(n log n) always beats O(n²) in practice — constant factors and cache behavior matter a lot for small n; insertion sort often wins below ~20-30 elements.",
              "Picking a bad quicksort pivot strategy (always first or last element) on data that's already sorted or reverse-sorted — that's exactly the input that triggers quicksort's O(n²) worst case.",
              "Forgetting that selection sort always does the same number of comparisons regardless of input order — unlike insertion/bubble sort, it can't early-exit on a nearly-sorted array.",
              "Confusing merge sort's O(n) auxiliary space (needed for the merge step) with heap sort's O(1) in-place guarantee — if memory is tight and you need guaranteed O(n log n), heap sort is the answer, not merge sort.",
              "Off-by-one errors in quicksort's partition boundary — after placing the pivot at index i+1, the recursive calls must be qs(lo, i) and qs(i+2, hi), not qs(lo, i+1) and qs(i+1, hi) (which would infinite-loop by re-including the pivot).",
            ]}
          />
        </TheorySection>

        <TheorySection title="When to Use vs Not">
          <WhenToUse
            use={[
              "Quick sort: general-purpose default — fastest in practice on random data, in-place, good cache locality.",
              "Merge sort: when stability is required, or when working with linked lists (no random access penalty) or external/disk-based sorting.",
              "Heap sort: when a guaranteed O(n log n) worst case AND O(1) space are both required — no quicksort-style worst-case risk.",
              "Insertion sort: small arrays, nearly-sorted data, or as the base case in a hybrid sort (introsort, Timsort).",
            ]}
            avoid={[
              "Bubble sort in production code — it's rarely faster than insertion sort at anything and exists mainly as a teaching tool.",
              "Selection sort when stability or adaptivity to existing order matters — it gets neither.",
              "Plain quicksort in adversarial or security-sensitive contexts — a crafted worst-case input degrades it to O(n²) (mitigated by randomized pivots or introsort's fallback to heap sort).",
            ]}
          />
        </TheorySection>

        <TheorySection title="Quiz">
          <Quiz moduleSlug={MODULE_SLUG} questions={QUIZ} />
        </TheorySection>
      </div>

      <div className="lg:sticky lg:top-20 self-start flex flex-col gap-4 min-w-0">
        <GlassCard className="!py-3 !px-4">
          <div className="flex flex-col gap-3">
            <div className="flex gap-1.5">
              <Button
                variant={mode === "single" ? "primary" : "ghost"}
                size="sm"
                onClick={() => setMode("single")}
              >
                Step-through
              </Button>
              <Button
                variant={mode === "race" ? "primary" : "ghost"}
                size="sm"
                onClick={() => setMode("race")}
              >
                Race mode
              </Button>
            </div>

            <ArrayInput
              value={values}
              onApply={setValues}
              min={4}
              max={12}
            />

            {mode === "single" ? (
              <div className="flex flex-wrap gap-1.5">
                {SORT_ALGOS.map((a) => (
                  <Button
                    key={a}
                    variant={algo === a ? "primary" : "ghost"}
                    size="sm"
                    onClick={() => setAlgo(a)}
                  >
                    {SORT_LABELS[a]}
                  </Button>
                ))}
              </div>
            ) : (
              <div className="flex flex-col gap-1.5">
                <span className="text-[11px] font-mono-data text-text-muted">
                  Pick 2-3 racers:
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {SORT_ALGOS.map((a) => {
                    const active = raceAlgos.includes(a);
                    return (
                      <button
                        key={a}
                        onClick={() => toggleRaceAlgo(a)}
                        className={cn(
                          "px-2.5 py-1 rounded-lg text-xs font-mono-data border transition-colors",
                          active
                            ? "bg-violet/15 border-violet/60 text-violet"
                            : "border-glass-border-token text-text-muted hover:bg-white/5"
                        )}
                      >
                        {SORT_LABELS[a]}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        </GlassCard>

        {mode === "single" ? (
          <VisualizerEngine
            key={algo + values.join(",")}
            steps={steps}
            codeSamples={SORT_CODE_SAMPLES[algo]}
            onComplete={() => setModuleProgress(MODULE_SLUG, { percent: 80 })}
          >
            {(state) => <ArrayBars state={state} />}
          </VisualizerEngine>
        ) : (
          <SortRaceView key={raceAlgos.join(",") + values.join(",")} racers={raceSteps} />
        )}
      </div>
    </div>
  );
}
