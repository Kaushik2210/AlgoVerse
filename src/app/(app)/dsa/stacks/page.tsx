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
import StackView from "@/components/visualizers/StackView";
import {
  pushSteps,
  popSteps,
  peekSteps,
  balancedParensSteps,
} from "@/lib/algorithms/stack";
import { STACK_CODE_SAMPLES } from "@/lib/codeSamples/stack";
import { useProgressStore } from "@/lib/store/progress";

const MODULE_SLUG = "stacks";

type Op = "push" | "pop" | "peek" | "balanced";

const OP_LABELS: Record<Op, string> = {
  push: "Push",
  pop: "Pop",
  peek: "Peek",
  balanced: "Balanced Parens",
};

const QUIZ: QuizQuestion[] = [
  {
    question: "What does LIFO stand for, and what does it mean for a stack?",
    options: [
      "Last In, First Out — the most recently pushed item is popped first",
      "Least In, First Out — the smallest item is popped first",
      "Last In, Forever Out — items can never be removed",
      "It's unrelated to stacks",
    ],
    correctIndex: 0,
    explanation:
      "A stack only ever adds/removes from one end (the top), so whatever went in last is always the first thing to come back out.",
  },
  {
    question: "Why is a program's call stack a real-world example of a stack data structure?",
    options: [
      "Function calls are stored alphabetically",
      "Each function call is pushed on entry and popped on return — the most recently called function returns first",
      "It's actually a queue, not a stack",
      "Because it's implemented with a linked list",
    ],
    correctIndex: 1,
    explanation:
      "When function A calls B calls C, C finishes first and is popped first, then B, then A — exactly LIFO order, which is why deep recursion can overflow the call stack.",
  },
  {
    question: "What's the time complexity of push and pop on an array-backed stack?",
    options: ["O(n) for both", "O(1) amortized for both", "O(log n) for both", "O(1) push, O(n) pop"],
    correctIndex: 1,
    explanation:
      "Both operations only ever touch the end of the underlying array, so they're O(1) amortized (occasional resizing aside).",
  },
];

export default function StacksPage() {
  const [op, setOp] = useState<Op>("push");
  const [values, setValues] = useState<number[]>([4, 8, 15, 16]);
  const [pushValue, setPushValue] = useState(23);
  const [expr, setExpr] = useState("{[()]}(a+b)");
  const setModuleProgress = useProgressStore((s) => s.setModuleProgress);

  useEffect(() => {
    setModuleProgress(MODULE_SLUG, { percent: 40 });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const steps = useMemo(() => {
    switch (op) {
      case "push":
        return pushSteps(values, pushValue);
      case "pop":
        return popSteps(values);
      case "peek":
        return peekSteps(values);
      case "balanced":
        return balancedParensSteps(expr);
    }
  }, [op, values, pushValue, expr]);

  const codeSamples = STACK_CODE_SAMPLES[op];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[1fr_480px] gap-8 px-4 sm:px-6 py-8 max-w-[1400px] mx-auto">
      <div className="flex flex-col gap-10 min-w-0">
        <header>
          <div className="flex items-center gap-2 mb-2">
            <Badge variant="cyan">Data Structure</Badge>
            <Badge variant="neutral">Beginner</Badge>
          </div>
          <h1 className="text-2xl font-bold font-mono-data">Stacks</h1>
          <p className="text-text-muted mt-2 text-sm max-w-xl">
            A LIFO (last-in, first-out) collection that only ever grows or shrinks from
            one end — the top. Simple, but it quietly powers undo/redo, expression
            parsing, backtracking, and every function call your program makes.
          </p>
        </header>

        <TheorySection title="Intuition">
          <p>
            Think of a stack of plates: you can only add a plate to the top, and you can
            only take one off the top. You can&apos;t reach into the middle without
            removing everything above it first. That single constraint — access only at
            one end — is the entire definition of a stack.
          </p>
          <p>
            The clearest real example is the <strong>call stack</strong>: every function
            call gets pushed a &quot;frame&quot; when it starts, and popped when it
            returns. Deep, unbounded recursion pushes frames faster than they pop —
            that&apos;s a stack overflow.
          </p>
        </TheorySection>

        <TheorySection title="Formal Definition">
          <p>
            A stack is an abstract data type supporting three core operations:{" "}
            <code className="font-mono-data text-cyan">push(value)</code> — add to the
            top, <code className="font-mono-data text-cyan">pop()</code> — remove and
            return the top, and{" "}
            <code className="font-mono-data text-cyan">peek()</code> — read the top
            without removing it. It can be backed by a dynamic array (amortized O(1) at
            the end) or a linked list (O(1) at the head, no shifting either way).
          </p>
        </TheorySection>

        <TheorySection title="Complexity">
          <ComplexityTable
            rows={[
              { operation: "Push", best: "O(1)", average: "O(1)", worst: "O(1)*", space: "O(1)" },
              { operation: "Pop", best: "O(1)", average: "O(1)", worst: "O(1)", space: "O(1)" },
              { operation: "Peek", best: "O(1)", average: "O(1)", worst: "O(1)", space: "O(1)" },
              { operation: "Search", best: "O(1)", average: "O(n)", worst: "O(n)", space: "O(1)" },
            ]}
          />
          <p className="text-xs text-text-muted mt-2">
            * Array-backed push is O(1) amortized — an occasional resize copies the
            whole backing array.
          </p>
        </TheorySection>

        <TheorySection title="Common Pitfalls">
          <PitfallList
            items={[
              "Popping (or peeking) an empty stack without checking first — causes an underflow error or returns garbage.",
              "Using a plain array's `shift()`/`unshift()` by mistake — those operate on the front (O(n)), not the top.",
              "Forgetting a stack has no random access — you can't jump to the 3rd element without popping through everything above it.",
              "Unbounded recursion when an iterative-with-explicit-stack approach would avoid a call-stack overflow.",
            ]}
          />
        </TheorySection>

        <TheorySection title="When to Use vs Not">
          <WhenToUse
            use={[
              "Undo/redo history, browser back button, expression/bracket matching.",
              "Depth-first search and backtracking (explicit stack instead of recursion).",
              "Parsing — operator precedence, syntax trees, postfix evaluation.",
            ]}
            avoid={[
              "You need FIFO ordering (processing requests in arrival order) — use a queue.",
              "You need to access elements in the middle — a stack only exposes the top.",
              "You need priority-based ordering — use a priority queue/heap instead.",
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

          {op === "balanced" ? (
            <div className="flex flex-col gap-1.5">
              <label htmlFor="expr" className="text-xs font-mono-data text-text-muted">
                Expression to check:
              </label>
              <input
                id="expr"
                value={expr}
                onChange={(e) => setExpr(e.target.value)}
                className="glass rounded-lg px-3 py-2 text-sm font-mono-data outline-none focus:border-cyan/50"
                placeholder="e.g. {[()]}(a+b)"
              />
            </div>
          ) : (
            <>
              <ArrayInput value={values} onApply={setValues} min={0} max={8} />
              {op === "push" && (
                <div className="mt-3 flex items-center gap-2">
                  <label htmlFor="pushValue" className="text-xs font-mono-data text-text-muted">
                    Value to push:
                  </label>
                  <input
                    id="pushValue"
                    type="number"
                    value={pushValue}
                    onChange={(e) => setPushValue(Number(e.target.value))}
                    className="w-20 glass rounded-lg px-2 py-1 text-sm font-mono-data outline-none"
                  />
                </div>
              )}
            </>
          )}
        </GlassCard>

        {steps && (
          <VisualizerEngine
            key={`${op}-${values.join(",")}-${pushValue}-${expr}`}
            steps={steps}
            codeSamples={codeSamples}
            onComplete={() => setModuleProgress(MODULE_SLUG, { percent: 80 })}
          >
            {(state) => <StackView state={state} />}
          </VisualizerEngine>
        )}
      </div>
    </div>
  );
}
