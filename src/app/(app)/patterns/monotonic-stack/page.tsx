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
import StackView from "@/components/visualizers/StackView";
import { monotonicStackDemoSteps } from "@/lib/algorithms/patterns";
import { PATTERN_CODE_SAMPLES } from "@/lib/codeSamples/patterns";
import { useProgressStore } from "@/lib/store/progress";
import problems from "@/data/problems.json";

const MODULE_SLUG = "monotonic-stack";
const DEMO_VALUES = [2, 1, 2, 4, 3, 1];

const QUIZ: QuizQuestion[] = [
  {
    question:
      "In Next Greater Element, why is the total work across all pop operations still O(n) even though the pop loop is nested inside the main scan?",
    options: [
      "It isn't — the true complexity is O(n²)",
      "Every index is pushed onto the stack exactly once and popped at most once across the entire scan, so the total number of pop operations — no matter how they're distributed across iterations — is bounded by n",
      "The stack never actually pops more than one element total",
      "JavaScript arrays make popping free",
    ],
    correctIndex: 1,
    explanation:
      "This is amortized analysis: each of the n indices enters the stack once and leaves at most once. Even though some iterations pop many elements, the sum of all pops across the whole run can never exceed n — so total work is O(n), not O(n²).",
  },
  {
    question:
      "For finding the next GREATER element, should the stack be kept monotonically increasing or decreasing (bottom to top), and why?",
    options: [
      "Increasing — because you pop elements smaller than the current one, which only happens if the stack is decreasing bottom-to-top so those smaller elements are on top",
      "It doesn't matter, either works identically",
      "Decreasing — you pop elements smaller than the current one off the top, which keeps what remains strictly decreasing bottom-to-top",
      "The stack should be sorted after every push",
    ],
    correctIndex: 2,
    explanation:
      "Before pushing the current value, you pop everything on top that's smaller than it (those elements just found their next-greater). What survives on the stack is always strictly decreasing bottom-to-top — that invariant is exactly what makes the next comparison correct.",
  },
  {
    question:
      "What happens to indices still left on the monotonic stack after the scan finishes?",
    options: [
      "They're an error and should never happen",
      "They have no next greater/smaller element within the array — their result stays at the default (e.g. -1)",
      "They get resolved against index 0 by convention",
      "The algorithm restarts to resolve them",
    ],
    correctIndex: 1,
    explanation:
      "An index only leaves the stack when a later element resolves it. If the scan ends and an index is still on the stack, no such later element ever appeared — meaning it genuinely has no next greater (or smaller) element in the array.",
  },
  {
    question:
      "\"Given an array of daily temperatures, for each day find how many days you'd have to wait for a warmer temperature.\" Which pattern fits, and what does the stack hold?",
    options: [
      "Sliding window; the stack holds temperature sums",
      "Monotonic stack; the stack holds indices of days still waiting for a warmer day, popped (and their wait distance recorded) the moment a warmer day appears",
      "Two pointers converging from both ends of the array",
      "Binary search over the sorted temperatures",
    ],
    correctIndex: 1,
    explanation:
      "'How many days until a warmer temperature' is exactly 'distance to the next greater element' — the canonical monotonic stack signal. The stack holds indices whose next-warmer-day is still unknown; each gets resolved (and popped) the moment a warmer temperature is scanned.",
  },
];

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
        codeSamples={PATTERN_CODE_SAMPLES.monotonicStack}
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

      <TheorySection title="Complexity">
        <ComplexityTable
          rows={[
            {
              operation: "Next/previous greater or smaller element (single pass)",
              best: "O(n)",
              average: "O(n)",
              worst: "O(n)",
              space: "O(n) — stack",
            },
            {
              operation: "Largest rectangle in histogram",
              best: "O(n)",
              average: "O(n)",
              worst: "O(n)",
              space: "O(n) — stack",
            },
          ]}
        />
        <p className="text-xs text-text-muted">
          Each element is pushed once and popped at most once across the whole scan, so
          the pop loop is amortized O(1) per element — the total is O(n), not O(n²).
        </p>
      </TheorySection>

      <TheorySection title="When to Use vs Not">
        <WhenToUse
          use={[
            "The problem asks for the next/previous greater or smaller element for every position — the textbook monotonic stack signal.",
            "A brute-force pairwise comparison is O(n²), but each element only actually needs its nearest qualifying neighbor.",
            "The problem involves histograms, spans, or boundaries where you need to know 'how far can I extend before something blocks me'.",
          ]}
          avoid={[
            "You need the k nearest or top-k qualifying elements rather than just the single nearest one — a heap (top-k pattern) fits multi-candidate tracking better.",
            "The relationship you need isn't about relative order/magnitude between elements — a monotonic stack only ever compares against what's already on it.",
            "You need random access into the middle of the structure — a stack only exposes its top, so problems needing arbitrary lookups need a different structure (e.g. a hash map alongside it).",
          ]}
        />
      </TheorySection>

      <TheorySection title="Quiz">
        <Quiz moduleSlug={MODULE_SLUG} questions={QUIZ} />
      </TheorySection>

      <TheorySection title="Curated Problems">
        <ProblemList problems={problems["monotonic-stack"] as Problem[]} />
      </TheorySection>
    </div>
  );
}
