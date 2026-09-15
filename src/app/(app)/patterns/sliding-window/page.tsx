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
import { slidingWindowDemoSteps } from "@/lib/algorithms/patterns";
import { PATTERN_CODE_SAMPLES } from "@/lib/codeSamples/patterns";
import { useProgressStore } from "@/lib/store/progress";
import problems from "@/data/problems.json";

const MODULE_SLUG = "sliding-window";
const DEMO_VALUES = [2, 1, 5, 1, 3, 2, 7, 4, 1];
const WINDOW_K = 3;

const QUIZ: QuizQuestion[] = [
  {
    question:
      "For the variable-size 'expand then shrink while invalid' template, why is it safe to shrink from the left with a while loop instead of an if?",
    options: [
      "It isn't safe — an if is always correct too",
      "A single expansion on the right can require multiple contractions on the left to restore validity (e.g. several low-value characters need to leave before a repeated character is removed), so the shrink step must run until valid, not just once",
      "The while loop is only there to satisfy the compiler",
      "Shrinking always removes exactly one element per expansion",
    ],
    correctIndex: 1,
    explanation:
      "One new element entering the window can invalidate it by more than 'one unit' (e.g. it duplicates a character that already appears several times in the window). An if would only remove one element and could leave the window still invalid — the while loop guarantees the window is valid again before moving on.",
  },
  {
    question:
      "What property of the window's validity condition is required for sliding window to give the correct (not just a plausible) answer?",
    options: [
      "The condition must be monotonic — as the window grows, validity can only move in one direction, so once it becomes invalid, shrinking from the left is guaranteed to eventually restore validity without missing a better answer",
      "The array must contain only positive numbers",
      "The window size must be fixed ahead of time",
      "There is no such requirement — any condition works",
    ],
    correctIndex: 0,
    explanation:
      "Sliding window depends on monotonicity: growing the window can only make a condition 'more true' or 'more false' in one direction (e.g. sum only increases as you add non-negative numbers). Without that, shrinking from the left after an invalid expansion isn't guaranteed to be correct.",
  },
  {
    question:
      "A fixed-size window of size k slides across an array of n elements, maintaining a running sum. What's the time complexity?",
    options: ["O(n·k)", "O(n)", "O(n log k)", "O(k²)"],
    correctIndex: 1,
    explanation:
      "Each slide does O(1) work — add the incoming element, subtract the outgoing one — instead of resumming all k elements. Across n slides that's O(n) total, versus the O(n·k) brute force of resumming every window from scratch.",
  },
  {
    question:
      "\"Find the minimum-length contiguous subarray whose sum is at least a target value.\" Which pattern does this call for, and why?",
    options: [
      "Two pointers converging from both ends — the array should be sorted first",
      "Variable-size sliding window — 'contiguous subarray' plus a monotonic condition (sum only grows as the window grows, since presumably all values are positive) is the classic signal for expand-then-shrink",
      "Monotonic stack — the phrase 'at least a target' implies a next-greater-element search",
      "Binary search on the array directly, ignoring the sum condition",
    ],
    correctIndex: 1,
    explanation:
      "'Contiguous subarray' rules out approaches that reorder elements, and the sum condition is monotonic in window size (assuming non-negative values) — exactly the setup a variable-size sliding window is built for: expand to build up the sum, shrink from the left once it's valid to look for a shorter window.",
  },
];

export default function SlidingWindowPage() {
  const setModuleProgress = useProgressStore((s) => s.setModuleProgress);
  const completeModule = useProgressStore((s) => s.completeModule);

  useEffect(() => {
    setModuleProgress(MODULE_SLUG, { percent: 50 });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const steps = useMemo(
    () => slidingWindowDemoSteps(DEMO_VALUES, WINDOW_K),
    []
  );

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 flex flex-col gap-10">
      <header>
        <div className="flex items-center gap-2 mb-2">
          <Badge variant="violet">Pattern</Badge>
          <Badge variant="neutral">Arrays / Strings</Badge>
        </div>
        <h1 className="text-2xl font-bold font-mono-data">Sliding Window</h1>
        <p className="text-text-muted mt-2 text-sm max-w-xl">
          Maintain a contiguous window over the data and slide it forward, updating
          an incremental result instead of recomputing from scratch — turns O(n·k)
          brute force into O(n).
        </p>
      </header>

      <TheorySection title="Recognition Signals">
        <PitfallList
          items={[
            "The problem asks for a \"contiguous subarray/substring\" satisfying some condition.",
            "You're looking for a max/min/count over all windows of a fixed size k.",
            "The condition is monotonic — as the window grows, it can only become more/less valid, which is what makes shrinking safe.",
            "A brute force solution recomputes a sum/count from scratch for every window position.",
          ]}
        />
      </TheorySection>

      <TheorySection title="Visual Blueprint">
        <p>
          Below: fixed-size window of size {WINDOW_K} scanning for the maximum sum
          subarray. Instead of resumming every window from scratch, each slide adds
          the incoming element and subtracts the outgoing one — O(1) per step
          instead of O(k).
        </p>
      </TheorySection>

      <VisualizerEngine
        steps={steps}
        codeSamples={PATTERN_CODE_SAMPLES.slidingWindow}
        onComplete={() => completeModule(MODULE_SLUG)}
      >
        {(state) => <ArrayBars state={state} />}
      </VisualizerEngine>

      <TheorySection title="Annotated Code Template">
        <GlassCard>
          <pre className="font-mono-data text-xs leading-relaxed whitespace-pre-wrap">
{`// Variable-size window ("expand then shrink while invalid")
function slidingWindowTemplate(arr) {
  let left = 0;
  let windowState = initialState();

  for (let right = 0; right < arr.length; right++) {
    // 1. Expand: fold arr[right] into the window state
    add(windowState, arr[right]);

    // 2. Shrink while the window violates the constraint
    while (isInvalid(windowState)) {
      remove(windowState, arr[left]);
      left++;
    }

    // 3. Window [left, right] is valid here — record the answer
    updateAnswer(left, right, windowState);
  }
}`}
          </pre>
        </GlassCard>
      </TheorySection>

      <TheorySection title="Complexity">
        <ComplexityTable
          rows={[
            {
              operation: "Fixed-size window (max sum of size-k subarray)",
              best: "O(n)",
              average: "O(n)",
              worst: "O(n)",
              space: "O(1)",
            },
            {
              operation: "Variable-size window (longest substring without repeats)",
              best: "O(n)",
              average: "O(n)",
              worst: "O(n)",
              space: "O(k) — window contents (hash set/map)",
            },
          ]}
        />
        <p className="text-xs text-text-muted">
          Even though the shrink step is a nested while loop, each element enters and
          leaves the window at most once across the whole scan — so total work is still
          O(n), amortized.
        </p>
      </TheorySection>

      <TheorySection title="When to Use vs Not">
        <WhenToUse
          use={[
            "The problem asks for something over every contiguous subarray/substring, and a brute force would recompute a sum/count from scratch per window.",
            "The validity condition is monotonic in window size — growing the window only ever makes it 'more valid' or 'more invalid', never both unpredictably.",
            "You want to trade a small amount of extra state (a running sum, a frequency map) for turning an O(n·k) or O(n²) scan into O(n).",
          ]}
          avoid={[
            "The subsequence doesn't need to be contiguous — sliding window only tracks a contiguous range; non-contiguous subsequence problems usually need DP instead.",
            "The condition isn't monotonic in window size — if growing the window can make it valid, then invalid, then valid again unpredictably, shrinking from the left isn't safe.",
            "You need to consider windows in a specific non-sequential order, or windows that can start/end anywhere independent of a left-to-right scan.",
          ]}
        />
      </TheorySection>

      <TheorySection title="Quiz">
        <Quiz moduleSlug={MODULE_SLUG} questions={QUIZ} />
      </TheorySection>

      <TheorySection title="Curated Problems">
        <ProblemList problems={problems["sliding-window"] as Problem[]} />
      </TheorySection>
    </div>
  );
}
