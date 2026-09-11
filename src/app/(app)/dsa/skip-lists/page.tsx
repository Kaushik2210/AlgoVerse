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
import SkipListView from "@/components/visualizers/SkipListView";
import { buildSteps, searchSteps, insertSteps } from "@/lib/algorithms/skipList";
import { SKIP_LIST_CODE_SAMPLES } from "@/lib/codeSamples/skipList";
import { useProgressStore } from "@/lib/store/progress";

const MODULE_SLUG = "skip-lists";

type Op = "build" | "search" | "insert";

const OP_LABELS: Record<Op, string> = {
  build: "Build",
  search: "Search",
  insert: "Insert",
};

const QUIZ: QuizQuestion[] = [
  {
    question: "What determines how many levels a skip list node appears in?",
    options: [
      "Its value — larger values get more levels",
      "A random process (coin flips), giving an expected geometric distribution of heights",
      "Its insertion order — the first node always gets the most levels",
      "The total number of nodes in the list",
    ],
    correctIndex: 1,
    explanation:
      "Each node's height is chosen randomly (keep flipping while the coin says 'go up' and you haven't hit the level cap) — no rebalancing needed, unlike AVL/red-black trees.",
  },
  {
    question: "During a search, when do you drop down a level instead of moving right?",
    options: [
      "Every single step",
      "When the next node at the current level would overshoot the target (or there is no next node)",
      "Only at the very first level",
      "Never — you always finish scanning a level before dropping",
    ],
    correctIndex: 1,
    explanation:
      "You move right as long as the next node's value is still less than the target. The moment it isn't, you drop down a level and keep going from the same horizontal position.",
  },
  {
    question: "What is the expected time complexity of search in a skip list?",
    options: ["O(1)", "O(log n)", "O(n)", "O(n log n)"],
    correctIndex: 1,
    explanation:
      "With geometrically decreasing level populations, expected search time is O(log n) — comparable to a balanced BST, without any rotation logic.",
  },
  {
    question: "Why does the bottom level (level 0) always contain every node?",
    options: [
      "It doesn't — only inserted-first nodes are guaranteed there",
      "It's the full backing list — every higher level is just a sparser 'express lane' shortcut over it",
      "It's a coincidence of the random height function",
      "Level 0 is rebuilt from scratch on every insert",
    ],
    correctIndex: 1,
    explanation:
      "Level 0 is the complete sorted linked list. Every level above it skips over some nodes, letting search cover large distances quickly before dropping down for precision.",
  },
];

export default function SkipListsPage() {
  const [op, setOp] = useState<Op>("build");
  const [values, setValues] = useState<number[]>([3, 6, 7, 9, 12, 17, 19, 21, 25, 26]);
  const [searchTarget, setSearchTarget] = useState(19);
  const [insertValue, setInsertValue] = useState(15);
  const setModuleProgress = useProgressStore((s) => s.setModuleProgress);

  useEffect(() => {
    setModuleProgress(MODULE_SLUG, { percent: 40 });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const steps = useMemo(() => {
    switch (op) {
      case "build":
        return buildSteps(values);
      case "search":
        return searchSteps(values, searchTarget);
      case "insert":
        return insertSteps(values, insertValue);
    }
  }, [op, values, searchTarget, insertValue]);

  const codeSamples = SKIP_LIST_CODE_SAMPLES[op];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[1fr_480px] gap-8 px-4 sm:px-6 py-8 max-w-[1400px] mx-auto">
      <div className="flex flex-col gap-10 min-w-0">
        <header>
          <div className="flex items-center gap-2 mb-2">
            <Badge variant="cyan">Data Structure</Badge>
            <Badge variant="neutral">Advanced</Badge>
          </div>
          <h1 className="text-2xl font-bold font-mono-data">Skip Lists</h1>
          <p className="text-text-muted mt-2 text-sm max-w-xl">
            A probabilistic, layered linked list — express lanes of increasingly
            sparse shortcuts sitting on top of a fully sorted bottom level — that
            gets balanced-tree-like O(log n) search without any rotations.
          </p>
        </header>

        <TheorySection title="Intuition">
          <p>
            A plain sorted linked list has O(1) insertion at a known spot but
            O(n) search — you have to walk one node at a time. A skip list fixes
            this by giving some nodes extra &quot;express lane&quot; links that
            skip over several nodes at once, the way an express train skips
            local stops.
          </p>
          <p>
            Which nodes get express lanes — and how many — is decided randomly
            at insertion time: flip a coin, and as long as it comes up heads,
            add the node to one more level (capped at some maximum). This gives
            roughly half as many nodes at each level up, so search starts at the
            sparsest top level, moves right until it would overshoot, drops
            down a level, and repeats — a zigzag path that visits O(log n)
            nodes on average.
          </p>
        </TheorySection>

        <TheorySection title="Formal Definition">
          <p>
            A skip list with <code className="font-mono-data text-cyan">L</code> levels
            maintains <code className="font-mono-data text-cyan">L</code> sorted linked
            lists, where level 0 contains every node and each level{" "}
            <code className="font-mono-data text-cyan">l + 1</code> is a subsequence of
            level <code className="font-mono-data text-cyan">l</code>. A node&apos;s height{" "}
            <code className="font-mono-data text-cyan">h</code> (how many levels it appears
            in, starting from level 0) is drawn from a geometric distribution —
            typically <code className="font-mono-data text-cyan">P(height ≥ k) = p^(k-1)</code>{" "}
            for some fixed probability <code className="font-mono-data text-cyan">p</code>{" "}
            (commonly 0.5).
          </p>
          <p>
            Search starts at the head of the top level and, at each level,
            repeatedly advances while the next node&apos;s value is still less
            than the target, then drops to the next level down at the same
            horizontal position — until level 0, where the next node is either
            the target or proof it isn&apos;t present.
          </p>
        </TheorySection>

        <TheorySection title="Complexity">
          <ComplexityTable
            rows={[
              { operation: "Search", best: "O(1)", average: "O(log n)", worst: "O(n)", space: "O(1)" },
              { operation: "Insert", best: "O(1)", average: "O(log n)", worst: "O(n)", space: "O(1)" },
              { operation: "Delete", best: "O(1)", average: "O(log n)", worst: "O(n)", space: "O(1)" },
              { operation: "Overall structure", best: "-", average: "-", worst: "-", space: "O(n)" },
            ]}
          />
          <p className="text-xs text-text-muted">
            Worst case is O(n) if the coin flips happen to produce a degenerate
            (mostly flat) structure — astronomically unlikely in practice, which
            is why skip lists are treated as O(log n) expected-case structures.
          </p>
        </TheorySection>

        <TheorySection title="Common Pitfalls">
          <PitfallList
            items={[
              "Forgetting that dropping down keeps the current node — you don't restart the search from the head at each level.",
              "Not capping the maximum level — an unbounded height means an unbounded (if unlikely) worst case and wasted memory for tiny lists.",
              "Assuming the structure is deterministic — two skip lists over the same values can look completely different depending on the random heights drawn.",
              "Comparing skip lists to hash tables for exact-match-only lookups — skip lists' real advantage is that they stay sorted, enabling range queries a hash table can't do.",
            ]}
          />
        </TheorySection>

        <TheorySection title="When to Use vs Not">
          <WhenToUse
            use={[
              "You want balanced-tree-like O(log n) search/insert/delete but a simpler implementation with no rotation logic.",
              "You need the data to stay sorted for range queries (e.g. 'all values between X and Y'), unlike a hash table.",
              "Concurrent access matters — skip lists are easier to make lock-free than balanced BSTs (this is how Redis's sorted sets and Java's ConcurrentSkipListMap work).",
            ]}
            avoid={[
              "You only need exact-match lookups with no ordering requirement — a hash table gives O(1) average instead of O(log n).",
              "Worst-case guarantees matter more than expected-case performance — an AVL or red-black tree bounds every operation at O(log n), always.",
              "Memory overhead is a hard constraint — express-lane pointers add real overhead per node beyond the base linked list.",
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
          {op === "search" && (
            <div className="mt-3 flex items-center gap-2 flex-wrap">
              <label className="text-xs font-mono-data text-text-muted">Target:</label>
              <input
                type="number"
                value={searchTarget}
                onChange={(e) => setSearchTarget(Number(e.target.value))}
                className="w-16 glass rounded-lg px-2 py-1 text-sm font-mono-data outline-none"
              />
            </div>
          )}
          {op === "insert" && (
            <div className="mt-3 flex items-center gap-2 flex-wrap">
              <label className="text-xs font-mono-data text-text-muted">Value to insert:</label>
              <input
                type="number"
                value={insertValue}
                onChange={(e) => setInsertValue(Number(e.target.value))}
                className="w-16 glass rounded-lg px-2 py-1 text-sm font-mono-data outline-none"
              />
            </div>
          )}
        </GlassCard>

        {steps && (
          <VisualizerEngine
            key={`${op}-${values.join(",")}-${searchTarget}-${insertValue}`}
            steps={steps}
            codeSamples={codeSamples}
            onComplete={() => setModuleProgress(MODULE_SLUG, { percent: 80 })}
          >
            {(state) => <SkipListView state={state} />}
          </VisualizerEngine>
        )}
      </div>
    </div>
  );
}
