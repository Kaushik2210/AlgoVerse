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
import SegmentTreeView from "@/components/visualizers/SegmentTreeView";
import { buildSteps, querySteps, updateSteps, SEGMENT_TREE_CODE } from "@/lib/algorithms/segmentTree";
import { useProgressStore } from "@/lib/store/progress";

const MODULE_SLUG = "segment-trees";

type Op = "build" | "query" | "update";

const OP_LABELS: Record<Op, string> = {
  build: "Build",
  query: "Range Sum Query",
  update: "Point Update",
};

const QUIZ: QuizQuestion[] = [
  {
    question: "What does each internal node of a segment tree store?",
    options: [
      "A copy of the whole array",
      "The aggregate (e.g. sum) of the range its two children cover",
      "Only the leftmost element in its range",
      "Nothing — internal nodes are just structural",
    ],
    correctIndex: 1,
    explanation:
      "Every internal node's value is the combination (sum, min, max, ...) of its two children's ranges, built bottom-up from the leaves.",
  },
  {
    question: "During a range query, a node whose range is fully outside the query range is:",
    options: ["Still recursed into", "Skipped — it contributes 0 nodes to visit further", "Always the answer", "Split into two nodes"],
    correctIndex: 1,
    explanation:
      "Out-of-range nodes are pruned immediately — this pruning is exactly what makes segment tree queries O(log n) instead of O(n).",
  },
  {
    question: "What's the time complexity of a point update (change one array element) in a segment tree?",
    options: ["O(1)", "O(log n)", "O(n)", "O(n log n)"],
    correctIndex: 1,
    explanation:
      "A point update touches exactly one leaf, then walks back up recomputing O(log n) ancestors — one per tree level.",
  },
  {
    question: "Building a segment tree over [1,3,5,7,9,11] for range sum, what is the root's value?",
    options: ["11", "6", "36", "1"],
    correctIndex: 2,
    explanation: "The root covers the whole array, so its sum is 1+3+5+7+9+11 = 36.",
  },
];

export default function SegmentTreesPage() {
  const [op, setOp] = useState<Op>("build");
  const [values, setValues] = useState<number[]>([1, 3, 5, 7, 9, 11]);
  const [queryLeft, setQueryLeft] = useState(1);
  const [queryRight, setQueryRight] = useState(3);
  const [updateIndex, setUpdateIndex] = useState(1);
  const [updateValue, setUpdateValue] = useState(10);
  const setModuleProgress = useProgressStore((s) => s.setModuleProgress);

  useEffect(() => {
    setModuleProgress(MODULE_SLUG, { percent: 40 });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const clampedLeft = Math.max(0, Math.min(queryLeft, values.length - 1));
  const clampedRight = Math.max(clampedLeft, Math.min(queryRight, values.length - 1));
  const clampedUpdateIndex = Math.max(0, Math.min(updateIndex, values.length - 1));

  const steps = useMemo(() => {
    switch (op) {
      case "build":
        return buildSteps(values);
      case "query":
        return querySteps(values, clampedLeft, clampedRight);
      case "update":
        return updateSteps(values, clampedUpdateIndex, updateValue);
    }
  }, [op, values, clampedLeft, clampedRight, clampedUpdateIndex, updateValue]);

  const code = SEGMENT_TREE_CODE[op];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[1fr_480px] gap-8 px-4 sm:px-6 py-8 max-w-[1400px] mx-auto">
      <div className="flex flex-col gap-10 min-w-0">
        <header>
          <div className="flex items-center gap-2 mb-2">
            <Badge variant="cyan">Data Structure</Badge>
            <Badge variant="neutral">Advanced</Badge>
          </div>
          <h1 className="text-2xl font-bold font-mono-data">Segment Trees</h1>
          <p className="text-text-muted mt-2 text-sm max-w-xl">
            A binary tree over an array where every node stores the aggregate of a
            range, turning range queries and point updates into O(log n)
            operations instead of O(n).
          </p>
        </header>

        <TheorySection title="Intuition">
          <p>
            Say you need repeated range-sum queries over an array that also gets
            updated. A prefix-sum array answers queries in O(1) but updates cost
            O(n) (you&apos;d have to shift every prefix after the changed index). A
            plain loop answers queries in O(n) but updates in O(1). A segment
            tree gets you O(log n) for <em>both</em>.
          </p>
          <p>
            The trick: build a binary tree over the array where every leaf is one
            element, and every internal node stores the combined aggregate (sum,
            min, max, gcd — whatever&apos;s associative) of its two children&apos;s
            ranges. A range query then only has to visit O(log n) nodes — as soon
            as a node&apos;s range is fully inside or fully outside the query, you
            stop recursing into it.
          </p>
        </TheorySection>

        <TheorySection title="Formal Definition">
          <p>
            A segment tree over an array of size <code className="font-mono-data text-cyan">n</code> is
            a binary tree where each node covers a contiguous range{" "}
            <code className="font-mono-data text-cyan">[lo, hi]</code>: a leaf covers a
            single index (<code className="font-mono-data text-cyan">lo === hi</code>), and
            an internal node&apos;s value is{" "}
            <code className="font-mono-data text-cyan">combine(left.value, right.value)</code>{" "}
            where the range splits at{" "}
            <code className="font-mono-data text-cyan">mid = (lo + hi) / 2</code>.
          </p>
          <p>
            A query on <code className="font-mono-data text-cyan">[l, r]</code> recurses
            top-down: skip nodes entirely outside <code className="font-mono-data text-cyan">[l, r]</code>,
            take a node&apos;s value directly if it&apos;s entirely inside{" "}
            <code className="font-mono-data text-cyan">[l, r]</code>, and recurse into
            both children otherwise. A point update walks straight to the
            affected leaf, then recomputes every ancestor on the way back up.
          </p>
        </TheorySection>

        <TheorySection title="Complexity">
          <ComplexityTable
            rows={[
              { operation: "Build", best: "O(n)", average: "O(n)", worst: "O(n)", space: "O(n)" },
              { operation: "Range query", best: "O(1)", average: "O(log n)", worst: "O(log n)", space: "O(log n)" },
              { operation: "Point update", best: "O(log n)", average: "O(log n)", worst: "O(log n)", space: "O(1)" },
            ]}
          />
          <p className="text-xs text-text-muted">
            A query visits at most O(log n) fully-in-range nodes plus O(log n)
            partially-overlapping ones on the way there — still O(log n) total,
            not O(n).
          </p>
        </TheorySection>

        <TheorySection title="Common Pitfalls">
          <PitfallList
            items={[
              "Forgetting the three-way query split: out-of-range (skip), fully-in-range (take directly), partial (recurse) — collapsing these into two cases silently breaks correctness.",
              "Off-by-one range bounds — mixing inclusive [lo, hi] with exclusive [lo, hi) conventions across build/query/update.",
              "Not recomputing every ancestor on the way back up after a point update — a stale ancestor value silently corrupts future queries.",
              "Choosing a non-associative combine function (e.g. average) without adjusting the merge logic — segment trees need an associative operator.",
            ]}
          />
        </TheorySection>

        <TheorySection title="When to Use vs Not">
          <WhenToUse
            use={[
              "You need repeated range queries (sum, min, max, gcd, ...) over an array that also gets updated.",
              "Both queries and updates need to be faster than O(n) — a segment tree gives O(log n) for both.",
              "You need range updates too (with lazy propagation, not covered in this build).",
            ]}
            avoid={[
              "The array is static (never updated) — a prefix-sum array answers range-sum queries in O(1) with no tree overhead.",
              "You only ever need point queries, never ranges — a plain array is simpler.",
              "Memory is extremely tight — a segment tree uses roughly 2-4x the array's memory for internal nodes.",
            ]}
          />
        </TheorySection>

        <TheorySection title="Quiz">
          <Quiz moduleSlug={MODULE_SLUG} questions={QUIZ} />
        </TheorySection>
      </div>

      <div className="lg:sticky lg:top-20 self-start flex flex-col gap-4 min-w-0">
        <GlassCard className="!py-3 !px-4">
          <div className="flex flex-wrap gap-2 mb-3">
            {(Object.keys(OP_LABELS) as Op[]).map((o) => (
              <Button
                key={o}
                size="sm"
                variant={op === o ? "primary" : "secondary"}
                onClick={() => setOp(o)}
              >
                {OP_LABELS[o]}
              </Button>
            ))}
          </div>
          <ArrayInput value={values} onApply={setValues} min={2} max={10} />
          {op === "query" && (
            <div className="mt-3 flex items-center gap-2 flex-wrap">
              <label className="text-xs font-mono-data text-text-muted">Range [left, right]:</label>
              <input
                type="number"
                value={queryLeft}
                onChange={(e) => setQueryLeft(Number(e.target.value))}
                className="w-16 glass rounded-lg px-2 py-1 text-sm font-mono-data outline-none"
              />
              <span className="text-text-muted">to</span>
              <input
                type="number"
                value={queryRight}
                onChange={(e) => setQueryRight(Number(e.target.value))}
                className="w-16 glass rounded-lg px-2 py-1 text-sm font-mono-data outline-none"
              />
            </div>
          )}
          {op === "update" && (
            <div className="mt-3 flex items-center gap-2 flex-wrap">
              <label className="text-xs font-mono-data text-text-muted">Index:</label>
              <input
                type="number"
                value={updateIndex}
                onChange={(e) => setUpdateIndex(Number(e.target.value))}
                className="w-16 glass rounded-lg px-2 py-1 text-sm font-mono-data outline-none"
              />
              <label className="text-xs font-mono-data text-text-muted">New value:</label>
              <input
                type="number"
                value={updateValue}
                onChange={(e) => setUpdateValue(Number(e.target.value))}
                className="w-16 glass rounded-lg px-2 py-1 text-sm font-mono-data outline-none"
              />
            </div>
          )}
        </GlassCard>

        {steps && (
          <VisualizerEngine
            key={`${op}-${values.join(",")}-${clampedLeft}-${clampedRight}-${clampedUpdateIndex}-${updateValue}`}
            steps={steps}
            code={code}
            onComplete={() => setModuleProgress(MODULE_SLUG, { percent: 80 })}
          >
            {(state) => <SegmentTreeView state={state} />}
          </VisualizerEngine>
        )}
      </div>
    </div>
  );
}
