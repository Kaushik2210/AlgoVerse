"use client";

import { useEffect, useMemo } from "react";
import Badge from "@/components/ui/Badge";
import GlassCard from "@/components/ui/GlassCard";
import { TheorySection, PitfallList, WhenToUse } from "@/components/ui/TheorySection";
import ProblemList, { type Problem } from "@/components/ui/ProblemList";
import ComplexityTable from "@/components/ui/ComplexityTable";
import Quiz, { type QuizQuestion } from "@/components/ui/Quiz";
import VisualizerEngine from "@/components/visualizers/VisualizerEngine";
import IntervalView from "@/components/visualizers/IntervalView";
import { mergeIntervalsSteps } from "@/lib/algorithms/patterns";
import { PATTERN_CODE_SAMPLES } from "@/lib/codeSamples/patterns";
import { useProgressStore } from "@/lib/store/progress";
import problems from "@/data/problems.json";

const MODULE_SLUG = "merge-intervals";

const QUIZ: QuizQuestion[] = [
  {
    question: "Why does sorting intervals by start value reduce the problem to comparing each interval only against the single most recent merged interval?",
    options: [
      "It doesn't — you still need to compare against every previous interval",
      "Once sorted by start, any interval that could overlap the current merged range must start before or at that range's current end — and since starts are non-decreasing, that can only ever be true relative to the most recently merged interval, never one further back",
      "Sorting removes the need to check overlap at all",
      "Sorting only helps reduce memory, not comparisons",
    ],
    correctIndex: 1,
    explanation:
      "Sorted by start, once an interval's start exceeds the running merged interval's end, every later interval (with an even later start) also can't overlap that already-finalized range — so nothing before the most recent merged interval ever needs to be revisited.",
  },
  {
    question: "Two intervals are [1, 5] and [5, 10]. Do they merge, and why?",
    options: [
      "No — 5 is not strictly less than 5",
      "Yes — they merge, because the condition is next.start <= current.end (touching counts as overlapping), and 5 <= 5",
      "It depends on whether the intervals are open or closed by default in every problem",
      "No — merging only happens when there's a gap of at least 1",
    ],
    correctIndex: 1,
    explanation:
      "The standard merge condition uses <=, not <, so intervals that only touch at a boundary (like ending and starting at exactly 5) are treated as overlapping/adjacent and get merged into [1, 10]. Using < instead would be a common off-by-one bug that leaves touching intervals unmerged.",
  },
  {
    question: "What's the overall time complexity of the merge intervals algorithm on n intervals, and what dominates it?",
    options: [
      "O(n) — the sweep alone",
      "O(n log n) — dominated by the initial sort; the single left-to-right sweep afterward is O(n)",
      "O(n²) — comparing every pair",
      "O(log n) — binary search finds all merges",
    ],
    correctIndex: 1,
    explanation:
      "The sweep itself does O(1) work per interval (compare against the last merged interval, extend or push), so it's O(n). But getting the intervals into sorted order first costs O(n log n), which dominates the overall complexity.",
  },
  {
    question:
      "\"Given a list of employee busy-time intervals, find the intervals where every employee is simultaneously free.\" What extra step does this need beyond plain merge intervals?",
    options: [
      "Nothing — plain merge intervals directly answers this",
      "Merge all busy intervals across all employees first to get every occupied range, then the gaps between consecutive merged intervals are exactly the common free time",
      "Binary search for each employee separately",
      "This requires a monotonic stack instead",
    ],
    correctIndex: 1,
    explanation:
      "This is merge intervals plus one extra step: after merging every employee's busy intervals into one combined set of occupied ranges, the free intervals are simply the gaps between consecutive merged ranges — a very common 'merge intervals' variant (see: Employee Free Time).",
  },
];
const DEMO_INTERVALS: [number, number][] = [
  [1, 3],
  [2, 6],
  [8, 10],
  [15, 18],
  [9, 11],
];

export default function MergeIntervalsPage() {
  const setModuleProgress = useProgressStore((s) => s.setModuleProgress);
  const completeModule = useProgressStore((s) => s.completeModule);

  useEffect(() => {
    setModuleProgress(MODULE_SLUG, { percent: 50 });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const steps = useMemo(() => mergeIntervalsSteps(DEMO_INTERVALS), []);

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 flex flex-col gap-10">
      <header>
        <div className="flex items-center gap-2 mb-2">
          <Badge variant="violet">Pattern</Badge>
          <Badge variant="neutral">Arrays / Sorting</Badge>
        </div>
        <h1 className="text-2xl font-bold font-mono-data">Merge Intervals</h1>
        <p className="text-text-muted mt-2 text-sm max-w-xl">
          Sort intervals by start value, then sweep once, merging any interval
          that overlaps (or touches) the running merged range — turning an
          O(n²) pairwise overlap check into O(n log n).
        </p>
      </header>

      <TheorySection title="Recognition Signals">
        <PitfallList
          items={[
            "The problem gives you a list of [start, end] ranges and asks you to merge, insert, or count overlaps.",
            "Keywords like 'meeting rooms', 'schedule', 'overlapping events', or 'free time' — anything modeled as ranges on a timeline.",
            "A brute-force solution compares every pair of intervals — O(n²) — but sorting first makes only adjacent comparisons necessary.",
            "You need to know how many intervals are active at the same time (concurrency / resource allocation).",
          ]}
        />
      </TheorySection>

      <TheorySection title="Visual Blueprint">
        <p>
          Below: five intervals get sorted by start value, then swept left to
          right. Two intervals overlap whenever the next one&apos;s start is
          <code className="font-mono-data text-cyan mx-1">&lt;=</code>
          the running interval&apos;s end — when that happens, they merge into one
          wider interval instead of staying separate.
        </p>
        <p>
          The key insight that makes sorting-first work: once sorted by start,
          you only ever need to compare each interval against the{" "}
          <em>single most recent</em> merged interval, never against every
          interval that came before it.
        </p>
      </TheorySection>

      <VisualizerEngine
        steps={steps}
        codeSamples={PATTERN_CODE_SAMPLES.mergeIntervals}
        onComplete={() => completeModule(MODULE_SLUG)}
      >
        {(state) => <IntervalView state={state} />}
      </VisualizerEngine>

      <TheorySection title="Annotated Code Template">
        <GlassCard>
          <pre className="font-mono-data text-xs leading-relaxed whitespace-pre-wrap">
{`function mergeIntervalsTemplate(intervals) {
  // 1. Sort by start — this is what makes a single
  //    left-to-right sweep sufficient.
  intervals.sort((a, b) => a[0] - b[0]);

  const result = [intervals[0]];
  for (let i = 1; i < intervals.length; i++) {
    const current = result[result.length - 1];
    const next = intervals[i];

    // 2. Overlap (or touch) => merge into the running interval
    if (next[0] <= current[1]) {
      current[1] = Math.max(current[1], next[1]);
    } else {
      // 3. No overlap => the running interval is finalized,
      //    start a new one
      result.push(next);
    }
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
              operation: "Merge overlapping intervals",
              best: "O(n log n)",
              average: "O(n log n)",
              worst: "O(n log n)",
              space: "O(n) — output / sort",
            },
            {
              operation: "Insert a new interval into an already-sorted list",
              best: "O(n)",
              average: "O(n)",
              worst: "O(n)",
              space: "O(n)",
            },
          ]}
        />
        <p className="text-xs text-text-muted">
          The sort is what costs O(n log n) — if the intervals are already sorted by
          start (as in Insert Interval), the whole algorithm drops to a single O(n)
          sweep.
        </p>
      </TheorySection>

      <TheorySection title="When to Use vs Not">
        <WhenToUse
          use={[
            "The input is a list of [start, end] ranges and you need to merge, insert, or count overlaps between them.",
            "Keywords like 'meeting rooms', 'schedule', 'overlapping events', or 'free time' — anything modeled as ranges on a timeline.",
            "You need to know how many intervals are active at the same time (concurrency, resource allocation, minimum meeting rooms).",
          ]}
          avoid={[
            "The intervals aren't independent ranges but instead represent a graph or dependency structure — that calls for graph traversal, not a sort-and-sweep.",
            "You need to query overlaps repeatedly against a changing set of intervals — a static sort-and-sweep is O(n log n) per query; an interval tree or segment tree amortizes better across many queries.",
            "The 'ranges' aren't actually orderable on a single axis (e.g. 2D rectangles) — 1D interval merging doesn't generalize directly to multiple dimensions.",
          ]}
        />
      </TheorySection>

      <TheorySection title="Quiz">
        <Quiz moduleSlug={MODULE_SLUG} questions={QUIZ} />
      </TheorySection>

      <TheorySection title="Curated Problems">
        <ProblemList problems={problems["merge-intervals"] as Problem[]} />
      </TheorySection>
    </div>
  );
}
