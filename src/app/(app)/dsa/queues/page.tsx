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
import QueueView from "@/components/visualizers/QueueView";
import { simpleQueueSteps, circularQueueSteps } from "@/lib/algorithms/queue";
import { QUEUE_CODE_SAMPLES } from "@/lib/codeSamples/queue";
import { useProgressStore } from "@/lib/store/progress";

const MODULE_SLUG = "queues";

type Mode = "simple" | "circular";

const MODE_LABELS: Record<Mode, string> = {
  simple: "Simple Queue",
  circular: "Circular Queue",
};

const QUIZ: QuizQuestion[] = [
  {
    question: "What does FIFO mean, and how does it differ from a stack's LIFO?",
    options: [
      "First In, First Out — the earliest-added item is removed first, the opposite order of a stack",
      "Same thing as LIFO, just a different name",
      "First In, Forever Out — items are never removed",
      "It means the queue is always sorted",
    ],
    correctIndex: 0,
    explanation:
      "A queue removes from the front (oldest first) while a stack removes from the top (newest first) — they're mirror images of each other.",
  },
  {
    question: "Why does a circular queue use `(index + 1) % capacity` instead of just `index + 1`?",
    options: [
      "It's a micro-optimization with no functional purpose",
      "To wrap the pointer back to slot 0 once it passes the last slot, reusing freed space without shifting elements",
      "Because arrays can't be indexed past their length otherwise",
      "To randomize which slot gets used next",
    ],
    correctIndex: 1,
    explanation:
      "Without the modulo, front/rear would just keep growing and you'd either run out of array space or need to shift every element after each dequeue. The wraparound lets a fixed-size buffer reuse the slots that dequeues freed at the front.",
  },
  {
    question: "In a circular queue, how do you distinguish a completely full buffer from a completely empty one if both can have front === rear?",
    options: [
      "You can't — it's ambiguous by design",
      "Track a separate `size` counter (or waste one slot) alongside front/rear",
      "Full buffers are always sorted in reverse",
      "Empty buffers set front to -1 permanently",
    ],
    correctIndex: 1,
    explanation:
      "front === rear happens both when the queue has one item left after wrapping and when it's totally empty. The standard fix is an explicit size field (or the classic 'leave one slot always empty' trick).",
  },
];

export default function QueuesPage() {
  const [mode, setMode] = useState<Mode>("simple");
  const [values, setValues] = useState<number[]>([4, 8, 15, 16, 23]);
  const [capacity, setCapacity] = useState(5);
  const setModuleProgress = useProgressStore((s) => s.setModuleProgress);

  useEffect(() => {
    setModuleProgress(MODULE_SLUG, { percent: 40 });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const steps = useMemo(() => {
    return mode === "simple" ? simpleQueueSteps(values) : circularQueueSteps(capacity, values);
  }, [mode, values, capacity]);

  const codeSamples = QUEUE_CODE_SAMPLES[mode];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[1fr_480px] gap-8 px-4 sm:px-6 py-8 max-w-[1400px] mx-auto">
      <div className="flex flex-col gap-10 min-w-0">
        <header>
          <div className="flex items-center gap-2 mb-2">
            <Badge variant="cyan">Data Structure</Badge>
            <Badge variant="neutral">Beginner</Badge>
          </div>
          <h1 className="text-2xl font-bold font-mono-data">Queues</h1>
          <p className="text-text-muted mt-2 text-sm max-w-xl">
            A FIFO (first-in, first-out) collection that adds at the rear and removes
            from the front. A circular queue reuses a fixed buffer by wrapping both
            pointers with modulo arithmetic instead of shifting elements.
          </p>
        </header>

        <TheorySection title="Intuition">
          <p>
            Picture a line at a checkout counter: people join at the back and get
            served from the front. Nobody cuts the line and nobody is served out of
            order — that&apos;s a queue.
          </p>
          <p>
            A naive array-backed queue has a problem: dequeuing from the front with{" "}
            <code className="font-mono-data text-cyan">shift()</code> is O(n), because
            every remaining element has to slide down one slot. A{" "}
            <strong>circular queue</strong> fixes this by allocating a fixed-size
            buffer and letting the front and rear pointers wrap back to index 0 once
            they pass the end — reusing the slots freed by earlier dequeues instead of
            shifting anything.
          </p>
        </TheorySection>

        <TheorySection title="Formal Definition">
          <p>
            A queue supports <code className="font-mono-data text-cyan">enqueue(value)</code>{" "}
            (insert at the rear) and{" "}
            <code className="font-mono-data text-cyan">dequeue()</code> (remove from the
            front). A circular queue additionally tracks a fixed{" "}
            <code className="font-mono-data text-cyan">capacity</code> and a{" "}
            <code className="font-mono-data text-cyan">size</code> counter, advancing{" "}
            <code className="font-mono-data text-cyan">front</code> and{" "}
            <code className="font-mono-data text-cyan">rear</code> with{" "}
            <code className="font-mono-data text-cyan">(index + 1) % capacity</code>.
          </p>
          <p>
            A <strong>priority queue</strong> is a related but distinct structure — instead
            of FIFO order, it always dequeues the highest (or lowest) priority element.
            It&apos;s typically implemented with a heap, which AlgoVerse covers as its own
            structure once that module ships — this page only covers the two ordering
            disciplines above.
          </p>
        </TheorySection>

        <TheorySection title="Complexity">
          <ComplexityTable
            rows={[
              { operation: "Enqueue", best: "O(1)", average: "O(1)", worst: "O(1)", space: "O(1)" },
              { operation: "Dequeue (circular)", best: "O(1)", average: "O(1)", worst: "O(1)", space: "O(1)" },
              { operation: "Dequeue (naive array shift)", best: "O(n)", average: "O(n)", worst: "O(n)", space: "O(1)" },
              { operation: "Peek front", best: "O(1)", average: "O(1)", worst: "O(1)", space: "O(1)" },
            ]}
          />
        </TheorySection>

        <TheorySection title="Common Pitfalls">
          <PitfallList
            items={[
              "Using array `.shift()` for dequeue in performance-sensitive code — it's O(n), not O(1).",
              "Forgetting the modulo when advancing front/rear in a circular queue — pointers walk off the end of the buffer.",
              "Confusing 'full' and 'empty' when front === rear — you need a size counter or to intentionally waste one slot to disambiguate.",
              "Assuming a priority queue is FIFO — it isn't; order is driven entirely by priority, not arrival time.",
            ]}
          />
        </TheorySection>

        <TheorySection title="When to Use vs Not">
          <WhenToUse
            use={[
              "Task scheduling, request buffering, breadth-first search frontiers.",
              "Producer/consumer pipelines where order of arrival must be preserved.",
              "A circular queue specifically when you have a known fixed capacity and want O(1) enqueue/dequeue with no shifting.",
            ]}
            avoid={[
              "You need LIFO order — use a stack instead.",
              "Items need to be processed by priority rather than arrival order — use a priority queue/heap.",
              "The buffer size is truly unbounded and unpredictable — a plain dynamic array or linked-list queue may fit better than a fixed circular buffer.",
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
            {(Object.keys(MODE_LABELS) as Mode[]).map((m) => (
              <Button
                key={m}
                size="sm"
                variant={mode === m ? "primary" : "secondary"}
                onClick={() => setMode(m)}
              >
                {MODE_LABELS[m]}
              </Button>
            ))}
          </div>
          <ArrayInput value={values} onApply={setValues} min={2} max={8} />
          {mode === "circular" && (
            <div className="mt-3 flex items-center gap-2">
              <label htmlFor="capacity" className="text-xs font-mono-data text-text-muted">
                Buffer capacity:
              </label>
              <input
                id="capacity"
                type="number"
                min={3}
                max={8}
                value={capacity}
                onChange={(e) =>
                  setCapacity(Math.min(8, Math.max(3, Number(e.target.value))))
                }
                className="w-20 glass rounded-lg px-2 py-1 text-sm font-mono-data outline-none"
              />
            </div>
          )}
        </GlassCard>

        {steps && (
          <VisualizerEngine
            key={`${mode}-${values.join(",")}-${capacity}`}
            steps={steps}
            codeSamples={codeSamples}
            onComplete={() => setModuleProgress(MODULE_SLUG, { percent: 80 })}
          >
            {(state) => <QueueView state={state} />}
          </VisualizerEngine>
        )}
      </div>
    </div>
  );
}
