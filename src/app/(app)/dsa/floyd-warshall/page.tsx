"use client";

import { useEffect, useMemo } from "react";
import Badge from "@/components/ui/Badge";
import ComplexityTable from "@/components/ui/ComplexityTable";
import { TheorySection, PitfallList, WhenToUse } from "@/components/ui/TheorySection";
import Quiz, { type QuizQuestion } from "@/components/ui/Quiz";
import VisualizerEngine from "@/components/visualizers/VisualizerEngine";
import MatrixView from "@/components/visualizers/MatrixView";
import {
  floydWarshallSteps,
  FLOYD_WARSHALL_NODES,
  FLOYD_WARSHALL_EDGES,
} from "@/lib/algorithms/floydWarshall";
import { FLOYD_WARSHALL_CODE_SAMPLES } from "@/lib/codeSamples/floydWarshall";
import { useProgressStore } from "@/lib/store/progress";

const MODULE_SLUG = "floyd-warshall";

const QUIZ: QuizQuestion[] = [
  {
    question: "What does Floyd-Warshall compute that Dijkstra's and Bellman-Ford don't?",
    options: [
      "The minimum spanning tree",
      "Shortest paths between every pair of nodes at once, not just from a single source",
      "A topological ordering",
      "Whether the graph is connected",
    ],
    correctIndex: 1,
    explanation:
      "Dijkstra and Bellman-Ford are both single-source algorithms. Floyd-Warshall solves the all-pairs shortest path problem — every dist[i][j] — in one pass of dynamic programming.",
  },
  {
    question: "What does dist[i][k] + dist[k][j] < dist[i][j] check, inside the k loop?",
    options: [
      "Whether node k should be deleted from the graph",
      "Whether routing from i to j through intermediate vertex k is cheaper than the best route found so far that doesn't use k (or only uses earlier-considered intermediates)",
      "Whether i and j are directly connected",
      "The total number of edges in the graph",
    ],
    correctIndex: 1,
    explanation:
      "This is the core DP recurrence: dist[i][j] after considering vertices {1..k} is the minimum of not using k at all, or going i → k → j. Sweeping k from first to last vertex guarantees every possible intermediate has been considered by the end.",
  },
  {
    question: "Why must the k loop be the OUTERMOST of the three nested loops?",
    options: [
      "It doesn't matter — any loop order works",
      "dist[i][k] and dist[k][j] used inside the innermost loop must already reflect all vertices before k as possible intermediates — that's only guaranteed if k has finished sweeping through the outer loop before i and j start using it",
      "It's just a coding convention with no functional impact",
      "Outermost loops always run fastest in JavaScript",
    ],
    correctIndex: 1,
    explanation:
      "The DP invariant is: after the k-th outer iteration, dist[i][j] is optimal using only intermediates from {1..k}. If i or j were outer instead, dist[i][k] might not yet incorporate earlier intermediates when it's read, breaking correctness.",
  },
  {
    question: "How can Floyd-Warshall detect a negative-weight cycle?",
    options: [
      "It can't — negative cycles cause an infinite loop, same as Bellman-Ford",
      "After the algorithm finishes, check the diagonal: if any dist[v][v] is negative, v lies on a negative-weight cycle",
      "By checking if the total sum of all edge weights is negative",
      "By comparing the result to a Dijkstra run",
    ],
    correctIndex: 1,
    explanation:
      "dist[v][v] starts at 0 (the empty path). If it ever drops below 0, that means there's a path from v back to v with negative total weight — a negative cycle through v.",
  },
];

export default function FloydWarshallPage() {
  const setModuleProgress = useProgressStore((s) => s.setModuleProgress);

  useEffect(() => {
    setModuleProgress(MODULE_SLUG, { percent: 40 });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const steps = useMemo(() => floydWarshallSteps(FLOYD_WARSHALL_NODES, FLOYD_WARSHALL_EDGES), []);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[1fr_480px] gap-8 px-4 sm:px-6 py-8 max-w-[1400px] mx-auto">
      <div className="flex flex-col gap-10 min-w-0">
        <header>
          <div className="flex items-center gap-2 mb-2">
            <Badge variant="cyan">Data Structure</Badge>
            <Badge variant="neutral">Advanced</Badge>
          </div>
          <h1 className="text-2xl font-bold font-mono-data">Floyd-Warshall</h1>
          <p className="text-text-muted mt-2 text-sm max-w-xl">
            All-pairs shortest paths via dynamic programming over a distance
            matrix — instead of running a single-source algorithm V times,
            build up the answer for every pair at once by sweeping through
            each possible intermediate vertex.
          </p>
        </header>

        <TheorySection title="Intuition">
          <p>
            Picture the NxN distance matrix as the current best-known answer
            for every pair, updated in rounds. Round <code className="font-mono-data text-cyan">k</code>{" "}
            asks one question for every cell: &quot;does routing through
            node <code className="font-mono-data text-cyan">k</code> beat
            the best path found so far?&quot; If{" "}
            <code className="font-mono-data text-cyan">dist[i][k] + dist[k][j]</code>{" "}
            is smaller than the current{" "}
            <code className="font-mono-data text-cyan">dist[i][j]</code>,
            update it.
          </p>
          <p>
            By the time <code className="font-mono-data text-cyan">k</code>{" "}
            has swept through every node, every cell has had the chance to
            route through every possible intermediate vertex — so the final
            matrix holds the true shortest distance between every pair,
            guaranteed.
          </p>
        </TheorySection>

        <TheorySection title="Formal Definition">
          <p>
            Let <code className="font-mono-data text-cyan">dist⁽⁰⁾[i][j]</code>{" "}
            be the direct edge weight from{" "}
            <code className="font-mono-data text-cyan">i</code> to{" "}
            <code className="font-mono-data text-cyan">j</code> (0 if{" "}
            <code className="font-mono-data text-cyan">i = j</code>, ∞ if no
            edge). Define{" "}
            <code className="font-mono-data text-cyan">
              dist⁽ᵏ⁾[i][j] = min(dist⁽ᵏ⁻¹⁾[i][j], dist⁽ᵏ⁻¹⁾[i][k] + dist⁽ᵏ⁻¹⁾[k][j])
            </code>{" "}
            — the shortest path from{" "}
            <code className="font-mono-data text-cyan">i</code> to{" "}
            <code className="font-mono-data text-cyan">j</code> using only
            intermediate vertices from{" "}
            <code className="font-mono-data text-cyan">{"{1, ..., k}"}</code>.
            After <code className="font-mono-data text-cyan">k</code> sweeps
            through every vertex,{" "}
            <code className="font-mono-data text-cyan">dist⁽ⁿ⁾[i][j]</code>{" "}
            is the true shortest distance. In-place implementations drop the{" "}
            <code className="font-mono-data text-cyan">(k)</code> superscript
            entirely and just update one shared matrix — the k-loop must
            stay outermost for that to remain correct.
          </p>
        </TheorySection>

        <TheorySection title="Complexity">
          <ComplexityTable
            rows={[
              { operation: "Floyd-Warshall (all pairs)", best: "O(V³)", average: "O(V³)", worst: "O(V³)", space: "O(V²)" },
              { operation: "Dijkstra from every node", best: "O(V(V+E) log V)", average: "O(V(V+E) log V)", worst: "O(V(V+E) log V)", space: "O(V²)" },
              { operation: "Bellman-Ford from every node", best: "O(V²E)", average: "O(V²E)", worst: "O(V²E)", space: "O(V²)" },
            ]}
          />
          <p className="text-xs text-text-muted">
            On a dense graph (E close to V²), Floyd-Warshall&apos;s flat
            O(V³) is competitive with — or simpler than — running V
            single-source passes, and it&apos;s the only one of the three
            that handles negative edges without extra bookkeeping.
          </p>
        </TheorySection>

        <TheorySection title="Common Pitfalls">
          <PitfallList
            items={[
              "Putting the k loop anywhere but outermost — the DP recurrence relies on dist[i][k] and dist[k][j] already reflecting all earlier intermediates before i, j read them.",
              "Forgetting to check the diagonal for negative values afterward — a negative dist[v][v] means v sits on a negative-weight cycle and the matrix is no longer meaningful for paths through it.",
              "Using Floyd-Warshall on a huge sparse graph — O(V³) wastes work single-source algorithms wouldn't; it shines specifically when you need every pair, not one.",
              "Confusing 'no edge' (should seed as infinity) with 'zero-weight edge' when building the initial matrix — they're very different starting states.",
            ]}
          />
        </TheorySection>

        <TheorySection title="When to Use vs Not">
          <WhenToUse
            use={[
              "You genuinely need shortest distances between every pair of nodes, not just from one source — routing tables, transitive closure of costs.",
              "The graph is small-to-moderate and/or dense — O(V³) with a tiny constant factor is simple to implement correctly.",
              "Negative edge weights are possible and you also want a built-in negative-cycle check (negative value on the diagonal).",
            ]}
            avoid={[
              "You only need shortest paths from a single source — Dijkstra (non-negative) or Bellman-Ford (negative-tolerant) do that in less time and space.",
              "The graph is large and sparse — running Dijkstra from every node is typically far cheaper than O(V³).",
              "Memory is tight — the O(V²) distance matrix becomes expensive fast as V grows.",
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
            codeSamples={FLOYD_WARSHALL_CODE_SAMPLES}
            onComplete={() => setModuleProgress(MODULE_SLUG, { percent: 80 })}
          >
            {(state) => <MatrixView state={state} />}
          </VisualizerEngine>
        )}
      </div>
    </div>
  );
}
