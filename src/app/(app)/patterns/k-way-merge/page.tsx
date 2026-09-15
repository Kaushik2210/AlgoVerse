"use client";

import { useEffect, useMemo } from "react";
import Badge from "@/components/ui/Badge";
import GlassCard from "@/components/ui/GlassCard";
import { TheorySection, PitfallList, WhenToUse } from "@/components/ui/TheorySection";
import ProblemList, { type Problem } from "@/components/ui/ProblemList";
import ComplexityTable from "@/components/ui/ComplexityTable";
import Quiz, { type QuizQuestion } from "@/components/ui/Quiz";
import VisualizerEngine from "@/components/visualizers/VisualizerEngine";
import ArrayBars from "@/components/visualizers/ArrayBars";
import { kWayMergeSteps } from "@/lib/algorithms/patterns";
import { PATTERN_CODE_SAMPLES } from "@/lib/codeSamples/patterns";
import { useProgressStore } from "@/lib/store/progress";
import problems from "@/data/problems.json";

const MODULE_SLUG = "k-way-merge";
const DEMO_LISTS = [
  [1, 4, 7],
  [2, 5, 8],
  [3, 6, 9],
];

const QUIZ: QuizQuestion[] = [
  {
    question: "Why does k-way merge use a min-heap of size k (one entry per list) instead of comparing all k current heads with a linear scan every step?",
    options: [
      "A linear scan and a heap perform identically, so it doesn't matter",
      "A linear scan over k candidates costs O(k) per step, giving O(N·k) total across N total elements; a size-k heap finds the minimum and re-inserts the next candidate in O(log k), giving O(N log k) total — meaningfully faster when k is large",
      "The heap is only used for readability, not performance",
      "Min-heaps can only be used with exactly 2 lists",
    ],
    correctIndex: 1,
    explanation:
      "Both approaches find the smallest of the current k heads correctly, but a linear scan re-examines all k candidates every single step (O(k) each), while a heap's push/pop is O(log k) — for many lists (large k), that difference compounds significantly over N total elements merged.",
  },
  {
    question: "After popping the minimum value from a specific list in the k-way merge, what happens next?",
    options: [
      "That list is removed from consideration for the rest of the merge",
      "The next element from that same list (if any remain) is pushed into the heap, so the heap always represents 'the current head of every list that still has elements left'",
      "All k lists are re-scanned from the beginning",
      "Nothing — the heap size just permanently shrinks by one",
    ],
    correctIndex: 1,
    explanation:
      "The heap's invariant is that it always holds exactly one candidate per non-exhausted list — the current head. Popping a value and replacing it with that same list's next element (if one exists) is what keeps every list 'in the running' until it's fully drained.",
  },
  {
    question: "Merging k sorted lists with a total of N elements using a size-k min-heap has what time complexity?",
    options: [
      "O(N·k)", "O(N log k)", "O(N log N)", "O(N + k)",
    ],
    correctIndex: 1,
    explanation:
      "Each of the N total elements is pushed and popped from the heap exactly once, and each of those operations costs O(log k) since the heap never holds more than k elements at a time — giving O(N log k) overall, better than O(N·k) for a linear scan or O(N log N) for concatenate-then-sort.",
  },
  {
    question:
      "\"You have k sorted arrays of numbers. Find the smallest range that includes at least one number from each of the k arrays.\" Why is this a k-way merge problem, even though it doesn't ask you to output a merged list?",
    options: [
      "It isn't related to k-way merge at all — this needs dynamic programming",
      "It still needs to advance through all k lists in merged order to consider every candidate range — a size-k min-heap tracks the current minimum across all lists (which pointer to advance) while a running max tracks the range's upper bound, shrinking the window as the heap's min advances",
      "This can be solved with a single binary search over one array",
      "It only requires looking at the first element of each list",
    ],
    correctIndex: 1,
    explanation:
      "Even without producing a merged output list, the algorithm still needs the same underlying machinery — a heap tracking the current minimum across k lists, advanced one step at a time. Each time the global minimum (from the heap) advances, the range's bounds are re-evaluated against a separately tracked running maximum — which is exactly the k-way merge traversal pattern, just repurposed to track a range instead of producing output.",
  },
];

export default function KWayMergePage() {
  const setModuleProgress = useProgressStore((s) => s.setModuleProgress);
  const completeModule = useProgressStore((s) => s.completeModule);

  useEffect(() => {
    setModuleProgress(MODULE_SLUG, { percent: 50 });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const steps = useMemo(() => kWayMergeSteps(DEMO_LISTS), []);

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 flex flex-col gap-10">
      <header>
        <div className="flex items-center gap-2 mb-2">
          <Badge variant="violet">Pattern</Badge>
          <Badge variant="neutral">Heaps</Badge>
        </div>
        <h1 className="text-2xl font-bold font-mono-data">K-way Merge</h1>
        <p className="text-text-muted mt-2 text-sm max-w-xl">
          Merge k already-sorted lists by always taking the smallest of the k current
          &quot;head&quot; values — a size-k min-heap makes each pick O(log k) instead of
          re-scanning every list.
        </p>
      </header>

      <TheorySection title="Recognition Signals">
        <PitfallList
          items={[
            "The input is k separate sorted lists/arrays (not one), and you need to merge, compare across, or find an element spanning all of them.",
            "The problem asks for 'the kth smallest across k sorted structures' — a sorted matrix, k linked lists, or k arrays.",
            "A brute-force solution concatenates everything and sorts — O(N log N) — when each individual list is already sorted and only needs merging, not re-sorting.",
            "You're tracking 'one pointer per list' and repeatedly need the minimum (or maximum) across all current pointer positions.",
          ]}
        />
      </TheorySection>

      <TheorySection title="Visual Blueprint">
        <p>
          Below: merging 3 sorted lists —{" "}
          <code className="font-mono-data text-cyan">
            [{DEMO_LISTS.map((l) => `[${l.join(",")}]`).join(", ")}]
          </code>
          . Each list keeps its own pointer at its current &quot;head&quot;. At every
          step, compare the values under all k pointers, take the smallest, append it to
          the merged output, and advance only that one list&apos;s pointer.
        </p>
        <p>
          This demo compares the k heads directly for clarity. In a real implementation,
          those k candidates live in a <strong>min-heap of size k</strong> instead — the
          heap&apos;s root is always the smallest candidate, found and replaced in O(log
          k) rather than by re-scanning all k heads (O(k)) every step.
        </p>
      </TheorySection>

      <VisualizerEngine
        steps={steps}
        codeSamples={PATTERN_CODE_SAMPLES.kWayMerge}
        onComplete={() => completeModule(MODULE_SLUG)}
      >
        {(state) => (
          <div className="w-full flex flex-col gap-4">
            <div className="flex flex-col gap-3">
              {state.lists.map((listState, li) => (
                <div key={li}>
                  <p className="text-[10px] font-mono-data uppercase tracking-wide text-text-muted mb-1">
                    List {li + 1}
                    {state.activeList === li && (
                      <span className="text-amber ml-1.5">← picked this step</span>
                    )}
                  </p>
                  <ArrayBars state={listState} />
                </div>
              ))}
            </div>
            <div className="border-t border-glass-border-token pt-2">
              <p className="text-[10px] font-mono-data uppercase tracking-wide text-text-muted mb-1">
                Merged output
              </p>
              <ArrayBars state={state.merged} />
            </div>
          </div>
        )}
      </VisualizerEngine>

      <TheorySection title="Annotated Code Template">
        <GlassCard>
          <pre className="font-mono-data text-xs leading-relaxed whitespace-pre-wrap">
{`function kWayMergeTemplate(lists) {
  // minHeap holds { value, listIndex, elemIndex }, ordered by value
  const minHeap = new MinHeap((a, b) => a.value - b.value);

  // 1. Seed the heap with each list's first element
  lists.forEach((list, i) => {
    if (list.length) minHeap.push({ value: list[0], listIndex: i, elemIndex: 0 });
  });

  const merged = [];
  while (!minHeap.isEmpty()) {
    // 2. Pop the smallest of the k current candidates
    const { value, listIndex, elemIndex } = minHeap.pop();
    merged.push(value);

    // 3. Push that same list's next element, if it has one
    const next = elemIndex + 1;
    if (next < lists[listIndex].length) {
      minHeap.push({ value: lists[listIndex][next], listIndex, elemIndex: next });
    }
  }
  return merged;
}`}
          </pre>
        </GlassCard>
      </TheorySection>

      <TheorySection title="Complexity">
        <ComplexityTable
          rows={[
            {
              operation: "Merge k sorted lists, N total elements (heap-based)",
              best: "O(N log k)",
              average: "O(N log k)",
              worst: "O(N log k)",
              space: "O(k) — heap, excluding output",
            },
            {
              operation: "Concatenate + sort (naive baseline)",
              best: "O(N log N)",
              average: "O(N log N)",
              worst: "O(N log N)",
              space: "O(N)",
            },
          ]}
        />
        <p className="text-xs text-text-muted">
          O(N log k) beats O(N log N) whenever k &lt; N — which is exactly the usual case,
          since each individual list is already sorted and doesn&apos;t need re-sorting.
        </p>
      </TheorySection>

      <TheorySection title="When to Use vs Not">
        <WhenToUse
          use={[
            "You have k already-sorted inputs (lists, arrays, matrix rows) and need them merged, or need to find an element that depends on all of them jointly (kth smallest, smallest covering range).",
            "Re-sorting everything from scratch would waste the fact that each individual list is already sorted — k-way merge preserves and exploits that structure.",
            "k can be large enough that a linear scan across all k heads per step (O(k) each) is worth upgrading to a heap (O(log k) each).",
          ]}
          avoid={[
            "You only have one or two lists — merging two sorted lists needs no heap at all, just two plain pointers (see Merge Two Sorted Lists); a heap is unnecessary overhead for k=2.",
            "The lists aren't actually sorted — k-way merge fundamentally depends on each list's own values being monotonic so its 'head' is always its true minimum.",
            "k is very large relative to N (many tiny lists) — heap overhead can approach the cost of just concatenating and sorting; profile before assuming the heap always wins.",
          ]}
        />
      </TheorySection>

      <TheorySection title="Quiz">
        <Quiz moduleSlug={MODULE_SLUG} questions={QUIZ} />
      </TheorySection>

      <TheorySection title="Curated Problems">
        <ProblemList problems={problems["k-way-merge"] as Problem[]} />
      </TheorySection>
    </div>
  );
}
