"use client";

import { useEffect, useMemo } from "react";
import Badge from "@/components/ui/Badge";
import GlassCard from "@/components/ui/GlassCard";
import { TheorySection, PitfallList } from "@/components/ui/TheorySection";
import ProblemList, { type Problem } from "@/components/ui/ProblemList";
import VisualizerEngine from "@/components/visualizers/VisualizerEngine";
import IntervalView from "@/components/visualizers/IntervalView";
import { mergeIntervalsSteps } from "@/lib/algorithms/patterns";
import { PATTERN_CODE_SAMPLES } from "@/lib/codeSamples/patterns";
import { useProgressStore } from "@/lib/store/progress";
import problems from "@/data/problems.json";

const MODULE_SLUG = "merge-intervals";
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

      <TheorySection title="Curated Problems">
        <ProblemList problems={problems["merge-intervals"] as Problem[]} />
      </TheorySection>
    </div>
  );
}
