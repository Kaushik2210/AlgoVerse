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
import RedBlackTreeView from "@/components/visualizers/RedBlackTreeView";
import { insertSteps, searchSteps, RB_CODE } from "@/lib/algorithms/redBlack";
import { useProgressStore } from "@/lib/store/progress";

const MODULE_SLUG = "red-black-trees";

type Op = "insert" | "search";

const OP_LABELS: Record<Op, string> = {
  insert: "Insert",
  search: "Search",
};

const QUIZ: QuizQuestion[] = [
  {
    question: "What color is a brand-new node when it's first inserted into a red-black tree?",
    options: ["Black", "Red", "It has no color until fixup runs", "Whatever color its parent is"],
    correctIndex: 1,
    explanation:
      "Every new node starts red. Inserting red (rather than black) never changes any path's black-height by itself, which is what makes local fixup possible.",
  },
  {
    question: "If a newly-inserted red node's uncle is also red, what does the fixup do?",
    options: [
      "Rotate immediately",
      "Recolor parent and uncle black, grandparent red, then continue the fixup from the grandparent",
      "Delete the uncle",
      "Nothing — this case is already valid",
    ],
    correctIndex: 1,
    explanation:
      "The red-uncle case is a pure recolor, no rotation — but it can push the violation up to the grandparent, so fixup must continue checking from there.",
  },
  {
    question: "What must always be true about the root of a red-black tree?",
    options: ["It must be red", "It must be black", "It must have exactly two children", "It must be the smallest value"],
    correctIndex: 1,
    explanation:
      "One of the five red-black invariants: the root is always black. Fixup unconditionally recolors the root black as its last step.",
  },
  {
    question:
      "Inserting 10, then 20, then 30 (in that order) into an empty red-black tree results in:",
    options: [
      "A degenerate 3-node chain",
      "20 as a black root, with 10 and 30 as red children",
      "10 stays the root, colored black",
      "All three nodes end up red",
    ],
    correctIndex: 1,
    explanation:
      "Inserting 30 under 20 (whose only child 10 is red) triggers a black-uncle line case: rotate left at 10... actually the rotation lands 20 as the new black root with 10 and 30 as red children — the tree ends up perfectly balanced.",
  },
];

export default function RedBlackTreesPage() {
  const [op, setOp] = useState<Op>("insert");
  const [values, setValues] = useState<number[]>([30, 20, 40, 10, 25, 35, 50]);
  const [target, setTarget] = useState(15);
  const setModuleProgress = useProgressStore((s) => s.setModuleProgress);

  useEffect(() => {
    setModuleProgress(MODULE_SLUG, { percent: 40 });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const steps = useMemo(() => {
    switch (op) {
      case "insert":
        return insertSteps(values, target);
      case "search":
        return searchSteps(values, target);
    }
  }, [op, values, target]);

  const code = RB_CODE[op];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[1fr_480px] gap-8 px-4 sm:px-6 py-8 max-w-[1400px] mx-auto">
      <div className="flex flex-col gap-10 min-w-0">
        <header>
          <div className="flex items-center gap-2 mb-2">
            <Badge variant="cyan">Data Structure</Badge>
            <Badge variant="neutral">Advanced</Badge>
          </div>
          <h1 className="text-2xl font-bold font-mono-data">Red-Black Trees</h1>
          <p className="text-text-muted mt-2 text-sm max-w-xl">
            A self-balancing binary search tree that uses a color bit per node
            instead of exact heights, restoring balance with a handful of
            recoloring and rotation rules after every insert.
          </p>
        </header>

        <TheorySection title="Intuition">
          <p>
            Instead of tracking precise subtree heights like an AVL tree, a
            red-black tree just colors every node <strong>red</strong> or{" "}
            <strong>black</strong> and enforces a looser invariant: no red node
            has a red child, and every root-to-leaf path passes through the same
            number of black nodes (its <em>black-height</em>). That looser rule
            still bounds the height at roughly 2·log₂(n), and needs fewer
            rotations to maintain than an AVL tree — which is why most
            production ordered maps (C++&apos;s <code className="font-mono-data text-cyan">std::map</code>,
            Java&apos;s <code className="font-mono-data text-cyan">TreeMap</code>, the Linux
            kernel scheduler) use red-black trees, not AVL trees.
          </p>
          <p>
            A new node always starts red — that alone can&apos;t break the
            black-height invariant. The only thing it can break is the
            no-red-red rule, and fixing that just means walking up from the new
            node, recoloring and occasionally rotating, until the violation is
            resolved or absorbed at the root.
          </p>
        </TheorySection>

        <TheorySection title="Formal Definition">
          <p>
            A red-black tree is a binary search tree where every node is
            colored red or black, satisfying: (1) the root is black, (2) every
            leaf (null) is considered black, (3) a red node never has a red
            child, and (4) every path from a given node to any of its
            descendant leaves contains the same number of black nodes.
          </p>
          <p>
            Insertion fixup walks up from the newly-inserted red node handling
            three shapes: <strong>red uncle</strong> (recolor parent, uncle,
            grandparent — continue from grandparent), <strong>black uncle,
            triangle</strong> (rotate to turn it into a line), and{" "}
            <strong>black uncle, line</strong> (rotate the grandparent and
            recolor). The root is unconditionally recolored black at the end.
          </p>
        </TheorySection>

        <TheorySection title="Complexity">
          <ComplexityTable
            rows={[
              { operation: "Search", best: "O(1)", average: "O(log n)", worst: "O(log n)", space: "O(1)" },
              { operation: "Insert", best: "O(log n)", average: "O(log n)", worst: "O(log n)", space: "O(1)" },
              { operation: "Delete", best: "O(log n)", average: "O(log n)", worst: "O(log n)", space: "O(1)" },
              { operation: "Rotation", best: "O(1)", average: "O(1)", worst: "O(1)", space: "O(1)" },
            ]}
          />
          <p className="text-xs text-text-muted">
            Red-black trees allow a slightly taller tree than AVL (up to ~2×
            log₂(n) vs ~1.44× log₂(n)), trading a bit of search speed for
            fewer rotations on insert/delete.
          </p>
        </TheorySection>

        <TheorySection title="Common Pitfalls">
          <PitfallList
            items={[
              "Forgetting a new node always starts red — inserting it black would break the black-height invariant immediately.",
              "Confusing the 'triangle' case (child on the opposite side of its parent vs. grandparent) with the 'line' case — triangle needs an extra rotation first.",
              "Not continuing the fixup loop after a red-uncle recolor — the violation can propagate all the way to the root.",
              "Forgetting to unconditionally recolor the root black at the very end (a recolor step can leave it red).",
            ]}
          />
        </TheorySection>

        <TheorySection title="When to Use vs Not">
          <WhenToUse
            use={[
              "You need guaranteed O(log n) operations with fewer rotations than AVL on write-heavy workloads.",
              "Building a general-purpose ordered map/set — this is what most standard library implementations use under the hood.",
              "You need predictable worst-case latency per operation (real-time schedulers, kernel data structures).",
            ]}
            avoid={[
              "Read-heavy workloads where AVL's tighter balance would pay off with slightly faster lookups.",
              "You just need unordered O(1) lookups — a hash table is simpler.",
              "Implementation simplicity matters more than guarantees — the case analysis is notoriously fiddly to get right.",
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
          <ArrayInput value={values} onApply={setValues} min={3} max={12} />
          <div className="mt-3 flex items-center gap-2">
            <label htmlFor="target" className="text-xs font-mono-data text-text-muted">
              {op === "insert" ? "Value to insert:" : "Target value:"}
            </label>
            <input
              id="target"
              type="number"
              value={target}
              onChange={(e) => setTarget(Number(e.target.value))}
              className="w-20 glass rounded-lg px-2 py-1 text-sm font-mono-data outline-none"
            />
          </div>
        </GlassCard>

        {steps && (
          <VisualizerEngine
            key={`${op}-${values.join(",")}-${target}`}
            steps={steps}
            code={code}
            onComplete={() => setModuleProgress(MODULE_SLUG, { percent: 80 })}
          >
            {(state) => <RedBlackTreeView state={state} />}
          </VisualizerEngine>
        )}
      </div>
    </div>
  );
}
