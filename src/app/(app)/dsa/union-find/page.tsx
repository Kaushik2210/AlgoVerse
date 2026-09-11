"use client";

import { useEffect, useMemo, useState } from "react";
import GlassCard from "@/components/ui/GlassCard";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import ComplexityTable from "@/components/ui/ComplexityTable";
import { TheorySection, PitfallList, WhenToUse } from "@/components/ui/TheorySection";
import Quiz, { type QuizQuestion } from "@/components/ui/Quiz";
import VisualizerEngine from "@/components/visualizers/VisualizerEngine";
import UnionFindView from "@/components/visualizers/UnionFindView";
import {
  unionManySteps,
  findPathCompressionSteps,
  buildChainDemo,
  DSU_LABELS,
} from "@/lib/algorithms/unionFind";
import { UNION_FIND_CODE_SAMPLES } from "@/lib/codeSamples/unionFind";
import { useProgressStore } from "@/lib/store/progress";

const MODULE_SLUG = "union-find";

type Op = "union" | "find";

const OP_LABELS: Record<Op, string> = {
  union: "Union (by rank)",
  find: "Find (path compression)",
};

const DEFAULT_PAIRS = "A-B, C-D, E-F, B-D";

const QUIZ: QuizQuestion[] = [
  {
    question: "What does union-by-rank do when merging two trees of different rank?",
    options: [
      "Always attaches the root with the smaller label as a child",
      "Attaches the lower-rank tree's root under the higher-rank tree's root",
      "Merges the two arrays and re-sorts them",
      "Picks a random root to be the new parent",
    ],
    correctIndex: 1,
    explanation:
      "Attaching the shorter tree under the taller one keeps the combined tree's height from growing unnecessarily — the height only increases when two trees of equal rank merge.",
  },
  {
    question: "What does path compression do during find()?",
    options: [
      "Deletes nodes that are no longer needed",
      "Sorts the elements along the path from a node to its root",
      "Rewires every node visited on the way to the root so it points directly at the root",
      "Merges the found node's set with another set",
    ],
    correctIndex: 2,
    explanation:
      "Path compression is a pure optimization: it doesn't change which set anything belongs to, it just flattens the tree so future find() calls on those same nodes are O(1) instead of re-walking the same chain.",
  },
  {
    question: "Combined, what amortized time complexity do union-by-rank and path compression give find()/union()?",
    options: [
      "O(log n)",
      "O(n)",
      "O(α(n)) — inverse Ackermann, effectively constant",
      "O(1) worst case, always",
    ],
    correctIndex: 2,
    explanation:
      "Neither optimization alone gets you there, but together they bound the amortized cost per operation by the inverse Ackermann function α(n), which is so slow-growing it's under 5 for any n you'd ever encounter in practice — for all intents and purposes, constant time.",
  },
  {
    question: "Why is union-find the standard tool for Kruskal's MST algorithm and cycle detection in undirected graphs?",
    options: [
      "It's the only structure that can represent a graph",
      "It answers 'are these two nodes already connected?' in near-constant time as edges are added one by one",
      "It automatically finds the shortest path between any two nodes",
      "It sorts edges by weight for you",
    ],
    correctIndex: 1,
    explanation:
      "Both problems boil down to repeatedly asking 'would adding this edge connect two nodes that are already in the same component?' — exactly the find() + union() loop union-find is built for.",
  },
];

function parsePairs(text: string, labels: string[]): [number, number][] {
  const idx = new Map(labels.map((l, i) => [l.toUpperCase(), i]));
  return text
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean)
    .map((pair) => {
      const [a, b] = pair.split("-").map((s) => s.trim().toUpperCase());
      return [idx.get(a), idx.get(b)] as [number | undefined, number | undefined];
    })
    .filter((p): p is [number, number] => p[0] !== undefined && p[1] !== undefined);
}

export default function UnionFindPage() {
  const [op, setOp] = useState<Op>("union");
  const [pairsText, setPairsText] = useState(DEFAULT_PAIRS);
  const [findTarget, setFindTarget] = useState("A");
  const setModuleProgress = useProgressStore((s) => s.setModuleProgress);

  useEffect(() => {
    setModuleProgress(MODULE_SLUG, { percent: 40 });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const pairs = useMemo(() => parsePairs(pairsText, DSU_LABELS), [pairsText]);
  const chainParent = useMemo(() => buildChainDemo(DSU_LABELS), []);

  const steps = useMemo(() => {
    if (op === "union") {
      if (pairs.length === 0) return undefined;
      return unionManySteps(DSU_LABELS, pairs);
    }
    const targetIdx = DSU_LABELS.indexOf(findTarget);
    return findPathCompressionSteps(DSU_LABELS, chainParent, targetIdx);
  }, [op, pairs, chainParent, findTarget]);

  const codeSamples = UNION_FIND_CODE_SAMPLES[op];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[1fr_480px] gap-8 px-4 sm:px-6 py-8 max-w-[1400px] mx-auto">
      <div className="flex flex-col gap-10 min-w-0">
        <header>
          <div className="flex items-center gap-2 mb-2">
            <Badge variant="cyan">Data Structure</Badge>
            <Badge variant="neutral">Intermediate</Badge>
          </div>
          <h1 className="text-2xl font-bold font-mono-data">Union-Find (Disjoint Set)</h1>
          <p className="text-text-muted mt-2 text-sm max-w-xl">
            A forest of trees that answers one question fast: &quot;are these two
            elements in the same group?&quot; Two small optimizations — union by
            rank and path compression — turn a naive O(n) per operation into
            effectively O(1).
          </p>
        </header>

        <TheorySection title="Intuition">
          <p>
            Imagine every element starts in its own club, and the only club
            rule you care about is &quot;who&apos;s ultimately in charge of my
            club?&quot; — that&apos;s the club&apos;s <strong>root</strong>.{" "}
            <code className="font-mono-data text-cyan">union(a, b)</code>{" "}
            merges a&apos;s club and b&apos;s club into one by making one
            root report to the other. <code className="font-mono-data text-cyan">find(x)</code>{" "}
            walks up from x through parent pointers until it hits a root.
          </p>
          <p>
            Left alone, repeated unions can build long, spindly chains — find()
            degrades toward O(n). Two cheap tricks fix this: always attach the
            <strong> smaller</strong> tree under the <strong>bigger</strong> one
            (union by rank), and while you&apos;re walking a chain during
            find(), rewire every node you pass straight to the root (path
            compression) so the next lookup is instant.
          </p>
        </TheorySection>

        <TheorySection title="Formal Definition">
          <p>
            A disjoint-set (union-find) structure maintains a partition of{" "}
            <code className="font-mono-data text-cyan">n</code> elements into
            disjoint sets, represented as a forest — each set is a tree, and{" "}
            <code className="font-mono-data text-cyan">parent[i]</code>{" "}
            points at i&apos;s parent (a root satisfies{" "}
            <code className="font-mono-data text-cyan">parent[i] === i</code>).
            <code className="font-mono-data text-cyan"> rank[i]</code> is an
            upper bound on i&apos;s subtree height, used only to decide which
            root wins a union.
          </p>
          <p>
            <strong>find(x)</strong> returns x&apos;s root, optionally
            compressing the path. <strong>union(a, b)</strong> finds both
            roots and, if different, attaches the lower-rank root under the
            higher-rank one (breaking ties by rank, then bumping the winner&apos;s
            rank).
          </p>
        </TheorySection>

        <TheorySection title="Complexity">
          <ComplexityTable
            rows={[
              { operation: "find() — no optimizations", best: "O(1)", average: "O(log n)", worst: "O(n)", space: "O(1)" },
              { operation: "find() — path compression only", best: "O(1)", average: "O(log n)", worst: "O(log n)", space: "O(1)" },
              { operation: "union() / find() — both optimizations", best: "O(α(n))", average: "O(α(n))", worst: "O(α(n))", space: "O(1)" },
              { operation: "Build n singletons", best: "O(n)", average: "O(n)", worst: "O(n)", space: "O(n)" },
            ]}
          />
          <p className="text-xs text-text-muted">
            α(n) is the inverse Ackermann function — it grows so slowly that
            it&apos;s effectively a constant (≤ 4) for any n that could ever
            fit in memory.
          </p>
        </TheorySection>

        <TheorySection title="Common Pitfalls">
          <PitfallList
            items={[
              "Implementing find() without path compression and union() without rank/size — correct, but degrades to O(n) chains on adversarial input.",
              "Forgetting that path compression changes parent pointers but never changes which set an element belongs to — it's purely an optimization.",
              "Comparing roots with '==' when using object references instead of indices — always compare via find(), not by identity of the original nodes.",
              "Re-deriving rank/size incorrectly after compression — rank should only ever be touched by union(), never adjusted during find()'s compression.",
            ]}
          />
        </TheorySection>

        <TheorySection title="When to Use vs Not">
          <WhenToUse
            use={[
              "You need fast 'are these connected?' queries as edges/unions arrive incrementally — cycle detection, Kruskal's MST.",
              "You're grouping elements into components (friend circles, connected components, account merging).",
              "You don't need to split sets apart — union-find only merges, it can't undo a union.",
            ]}
            avoid={[
              "You need to enumerate all members of a set efficiently — a plain adjacency list or hash-map-of-sets is more direct for that.",
              "You need to remove elements from a set or split sets apart — union-find has no delete/split operation.",
              "You need full graph traversal information (paths, distances) — union-find only tracks connectivity, not structure.",
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

          {op === "union" ? (
            <div className="flex flex-col gap-1.5">
              <label htmlFor="pairs" className="text-xs font-mono-data text-text-muted">
                Union pairs (comma separated, e.g. A-B, C-D):
              </label>
              <input
                id="pairs"
                value={pairsText}
                onChange={(e) => setPairsText(e.target.value)}
                className="glass rounded-lg px-3 py-2 text-sm font-mono-data outline-none focus:border-cyan/50"
                placeholder="e.g. A-B, C-D, E-F"
              />
              <p className="text-[11px] font-mono-data text-text-muted mt-1">
                Elements: {DSU_LABELS.join(", ")}
              </p>
            </div>
          ) : (
            <div className="flex flex-col gap-2">
              <p className="text-[11px] font-mono-data text-text-muted">
                Fixed demo chain: A → B → C → D → E → F (F is the root) —
                deliberately long so path compression has something to
                flatten.
              </p>
              <div className="flex items-center gap-2">
                <label htmlFor="target" className="text-xs font-mono-data text-text-muted">
                  find() on:
                </label>
                <select
                  id="target"
                  value={findTarget}
                  onChange={(e) => setFindTarget(e.target.value)}
                  className="glass rounded-lg px-2 py-1 text-sm font-mono-data outline-none"
                >
                  {DSU_LABELS.map((l) => (
                    <option key={l} value={l}>
                      {l}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          )}
        </GlassCard>

        {steps && (
          <VisualizerEngine
            key={`${op}-${pairsText}-${findTarget}`}
            steps={steps}
            codeSamples={codeSamples}
            onComplete={() => setModuleProgress(MODULE_SLUG, { percent: 80 })}
          >
            {(state) => <UnionFindView state={state} />}
          </VisualizerEngine>
        )}
      </div>
    </div>
  );
}
