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
import HeapView from "@/components/visualizers/HeapView";
import {
  heapInsertSteps,
  heapExtractSteps,
  buildHeap,
  HEAP_CODE,
  type HeapKind,
} from "@/lib/algorithms/heap";
import { useProgressStore } from "@/lib/store/progress";

const MODULE_SLUG = "heaps";

type Op = "insert" | "extract";

const OP_LABELS: Record<Op, string> = {
  insert: "Insert",
  extract: "Extract Root",
};

const QUIZ: QuizQuestion[] = [
  {
    question: "In a min-heap stored as an array, where is the smallest element?",
    options: ["The last index", "Index 0", "The middle", "It could be anywhere"],
    correctIndex: 1,
    explanation:
      "The heap property guarantees the root — always at index 0 in the array representation — holds the minimum (or maximum, for a max-heap) value.",
  },
  {
    question: "Given a node at array index i, where are its children?",
    options: ["i-1 and i+1", "2i and 2i+1", "2i+1 and 2i+2", "i/2 and i/2+1"],
    correctIndex: 2,
    explanation:
      "With a 0-indexed array, a node at index i has its left child at 2i+1 and right child at 2i+2 — no pointers needed, just arithmetic.",
  },
  {
    question: "What operation restores the heap property after inserting a new value at the end?",
    options: ["Bubble down (sift down)", "Bubble up (sift up)", "A full re-sort", "Nothing — inserts never break the heap"],
    correctIndex: 1,
    explanation:
      "A freshly inserted value sits at the last slot, which may violate the heap property against its parent. Bubbling up — repeatedly swapping with the parent while it wins the comparison — restores it in O(log n).",
  },
  {
    question: "Why is extract-root O(log n) instead of O(1)?",
    options: [
      "Because you have to search the whole array for the root",
      "Because after swapping the last element into the root, you have to sift it down through at most the tree's height",
      "Because arrays require O(log n) to remove any element",
      "It's actually O(1)",
    ],
    correctIndex: 1,
    explanation:
      "Removing the root leaves a hole. Moving the last element into that hole is O(1), but it likely violates the heap property, so it has to sift down — at most height-of-tree = O(log n) swaps.",
  },
];

export default function HeapsPage() {
  const [kind, setKind] = useState<HeapKind>("min");
  const [op, setOp] = useState<Op>("insert");
  const [values, setValues] = useState<number[]>([5, 3, 8, 1, 9, 2]);
  const [insertValue, setInsertValue] = useState(4);
  const setModuleProgress = useProgressStore((s) => s.setModuleProgress);

  useEffect(() => {
    setModuleProgress(MODULE_SLUG, { percent: 40 });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const heapified = useMemo(() => buildHeap(values, kind), [values, kind]);

  const steps = useMemo(() => {
    switch (op) {
      case "insert":
        return heapInsertSteps(heapified, insertValue, kind);
      case "extract":
        return heapExtractSteps(heapified, kind);
    }
  }, [op, heapified, insertValue, kind]);

  const code = HEAP_CODE[op];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[1fr_480px] gap-8 px-4 sm:px-6 py-8 max-w-[1400px] mx-auto">
      <div className="flex flex-col gap-10 min-w-0">
        <header>
          <div className="flex items-center gap-2 mb-2">
            <Badge variant="cyan">Data Structure</Badge>
            <Badge variant="neutral">Intermediate</Badge>
          </div>
          <h1 className="text-2xl font-bold font-mono-data">Heaps</h1>
          <p className="text-text-muted mt-2 text-sm max-w-xl">
            A complete binary tree, stored flat in an array, that always keeps the
            smallest (or largest) element at the root — the engine behind priority
            queues, heap sort, and top-K problems.
          </p>
        </header>

        <TheorySection title="Intuition">
          <p>
            A heap trades full ordering for a much weaker, much cheaper guarantee:
            every parent beats every child (smaller for a min-heap, larger for a
            max-heap). That&apos;s it — siblings have no defined relationship to each
            other. This weaker invariant is exactly what makes insert and
            extract-root both O(log n): you only ever need to fix one root-to-leaf
            path, never the whole structure.
          </p>
          <p>
            The trick that makes heaps fast in practice is that they don&apos;t need
            node pointers at all. Because a heap is always a{" "}
            <em>complete</em> binary tree (every level full except possibly the
            last, filled left to right), you can store it as a flat array and
            compute child/parent relationships with pure arithmetic: children of
            index <code className="font-mono-data text-cyan">i</code> live at{" "}
            <code className="font-mono-data text-cyan">2i+1</code> and{" "}
            <code className="font-mono-data text-cyan">2i+2</code>; the parent
            lives at <code className="font-mono-data text-cyan">⌊(i-1)/2⌋</code>.
          </p>
        </TheorySection>

        <TheorySection title="Formal Definition">
          <p>
            A binary heap is a complete binary tree satisfying the{" "}
            <strong>heap property</strong>: for every node N with parent P,{" "}
            <code className="font-mono-data text-cyan">
              {kind === "min" ? "P.value <= N.value" : "P.value >= N.value"}
            </code>
            . This holds recursively, which guarantees the root is always the
            global {kind === "min" ? "minimum" : "maximum"} — but says nothing
            about the relative order of any two nodes that aren&apos;t on the same
            root-to-leaf path.
          </p>
          <p>
            The array view below is not a separate representation — it&apos;s the{" "}
            <em>same</em> underlying data as the tree view, just read left to
            right instead of top to bottom. Watch them update in lockstep.
          </p>
        </TheorySection>

        <TheorySection title="Complexity">
          <ComplexityTable
            rows={[
              { operation: "Find min / max (peek)", best: "O(1)", average: "O(1)", worst: "O(1)", space: "O(1)" },
              { operation: "Insert", best: "O(1)", average: "O(log n)", worst: "O(log n)", space: "O(1)" },
              { operation: "Extract root", best: "O(log n)", average: "O(log n)", worst: "O(log n)", space: "O(1)" },
              { operation: "Build heap (from array)", best: "O(n)", average: "O(n)", worst: "O(n)", space: "O(1)" },
            ]}
          />
          <p className="text-xs text-text-muted">
            Building a heap from n arbitrary values is O(n), not O(n log n) —
            bottom-up heapify does less work than it looks like, since most nodes
            are near the leaves and barely move.
          </p>
        </TheorySection>

        <TheorySection title="Common Pitfalls">
          <PitfallList
            items={[
              "Confusing a heap with a sorted array — a heap only guarantees the root is extremal, siblings can be in any order.",
              "Forgetting a heap is not a search structure — finding an arbitrary value is O(n), not O(log n).",
              "Mixing up sift-up (used after insert) with sift-down (used after extract-root) — using the wrong one silently corrupts the heap.",
              "Assuming JavaScript's Array has a built-in heap/priority queue — it doesn't; you implement bubble up/down yourself or reach for a library.",
            ]}
          />
        </TheorySection>

        <TheorySection title="When to Use vs Not">
          <WhenToUse
            use={[
              "You repeatedly need the current min or max while the set changes (priority queues, schedulers, Dijkstra's algorithm).",
              "You need the top-K largest/smallest elements from a stream without sorting everything.",
              "You're implementing heap sort — O(n log n), in-place, no extra memory.",
            ]}
            avoid={[
              "You need fast arbitrary lookup or search — use a hash table or BST instead.",
              "You need the data in fully sorted order at every step — a heap only sorts the very top.",
              "You need stable ordering between equal-priority elements — a plain heap doesn't guarantee it.",
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
            {(["min", "max"] as HeapKind[]).map((k) => (
              <Button
                key={k}
                size="sm"
                variant={kind === k ? "primary" : "secondary"}
                onClick={() => setKind(k)}
              >
                {k === "min" ? "Min-Heap" : "Max-Heap"}
              </Button>
            ))}
          </div>
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
          <ArrayInput value={values} onApply={setValues} min={3} max={10} />
          {op === "insert" && (
            <div className="mt-3 flex items-center gap-2">
              <label htmlFor="insertValue" className="text-xs font-mono-data text-text-muted">
                Value to insert:
              </label>
              <input
                id="insertValue"
                type="number"
                value={insertValue}
                onChange={(e) => setInsertValue(Number(e.target.value))}
                className="w-20 glass rounded-lg px-2 py-1 text-sm font-mono-data outline-none"
              />
            </div>
          )}
        </GlassCard>

        {steps && (
          <VisualizerEngine
            key={`${kind}-${op}-${values.join(",")}-${insertValue}`}
            steps={steps}
            code={code}
            onComplete={() => setModuleProgress(MODULE_SLUG, { percent: 80 })}
          >
            {(state) => <HeapView state={state} />}
          </VisualizerEngine>
        )}
      </div>
    </div>
  );
}
