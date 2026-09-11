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
  bellmanFordSteps,
  BELLMAN_FORD_NODES,
  BELLMAN_FORD_EDGES,
  BELLMAN_FORD_NEG_CYCLE_NODES,
  BELLMAN_FORD_NEG_CYCLE_EDGES,
} from "@/lib/algorithms/bellmanFord";
import { BELLMAN_FORD_CODE_SAMPLES } from "@/lib/codeSamples/bellmanFord";
import { useProgressStore } from "@/lib/store/progress";
import { cn } from "@/lib/utils";

const MODULE_SLUG = "bellman-ford";
const START = "A";

const QUIZ: QuizQuestion[] = [
  {
    question: "What can Bellman-Ford handle that Dijkstra's algorithm cannot?",
    options: [
      "Undirected graphs",
      "Negative edge weights (and detecting negative-weight cycles)",
      "Disconnected graphs",
      "Graphs with more than one source node",
    ],
    correctIndex: 1,
    explanation:
      "Dijkstra's greedy 'closest unvisited node is final' rule breaks with negative edges. Bellman-Ford relaxes every edge every pass instead of greedily finalizing, so it stays correct — and as a bonus, it can detect negative cycles.",
  },
  {
    question: "Why exactly V-1 passes of relaxing every edge?",
    options: [
      "It's an arbitrary safety margin",
      "The shortest path between any two nodes uses at most V-1 edges (more would revisit a node, which is never optimal without a negative cycle) — so V-1 full passes are guaranteed enough to propagate the shortest distance to every node",
      "V-1 is just faster than V passes",
      "It matches the number of edges in the graph",
    ],
    correctIndex: 1,
    explanation:
      "Each full pass guarantees the correct shortest-path length that uses exactly one more edge propagates through the whole graph. A simple path visits each node at most once, so it has at most V-1 edges — hence V-1 passes suffice.",
  },
  {
    question: "How does Bellman-Ford detect a negative-weight cycle?",
    options: [
      "It can't — negative cycles cause an infinite loop",
      "Run one extra (V-th) relaxation pass after the standard V-1; if any edge still relaxes (improves a distance), a negative cycle must be reachable from the source",
      "By checking if any single edge weight is negative",
      "By counting the number of edges in the graph",
    ],
    correctIndex: 1,
    explanation:
      "If distances haven't stabilized after V-1 passes (enough for any simple path), the only way an edge can still improve something is if it's not really a simple path anymore — it's looping around a cycle that keeps getting cheaper.",
  },
  {
    question: "If a negative cycle is reachable from the source but doesn't include node X, is dist[X] still well-defined?",
    options: [
      "No, the whole algorithm just fails and no distances are valid",
      "Yes — only nodes reachable through the negative cycle (or that are part of it) have an undefined/−∞ shortest distance; nodes unaffected by it still have a valid finite answer",
      "X's distance becomes automatically 0",
      "Bellman-Ford can only ever report a single global failure, never per-node results",
    ],
    correctIndex: 1,
    explanation:
      "A negative cycle only poisons the shortest-path notion for nodes reachable by looping through it — you could always go around one more time to shave the cost further, so no finite minimum exists for those specific nodes.",
  },
];

const SCENARIOS = {
  standard: {
    label: "Standard (negative edges, no cycle)",
    nodes: BELLMAN_FORD_NODES,
    edges: BELLMAN_FORD_EDGES,
  },
  negativeCycle: {
    label: "Negative cycle present",
    nodes: BELLMAN_FORD_NEG_CYCLE_NODES,
    edges: BELLMAN_FORD_NEG_CYCLE_EDGES,
  },
} as const;

type ScenarioKey = keyof typeof SCENARIOS;

export default function BellmanFordPage() {
  const [scenario, setScenario] = useState<ScenarioKey>("standard");
  const setModuleProgress = useProgressStore((s) => s.setModuleProgress);

  useEffect(() => {
    setModuleProgress(MODULE_SLUG, { percent: 40 });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const { nodes, edges } = SCENARIOS[scenario];
  const steps = useMemo(() => bellmanFordSteps(nodes, edges, START), [nodes, edges]);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[1fr_480px] gap-8 px-4 sm:px-6 py-8 max-w-[1400px] mx-auto">
      <div className="flex flex-col gap-10 min-w-0">
        <header>
          <div className="flex items-center gap-2 mb-2">
            <Badge variant="cyan">Data Structure</Badge>
            <Badge variant="neutral">Advanced</Badge>
          </div>
          <h1 className="text-2xl font-bold font-mono-data">Bellman-Ford</h1>
          <p className="text-text-muted mt-2 text-sm max-w-xl">
            Single-source shortest paths that tolerate negative edge
            weights — by trading Dijkstra&apos;s greedy speed for brute
            repetition: relax every edge, every pass, V-1 times. As a free
            bonus, one more pass tells you if a negative cycle exists at all.
          </p>
        </header>

        <TheorySection title="Intuition">
          <p>
            Dijkstra finalizes a node&apos;s distance the moment it&apos;s
            picked and never revisits it — a bet that only pays off if edges
            are non-negative. Bellman-Ford makes no such bet: it just relaxes
            every edge in the graph, over and over, letting distances ripple
            outward one &quot;hop budget&quot; at a time.
          </p>
          <p>
            After pass 1, every distance that&apos;s reachable via a
            shortest path of 1 edge is correct. After pass 2, every distance
            reachable via ≤2 edges is correct. Since no simple path needs
            more than V-1 edges, V-1 passes guarantee every finite shortest
            distance has propagated fully — regardless of negative weights.
          </p>
          <p>
            The twist: if a <strong>negative-weight cycle</strong> is
            reachable from the source, there&apos;s no such thing as a
            shortest path anymore — you could loop the cycle one more time
            and always shave more cost off. Running one extra pass after the
            standard V-1 catches exactly this: if anything still improves,
            a negative cycle exists.
          </p>
        </TheorySection>

        <TheorySection title="Formal Definition">
          <p>
            Given directed graph <code className="font-mono-data text-cyan">G = (V, E)</code>{" "}
            with (possibly negative) weights and source{" "}
            <code className="font-mono-data text-cyan">s</code>, initialize{" "}
            <code className="font-mono-data text-cyan">dist[s] = 0</code>,
            all others ∞. Repeat <code className="font-mono-data text-cyan">|V| - 1</code>{" "}
            times: for every edge{" "}
            <code className="font-mono-data text-cyan">(u, v)</code> with
            weight <code className="font-mono-data text-cyan">w</code>, set{" "}
            <code className="font-mono-data text-cyan">
              dist[v] = min(dist[v], dist[u] + w)
            </code>
            . Then run one more full pass: if any edge still relaxes,
            report a negative-weight cycle reachable from{" "}
            <code className="font-mono-data text-cyan">s</code> and no
            finite shortest-path distances exist for the affected nodes.
          </p>
        </TheorySection>

        <TheorySection title="Complexity">
          <ComplexityTable
            rows={[
              { operation: "Relax all edges, V-1 passes", best: "O(VE)", average: "O(VE)", worst: "O(VE)", space: "O(V)" },
              { operation: "Early exit (stabilizes early)", best: "O(E)", average: "O(VE)", worst: "O(VE)", space: "O(V)" },
              { operation: "Negative-cycle check (extra pass)", best: "O(E)", average: "O(E)", worst: "O(E)", space: "O(1)" },
            ]}
          />
          <p className="text-xs text-text-muted">
            Far slower than Dijkstra&apos;s O((V+E) log V) — the price paid
            for tolerating negative weights instead of greedily finalizing.
            Stop early the first pass nothing changes; some passes may do
            nothing at all once distances converge.
          </p>
        </TheorySection>

        <TheorySection title="Common Pitfalls">
          <PitfallList
            items={[
              "Stopping after V-1 passes without running the extra negative-cycle check — a graph with a negative cycle will just report wrong (over-optimistic but not fully converged) distances silently.",
              "Assuming a negative cycle poisons the whole graph — only nodes reachable through that cycle are affected; unrelated nodes still have valid finite distances.",
              "Using Bellman-Ford when Dijkstra would do — it's strictly slower (O(VE) vs O((V+E) log V)); only reach for it when negative weights are actually possible.",
              "Relaxing edges in a fixed order and assuming that's the only valid execution — any edge order still converges to the same correct answer in the same number of passes.",
            ]}
          />
        </TheorySection>

        <TheorySection title="When to Use vs Not">
          <WhenToUse
            use={[
              "The graph can have negative edge weights — currency arbitrage detection, certain flow-network reductions.",
              "You need to detect whether a negative-weight cycle is reachable from a source at all (e.g. arbitrage opportunities).",
              "The graph is small-to-moderate — O(VE) is acceptable when correctness under negative weights matters more than raw speed.",
            ]}
            avoid={[
              "All edge weights are non-negative — Dijkstra's algorithm solves the same problem asymptotically faster.",
              "You need all-pairs shortest paths on a dense graph — Floyd-Warshall's O(V³) DP is simpler to reason about there.",
              "The graph is very large and performance matters — O(VE) does not scale the way a priority-queue Dijkstra does.",
            ]}
          />
        </TheorySection>

        <TheorySection title="Quiz">
          <Quiz moduleSlug={MODULE_SLUG} questions={QUIZ} />
        </TheorySection>
      </div>

      <div className="lg:sticky lg:top-20 self-start flex flex-col gap-4 min-w-0">
        <GlassCard className="!py-3 !px-4">
          <div className="flex flex-col gap-2">
            <span className="text-xs font-mono-data text-text-muted">Demo graph:</span>
            <div className="flex flex-wrap gap-1.5">
              {(Object.keys(SCENARIOS) as ScenarioKey[]).map((key) => (
                <Button
                  key={key}
                  variant={scenario === key ? "primary" : "ghost"}
                  size="sm"
                  onClick={() => setScenario(key)}
                >
                  {SCENARIOS[key].label}
                </Button>
              ))}
            </div>
          </div>
        </GlassCard>

        {steps && (
          <VisualizerEngine
            key={scenario}
            steps={steps}
            codeSamples={BELLMAN_FORD_CODE_SAMPLES}
            onComplete={() => setModuleProgress(MODULE_SLUG, { percent: 80 })}
          >
            {(state) => (
              <div className="w-full flex flex-col gap-4">
                <GraphView state={state} directed />
                {state.negativeCycleDetected && (
                  <div className="rounded-lg border-2 border-amber/60 bg-amber/10 px-3 py-2 text-xs font-mono-data text-amber">
                    Negative-weight cycle detected — distances below are no longer meaningful for affected nodes.
                  </div>
                )}
                <div className="border-t border-glass-border-token pt-3">
                  <p className="text-[10px] font-mono-data uppercase tracking-wide text-text-muted mb-2">
                    Distance table (from {START}) — {state.pass < 0 ? "final check" : `pass ${state.pass}`}
                  </p>
                  <div className="grid grid-cols-5 gap-1.5">
                    {nodes.map((n) => {
                      const isFinalized = state.visited?.includes(n.id);
                      const d = state.dist[n.id];
                      return (
                        <div
                          key={n.id}
                          className={cn(
                            "rounded-lg border-2 px-1.5 py-2 flex flex-col items-center gap-0.5",
                            isFinalized
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
