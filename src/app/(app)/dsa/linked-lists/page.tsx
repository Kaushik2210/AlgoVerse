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
import LinkedListView from "@/components/visualizers/LinkedListView";
import {
  traverseSearchSteps,
  insertAtEndSteps,
  deleteValueSteps,
  reverseListSteps,
  LINKED_LIST_CODE,
} from "@/lib/algorithms/linkedList";
import { useProgressStore } from "@/lib/store/progress";

const MODULE_SLUG = "linked-lists";

type Op = "search" | "insert" | "delete" | "reverse";

const OP_LABELS: Record<Op, string> = {
  search: "Search",
  insert: "Insert at End",
  delete: "Delete Value",
  reverse: "Reverse",
};

const QUIZ: QuizQuestion[] = [
  {
    question: "What's the time complexity of accessing the k-th element of a singly linked list?",
    options: ["O(1)", "O(log n)", "O(n)", "O(n log n)"],
    correctIndex: 2,
    explanation:
      "Unlike arrays, linked lists have no random access — you must walk from the head, so it's O(n) in the worst case.",
  },
  {
    question: "Why is inserting at the head of a linked list O(1), but inserting at the head of an array is O(n)?",
    options: [
      "Linked lists use less memory",
      "Arrays require shifting every existing element to make room",
      "It isn't — both are O(n)",
      "Linked lists are always sorted",
    ],
    correctIndex: 1,
    explanation:
      "An array insert at index 0 has to shift every other element one slot over. A linked list insert just repoints the head pointer — no shifting required.",
  },
  {
    question: "To reverse a singly linked list iteratively, how many pointers do you typically track?",
    options: ["1", "2", "3 (prev, curr, next)", "You can't do it iteratively"],
    correctIndex: 2,
    explanation:
      "You need `prev` and `curr` to relink the pointer, plus `next` to remember where to go before you overwrite curr.next.",
  },
];

export default function LinkedListsPage() {
  const [op, setOp] = useState<Op>("search");
  const [values, setValues] = useState<number[]>([4, 8, 15, 16, 23]);
  const [target, setTarget] = useState(15);
  const setModuleProgress = useProgressStore((s) => s.setModuleProgress);

  useEffect(() => {
    setModuleProgress(MODULE_SLUG, { percent: 40 });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const steps = useMemo(() => {
    switch (op) {
      case "search":
        return traverseSearchSteps(values, target);
      case "insert":
        return insertAtEndSteps(values, target);
      case "delete":
        return deleteValueSteps(values, target);
      case "reverse":
        return reverseListSteps(values);
    }
  }, [op, values, target]);

  const code = LINKED_LIST_CODE[op];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[1fr_480px] gap-8 px-4 sm:px-6 py-8 max-w-[1400px] mx-auto">
      <div className="flex flex-col gap-10 min-w-0">
        <header>
          <div className="flex items-center gap-2 mb-2">
            <Badge variant="cyan">Data Structure</Badge>
            <Badge variant="neutral">Beginner</Badge>
          </div>
          <h1 className="text-2xl font-bold font-mono-data">Linked Lists</h1>
          <p className="text-text-muted mt-2 text-sm max-w-xl">
            A chain of nodes where each element only knows about the next one. Trades
            random access for O(1) insertion/removal at known positions.
          </p>
        </header>

        <TheorySection title="Intuition">
          <p>
            Instead of one contiguous memory block, a linked list is a set of nodes
            scattered across memory, each holding a value and a pointer to the next
            node. To get to the 5th element, you have no shortcut — you must walk
            the chain one hop at a time.
          </p>
          <p>
            What you give up in random access, you gain in cheap structural edits:
            inserting or removing a node only requires repointing a couple of
            references, no matter how large the list is — you never shift existing
            elements the way an array does.
          </p>
        </TheorySection>

        <TheorySection title="Formal Definition">
          <p>
            A singly linked list is a sequence of nodes{" "}
            <code className="font-mono-data text-cyan">{"{value, next}"}</code> where{" "}
            <code className="font-mono-data text-cyan">next</code> points to the following
            node or <code className="font-mono-data text-cyan">null</code> at the tail.
            The list itself is just a reference to the <code className="font-mono-data text-cyan">head</code> node.
          </p>
          <p>
            A doubly linked list adds a <code className="font-mono-data text-cyan">prev</code>{" "}
            pointer, enabling O(1) backward traversal and O(1) removal given only a
            node reference (no need to find its predecessor).
          </p>
        </TheorySection>

        <TheorySection title="Complexity">
          <ComplexityTable
            rows={[
              { operation: "Access by index", best: "O(1)", average: "O(n)", worst: "O(n)", space: "O(1)" },
              { operation: "Search by value", best: "O(1)", average: "O(n)", worst: "O(n)", space: "O(1)" },
              { operation: "Insert at head", best: "O(1)", average: "O(1)", worst: "O(1)", space: "O(1)" },
              { operation: "Insert at tail (no tail ptr)", best: "O(n)", average: "O(n)", worst: "O(n)", space: "O(1)" },
              { operation: "Delete by value", best: "O(1)", average: "O(n)", worst: "O(n)", space: "O(1)" },
            ]}
          />
        </TheorySection>

        <TheorySection title="Common Pitfalls">
          <PitfallList
            items={[
              "Losing the reference to the rest of the list by overwriting `curr.next` before saving it — always cache `next` first when reversing.",
              "Off-by-one null checks: forgetting to check `curr.next` before dereferencing it causes a null pointer crash.",
              "Not updating the tail pointer (if you keep one) after inserting or deleting the last node.",
              "Assuming O(1) access anywhere — a common bug ported over from array-based thinking.",
            ]}
          />
        </TheorySection>

        <TheorySection title="When to Use vs Not">
          <WhenToUse
            use={[
              "Frequent insertions/removals at the head or a known node.",
              "You don't need random access by index.",
              "Implementing other structures (stacks, queues, adjacency lists).",
            ]}
            avoid={[
              "You need fast indexed access — arrays win by a wide margin.",
              "Memory locality / cache performance matters (pointers scatter across heap).",
              "You need to binary search the data.",
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
          <ArrayInput value={values} onApply={setValues} min={2} max={8} />
          {op !== "reverse" && (
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
            {(state) => <LinkedListView state={state} />}
          </VisualizerEngine>
        )}
      </div>
    </div>
  );
}
