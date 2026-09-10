"use client";

import { useEffect, useMemo } from "react";
import Badge from "@/components/ui/Badge";
import ComplexityTable from "@/components/ui/ComplexityTable";
import { TheorySection, PitfallList, WhenToUse } from "@/components/ui/TheorySection";
import Quiz, { type QuizQuestion } from "@/components/ui/Quiz";
import VisualizerEngine from "@/components/visualizers/VisualizerEngine";
import GraphView from "@/components/visualizers/GraphView";
import { topologicalSortSteps, TOPO_NODES, TOPO_EDGES, TOPO_CODE } from "@/lib/algorithms/topologicalSort";
import { useProgressStore } from "@/lib/store/progress";
import { cn } from "@/lib/utils";

const MODULE_SLUG = "topological-sort";

const QUIZ: QuizQuestion[] = [
  {
    question: "What kind of graph does topological sort require?",
    options: [
      "Any undirected graph",
      "A directed acyclic graph (DAG)",
      "A weighted graph with non-negative weights",
      "A tree only",
    ],
    correctIndex: 1,
    explanation:
      "Edges must represent a 'must come before' relationship (directed), and there can be no cycles — a cycle would mean a node has to come before itself, which has no valid ordering.",
  },
  {
    question: "In Kahn's algorithm, what does a node's in-degree represent?",
    options: [
      "How many nodes it points to",
      "How many unmet prerequisites it has — edges pointing into it that haven't been 'removed' yet",
      "Its distance from the start node",
      "The number of times it's been visited",
    ],
    correctIndex: 1,
    explanation:
      "A node with in-degree 0 has no remaining prerequisite — every node that needed to come before it already has. That's exactly when it's safe to place next in the order.",
  },
  {
    question: "If Kahn's algorithm finishes with fewer processed nodes than the graph has, what does that mean?",
    options: [
      "The graph is disconnected, which is fine",
      "The graph contains a cycle — the un-processed nodes' in-degree never reaches 0, so no valid topological order exists",
      "The algorithm has a bug",
      "The start node was chosen incorrectly",
    ],
    correctIndex: 1,
    explanation:
      "Every node stuck in a cycle keeps at least one incoming edge from another node in that same cycle forever, so its in-degree can never drop to 0 — a built-in, free cycle detector.",
  },
  {
    question: "When multiple nodes reach in-degree 0 at the same time, does the final order have to be unique?",
    options: [
      "Yes, topological sort always produces exactly one valid order",
      "No — any relative order among nodes with no dependency between them is equally valid; the queue's tie-breaking (e.g. insertion order) just picks one of possibly several correct answers",
      "No, and only the first one found is actually correct",
      "It depends on whether BFS or DFS is used, but never on the graph shape",
    ],
    correctIndex: 1,
    explanation:
      "A DAG with 'width' (independent branches) has multiple valid topological orders — the algorithm just needs to produce one that respects every edge, not the only possible one.",
  },
];

export default function TopologicalSortPage() {
  const setModuleProgress = useProgressStore((s) => s.setModuleProgress);

  useEffect(() => {
    setModuleProgress(MODULE_SLUG, { percent: 40 });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const steps = useMemo(() => topologicalSortSteps(TOPO_NODES, TOPO_EDGES), []);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[1fr_480px] gap-8 px-4 sm:px-6 py-8 max-w-[1400px] mx-auto">
      <div className="flex flex-col gap-10 min-w-0">
        <header>
          <div className="flex items-center gap-2 mb-2">
            <Badge variant="cyan">Data Structure</Badge>
            <Badge variant="neutral">Advanced</Badge>
          </div>
          <h1 className="text-2xl font-bold font-mono-data">Topological Sort — Kahn&apos;s Algorithm</h1>
          <p className="text-text-muted mt-2 text-sm max-w-xl">
            Given a directed acyclic graph where an edge u→v means &quot;u
            must come before v&quot;, produce a linear ordering of every
            node that respects all of those constraints — think course
            prerequisites or a build dependency graph.
          </p>
        </header>

        <TheorySection title="Intuition">
          <p>
            Kahn&apos;s algorithm is BFS wearing a different hat. Instead of
            a &quot;visited&quot; frontier, it tracks each node&apos;s{" "}
            <strong>in-degree</strong> — how many prerequisite edges still
            point into it. Any node with in-degree 0 has nothing left
            blocking it, so it&apos;s safe to place next in the output and
            &quot;remove&quot; from the graph.
          </p>
          <p>
            Removing a node means decrementing the in-degree of everything it
            pointed to. Whenever that drop hits 0, that neighbor just became
            unblocked too — enqueue it. Repeat until the queue is empty.
          </p>
        </TheorySection>

        <TheorySection title="Formal Definition">
          <p>
            Given a directed acyclic graph{" "}
            <code className="font-mono-data text-cyan">G = (V, E)</code>,
            compute <code className="font-mono-data text-cyan">inDegree[v]</code>{" "}
            for every node. Initialize a queue with every node whose in-degree
            is 0. While the queue is non-empty: dequeue node{" "}
            <code className="font-mono-data text-cyan">u</code>, append it to
            the output, and for every edge{" "}
            <code className="font-mono-data text-cyan">(u, v)</code>,
            decrement <code className="font-mono-data text-cyan">inDegree[v]</code>{" "}
            — if it reaches 0, enqueue <code className="font-mono-data text-cyan">v</code>.
            If the output ends up shorter than{" "}
            <code className="font-mono-data text-cyan">|V|</code>, the graph
            has a cycle and no valid ordering exists.
          </p>
        </TheorySection>

        <TheorySection title="Complexity">
          <ComplexityTable
            rows={[
              { operation: "Kahn's (BFS, in-degree)", best: "O(V + E)", average: "O(V + E)", worst: "O(V + E)", space: "O(V)" },
              { operation: "DFS-based (post-order + reverse)", best: "O(V + E)", average: "O(V + E)", worst: "O(V + E)", space: "O(V)" },
            ]}
          />
          <p className="text-xs text-text-muted">
            Every node is enqueued and dequeued exactly once, and every edge
            is inspected exactly once when its source is processed — the
            same linear-time shape as plain BFS/DFS traversal.
          </p>
        </TheorySection>

        <TheorySection title="Common Pitfalls">
          <PitfallList
            items={[
              "Running topological sort on a graph that isn't actually acyclic — always check whether every node got processed; a short output means a cycle exists.",
              "Forgetting that with more than one zero-in-degree node at once, the result is one of potentially many valid orderings, not 'the' unique answer.",
              "Confusing in-degree (dependencies pointing in) with out-degree (edges pointing out) when initializing the queue.",
              "Using topological sort on an undirected graph — the 'must come before' relationship only makes sense with direction.",
            ]}
          />
        </TheorySection>

        <TheorySection title="When to Use vs Not">
          <WhenToUse
            use={[
              "Scheduling tasks with prerequisites — course planning, build systems, spreadsheet formula evaluation order.",
              "Detecting whether a dependency graph has a cycle (deadlock/circular-dependency detection) as a side effect.",
              "As a preprocessing step for DAG-based dynamic programming (e.g. longest path in a DAG).",
            ]}
            avoid={[
              "The graph is undirected — there's no 'before/after' relationship to sort by.",
              "The graph has cycles and you need to actually resolve them, not just detect them — that requires different tooling (e.g. strongly connected components).",
              "You need a numeric shortest/longest path, not just an ordering — pair topo sort with DP, or use Dijkstra/Bellman-Ford directly.",
            ]}
          />
        </TheorySection>

        <TheorySection title="Quiz">
          <Quiz moduleSlug={MODULE_SLUG} questions={QUIZ} />
        </TheorySection>
      </div>

      <div className="lg:sticky lg:top-20 self-start flex flex-col gap-4 min-w-0">
        {steps && (
          <VisualizerEngine
            steps={steps}
            code={TOPO_CODE}
            onComplete={() => setModuleProgress(MODULE_SLUG, { percent: 80 })}
          >
            {(state) => (
              <div className="w-full flex flex-col gap-4">
                <GraphView state={state} directed />
                <div className="border-t border-glass-border-token pt-3">
                  <p className="text-[10px] font-mono-data uppercase tracking-wide text-text-muted mb-2">
                    In-degree
                  </p>
                  <div className="grid grid-cols-6 gap-1.5">
                    {TOPO_NODES.map((n) => {
                      const isProcessed = state.visited?.includes(n.id);
                      const isCurrent = state.current === n.id;
                      const d = state.inDegree[n.id];
                      return (
                        <div
                          key={n.id}
                          className={cn(
                            "rounded-lg border-2 px-1 py-2 flex flex-col items-center gap-0.5",
                            isCurrent
                              ? "bg-cyan/20 border-cyan text-cyan glow-cyan"
                              : isProcessed
                                ? "bg-violet/15 border-violet/60 text-violet"
                                : d === 0
                                  ? "bg-amber/10 border-amber/50 text-amber"
                                  : "bg-white/5 border-glass-border-token text-text-muted"
                          )}
                        >
                          <span className="font-mono-data text-[10px] uppercase">{n.label}</span>
                          <span className="font-mono-data text-sm font-semibold">{d}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>
                <div className="border-t border-glass-border-token pt-3">
                  <p className="text-[10px] font-mono-data uppercase tracking-wide text-text-muted mb-1">
                    Order so far
                  </p>
                  <p className="font-mono-data text-sm text-cyan">
                    {state.order && state.order.length > 0 ? state.order.join(" → ") : "—"}
                  </p>
                </div>
              </div>
            )}
          </VisualizerEngine>
        )}
      </div>
    </div>
  );
}
