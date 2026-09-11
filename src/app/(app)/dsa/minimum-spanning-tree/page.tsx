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
import { primSteps, kruskalSteps, MST_NODES, MST_EDGES } from "@/lib/algorithms/mst";
import { MST_CODE_SAMPLES } from "@/lib/codeSamples/mst";
import { useProgressStore } from "@/lib/store/progress";
import { cn } from "@/lib/utils";

const MODULE_SLUG = "minimum-spanning-tree";

const QUIZ: QuizQuestion[] = [
  {
    question: "What does a minimum spanning tree connect, and with what property?",
    options: [
      "Every node, using the fewest possible edges by count",
      "Every node, using the subset of edges with the smallest total weight that keeps the graph connected with no cycles",
      "Only the two farthest-apart nodes, via the cheapest path",
      "Every edge in the graph, sorted by weight",
    ],
    correctIndex: 1,
    explanation:
      "A spanning tree touches every node with exactly V-1 edges and no cycles; the 'minimum' one is whichever such tree has the lowest total edge weight.",
  },
  {
    question: "Why do Prim's and Kruskal's algorithms always agree on the total MST weight, even though they consider edges in completely different orders?",
    options: [
      "They don't always agree — it depends on the graph",
      "Both are greedy algorithms built on the same cut property: the cheapest edge crossing any cut is always safe to include",
      "Prim's is only an approximation of Kruskal's",
      "They agree only when all edge weights are equal",
    ],
    correctIndex: 1,
    explanation:
      "The cut property guarantees that the minimum-weight edge crossing any partition of the nodes belongs to some MST. Prim's applies this to a single growing cut; Kruskal's applies it globally via sorted order — both are provably correct and produce the same total weight.",
  },
  {
    question: "In Kruskal's algorithm, what is the union-find (disjoint set) structure used for?",
    options: [
      "To sort the edges by weight",
      "To track which nodes are already connected, so an edge joining two nodes already in the same component (which would create a cycle) can be rejected in near O(1)",
      "To compute the shortest path between two nodes",
      "To store the adjacency list",
    ],
    correctIndex: 1,
    explanation:
      "Kruskal's processes edges cheapest-first and needs a fast way to check 'would this edge close a cycle?' — union-find with path compression answers find() in near-constant amortized time.",
  },
  {
    question: "Which is generally the better fit for a very dense graph stored as an adjacency matrix?",
    options: [
      "Kruskal's, because sorting edges is always faster",
      "Prim's with a simple array scan, since it doesn't need to sort all E edges up front and naturally suits O(V²) matrix access",
      "Neither works on dense graphs",
      "They perform identically on every graph shape",
    ],
    correctIndex: 1,
    explanation:
      "Kruskal's cost is dominated by sorting E edges (O(E log E)); on a dense graph E approaches V², making Prim's V²-scan version (no sort needed) competitive or better. On sparse graphs, Kruskal's tends to win.",
  },
];

type Algo = "prim" | "kruskal";

export default function MinimumSpanningTreePage() {
  const [algo, setAlgo] = useState<Algo>("prim");
  const [start, setStart] = useState("A");
  const setModuleProgress = useProgressStore((s) => s.setModuleProgress);

  useEffect(() => {
    setModuleProgress(MODULE_SLUG, { percent: 40 });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const steps = useMemo(
    () => (algo === "prim" ? primSteps(MST_NODES, MST_EDGES, start) : kruskalSteps(MST_NODES, MST_EDGES)),
    [algo, start]
  );

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[1fr_480px] gap-8 px-4 sm:px-6 py-8 max-w-[1400px] mx-auto">
      <div className="flex flex-col gap-10 min-w-0">
        <header>
          <div className="flex items-center gap-2 mb-2">
            <Badge variant="cyan">Data Structure</Badge>
            <Badge variant="neutral">Advanced</Badge>
          </div>
          <h1 className="text-2xl font-bold font-mono-data">Minimum Spanning Tree — Prim&apos;s &amp; Kruskal&apos;s</h1>
          <p className="text-text-muted mt-2 text-sm max-w-xl">
            Given a connected, weighted, undirected graph, find the subset of
            edges that connects every node with the smallest possible total
            weight and no cycles. Two greedy algorithms — Prim&apos;s and
            Kruskal&apos;s — always find it, from opposite directions.
          </p>
        </header>

        <TheorySection title="Intuition">
          <p>
            <strong>Prim&apos;s</strong> grows a single tree outward from one
            starting node, like Dijkstra&apos;s — but instead of picking the
            globally closest node, it just picks whichever edge crossing the
            current tree&apos;s boundary is cheapest, one edge at a time,
            until every node is inside.
          </p>
          <p>
            <strong>Kruskal&apos;s</strong> ignores connectivity structure
            entirely at first: sort <em>every</em> edge in the graph by
            weight, then walk the sorted list accepting any edge that
            connects two nodes not already in the same component — skipping
            (rejecting) any edge that would close a cycle. Components merge
            and grow until only one remains.
          </p>
          <p>
            Both are greedy and both are provably optimal, resting on the
            same <strong>cut property</strong>: for any way of splitting the
            nodes into two groups, the cheapest edge crossing that split
            must belong to some minimum spanning tree.
          </p>
        </TheorySection>

        <TheorySection title="Formal Definition">
          <p>
            Given connected graph <code className="font-mono-data text-cyan">G = (V, E)</code>{" "}
            with edge weights, a spanning tree is a subset of{" "}
            <code className="font-mono-data text-cyan">V - 1</code> edges
            that connects all <code className="font-mono-data text-cyan">V</code>{" "}
            nodes with no cycles. A minimum spanning tree (MST) is a spanning
            tree whose total edge weight is minimum over all possible
            spanning trees. If all edge weights are distinct, the MST is
            unique.
          </p>
          <p>
            <strong>Prim&apos;s:</strong> maintain a set of nodes already in
            the tree; repeatedly add the minimum-weight edge with exactly one
            endpoint inside the set. <strong>Kruskal&apos;s:</strong> sort
            edges ascending by weight; repeatedly add the next edge unless
            its two endpoints are already connected (checked via union-find).
          </p>
        </TheorySection>

        <TheorySection title="Complexity">
          <ComplexityTable
            rows={[
              { operation: "Prim's (binary heap)", best: "O(E log V)", average: "O(E log V)", worst: "O(E log V)", space: "O(V)" },
              { operation: "Prim's (array scan, dense)", best: "O(V²)", average: "O(V²)", worst: "O(V²)", space: "O(V)" },
              { operation: "Kruskal's (sort + union-find)", best: "O(E log E)", average: "O(E log E)", worst: "O(E log E)", space: "O(V)" },
            ]}
          />
          <p className="text-xs text-text-muted">
            Kruskal&apos;s cost is dominated by sorting all edges; the
            union-find operations that follow are near-constant amortized
            time (inverse-Ackermann) with path compression + union by rank.
            Prim&apos;s with a binary heap repeatedly extracts the cheapest
            crossing edge, same shape as Dijkstra&apos;s priority queue.
          </p>
        </TheorySection>

        <TheorySection title="Common Pitfalls">
          <PitfallList
            items={[
              "Forgetting the graph must be connected — if it isn't, there's no single spanning tree; Prim's/Kruskal's instead produce a minimum spanning forest, one tree per component.",
              "In Kruskal's, checking connectivity with a plain visited-set/DFS instead of union-find — it works but is far slower on large graphs.",
              "In Prim's, rescanning every edge in the whole graph each step instead of only the ones crossing the current tree boundary — that's what a priority queue keyed by crossing-edge weight avoids.",
              "Assuming the MST is the shortest path between any two nodes — it isn't. It minimizes total edge weight across the whole tree, not any single node-to-node path.",
            ]}
          />
        </TheorySection>

        <TheorySection title="When to Use vs Not">
          <WhenToUse
            use={[
              "You need to connect a set of points/nodes as cheaply as possible — network cabling, road/pipeline layout, circuit design.",
              "The graph is sparse — Kruskal's sort-then-union-find approach is simple and efficient.",
              "The graph is dense and stored as an adjacency matrix — Prim's array-scan variant fits naturally.",
            ]}
            avoid={[
              "You need the shortest path between two specific nodes, not a tree spanning all of them — use Dijkstra's or BFS instead.",
              "The graph is directed — MST algorithms assume undirected edges; the directed analogue is a different problem (minimum arborescence).",
              "You need all-pairs shortest distances — that's Floyd-Warshall's job, not MST's.",
            ]}
          />
        </TheorySection>

        <TheorySection title="Quiz">
          <Quiz moduleSlug={MODULE_SLUG} questions={QUIZ} />
        </TheorySection>
      </div>

      <div className="lg:sticky lg:top-20 self-start flex flex-col gap-4 min-w-0">
        <GlassCard className="!py-3 !px-4 flex flex-col gap-3">
          <div className="flex items-center gap-1.5">
            <Button
              variant={algo === "prim" ? "primary" : "ghost"}
              size="sm"
              onClick={() => setAlgo("prim")}
            >
              Prim&apos;s
            </Button>
            <Button
              variant={algo === "kruskal" ? "primary" : "ghost"}
              size="sm"
              onClick={() => setAlgo("kruskal")}
            >
              Kruskal&apos;s
            </Button>
          </div>
          {algo === "prim" && (
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
                {MST_NODES.map((n) => (
                  <option key={n.id} value={n.id}>
                    {n.label}
                  </option>
                ))}
              </select>
            </div>
          )}
        </GlassCard>

        {steps && (
          <VisualizerEngine
            key={`${algo}-${start}`}
            steps={steps}
            codeSamples={MST_CODE_SAMPLES[algo]}
            onComplete={() => setModuleProgress(MODULE_SLUG, { percent: 80 })}
          >
            {(state) => (
              <div className="w-full flex flex-col gap-4">
                <GraphView state={state} acceptedEdges={state.acceptedEdges} rejectedEdges={state.rejectedEdges} />
                <div className="border-t border-glass-border-token pt-3 flex items-center justify-between">
                  <p className="text-[10px] font-mono-data uppercase tracking-wide text-text-muted">
                    Tree weight so far
                  </p>
                  <span
                    className={cn(
                      "font-mono-data text-lg font-bold",
                      state.treeWeight > 0 ? "text-amber" : "text-text-muted"
                    )}
                  >
                    {state.treeWeight}
                  </span>
                </div>
              </div>
            )}
          </VisualizerEngine>
        )}
      </div>
    </div>
  );
}
