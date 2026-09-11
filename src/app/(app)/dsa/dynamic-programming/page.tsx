"use client";

import { useEffect, useMemo, useState } from "react";
import GlassCard from "@/components/ui/GlassCard";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import Slider from "@/components/ui/Slider";
import ComplexityTable from "@/components/ui/ComplexityTable";
import { TheorySection, PitfallList, WhenToUse } from "@/components/ui/TheorySection";
import Quiz, { type QuizQuestion } from "@/components/ui/Quiz";
import VisualizerEngine from "@/components/visualizers/VisualizerEngine";
import DPTableView from "@/components/visualizers/DPTableView";
import {
  fibonacciSteps,
  knapsackSteps,
  lcsSteps,
  KNAPSACK_ITEMS,
  KNAPSACK_CAPACITY,
  LCS_STRING_A,
  LCS_STRING_B,
} from "@/lib/algorithms/dp";
import {
  FIBONACCI_CODE_SAMPLES,
  KNAPSACK_CODE_SAMPLES,
  LCS_CODE_SAMPLES,
} from "@/lib/codeSamples/dp";
import { useProgressStore } from "@/lib/store/progress";

const MODULE_SLUG = "dynamic-programming";

type Problem = "fibonacci" | "knapsack" | "lcs";

const PROBLEM_LABELS: Record<Problem, string> = {
  fibonacci: "Fibonacci (1D)",
  knapsack: "0/1 Knapsack (2D)",
  lcs: "Longest Common Subsequence (2D)",
};

const CODE_SAMPLES = {
  fibonacci: FIBONACCI_CODE_SAMPLES,
  knapsack: KNAPSACK_CODE_SAMPLES,
  lcs: LCS_CODE_SAMPLES,
};

const COMPLEXITY: Record<Problem, { best: string; average: string; worst: string; space: string }> = {
  fibonacci: { best: "O(n)", average: "O(n)", worst: "O(n)", space: "O(n) → O(1) rolling" },
  knapsack: { best: "O(nW)", average: "O(nW)", worst: "O(nW)", space: "O(nW) → O(W) rolling" },
  lcs: { best: "O(nm)", average: "O(nm)", worst: "O(nm)", space: "O(nm) → O(min(n,m)) rolling" },
};

const QUIZ: QuizQuestion[] = [
  {
    question: "What's the core difference between memoization and tabulation?",
    options: [
      "They always produce different answers",
      "Memoization is top-down (recurse, cache results as you go); tabulation is bottom-up (iteratively fill a table from the base cases up)",
      "Tabulation only works on 1D problems",
      "Memoization doesn't use extra memory",
    ],
    correctIndex: 1,
    explanation:
      "Both avoid recomputing overlapping subproblems, but memoization follows the natural recursive call structure and caches on the way back up, while tabulation builds the table iteratively from the smallest subproblems first — which is exactly what the grid fill order in this visualizer shows.",
  },
  {
    question: "In the 0/1 Knapsack DP, why does dp[i][w] only ever depend on row i-1?",
    options: [
      "Because the table is filled in a random order",
      "Because each item can be used at most once — once you decide whether item i is in the optimal solution for capacity w, the remaining decision only involves items 1..i-1, which is exactly row i-1",
      "It's an implementation detail with no deeper reason",
      "Because capacity must always increase",
    ],
    correctIndex: 1,
    explanation:
      "The '0/1' in 0/1 Knapsack means each item is used 0 or 1 times. dp[i][w] represents the best value using only the first i items — so both the 'skip item i' and 'take item i' transitions can only reference dp[i-1][...], never dp[i][...] itself (that would let you reuse the item).",
  },
  {
    question: "Why does the LCS table only ever grow by 1 along the diagonal, never elsewhere?",
    options: [
      "It's a coincidence of the example strings used",
      "dp[i][j] = dp[i-1][j-1] + 1 only fires on an exact character match — every other transition takes the max of a neighbor, which can't increase the value beyond what's already been found",
      "The +1 happens on every cell regardless of match",
      "LCS doesn't actually use a diagonal dependency",
    ],
    correctIndex: 1,
    explanation:
      "A character match is the only event that can extend the common subsequence, and it can only extend the subsequence found for the characters immediately before both pointers — hence dp[i-1][j-1], the diagonal neighbor.",
  },
  {
    question: "A student writes dp[i][j] = dp[i-1][j-1] + 1 whenever a[i] == b[j] (using i and j directly as string indices, not i-1/j-1). What's wrong?",
    options: [
      "Nothing — it's equivalent",
      "It's an off-by-one error: dp is indexed 0..n by convention where dp[0][*] and dp[*][0] represent an empty prefix, so the character actually being compared at dp[i][j] is a[i-1] and b[j-1], not a[i] and b[j]",
      "It would only fail on empty strings",
      "dp tables can't use 1-indexed conventions",
    ],
    correctIndex: 1,
    explanation:
      "This is one of the most common DP bugs: mixing up the DP table's 1-indexed convention (where row/col 0 means 'zero characters considered') with the underlying string's 0-indexed characters. dp[i][j] compares the i-th and j-th characters, which are a[i-1] and b[j-1] in a 0-indexed string.",
  },
];

export default function DynamicProgrammingPage() {
  const [problem, setProblem] = useState<Problem>("fibonacci");
  const [fibN, setFibN] = useState(6);
  const setModuleProgress = useProgressStore((s) => s.setModuleProgress);

  useEffect(() => {
    setModuleProgress(MODULE_SLUG, { percent: 40 });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const steps = useMemo(() => {
    switch (problem) {
      case "fibonacci":
        return fibonacciSteps(fibN);
      case "knapsack":
        return knapsackSteps(KNAPSACK_ITEMS, KNAPSACK_CAPACITY);
      case "lcs":
        return lcsSteps(LCS_STRING_A, LCS_STRING_B);
    }
  }, [problem, fibN]);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[1fr_480px] gap-8 px-4 sm:px-6 py-8 max-w-[1400px] mx-auto">
      <div className="flex flex-col gap-10 min-w-0">
        <header>
          <div className="flex items-center gap-2 mb-2">
            <Badge variant="cyan">Technique</Badge>
            <Badge variant="neutral">Essential — FAANG interviews</Badge>
          </div>
          <h1 className="text-2xl font-bold font-mono-data">Dynamic Programming</h1>
          <p className="text-text-muted mt-2 text-sm max-w-xl">
            Break a problem into overlapping subproblems, solve each one exactly once, and
            reuse the answer instead of recomputing it. Three classic shapes — 1D
            (Fibonacci), 2D decision (0/1 Knapsack), and 2D string alignment (LCS) — cover
            the core DP intuition tested in almost every interview loop.
          </p>
        </header>

        <TheorySection title="Intuition">
          <p>
            A problem is a DP candidate when it has two properties:{" "}
            <strong>optimal substructure</strong> (the best answer to the whole problem is
            built from the best answers to smaller pieces of it) and{" "}
            <strong>overlapping subproblems</strong> (naive recursion would solve the exact
            same smaller problem many times — Fibonacci(5) needs Fibonacci(3) both through
            Fibonacci(4) and directly).
          </p>
          <p>
            <strong>Memoization</strong> (top-down) keeps the natural recursive structure
            and adds a cache: check the cache first, recurse only on a miss, store the
            result before returning. <strong>Tabulation</strong> (bottom-up) flips this —
            iteratively fill a table starting from the base cases, so every cell is
            computed exactly once and in an order where its dependencies already exist.
            This module visualizes tabulation, since the fill order is what makes the
            dependency structure visible.
          </p>
          <p>
            Every DP problem reduces to answering one question: what does cell{" "}
            <code className="font-mono-data text-cyan">dp[...]</code> depend on? Once
            that recurrence is right, the rest is just picking an iteration order that
            respects it.
          </p>
        </TheorySection>

        <TheorySection title="Formal Definition">
          <p>
            A DP solution is fully specified by four things: (1) the{" "}
            <strong>state</strong> — what does a table cell represent (e.g.{" "}
            <code className="font-mono-data text-cyan">dp[i][w]</code> = best value using
            the first i items with capacity w); (2) the{" "}
            <strong>base case(s)</strong> — the smallest states, solvable directly without
            recursion; (3) the <strong>transition/recurrence</strong> — how a cell&apos;s value
            is derived from earlier cells; (4) the <strong>answer</strong> — which cell (or
            combination of cells) holds the final result.
          </p>
        </TheorySection>

        <TheorySection title="Complexity">
          <ComplexityTable
            rows={[
              { operation: "Fibonacci — 1D tabulation", ...COMPLEXITY.fibonacci },
              { operation: "0/1 Knapsack — 2D tabulation", ...COMPLEXITY.knapsack },
              { operation: "LCS — 2D tabulation", ...COMPLEXITY.lcs },
            ]}
          />
          <p className="text-xs text-text-muted">
            The table size is always (number of states), and each cell does O(1) work
            given its dependencies — so time complexity is just &quot;how many cells&quot;. Space
            can almost always be reduced by only keeping the last row/diagonal in memory,
            once you notice a cell never depends on anything more than one row back.
          </p>
        </TheorySection>

        <TheorySection title="Common Pitfalls">
          <PitfallList
            items={[
              "Off-by-one indexing between the DP table (often 1-indexed, where row/col 0 means \"zero elements considered\") and the underlying array/string (0-indexed) — dp[i][j] compares a[i-1] and b[j-1], not a[i] and b[j].",
              "Wrong or missing base cases — Fibonacci needs both dp[0] and dp[1] seeded before the recurrence works; Knapsack and LCS both need their entire base row/column filled, not just a single cell.",
              "Choosing an iteration order that visits a cell before its dependencies are filled — always double check the recurrence only ever points to earlier-filled cells.",
              "Reaching for DP when a greedy or divide-and-conquer approach is simpler and provably correct — DP is the fallback for when greedy's local choice can't be proven globally optimal.",
              "Forgetting that 0/1 Knapsack requires iterating capacity in a direction (or using a 2D table entirely, as here) that prevents reusing the same item twice — an unbounded-knapsack bug is one of the most common DP mistakes.",
            ]}
          />
        </TheorySection>

        <TheorySection title="When to Use vs Not">
          <WhenToUse
            use={[
              "The problem asks for an optimum (min/max/count) over choices with overlapping subproblems — \"minimum cost to...\", \"number of ways to...\", \"longest/shortest ...\".",
              "A greedy choice can be shown to be locally optimal but not globally optimal — DP explores the space greedy would prematurely commit out of.",
              "The recursive brute-force solution is correct but exponential purely due to repeated subproblem calls (not due to trying every combination independently).",
            ]}
            avoid={[
              "A greedy algorithm is provably optimal for the problem (e.g. interval scheduling, Huffman coding) — DP would just be slower for the same answer.",
              "The state space is enormous with no useful overlap — DP tables that would need to be exponentially large aren't a valid trade for exponential recursion.",
              "The problem is really a graph shortest-path in disguise where Dijkstra/BFS directly applies — those are more direct than reformulating as DP.",
            ]}
          />
        </TheorySection>

        <TheorySection title="Quiz">
          <Quiz moduleSlug={MODULE_SLUG} questions={QUIZ} />
        </TheorySection>
      </div>

      <div className="lg:sticky lg:top-20 self-start flex flex-col gap-4 min-w-0">
        <GlassCard className="!py-3 !px-4">
          <div className="flex flex-col gap-3">
            <span className="text-xs font-mono-data text-text-muted">Example:</span>
            <div className="flex flex-wrap gap-1.5">
              {(Object.keys(PROBLEM_LABELS) as Problem[]).map((key) => (
                <Button
                  key={key}
                  variant={problem === key ? "primary" : "ghost"}
                  size="sm"
                  onClick={() => setProblem(key)}
                >
                  {PROBLEM_LABELS[key]}
                </Button>
              ))}
            </div>
            {problem === "fibonacci" && (
              <Slider
                label="n"
                value={fibN}
                min={3}
                max={12}
                step={1}
                onChange={setFibN}
              />
            )}
            {problem === "knapsack" && (
              <p className="text-[11px] font-mono-data text-text-muted">
                Items: {KNAPSACK_ITEMS.map((it) => `${it.name}(wt ${it.weight}, val ${it.value})`).join(", ")} — capacity {KNAPSACK_CAPACITY}
              </p>
            )}
            {problem === "lcs" && (
              <p className="text-[11px] font-mono-data text-text-muted">
                Comparing &quot;{LCS_STRING_A}&quot; against &quot;{LCS_STRING_B}&quot;
              </p>
            )}
          </div>
        </GlassCard>

        {steps && (
          <VisualizerEngine
            key={problem + (problem === "fibonacci" ? fibN : "")}
            steps={steps}
            codeSamples={CODE_SAMPLES[problem]}
            onComplete={() => setModuleProgress(MODULE_SLUG, { percent: 80 })}
          >
            {(state) => <DPTableView state={state} />}
          </VisualizerEngine>
        )}
      </div>
    </div>
  );
}
