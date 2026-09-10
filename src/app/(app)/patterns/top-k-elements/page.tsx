"use client";

import { useEffect, useMemo } from "react";
import Badge from "@/components/ui/Badge";
import GlassCard from "@/components/ui/GlassCard";
import { TheorySection, PitfallList } from "@/components/ui/TheorySection";
import ProblemList, { type Problem } from "@/components/ui/ProblemList";
import VisualizerEngine from "@/components/visualizers/VisualizerEngine";
import HeapView from "@/components/visualizers/HeapView";
import { topKSteps, PATTERN_CODE } from "@/lib/algorithms/patterns";
import { useProgressStore } from "@/lib/store/progress";
import problems from "@/data/problems.json";

const MODULE_SLUG = "top-k-elements";
const DEMO_STREAM = [4, 1, 9, 3, 7, 2, 8, 5];
const K = 3;

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
        code={PATTERN_CODE.topK}
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

      <TheorySection title="Curated Problems">
        <ProblemList problems={problems["top-k-elements"] as Problem[]} />
      </TheorySection>
    </div>
  );
}
