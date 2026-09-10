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
import BSTView from "@/components/visualizers/BSTView";
import {
  insertSteps,
  searchSteps,
  deleteSteps,
  inorderSteps,
  BST_CODE,
} from "@/lib/algorithms/bst";
import { useProgressStore } from "@/lib/store/progress";

const MODULE_SLUG = "binary-search-trees";

type Op = "insert" | "search" | "delete" | "inorder";

const OP_LABELS: Record<Op, string> = {
  insert: "Insert",
  search: "Search",
  delete: "Delete",
  inorder: "In-order Traversal",
};

const QUIZ: QuizQuestion[] = [
  {
    question: "In a binary search tree, where do values smaller than a node live?",
    options: ["In the right subtree", "In the left subtree", "At the root only", "Anywhere"],
    correctIndex: 1,
    explanation:
      "BST invariant: everything in the left subtree is smaller than the node, everything in the right subtree is larger.",
  },
  {
    question: "What's the worst-case search time in an unbalanced BST?",
    options: ["O(1)", "O(log n)", "O(n)", "O(n²)"],
    correctIndex: 2,
    explanation:
      "If you insert already-sorted data into a plain BST, it degenerates into a linked list — search becomes O(n). This is exactly why balanced variants (AVL, red-black) exist.",
  },
  {
    question: "What order does an in-order traversal visit nodes in a BST?",
    options: ["Ascending sorted order", "Descending sorted order", "Level by level", "Random"],
    correctIndex: 0,
    explanation:
      "Left, node, right — recursively — visits every value in ascending sorted order. This is one of the most useful properties of a BST.",
  },
  {
    question: "When deleting a node with two children, what do you replace it with?",
    options: [
      "Its parent",
      "The root of the tree",
      "Its in-order successor (min of right subtree) or predecessor (max of left subtree)",
      "You can't delete nodes with two children",
    ],
    correctIndex: 2,
    explanation:
      "Replacing with the in-order successor (or predecessor) preserves the BST property, since that value is guaranteed to fit correctly in the node's place.",
  },
];

export default function BinarySearchTreesPage() {
  const [op, setOp] = useState<Op>("insert");
  const [values, setValues] = useState<number[]>([8, 3, 10, 1, 6, 14, 4, 7, 13]);
  const [target, setTarget] = useState(6);
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
      case "delete":
        return deleteSteps(values, target);
      case "inorder":
        return inorderSteps(values);
    }
  }, [op, values, target]);

  const code = BST_CODE[op];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[1fr_480px] gap-8 px-4 sm:px-6 py-8 max-w-[1400px] mx-auto">
      <div className="flex flex-col gap-10 min-w-0">
        <header>
          <div className="flex items-center gap-2 mb-2">
            <Badge variant="cyan">Data Structure</Badge>
            <Badge variant="neutral">Intermediate</Badge>
          </div>
          <h1 className="text-2xl font-bold font-mono-data">Binary Search Trees</h1>
          <p className="text-text-muted mt-2 text-sm max-w-xl">
            A hierarchical structure that keeps data ordered while enabling O(log n)
            search, insert, and delete — as long as it stays balanced.
          </p>
        </header>

        <TheorySection title="Intuition">
          <p>
            A binary search tree is built around one invariant, applied at every
            single node: everything in the left subtree is smaller, everything in
            the right subtree is larger. That invariant is what lets you eliminate
            half the remaining tree with a single comparison — the same idea as
            binary search, but on a tree instead of a flat array.
          </p>
          <p>
            The catch: a BST's performance depends entirely on its shape. Insert
            sorted data into a naive BST and it degenerates into a linked list —
            no better than O(n). Balanced variants (AVL, red-black trees) add
            rotation logic to guarantee O(log n) no matter the insertion order.
          </p>
        </TheorySection>

        <TheorySection title="Formal Definition">
          <p>
            A binary search tree is a binary tree where each node stores a key such
            that, for every node <code className="font-mono-data text-cyan">N</code>: all
            keys in <code className="font-mono-data text-cyan">N.left</code>'s subtree are{" "}
            <code className="font-mono-data text-cyan">&lt; N.key</code>, and all keys in{" "}
            <code className="font-mono-data text-cyan">N.right</code>'s subtree are{" "}
            <code className="font-mono-data text-cyan">&gt; N.key</code>.
          </p>
          <p>
            This invariant holds recursively at every subtree, which is what makes
            in-order traversal (left, node, right) always yield values in ascending
            sorted order.
          </p>
        </TheorySection>

        <TheorySection title="Complexity">
          <ComplexityTable
            rows={[
              { operation: "Search", best: "O(1)", average: "O(log n)", worst: "O(n)", space: "O(1)" },
              { operation: "Insert", best: "O(1)", average: "O(log n)", worst: "O(n)", space: "O(1)" },
              { operation: "Delete", best: "O(log n)", average: "O(log n)", worst: "O(n)", space: "O(1)" },
              { operation: "In-order traversal", best: "O(n)", average: "O(n)", worst: "O(n)", space: "O(h)" },
            ]}
          />
          <p className="text-xs text-text-muted">
            Worst case O(n) happens when the tree degenerates into a chain (e.g.
            inserting already-sorted data). Self-balancing trees avoid this by
            keeping height h = O(log n) guaranteed.
          </p>
        </TheorySection>

        <TheorySection title="Common Pitfalls">
          <PitfallList
            items={[
              "Inserting sorted or nearly-sorted data into a plain BST silently produces a degenerate, linked-list-shaped tree.",
              "Forgetting the two-children delete case needs a successor/predecessor swap, not just removing the node outright.",
              "Confusing in-order (sorted), pre-order (serialization/copying), and post-order (safe deletion) traversal use cases.",
              "Off-by-one comparisons: treating equal values inconsistently (some implementations disallow duplicates, others push them right).",
            ]}
          />
        </TheorySection>

        <TheorySection title="When to Use vs Not">
          <WhenToUse
            use={[
              "You need ordered data with fast search, insert, and delete.",
              "You need range queries or sorted iteration (in-order traversal).",
              "Data arrives in a roughly random order (keeps the tree balanced naturally).",
            ]}
            avoid={[
              "Data arrives already sorted and you can't self-balance — you'll get O(n) everything.",
              "You just need O(1) key lookup with no ordering requirement — use a hash map instead.",
              "Extremely memory-constrained environments — node pointers add overhead vs. a flat array.",
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
          {(op === "insert" || op === "search" || op === "delete") && (
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
          )}
        </GlassCard>

        {steps && (
          <VisualizerEngine
            key={`${op}-${values.join(",")}-${target}`}
            steps={steps}
            code={code}
            onComplete={() => setModuleProgress(MODULE_SLUG, { percent: 80 })}
          >
            {(state) => <BSTView state={state} />}
          </VisualizerEngine>
        )}
      </div>
    </div>
  );
}
