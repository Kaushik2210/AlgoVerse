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
import { topKSteps } from "@/lib/algorithms/patterns";
import { PATTERN_CODE_SAMPLES } from "@/lib/codeSamples/patterns";
import { useProgressStore } from "@/lib/store/progress";
import problems from "@/data/problems.json";

const MODULE_SLUG = "top-k-elements";
const DEMO_STREAM = [4, 1, 9, 3, 7, 2, 8, 5];
const K = 3;

const QUIZ: QuizQuestion[] = [
  {
    question: "To find the K largest values in a stream, why does the pattern use a MIN-heap rather than a max-heap?",
    options: [
      "A max-heap would give the wrong answer entirely",
      "The smallest of the current top-K candidates needs to sit at the root so it can be compared against (and evicted by) each new incoming value in O(log k) — a max-heap would put the largest value at the root, which is the one value you never want to evict",
      "Min-heaps are always faster to build than max-heaps",
      "It's an arbitrary implementation choice with no real reason",
    ],
    correctIndex: 1,
    explanation:
      "The heap holds your current 'top K so far'. To decide whether a new value belongs in that set, you need instant access to the weakest member of the set — the smallest one. A min-heap puts exactly that value at the root, so the eviction check is a single O(1) comparison against heap[0].",
  },
  {
    question: "Why is maintaining a size-k heap over a stream of n elements O(n log k), and how is that better than sorting?",
    options: [
      "It's identical to sorting, just written differently",
      "Each of the n elements does at most O(log k) work (a possible heap push/pop of size k), versus a full sort's O(n log n) — when k is much smaller than n, O(n log k) is a real improvement",
      "O(n log k) is always slower than O(n log n)",
      "The heap approach doesn't actually bound memory",
    ],
    correctIndex: 1,
    explanation:
      "Sorting the entire input costs O(n log n) regardless of k. A size-k heap only ever holds k elements, so each push/pop is O(log k) — for k << n (e.g. finding the top 10 out of a million), that's a substantial improvement, and it also avoids holding the whole input in memory.",
  },
  {
    question: "A new value arrives that's smaller than every element currently in the size-k min-heap. What should happen?",
    options: [
      "It replaces the root immediately",
      "It gets discarded without touching the heap — it can't possibly belong in the top K since everything already in the heap is larger",
      "The heap is rebuilt from scratch",
      "It's inserted and the heap grows to size k+1",
    ],
    correctIndex: 1,
    explanation:
      "If a new value is smaller than the heap's root (the current smallest of the top-K), it's smaller than every element in the top-K — so it cannot possibly be one of the K largest values seen. It's simply skipped, no heap operation needed.",
  },
  {
    question:
      "\"Given a huge unsorted log file (too large to fit in memory) of response times, find the 100 slowest requests.\" Why is top-K the right pattern here specifically?",
    options: [
      "Because logs are always sorted by time",
      "A size-100 min-heap only ever holds 100 elements in memory regardless of how large the log file is, letting you stream through the data once without ever holding the whole file — a full sort would require materializing and sorting the entire dataset",
      "Because binary search can find the 100 slowest directly",
      "This actually calls for a monotonic stack, not top-K",
    ],
    correctIndex: 1,
    explanation:
      "The 'too large to fit in memory' constraint is the tell: a size-K heap has a fixed, small memory footprint no matter how big the stream is, and processes it in a single pass — exactly the scenario top-K is built for, versus sorting the entire dataset which needs it all in memory (or an external sort).",
  },
];

export default function TopKElementsPage() {
  const setModuleProgress = useProgressStore((s) => s.setModuleProgress);
  const completeModule = useProgressStore((s) => s.completeModule);

  useEffect(() => {
    setModuleProgress(MODULE_SLUG, { percent: 50 });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const steps = useMemo(() => topKSteps(DEMO_STREAM, K), []);

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 flex flex-col gap-10">
      <header>
        <div className="flex items-center gap-2 mb-2">
          <Badge variant="violet">Pattern</Badge>
          <Badge variant="neutral">Heaps</Badge>
        </div>
        <h1 className="text-2xl font-bold font-mono-data">Top K Elements</h1>
        <p className="text-text-muted mt-2 text-sm max-w-xl">
          Keep a heap sized exactly to K instead of sorting everything — scan
          once, and let the heap silently discard anything that can&apos;t
          possibly be in the top K. O(n log k) instead of O(n log n).
        </p>
      </header>

      <TheorySection title="Recognition Signals">
        <PitfallList
          items={[
            "The problem asks for the 'top K', 'K largest', 'K most frequent', or 'K closest' elements — not a full sort.",
            "A brute-force solution sorts the entire input — O(n log n) — when you only actually need K of the n results.",
            "The input might be a stream (unbounded or arriving over time) where you can't hold everything in memory to sort it.",
            "You need the Kth largest/smallest value specifically, not the full ranked list.",
          ]}
        />
      </TheorySection>

      <TheorySection title="Visual Blueprint">
        <p>
          Below: finding the top {K} largest values in a stream of 8 numbers.
          A <strong>min-heap of size {K}</strong> holds the current best-K
          candidates. Every new value either fills an empty heap slot, bumps
          out the current smallest of the top-{K} (if it&apos;s larger than the
          heap&apos;s root), or gets discarded outright (if it&apos;s smaller than
          everything already in the top {K}).
        </p>
        <p>
          Counter-intuitively, finding the K <em>largest</em> values uses a{" "}
          <em>min</em>-heap — the smallest of the current top-K sits at the
          root, ready to be evicted the instant something bigger shows up.
        </p>
      </TheorySection>

      <VisualizerEngine
        steps={steps}
        codeSamples={PATTERN_CODE_SAMPLES.topK}
        onComplete={() => completeModule(MODULE_SLUG)}
      >
        {(state) => (
          <div className="w-full flex flex-col gap-4">
            <div>
              <p className="text-[10px] font-mono-data uppercase tracking-wide text-text-muted mb-1">
                Stream
              </p>
              <div className="flex flex-wrap gap-1.5">
                {state.stream.map((v, i) => (
                  <span
                    key={i}
                    className={
                      "w-9 h-9 rounded-lg border-2 flex items-center justify-center font-mono-data text-xs font-semibold " +
                      (i === state.streamIndex
                        ? "bg-amber/20 border-amber text-amber"
                        : i < (state.streamIndex ?? -1)
                          ? "bg-white/5 border-glass-border-token text-text-muted"
                          : "bg-white/5 border-glass-border-token/50 text-text-muted/50")
                    }
                  >
                    {v}
                  </span>
                ))}
              </div>
            </div>
            <div className="border-t border-glass-border-token pt-2">
              <p className="text-[10px] font-mono-data uppercase tracking-wide text-text-muted mb-1">
                Min-heap of size {K} (top-{K} candidates)
              </p>
              <HeapView state={state.heap} />
            </div>
          </div>
        )}
      </VisualizerEngine>

      <TheorySection title="Annotated Code Template">
        <GlassCard>
          <pre className="font-mono-data text-xs leading-relaxed whitespace-pre-wrap">
{`function topKTemplate(stream, k) {
  const heap = []; // size-k min-heap

  for (const value of stream) {
    if (heap.length < k) {
      // 1. Heap isn't full yet — just add it
      heapPush(heap, value);
    } else if (value > heap[0]) {
      // 2. Bigger than the current smallest of the top-k
      //    => it belongs, evict the root and heapify
      heap[0] = value;
      heapifyDown(heap);
    }
    // 3. Otherwise: value can't be in the top k, discard it
  }

  return heap; // the k largest values seen
}`}
          </pre>
        </GlassCard>
      </TheorySection>

      <TheorySection title="Complexity">
        <ComplexityTable
          rows={[
            {
              operation: "Maintain size-k heap over n elements",
              best: "O(n)",
              average: "O(n log k)",
              worst: "O(n log k)",
              space: "O(k)",
            },
            {
              operation: "Kth largest via full sort (naive baseline)",
              best: "O(n log n)",
              average: "O(n log n)",
              worst: "O(n log n)",
              space: "O(n)",
            },
          ]}
        />
        <p className="text-xs text-text-muted">
          The best case (O(n)) happens when almost every incoming value is smaller than
          the heap&apos;s root and gets discarded in O(1) without a heap operation.
        </p>
      </TheorySection>

      <TheorySection title="When to Use vs Not">
        <WhenToUse
          use={[
            "The problem asks for the 'top K', 'K largest/smallest', 'K most frequent', or 'K closest' elements — not a full ranked list.",
            "The input might be a stream (unbounded, or arriving over time) where holding everything in memory to sort isn't an option.",
            "You need the Kth largest/smallest value specifically, and K is much smaller than n.",
          ]}
          avoid={[
            "You need the full sorted order of every element, not just the top K — at that point a full sort is simpler and no more expensive asymptotically.",
            "K is close to n — a size-k heap's advantage over sorting shrinks as k approaches n, since O(n log k) approaches O(n log n) anyway.",
            "You need exact rank statistics across a dynamic, frequently-updated dataset — a balanced BST or order-statistics structure may serve repeated queries better than rebuilding a heap.",
          ]}
        />
      </TheorySection>

      <TheorySection title="Quiz">
        <Quiz moduleSlug={MODULE_SLUG} questions={QUIZ} />
      </TheorySection>

      <TheorySection title="Curated Problems">
        <ProblemList problems={problems["top-k-elements"] as Problem[]} />
      </TheorySection>
    </div>
  );
}
