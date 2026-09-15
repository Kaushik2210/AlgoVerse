"use client";

import { useEffect, useMemo } from "react";
import Badge from "@/components/ui/Badge";
import GlassCard from "@/components/ui/GlassCard";
import { TheorySection, PitfallList, WhenToUse } from "@/components/ui/TheorySection";
import ProblemList, { type Problem } from "@/components/ui/ProblemList";
import ComplexityTable from "@/components/ui/ComplexityTable";
import Quiz, { type QuizQuestion } from "@/components/ui/Quiz";
import VisualizerEngine from "@/components/visualizers/VisualizerEngine";
import LinkedListView from "@/components/visualizers/LinkedListView";
import { fastSlowMiddleSteps } from "@/lib/algorithms/patterns";
import { PATTERN_CODE_SAMPLES } from "@/lib/codeSamples/patterns";
import { useProgressStore } from "@/lib/store/progress";
import problems from "@/data/problems.json";

const MODULE_SLUG = "fast-slow-pointers";
const DEMO_VALUES = [4, 8, 15, 16, 23, 42, 7];

const QUIZ: QuizQuestion[] = [
  {
    question: "When the fast pointer (moving 2 steps at a time) reaches the end of a list of n nodes, where is the slow pointer (moving 1 step at a time)?",
    options: [
      "At the head, unchanged",
      "Exactly at the middle — it has covered half the distance fast has covered",
      "One node before the end",
      "It depends on whether n is prime",
    ],
    correctIndex: 1,
    explanation:
      "Fast always covers exactly twice the distance slow does in the same number of ticks. When fast has traveled the full list, slow has traveled half of it — landing it at the middle.",
  },
  {
    question: "In Floyd's cycle detection, why must the fast and slow pointers eventually land on the same node if a cycle exists — rather than just running forever without ever aligning?",
    options: [
      "They're guaranteed to start on the same node",
      "Once both pointers are inside the cycle, fast gains exactly one extra step on slow every tick — since the cycle has finite length, that 1-per-tick gain must eventually bring the gap between them to exactly 0 (mod cycle length)",
      "Cycles in linked lists are always even in length",
      "The pointers align immediately upon entering the cycle",
    ],
    correctIndex: 1,
    explanation:
      "Think of it as fast 'lapping' slow on a circular track: the gap between them shrinks by 1 every tick once both are on the loop. A shrinking-by-1 gap on a finite loop must hit 0 eventually — that's the tick they meet.",
  },
  {
    question: "What's the time and space complexity of using fast/slow pointers to detect a cycle in a linked list of n nodes, compared to using a hash set of visited nodes?",
    options: [
      "Fast/slow: O(n) time, O(1) space. Hash set: O(n) time, O(n) space — same time, but fast/slow avoids the extra memory",
      "Fast/slow: O(n²) time. Hash set: O(n) time — fast/slow is strictly worse",
      "Both use O(1) space",
      "Fast/slow is O(log n) time",
    ],
    correctIndex: 0,
    explanation:
      "Both approaches are linear time — each node is visited a bounded number of times. The difference is space: a hash set of visited nodes costs O(n) memory, while fast/slow pointers need only two extra references, O(1).",
  },
  {
    question:
      "\"Given the head of a singly linked list, determine if it's a palindrome, using O(1) extra space.\" Which pattern is the key first step, and why?",
    options: [
      "Sliding window, to scan for repeated values",
      "Fast & slow pointers, to find the middle of the list in one pass — then reverse the second half and compare it against the first, all without allocating an array of node values",
      "Monotonic stack, to track increasing values",
      "Binary search on the list length",
    ],
    correctIndex: 1,
    explanation:
      "The O(1) space constraint rules out copying values into an array. Fast/slow pointers find the middle in a single O(n) pass with O(1) space, which lets you reverse the second half in place and walk both halves for the palindrome check — no extra memory needed.",
  },
];

export default function FastSlowPointersPage() {
  const setModuleProgress = useProgressStore((s) => s.setModuleProgress);
  const completeModule = useProgressStore((s) => s.completeModule);

  useEffect(() => {
    setModuleProgress(MODULE_SLUG, { percent: 50 });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const steps = useMemo(() => fastSlowMiddleSteps(DEMO_VALUES), []);

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 flex flex-col gap-10">
      <header>
        <div className="flex items-center gap-2 mb-2">
          <Badge variant="violet">Pattern</Badge>
          <Badge variant="neutral">Linked Lists</Badge>
        </div>
        <h1 className="text-2xl font-bold font-mono-data">Fast &amp; Slow Pointers</h1>
        <p className="text-text-muted mt-2 text-sm max-w-xl">
          Also called &quot;Floyd&apos;s tortoise and hare&quot; — run two pointers through
          a linked list at different speeds. Their relative positions reveal structure
          (the middle, a cycle, its length) in a single O(n) pass with O(1) space.
        </p>
      </header>

      <TheorySection title="Recognition Signals">
        <PitfallList
          items={[
            "You're working with a linked list (or any 'next pointer' style chain) and need the middle, a cycle, or the k-th-from-end node.",
            "The brute-force approach needs to know the total length first, or uses O(n) extra memory (a hash set of visited nodes) to detect a cycle.",
            "A problem can be reframed as 'follow a next function repeatedly' — even without an explicit linked list (e.g. detecting a numeric cycle).",
            "You want O(1) extra space instead of two full passes or an auxiliary visited-set.",
          ]}
        />
      </TheorySection>

      <TheorySection title="Visual Blueprint">
        <p>
          Below: <strong>finding the middle of a linked list</strong>. Slow advances one
          node per tick, fast advances two. When fast runs out of nodes, slow is
          sitting exactly in the middle — because it has covered exactly half the
          distance fast has.
        </p>
        <p>
          The same race also detects cycles (<strong>Floyd&apos;s cycle detection</strong>):
          if the list loops back on itself, the faster pointer eventually laps the
          slower one and they land on the same node. If fast ever hits{" "}
          <code className="font-mono-data text-cyan">null</code> instead, there&apos;s no
          cycle. A flat node chain can&apos;t visually represent a real loop, so that
          case is shown as code only below — the mechanics are identical to the middle-
          finding race above, just with an equality check added each tick.
        </p>
      </TheorySection>

      <VisualizerEngine
        steps={steps}
        codeSamples={PATTERN_CODE_SAMPLES.fastSlowMiddle}
        onComplete={() => completeModule(MODULE_SLUG)}
      >
        {(state) => <LinkedListView state={state} />}
      </VisualizerEngine>

      <TheorySection title="Annotated Code Template">
        <GlassCard>
          <pre className="font-mono-data text-xs leading-relaxed whitespace-pre-wrap">
{`function fastSlowTemplate(head) {
  let slow = head;
  let fast = head;

  // Loop while fast (and fast.next) can still advance
  while (fast && fast.next) {
    slow = slow.next;       // 1 step
    fast = fast.next.next;  // 2 steps

    // For cycle detection: they meet -> there's a loop
    if (slow === fast) return true;
  }

  // fast reached the end -> slow is at the middle / no cycle exists
  return slow;
}`}
          </pre>
        </GlassCard>
        <p className="text-xs text-text-muted mt-2">
          For cycle detection specifically, see <code className="font-mono-data text-cyan">hasCycle</code>{" "}
          in the code panel above.
        </p>
      </TheorySection>

      <TheorySection title="Complexity">
        <ComplexityTable
          rows={[
            {
              operation: "Find middle node",
              best: "O(n)",
              average: "O(n)",
              worst: "O(n)",
              space: "O(1)",
            },
            {
              operation: "Cycle detection (Floyd's)",
              best: "O(n)",
              average: "O(n)",
              worst: "O(n)",
              space: "O(1)",
            },
            {
              operation: "Find cycle start / cycle length",
              best: "O(n)",
              average: "O(n)",
              worst: "O(n)",
              space: "O(1)",
            },
          ]}
        />
      </TheorySection>

      <TheorySection title="When to Use vs Not">
        <WhenToUse
          use={[
            "You need the middle, a cycle, or a 'meeting point' in a linked list (or any next-pointer chain) using only O(1) extra space.",
            "The brute-force alternative needs two full passes (one to count length) or O(n) memory (a hash set of visited nodes).",
            "A problem can be reframed as 'apply a next function repeatedly' — even for non-linked-list inputs, like detecting a cycle in a sequence generated by repeatedly applying a formula.",
          ]}
          avoid={[
            "You need random access or to know a node's index directly — an array or a length-first pass is simpler when O(1) space isn't a hard requirement.",
            "The structure is a tree or graph with branching, not a single chain — fast/slow pointers assume exactly one 'next' per step, which breaks down with multiple children.",
            "You need to inspect every node's relationship to every other node — fast/slow only surfaces relative-position facts (middle, cycle), not full pairwise structure.",
          ]}
        />
      </TheorySection>

      <TheorySection title="Quiz">
        <Quiz moduleSlug={MODULE_SLUG} questions={QUIZ} />
      </TheorySection>

      <TheorySection title="Curated Problems">
        <ProblemList problems={problems["fast-slow-pointers"] as Problem[]} />
      </TheorySection>
    </div>
  );
}
