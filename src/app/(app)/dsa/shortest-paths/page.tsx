"use client";

import { useEffect, useMemo, useState } from "react";
import GlassCard from "@/components/ui/GlassCard";
import Badge from "@/components/ui/Badge";
import ComplexityTable from "@/components/ui/ComplexityTable";
import { TheorySection, PitfallList, WhenToUse } from "@/components/ui/TheorySection";
import Quiz, { type QuizQuestion } from "@/components/ui/Quiz";
import VisualizerEngine from "@/components/visualizers/VisualizerEngine";
import GraphView from "@/components/visualizers/GraphView";
import {
  dijkstraSteps,
  DIJKSTRA_NODES,
  DIJKSTRA_EDGES,
  DIJKSTRA_CODE,
} from "@/lib/algorithms/dijkstra";
import { useProgressStore } from "@/lib/store/progress";
import { cn } from "@/lib/utils";

const MODULE_SLUG = "shortest-paths";

const QUIZ: QuizQuestion[] = [
  {
    question: "What does Dijkstra's algorithm pick at each iteration?",
    options: [
      "The unvisited node with the smallest tentative distance",
      "A random unvisited node",
      "The node with the most edges",
      "The last node added to the frontier",
    ],
    correctIndex: 0,
    explanation:
      "Always finalizing the closest unvisited node is exactly what guarantees correctness — by the time it's picked, no shorter path to it can exist (all edge weights are non-negative).",
  },
  {
    question: "Why does Dijkstra's algorithm require non-negative edge weights?",
    options: [
      "It doesn't — it works fine with negative weights too",
      "A negative edge could make a path through an already-finalized node shorter, breaking the 'closest unvisited node is final' guarantee",
      "Negative weights cause an infinite loop",
      "JavaScript numbers can't represent negative weights",
    ],
    correctIndex: 1,
    explanation:
      "Dijkstra finalizes a node's distance the moment it's picked, assuming nothing visited later could ever shorten a path to it. A negative edge breaks that assumption — that's exactly the case Bellman-Ford is built to handle.",
  },
  {
    question: "What does 'relaxing' an edge (u, v) mean?",
    options: [
      "Removing the edge from the graph",
      "Checking if going through u gives a shorter path to v than the current known distance, and updating if so",
      "Doubling the edge's weight",
      "Marking the edge as visited",
    ],
    correctIndex: 1,
    explanation:
      "Relaxation is the core operation: dist[v] = min(dist[v], dist[u] + weight(u,v)). It only ever tightens (relaxes) the current upper bound on the shortest distance — never loosens it.",
  },
  {
    question: "In the distance table, why can a node's tentative distance update more than once before it's finalized?",
    options: [
      "It's a bug — a correct implementation only updates each node once",
      "Multiple different finalized nodes might each offer a shorter path to it before it's finally picked",
      "The algorithm intentionally re-checks every node twice for safety",
      "Only the start node's distance can ever update",
    ],
    correctIndex: 1,
    explanation:
      "A node stays 'tentative' — open to improvement — until it's actually picked as the current minimum. Any node finalized before then might relax an edge into it with a shorter total distance, as seen with B and D in the demo graph above.",
  },
];

export default function ShortestPathsPage() {
  const [start, setStart] = useState("A");
  const setModuleProgress = useProgressStore((s) => s.setModuleProgress);

  useEffect(() => {
    setModuleProgress(MODULE_SLUG, { percent: 40 });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const steps = useMemo(() => dijkstraSteps(DIJKSTRA_NODES, DIJKSTRA_EDGES, start), [start]);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[1fr_480px] gap-8 px-4 sm:px-6 py-8 max-w-[1400px] mx-auto">
      <div className="flex flex-col gap-10 min-w-0">
        <header>
          <div className="flex items-center gap-2 mb-2">
            <Badge variant="cyan">Data Structure</Badge>
            <Badge variant="neutral">Advanced</Badge>
          </div>
          <h1 className="text-2xl font-bold font-mono-data">Shortest Paths — Dijkstra&apos;s Algorithm</h1>
          <p className="text-text-muted mt-2 text-sm max-w-xl">
            BFS finds the shortest path by edge <em>count</em>. Dijkstra finds
            the shortest path by total edge <em>weight</em> — greedily
            finalizing the closest unvisited node and relaxing every edge out
            of it.
          </p>
        </header>

        <TheorySection title="Intuition">
          <p>
            Think of it as water spreading outward from the start node, but
            unevenly — it reaches close neighbors first and far ones later,
            where &quot;close&quot; means cumulative edge weight, not hop
            count. At every step, the algorithm looks at the frontier of
            discovered-but-not-finalized nodes and commits to whichever one
            currently has the smallest total distance from the start.
          </p>
          <p>
            The key insight that makes this greedy choice safe: since all
            edge weights are non-negative, nothing discovered later could
            ever produce a shorter path to that already-closest node. So its
            distance is locked in — finalized — forever.
          </p>
        </TheorySection>

        <TheorySection title="Formal Definition">
          <p>
            Given a weighted graph <code className="font-mono-data text-cyan">G = (V, E)</code>{" "}
            with non-negative weights and a start node{" "}
            <code className="font-mono-data text-cyan">s</code>, maintain a
            tentative distance <code className="font-mono-data text-cyan">dist[v]</code>{" "}
            for every node (initially 0 for s, ∞ elsewhere). Repeatedly: pick
            the unvisited node <code className="font-mono-data text-cyan">u</code>{" "}
            with minimum <code className="font-mono-data text-cyan">dist[u]</code>,
            mark it visited (finalized), then <strong>relax</strong> every
            outgoing edge <code className="font-mono-data text-cyan">(u, v)</code>:{" "}
            <code className="font-mono-data text-cyan">
              dist[v] = min(dist[v], dist[u] + weight(u, v))
            </code>
            . Stop once every reachable node is visited.
          </p>
          <p>
            A real implementation swaps the &quot;scan every unvisited node
            for the minimum&quot; step for a <strong>min-priority queue</strong>{" "}
            keyed by tentative distance — that&apos;s what turns O(V²) into
            O((V + E) log V). This module uses the simpler linear scan since
            the demo graph is tiny, but the relaxation logic is identical.
          </p>
        </TheorySection>

        <TheorySection title="Complexity">
          <ComplexityTable
            rows={[
              { operation: "Linear-scan min (V nodes)", best: "O(V²)", average: "O(V²)", worst: "O(V²)", space: "O(V)" },
              { operation: "Binary-heap priority queue", best: "O((V+E) log V)", average: "O((V+E) log V)", worst: "O((V+E) log V)", space: "O(V)" },
              { operation: "Fibonacci-heap priority queue", best: "O(E + V log V)", average: "O(E + V log V)", worst: "O(E + V log V)", space: "O(V)" },
            ]}
          />
          <p className="text-xs text-text-muted">
            Every node is finalized exactly once, and every edge is relaxed
            exactly once (from its source&apos;s side) — the priority-queue
            variant&apos;s cost is dominated by how cheaply you can repeatedly
            extract the current minimum.
          </p>
        </TheorySection>

        <TheorySection title="Common Pitfalls">
          <PitfallList
            items={[
              "Running Dijkstra on a graph with negative edge weights — the 'closest node is final' guarantee breaks. Use Bellman-Ford instead.",
              "Re-processing a node after it's already finalized — once visited, a node's distance can never improve; skip it in relaxation.",
              "Forgetting to track prev[] if you need the actual path, not just the distance — dist[] alone only tells you the total cost.",
              "Using a plain array/linear scan for large graphs — without a priority queue, Dijkstra degrades from near-linear to O(V²).",
            ]}
          />
        </TheorySection>

        <TheorySection title="When to Use vs Not">
          <WhenToUse
            use={[
              "You need the cheapest path in a weighted graph with only non-negative weights — road networks, routing, cost-minimization.",
              "You need shortest paths from one source to all other nodes (single-source shortest path).",
              "The graph is sparse-to-moderate size and a priority queue is available — this is the standard, efficient choice.",
            ]}
            avoid={[
              "The graph has negative edge weights — use Bellman-Ford, which tolerates them (and detects negative cycles).",
              "You need shortest paths between every pair of nodes on a dense graph — Floyd-Warshall is simpler to reason about there (both deferred to a future module).",
              "All edges have equal weight — plain BFS already gives you the answer, with less overhead.",
            ]}
          />
        </TheorySection>

        <TheorySection title="Quiz">
          <Quiz moduleSlug={MODULE_SLUG} questions={QUIZ} />
        </TheorySection>
      </div>

      <div className="lg:sticky lg:top-20 self-start flex flex-col gap-4 min-w-0">
        <GlassCard className="!py-3 !px-4">
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
              {DIJKSTRA_NODES.map((n) => (
                <option key={n.id} value={n.id}>
                  {n.label}
                </option>
              ))}
            </select>
          </div>
        </GlassCard>

        {steps && (
          <VisualizerEngine
            key={start}
            steps={steps}
            code={DIJKSTRA_CODE}
            onComplete={() => setModuleProgress(MODULE_SLUG, { percent: 80 })}
          >
            {(state) => (
              <div className="w-full flex flex-col gap-4">
                <GraphView state={state} />
                <div className="border-t border-glass-border-token pt-3">
                  <p className="text-[10px] font-mono-data uppercase tracking-wide text-text-muted mb-2">
                    Distance table (from {start})
                  </p>
                  <div className="grid grid-cols-5 gap-1.5">
                    {DIJKSTRA_NODES.map((n) => {
                      const isFinalized = state.visited?.includes(n.id);
                      const isCurrent = state.current === n.id;
                      const d = state.dist[n.id];
                      return (
                        <div
                          key={n.id}
                          className={cn(
                            "rounded-lg border-2 px-1.5 py-2 flex flex-col items-center gap-0.5",
                            isCurrent
                              ? "bg-cyan/20 border-cyan text-cyan glow-cyan"
                              : isFinalized
                                ? "bg-violet/15 border-violet/60 text-violet"
                                : d !== null
                                  ? "bg-cyan/5 border-cyan/30 text-cyan/80"
                                  : "bg-white/5 border-glass-border-token text-text-muted"
                          )}
                        >
                          <span className="font-mono-data text-[10px] uppercase">{n.label}</span>
                          <span className="font-mono-data text-sm font-semibold">
                            {d === null ? "∞" : d}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            )}
          </VisualizerEngine>
        )}
      </div>
    </div>
  );
}
