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
import AVLTreeView from "@/components/visualizers/AVLTreeView";
import { insertSteps, searchSteps } from "@/lib/algorithms/avl";
import { AVL_CODE_SAMPLES } from "@/lib/codeSamples/avl";
import { useProgressStore } from "@/lib/store/progress";

const MODULE_SLUG = "avl-trees";

type Op = "insert" | "search";

const OP_LABELS: Record<Op, string> = {
  insert: "Insert",
  search: "Search",
};

const QUIZ: QuizQuestion[] = [
  {
    question: "What does an AVL tree guarantee that a plain BST doesn't?",
    options: [
      "O(1) search",
      "Height stays O(log n), so search/insert/delete stay O(log n) worst case",
      "No duplicate values are ever possible",
      "Values are stored in a flat array",
    ],
    correctIndex: 1,
    explanation:
      "AVL trees rebalance after every insert/delete so the height never exceeds roughly 1.44 log₂(n), guaranteeing O(log n) operations even for adversarial insertion orders.",
  },
  {
    question: "A node's balance factor is defined as:",
    options: [
      "height(right) - height(left)",
      "height(left) - height(right)",
      "The node's value minus its parent's value",
      "The number of children it has",
    ],
    correctIndex: 1,
    explanation:
      "balance factor = height(left subtree) - height(right subtree). A valid AVL node always has a balance factor in {-1, 0, 1}.",
  },
  {
    question: "Inserting into the left child's right subtree, causing an imbalance, is which rotation case?",
    options: ["LL — single right rotation", "RR — single left rotation", "LR — left-right double rotation", "RL — right-left double rotation"],
    correctIndex: 2,
    explanation:
      "LR case: the new node lands in the left child's right subtree. Fix it by first left-rotating the left child, then right-rotating the node itself.",
  },
  {
    question: "Inserting 10, then 20, then 30 (in that order) into an empty AVL tree results in:",
    options: [
      "A degenerate 3-node chain, just like a plain BST",
      "20 as root, with 10 and 30 as its children (RR rotation fires at 20)",
      "10 stays root forever",
      "An error — AVL trees can't hold 3 nodes",
    ],
    correctIndex: 1,
    explanation:
      "After inserting 30, the balance factor at 20 becomes -2 (RR case) — a single left rotation makes 20 the new root with 10 and 30 as children.",
  },
];

export default function AVLTreesPage() {
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

  const codeSamples = AVL_CODE_SAMPLES[op];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[1fr_480px] gap-8 px-4 sm:px-6 py-8 max-w-[1400px] mx-auto">
      <div className="flex flex-col gap-10 min-w-0">
        <header>
          <div className="flex items-center gap-2 mb-2">
            <Badge variant="cyan">Data Structure</Badge>
            <Badge variant="neutral">Advanced</Badge>
          </div>
          <h1 className="text-2xl font-bold font-mono-data">AVL Trees</h1>
          <p className="text-text-muted mt-2 text-sm max-w-xl">
            A self-balancing binary search tree that rotates back into shape after
            every insert, guaranteeing O(log n) height no matter the insertion order.
          </p>
        </header>

        <TheorySection title="Intuition">
          <p>
            A plain BST&apos;s performance depends entirely on its shape — insert sorted
            data and it degenerates into a linked list. An AVL tree fixes this by
            tracking each node&apos;s <strong>height</strong> and, after every insert,
            checking whether any node&apos;s <strong>balance factor</strong> (left
            height minus right height) has drifted outside {"{-1, 0, 1}"}. The moment
            it does, a rotation restructures that subtree back into balance.
          </p>
          <p>
            There are exactly four imbalance shapes, each with its own fix: a
            left-heavy-left (LL) or right-heavy-right (RR) imbalance needs a single
            rotation; a left-heavy-right (LR) or right-heavy-left (RL) imbalance —
            a &quot;zig-zag&quot; — needs two rotations back to back.
          </p>
        </TheorySection>

        <TheorySection title="Formal Definition">
          <p>
            An AVL tree is a binary search tree where, for every node{" "}
            <code className="font-mono-data text-cyan">N</code>, the invariant{" "}
            <code className="font-mono-data text-cyan">
              |height(N.left) - height(N.right)| ≤ 1
            </code>{" "}
            holds. After every insertion or deletion, ancestors are walked back up
            to the root, recomputing heights and rotating any node whose balance
            factor has fallen outside that range.
          </p>
          <p>
            The four rebalancing cases, named by which side the imbalance came
            from: <strong>LL</strong> (single right rotation), <strong>RR</strong>{" "}
            (single left rotation), <strong>LR</strong> (left rotation on the left
            child, then right rotation on the node), and <strong>RL</strong> (right
            rotation on the right child, then left rotation on the node).
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
            Every operation is O(log n) worst case — the whole point of AVL trees is
            eliminating the O(n) degenerate case a plain BST can hit.
          </p>
        </TheorySection>

        <TheorySection title="Common Pitfalls">
          <PitfallList
            items={[
              "Forgetting to recompute height on the way back up the recursion — stale heights make balance factors lie.",
              "Checking the balance factor before recursing into children instead of after — rebalancing must happen bottom-up.",
              "Mixing up LR and RL: the double-rotation direction depends on which grandchild the new node landed under, not just left vs. right.",
              "Rotating the wrong node — always rotate the node whose balance factor is ±2, not its child.",
            ]}
          />
        </TheorySection>

        <TheorySection title="When to Use vs Not">
          <WhenToUse
            use={[
              "You need guaranteed O(log n) search/insert/delete regardless of insertion order.",
              "Reads (searches) vastly outnumber writes — AVL trees stay more tightly balanced than red-black trees, so lookups are slightly faster.",
              "You need in-order traversal / range queries on ordered data with worst-case guarantees.",
            ]}
            avoid={[
              "Write-heavy workloads with frequent insert/delete — the stricter balance means more rotations than a red-black tree.",
              "You just need unordered O(1) lookups — a hash table is simpler and faster.",
              "Simplicity matters more than worst-case guarantees — a plain BST is easier to implement correctly.",
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
            codeSamples={codeSamples}
            onComplete={() => setModuleProgress(MODULE_SLUG, { percent: 80 })}
          >
            {(state) => <AVLTreeView state={state} />}
          </VisualizerEngine>
        )}
      </div>
    </div>
  );
}
