"use client";

import { useEffect, useMemo } from "react";
import Badge from "@/components/ui/Badge";
import GlassCard from "@/components/ui/GlassCard";
import { TheorySection, PitfallList, WhenToUse } from "@/components/ui/TheorySection";
import ProblemList, { type Problem } from "@/components/ui/ProblemList";
import ComplexityTable from "@/components/ui/ComplexityTable";
import Quiz, { type QuizQuestion } from "@/components/ui/Quiz";
import VisualizerEngine from "@/components/visualizers/VisualizerEngine";
import HeapView from "@/components/visualizers/HeapView";
import { twoHeapsMedianSteps } from "@/lib/algorithms/patterns";
import { PATTERN_CODE_SAMPLES } from "@/lib/codeSamples/patterns";
import { useProgressStore } from "@/lib/store/progress";
import problems from "@/data/problems.json";

const MODULE_SLUG = "two-heaps";
const DEMO_STREAM = [5, 15, 1, 3, 8, 7, 9, 10, 2];

const QUIZ: QuizQuestion[] = [
  {
    question: "Why does the two-heaps technique use a MAX-heap for the lower (smaller) half and a MIN-heap for the upper (larger) half?",
    options: [
      "It's arbitrary — either heap type works for either half",
      "The median needs instant access to the two values closest to the middle: the largest of the small half and the smallest of the large half. A max-heap puts the largest of 'lower' at its root, and a min-heap puts the smallest of 'upper' at its root — exactly the two values the median needs",
      "Max-heaps are always faster to query than min-heaps",
      "This ensures the heaps never need rebalancing",
    ],
    correctIndex: 1,
    explanation:
      "The median is derived from the boundary between the two halves — the biggest 'small' value and the smallest 'big' value. Each heap type is chosen specifically so that boundary value sits at the root, giving O(1) access to exactly what the median needs.",
  },
  {
    question: "After inserting a new value into whichever heap it belongs in, why is a rebalancing step still needed?",
    options: [
      "It isn't — insertion alone always keeps the heaps balanced",
      "A new value always goes into one specific heap based on its value, which can make that heap grow larger than the other by more than one element — rebalancing (moving the offending heap's root to the other heap) restores the 'at most 1 apart' size invariant the median formula depends on",
      "Rebalancing is only needed once, at the very start",
      "The heaps are rebalanced by fully rebuilding them from scratch",
    ],
    correctIndex: 1,
    explanation:
      "Insertion decides which heap a value goes into based purely on its value, not on keeping sizes even — so after several similar-valued insertions, one heap can outgrow the other. The rebalancing step (move a root across) is what restores the size invariant that makes the O(1) median lookup correct.",
  },
  {
    question: "What's the time complexity of inserting one new value into the running median structure, and reading the median?",
    options: [
      "O(1) insert, O(1) read",
      "O(log n) insert (heap push/pop for insertion and possible rebalancing), O(1) read (just peek both roots)",
      "O(n) insert, O(n) read — every value must be re-sorted",
      "O(log n) insert, O(log n) read",
    ],
    correctIndex: 1,
    explanation:
      "Pushing into a heap (and popping during rebalancing) is O(log n). Once the heaps are correctly sized, the median is just heap[0] (or the average of both roots) — an O(1) peek, no traversal needed.",
  },
  {
    question:
      "\"Design a data structure that supports adding numbers one at a time and finding the median of all numbers added so far, at any point.\" Why does re-sorting the whole list on every median query not scale, and how do two heaps fix it?",
    options: [
      "Re-sorting is actually the optimal approach here",
      "Re-sorting all n values on every query costs O(n log n) per query — with two heaps, insertion is O(log n) and each median query is O(1), because the structure maintains the sorted boundary incrementally instead of recomputing it from scratch every time",
      "This problem can only be solved with a balanced BST, never heaps",
      "Two heaps only work if the numbers are added in sorted order already",
    ],
    correctIndex: 1,
    explanation:
      "The naive approach re-sorts on every query, which is wasteful when insertions are frequent. Two heaps instead maintain the 'boundary near the middle' incrementally as each value arrives — O(log n) per insert versus O(n log n) per full re-sort, and O(1) per median read since the two roots are always exactly the values needed.",
  },
];

export default function TwoHeapsPage() {
  const setModuleProgress = useProgressStore((s) => s.setModuleProgress);
  const completeModule = useProgressStore((s) => s.completeModule);

  useEffect(() => {
    setModuleProgress(MODULE_SLUG, { percent: 50 });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const steps = useMemo(() => twoHeapsMedianSteps(DEMO_STREAM), []);

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 flex flex-col gap-10">
      <header>
        <div className="flex items-center gap-2 mb-2">
          <Badge variant="violet">Pattern</Badge>
          <Badge variant="neutral">Heaps</Badge>
        </div>
        <h1 className="text-2xl font-bold font-mono-data">Two Heaps</h1>
        <p className="text-text-muted mt-2 text-sm max-w-xl">
          Split a stream into a smaller half (a max-heap) and a larger half (a min-heap),
          kept balanced within one element of each other — the two roots always sit
          exactly on either side of the median.
        </p>
      </header>

      <TheorySection title="Recognition Signals">
        <PitfallList
          items={[
            "The problem asks for a running median, or any statistic that depends on 'the middle' of a growing/streaming dataset.",
            "A brute-force solution re-sorts the entire dataset on every query — O(n log n) per query when the data changes incrementally.",
            "You need to repeatedly split a dataset into 'smaller half' and 'larger half' and query the boundary between them.",
            "Keywords like 'find the median at any point', 'balance two groups', or scheduling problems that compare against both a lower and upper bound simultaneously (e.g. IPO-style capital/profit tradeoffs).",
          ]}
        />
      </TheorySection>

      <TheorySection title="Visual Blueprint">
        <p>
          Below: computing the running median of the stream{" "}
          <code className="font-mono-data text-cyan">[{DEMO_STREAM.join(", ")}]</code>.
          The <strong>lower</strong> heap (max-heap) holds the smaller half of values
          seen so far; the <strong>upper</strong> heap (min-heap) holds the larger half.
          Every new value goes into whichever heap it belongs in by comparison with
          lower&apos;s max, then a rebalance step keeps the two heaps within one element
          of each other in size.
        </p>
        <p>
          The median is read directly from the roots: if the heaps are equal size, it&apos;s
          the average of both roots; if lower has one more element, it&apos;s lower&apos;s
          root alone. No sorting, no scanning — just two O(1) peeks.
        </p>
      </TheorySection>

      <VisualizerEngine
        steps={steps}
        codeSamples={PATTERN_CODE_SAMPLES.twoHeaps}
        onComplete={() => completeModule(MODULE_SLUG)}
      >
        {(state) => (
          <div className="w-full flex flex-col gap-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <p className="text-[10px] font-mono-data uppercase tracking-wide text-text-muted mb-1">
                  Lower (max-heap — smaller half)
                </p>
                <HeapView state={state.lower} />
              </div>
              <div>
                <p className="text-[10px] font-mono-data uppercase tracking-wide text-text-muted mb-1">
                  Upper (min-heap — larger half)
                </p>
                <HeapView state={state.upper} />
              </div>
            </div>
            <div className="border-t border-glass-border-token pt-2 flex items-center justify-between">
              <p className="text-[10px] font-mono-data uppercase tracking-wide text-text-muted">
                Stream: [{state.stream.join(", ")}]{" "}
                {state.streamIndex !== undefined && (
                  <span className="text-amber">
                    (inserting {state.stream[state.streamIndex]})
                  </span>
                )}
              </p>
              <p className="font-mono-data text-sm">
                median = <span className="text-cyan font-semibold">{state.median ?? "—"}</span>
              </p>
            </div>
          </div>
        )}
      </VisualizerEngine>

      <TheorySection title="Annotated Code Template">
        <GlassCard>
          <pre className="font-mono-data text-xs leading-relaxed whitespace-pre-wrap">
{`class MedianFinder {
  constructor() {
    this.lower = new MaxHeap(); // smaller half
    this.upper = new MinHeap(); // larger half
  }

  addNum(num) {
    // 1. Decide which half this value belongs in
    if (this.lower.isEmpty() || num <= this.lower.peek()) {
      this.lower.push(num);
    } else {
      this.upper.push(num);
    }

    // 2. Rebalance — keep sizes within 1 of each other
    if (this.lower.size() > this.upper.size() + 1) {
      this.upper.push(this.lower.pop());
    } else if (this.upper.size() > this.lower.size()) {
      this.lower.push(this.upper.pop());
    }
  }

  findMedian() {
    // 3. Read directly from the roots — O(1)
    if (this.lower.size() === this.upper.size()) {
      return (this.lower.peek() + this.upper.peek()) / 2;
    }
    return this.lower.peek();
  }
}`}
          </pre>
        </GlassCard>
      </TheorySection>

      <TheorySection title="Complexity">
        <ComplexityTable
          rows={[
            {
              operation: "addNum (insert + rebalance)",
              best: "O(log n)",
              average: "O(log n)",
              worst: "O(log n)",
              space: "O(n) — both heaps combined",
            },
            {
              operation: "findMedian",
              best: "O(1)",
              average: "O(1)",
              worst: "O(1)",
              space: "O(1)",
            },
          ]}
        />
      </TheorySection>

      <TheorySection title="When to Use vs Not">
        <WhenToUse
          use={[
            "You need a running/streaming median (or any 'middle boundary' statistic) that's queried repeatedly as data arrives incrementally.",
            "A brute-force re-sort per query is too slow — two heaps trade O(n log n) per query for O(log n) per insert and O(1) per query.",
            "The problem naturally splits into two comparable groups you need to balance and query the boundary of — not just literal medians (e.g. IPO's 'affordable projects' vs 'not-yet-affordable projects').",
          ]}
          avoid={[
            "You only need the median once, on a static, unchanging dataset — sorting once (O(n log n)) or even a linear-time selection algorithm is simpler than maintaining two heaps.",
            "You need more than just the median — e.g. arbitrary percentiles or full order statistics on a dynamic set — a balanced BST / order-statistics tree generalizes better than two fixed heaps.",
            "The dataset is small enough that the constant-factor overhead of maintaining two heaps isn't worth it over a simple insertion-sorted list.",
          ]}
        />
      </TheorySection>

      <TheorySection title="Quiz">
        <Quiz moduleSlug={MODULE_SLUG} questions={QUIZ} />
      </TheorySection>

      <TheorySection title="Curated Problems">
        <ProblemList problems={problems["two-heaps"] as Problem[]} />
      </TheorySection>
    </div>
  );
}
