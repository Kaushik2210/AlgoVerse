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
import FenwickTreeView from "@/components/visualizers/FenwickTreeView";
import { buildSteps, querySteps, updateSteps } from "@/lib/algorithms/fenwickTree";
import { FENWICK_TREE_CODE_SAMPLES } from "@/lib/codeSamples/fenwick";
import { useProgressStore } from "@/lib/store/progress";

const MODULE_SLUG = "fenwick-trees";

type Op = "build" | "query" | "update";

const OP_LABELS: Record<Op, string> = {
  build: "Build",
  query: "Prefix Sum Query",
  update: "Point Update",
};

const QUIZ: QuizQuestion[] = [
  {
    question: "What does i & -i (lowbit) compute?",
    options: [
      "The index of the parent node",
      "The value of the lowest set bit of i — the size of the range i is responsible for",
      "The number of trailing zero bits",
      "i divided by 2",
    ],
    correctIndex: 1,
    explanation:
      "i & -i isolates the lowest set bit. That bit's value is both a power of two and the width of the range index i covers.",
  },
  {
    question: "To answer a prefix-sum query up to index n, which direction do you walk?",
    options: [
      "i += lowbit(i) starting from n, until i exceeds tree length",
      "i -= lowbit(i) starting from n, until i reaches 0",
      "Linearly scan every index from 1 to n",
      "Binary search the tree array",
    ],
    correctIndex: 1,
    explanation:
      "Query walks downward: i -= lowbit(i), accumulating tree[i] at each stop, until i hits 0 — O(log n) stops.",
  },
  {
    question: "To apply a point update at index i, which direction do you walk?",
    options: [
      "i += lowbit(i) starting from i+1, until i exceeds n",
      "i -= lowbit(i) starting from i, until i reaches 0",
      "Only tree[i] itself needs to change",
      "Rebuild the whole tree from scratch",
    ],
    correctIndex: 0,
    explanation:
      "Update walks upward: i += lowbit(i), adding the delta to every ancestor index that covers position i, until i exceeds n.",
  },
  {
    question: "Why is a Fenwick tree preferred over a plain prefix-sum array when updates happen?",
    options: [
      "It uses less memory than the original array",
      "A prefix-sum array needs O(n) to update after a change; a Fenwick tree does both query and update in O(log n)",
      "It doesn't need the array to be numeric",
      "It avoids recursion entirely, unlike a segment tree",
    ],
    correctIndex: 1,
    explanation:
      "A prefix-sum array gives O(1) queries but O(n) updates (every later prefix shifts). A Fenwick tree trades a little query cost for O(log n) updates too.",
  },
];

export default function FenwickTreesPage() {
  const [op, setOp] = useState<Op>("build");
  const [values, setValues] = useState<number[]>([3, 2, -1, 6, 5, 4, -3, 3]);
  const [queryN, setQueryN] = useState(5);
  const [updateIndex, setUpdateIndex] = useState(2);
  const [updateValue, setUpdateValue] = useState(10);
  const setModuleProgress = useProgressStore((s) => s.setModuleProgress);

  useEffect(() => {
    setModuleProgress(MODULE_SLUG, { percent: 40 });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const clampedN = Math.max(0, Math.min(queryN, values.length));
  const clampedUpdateIndex = Math.max(0, Math.min(updateIndex, values.length - 1));

  const steps = useMemo(() => {
    switch (op) {
      case "build":
        return buildSteps(values);
      case "query":
        return querySteps(values, clampedN);
      case "update":
        return updateSteps(values, clampedUpdateIndex, updateValue);
    }
  }, [op, values, clampedN, clampedUpdateIndex, updateValue]);

  const codeSamples = FENWICK_TREE_CODE_SAMPLES[op];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[1fr_480px] gap-8 px-4 sm:px-6 py-8 max-w-[1400px] mx-auto">
      <div className="flex flex-col gap-10 min-w-0">
        <header>
          <div className="flex items-center gap-2 mb-2">
            <Badge variant="cyan">Data Structure</Badge>
            <Badge variant="neutral">Advanced</Badge>
          </div>
          <h1 className="text-2xl font-bold font-mono-data">Fenwick Trees (Binary Indexed Trees)</h1>
          <p className="text-text-muted mt-2 text-sm max-w-xl">
            A compact implicit-array structure that answers prefix-sum queries and
            point updates in O(log n), using nothing but the lowest set bit of an
            index to know what it&apos;s responsible for.
          </p>
        </header>

        <TheorySection title="Intuition">
          <p>
            A segment tree solves the same problem (fast prefix sums with fast
            updates) but needs an explicit tree of nodes. A Fenwick tree gets the
            same O(log n) query/update bounds using nothing more than a single
            array — no pointers, no recursion required, dramatically less
            overhead in practice.
          </p>
          <p>
            The trick is bit manipulation: every index <code className="font-mono-data text-cyan">i</code>{" "}
            (1-indexed) is responsible for a range of the original array whose
            width is exactly <code className="font-mono-data text-cyan">i &amp; -i</code> — the value of
            its lowest set bit. To query a prefix sum, you walk{" "}
            <em>downward</em> through indices that together tile the whole
            prefix (<code className="font-mono-data text-cyan">i -= lowbit(i)</code>). To apply a
            point update, you walk <em>upward</em> through every index whose
            responsibility range includes the changed position (
            <code className="font-mono-data text-cyan">i += lowbit(i)</code>).
          </p>
        </TheorySection>

        <TheorySection title="Formal Definition">
          <p>
            Let <code className="font-mono-data text-cyan">tree</code> be an array of size{" "}
            <code className="font-mono-data text-cyan">n + 1</code>, 1-indexed. Index{" "}
            <code className="font-mono-data text-cyan">i</code> stores the sum of the original array
            over the half-open range{" "}
            <code className="font-mono-data text-cyan">(i - lowbit(i), i]</code>, where{" "}
            <code className="font-mono-data text-cyan">lowbit(i) = i &amp; -i</code> (two&apos;s-complement
            negation isolates the lowest set bit).
          </p>
          <p>
            <strong>Query</strong>(n) = sum of the first n elements: start at{" "}
            <code className="font-mono-data text-cyan">i = n</code>, repeatedly add{" "}
            <code className="font-mono-data text-cyan">tree[i]</code> then set{" "}
            <code className="font-mono-data text-cyan">i -= lowbit(i)</code>, until{" "}
            <code className="font-mono-data text-cyan">i = 0</code>.
          </p>
          <p>
            <strong>Update</strong>(index, delta): start at{" "}
            <code className="font-mono-data text-cyan">i = index + 1</code>, repeatedly add{" "}
            <code className="font-mono-data text-cyan">delta</code> to{" "}
            <code className="font-mono-data text-cyan">tree[i]</code> then set{" "}
            <code className="font-mono-data text-cyan">i += lowbit(i)</code>, until{" "}
            <code className="font-mono-data text-cyan">i</code> exceeds <code className="font-mono-data text-cyan">n</code>.
          </p>
        </TheorySection>

        <TheorySection title="Complexity">
          <ComplexityTable
            rows={[
              { operation: "Build", best: "O(n)", average: "O(n)", worst: "O(n)", space: "O(n)" },
              { operation: "Prefix sum query", best: "O(1)", average: "O(log n)", worst: "O(log n)", space: "O(1)" },
              { operation: "Point update", best: "O(log n)", average: "O(log n)", worst: "O(log n)", space: "O(1)" },
            ]}
          />
          <p className="text-xs text-text-muted">
            Both query and update visit at most O(log n) indices — one per bit
            position, since each jump clears or sets a single bit of the index.
          </p>
        </TheorySection>

        <TheorySection title="Common Pitfalls">
          <PitfallList
            items={[
              "Mixing up 0-indexed and 1-indexed positions — the Fenwick array is conventionally 1-indexed; array position i lives at tree index i + 1.",
              "Confusing the direction of the walk: query goes down (i -= lowbit(i)), update goes up (i += lowbit(i)) — swapping them silently breaks everything.",
              "Forgetting that a point update needs the delta (newValue - oldValue), not the new value itself, applied at each ancestor.",
              "Computing a range sum [l, r] by subtracting two prefix sums incorrectly — it's query(r+1) - query(l), being careful with the 0-index offset.",
            ]}
          />
        </TheorySection>

        <TheorySection title="When to Use vs Not">
          <WhenToUse
            use={[
              "You need prefix-sum (or prefix-XOR, prefix-min-with-caveats) queries with interleaved point updates.",
              "You want the smallest memory footprint and simplest implementation among the O(log n) range-query structures.",
              "Competitive programming — Fenwick trees are famously terse and fast to write under time pressure.",
            ]}
            avoid={[
              "You need arbitrary range updates (add delta to a whole range) without extra tricks — a segment tree with lazy propagation is more natural.",
              "You need range min/max — Fenwick trees are a clean fit for invertible operations (sum, XOR) but awkward for min/max.",
              "The array is static — a plain prefix-sum array is simpler and O(1) per query.",
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
              <label className="text-xs font-mono-data text-text-muted">Prefix length n:</label>
              <input
                type="number"
                value={queryN}
                onChange={(e) => setQueryN(Number(e.target.value))}
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
            key={`${op}-${values.join(",")}-${clampedN}-${clampedUpdateIndex}-${updateValue}`}
            steps={steps}
            codeSamples={codeSamples}
            onComplete={() => setModuleProgress(MODULE_SLUG, { percent: 80 })}
          >
            {(state) => <FenwickTreeView state={state} />}
          </VisualizerEngine>
        )}
      </div>
    </div>
  );
}
