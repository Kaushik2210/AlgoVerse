"use client";

import { useEffect, useMemo, useState } from "react";
import GlassCard from "@/components/ui/GlassCard";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import ComplexityTable from "@/components/ui/ComplexityTable";
import { TheorySection, PitfallList, WhenToUse } from "@/components/ui/TheorySection";
import Quiz, { type QuizQuestion } from "@/components/ui/Quiz";
import VisualizerEngine from "@/components/visualizers/VisualizerEngine";
import GraphView from "@/components/visualizers/GraphView";
import {
  bfsSteps,
  dfsSteps,
  buildAdjacency,
  DEMO_NODES,
  DEMO_EDGES,
} from "@/lib/algorithms/graph";
import { GRAPH_CODE_SAMPLES } from "@/lib/codeSamples/graph";
import { useProgressStore } from "@/lib/store/progress";

const MODULE_SLUG = "graphs";

type Op = "bfs" | "dfs";

const OP_LABELS: Record<Op, string> = {
  bfs: "BFS",
  dfs: "DFS",
};

const QUIZ: QuizQuestion[] = [
  {
    question: "What data structure drives a breadth-first traversal's frontier?",
    options: ["A stack (LIFO)", "A queue (FIFO)", "A priority queue", "A hash set"],
    correctIndex: 1,
    explanation:
      "BFS processes nodes in the order they were discovered — first in, first out — which is exactly what a queue gives you. That's what produces the level-by-level expansion.",
  },
  {
    question: "What data structure drives a depth-first traversal's frontier?",
    options: ["A queue (FIFO)", "A stack (LIFO)", "A linked list", "A min-heap"],
    correctIndex: 1,
    explanation:
      "DFS always continues from the most recently discovered node — last in, first out — which is a stack. Recursive DFS uses the call stack implicitly for the same effect.",
  },
  {
    question: "In an unweighted graph, what does BFS guarantee about the path it finds to any node?",
    options: [
      "It's the lexicographically smallest path",
      "It's the shortest path in number of edges",
      "It visits every node exactly once, in alphabetical order",
      "Nothing — BFS doesn't guarantee shortest paths",
    ],
    correctIndex: 1,
    explanation:
      "Because BFS expands level by level, the first time it reaches any node is guaranteed to be via the fewest possible edges — the shortest path in an unweighted graph.",
  },
  {
    question: "Why does the adjacency list representation matter for graph traversal performance?",
    options: [
      "It doesn't — adjacency matrices are always faster",
      "It lets you enumerate a node's neighbors in O(degree) instead of O(V)",
      "It's required for BFS but not DFS",
      "It only matters for weighted graphs",
    ],
    correctIndex: 1,
    explanation:
      "An adjacency list stores only the edges that actually exist, so visiting a node's neighbors costs O(degree) rather than scanning an entire row of an O(V) adjacency matrix — this is what makes BFS/DFS run in O(V + E) overall.",
  },
];

export default function GraphsPage() {
  const [op, setOp] = useState<Op>("bfs");
  const [start, setStart] = useState("A");
  const setModuleProgress = useProgressStore((s) => s.setModuleProgress);

  useEffect(() => {
    setModuleProgress(MODULE_SLUG, { percent: 40 });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const adjacency = useMemo(() => buildAdjacency(DEMO_NODES, DEMO_EDGES), []);

  const steps = useMemo(() => {
    switch (op) {
      case "bfs":
        return bfsSteps(DEMO_NODES, DEMO_EDGES, start);
      case "dfs":
        return dfsSteps(DEMO_NODES, DEMO_EDGES, start);
    }
  }, [op, start]);

  const codeSamples = GRAPH_CODE_SAMPLES[op];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[1fr_480px] gap-8 px-4 sm:px-6 py-8 max-w-[1400px] mx-auto">
      <div className="flex flex-col gap-10 min-w-0">
        <header>
          <div className="flex items-center gap-2 mb-2">
            <Badge variant="cyan">Data Structure</Badge>
            <Badge variant="neutral">Intermediate</Badge>
          </div>
          <h1 className="text-2xl font-bold font-mono-data">Graphs</h1>
          <p className="text-text-muted mt-2 text-sm max-w-xl">
            A set of nodes connected by edges — the most general structure in this
            catalog. This module covers the adjacency list representation plus the
            two foundational traversals, breadth-first and depth-first search.
          </p>
        </header>

        <TheorySection title="Intuition">
          <p>
            Trees are just graphs with a strict hierarchy and no cycles. Drop
            those restrictions — allow any node to connect to any other node, in
            any pattern, even forming loops — and you get a graph. Almost
            anything that&apos;s &quot;a network of things and connections&quot; (social
            graphs, road maps, dependency chains, web links) is naturally modeled
            as one.
          </p>
          <p>
            The two traversal strategies below answer the same underlying
            question — &quot;visit every reachable node exactly once&quot; — but explore in
            fundamentally different orders. BFS spreads outward evenly, level by
            level, using a queue. DFS commits to a path and follows it as deep as
            it can before backtracking, using a stack (or recursion).
          </p>
        </TheorySection>

        <TheorySection title="Formal Definition">
          <p>
            A graph <code className="font-mono-data text-cyan">G = (V, E)</code>{" "}
            is a set of vertices <code className="font-mono-data text-cyan">V</code>{" "}
            and a set of edges <code className="font-mono-data text-cyan">E</code>{" "}
            connecting pairs of vertices. This module uses an{" "}
            <strong>undirected, unweighted</strong> graph — every edge goes both
            ways and costs the same to traverse — represented as an{" "}
            <strong>adjacency list</strong>: a map from each node to the list of
            its direct neighbors.
          </p>
          <p>
            BFS explores the frontier — the set of discovered-but-not-yet-visited
            nodes — as a FIFO queue. DFS explores it as a LIFO stack. Same
            algorithm skeleton, different frontier data structure, completely
            different traversal shape.
          </p>
        </TheorySection>

        <TheorySection title="Complexity">
          <ComplexityTable
            rows={[
              { operation: "BFS (V vertices, E edges)", best: "O(V + E)", average: "O(V + E)", worst: "O(V + E)", space: "O(V)" },
              { operation: "DFS (V vertices, E edges)", best: "O(V + E)", average: "O(V + E)", worst: "O(V + E)", space: "O(V)" },
              { operation: "Adjacency list neighbor lookup", best: "O(1)", average: "O(degree)", worst: "O(degree)", space: "O(V + E)" },
            ]}
          />
          <p className="text-xs text-text-muted">
            Both traversals visit every vertex once and every edge once (or twice,
            for undirected graphs), so the total work is linear in the size of the
            graph — O(V + E) — regardless of shape.
          </p>
        </TheorySection>

        <TheorySection title="Common Pitfalls">
          <PitfallList
            items={[
              "Forgetting to mark a node visited before (not after) processing it — with cycles present, this causes infinite loops or duplicate visits.",
              "Using an adjacency matrix for a sparse graph — O(V²) space and lookup time when an adjacency list would be O(V + E).",
              "Assuming DFS or BFS alone finds shortest paths in a weighted graph — BFS only guarantees shortest path by edge count, and only when all edges cost the same.",
              "Implementing DFS recursively on a graph with thousands of nodes and hitting a call-stack overflow — an iterative stack-based DFS avoids this.",
            ]}
          />
        </TheorySection>

        <TheorySection title="When to Use vs Not">
          <WhenToUse
            use={[
              "You need the shortest path by number of edges in an unweighted graph — use BFS.",
              "You need to explore all paths, detect cycles, or do topological-style ordering — DFS is usually the natural fit.",
              "You're modeling any many-to-many relationship: dependencies, social connections, maps, state machines.",
            ]}
            avoid={[
              "You need shortest paths with weighted edges — plain BFS/DFS don't account for weight; that needs Dijkstra or Bellman-Ford (a future module).",
              "The relationship is naturally hierarchical with no cycles — a tree is simpler and often faster to reason about.",
              "You need guaranteed minimum spanning structure or ordering with dependencies — those need dedicated algorithms (MST, topological sort) beyond plain traversal.",
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
          <div className="flex items-center gap-2">
            <label htmlFor="start" className="text-xs font-mono-data text-text-muted">
              Start node:
            </label>
            <select
              id="start"
              value={start}
              onChange={(e) => setStart(e.target.value)}
              className="glass rounded-lg px-2 py-1 text-sm font-mono-data outline-none"
            >
              {DEMO_NODES.map((n) => (
                <option key={n.id} value={n.id}>
                  {n.label}
                </option>
              ))}
            </select>
          </div>
          <p className="mt-2 text-[11px] font-mono-data text-text-muted">
            adjacency:{" "}
            {DEMO_NODES.map((n) => `${n.label}:[${(adjacency.get(n.id) ?? []).join(",")}]`).join("  ")}
          </p>
        </GlassCard>

        {steps && (
          <VisualizerEngine
            key={`${op}-${start}`}
            steps={steps}
            codeSamples={codeSamples}
            onComplete={() => setModuleProgress(MODULE_SLUG, { percent: 80 })}
          >
            {(state) => <GraphView state={state} />}
          </VisualizerEngine>
        )}
      </div>
    </div>
  );
}
