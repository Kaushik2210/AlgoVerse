"use client";

import { useEffect, useMemo } from "react";
import Badge from "@/components/ui/Badge";
import GlassCard from "@/components/ui/GlassCard";
import { TheorySection, PitfallList, WhenToUse } from "@/components/ui/TheorySection";
import ProblemList, { type Problem } from "@/components/ui/ProblemList";
import ComplexityTable from "@/components/ui/ComplexityTable";
import Quiz, { type QuizQuestion } from "@/components/ui/Quiz";
import VisualizerEngine from "@/components/visualizers/VisualizerEngine";
import BSTView from "@/components/visualizers/BSTView";
import { treeBfsDemoSteps } from "@/lib/algorithms/patterns";
import { PATTERN_CODE_SAMPLES } from "@/lib/codeSamples/patterns";
import { useProgressStore } from "@/lib/store/progress";
import problems from "@/data/problems.json";

const MODULE_SLUG = "tree-bfs";
const DEMO_VALUES = [8, 3, 10, 1, 6, 14, 4, 7, 13];

const QUIZ: QuizQuestion[] = [
  {
    question: "Why does draining exactly `levelSize` nodes per outer loop iteration produce level-by-level output, instead of just one long mixed queue?",
    options: [
      "It doesn't matter — the queue naturally separates levels on its own",
      "Snapshotting the queue's length before the inner loop captures exactly how many nodes belong to the current level, since their children (the next level) get enqueued during the same inner loop and would otherwise be mistaken for the current level",
      "The queue automatically sorts nodes by depth",
      "levelSize is only used for a progress bar, not correctness",
    ],
    correctIndex: 1,
    explanation:
      "Without snapshotting levelSize first, the inner loop's own enqueues (a level's children) would grow queue.length, causing the loop to accidentally consume the next level too. Capturing the size up front draws a hard boundary between 'this level' and 'what gets added while processing it'.",
  },
  {
    question: "For finding the shortest path in an unweighted tree/graph, why is BFS preferred over DFS?",
    options: [
      "DFS can't visit every node",
      "BFS explores nodes in strictly increasing distance from the source, so the first time it reaches the target is guaranteed to be via a shortest path — DFS can reach the target via a much longer path first",
      "BFS uses less memory in every case",
      "They're equivalent for this purpose",
    ],
    correctIndex: 1,
    explanation:
      "BFS processes nodes in order of distance from the source (level by level), so the very first time it discovers a node is guaranteed to be along a shortest path. DFS dives deep along one branch first and can easily reach the target via a long detour before a shorter path is even explored.",
  },
  {
    question: "What's the time and space complexity of a level-order BFS traversal on a tree with n nodes?",
    options: [
      "O(n) time, O(n) worst-case space (a level can hold up to ~n/2 nodes, e.g. the last level of a complete binary tree)",
      "O(log n) time, O(1) space",
      "O(n²) time, O(n) space",
      "O(n) time, O(log n) space",
    ],
    correctIndex: 0,
    explanation:
      "Every node is enqueued and dequeued exactly once — O(n) time. The queue's peak size is bounded by the widest level, which for a complete binary tree can be roughly n/2 nodes — so O(n) space in the worst case, unlike DFS's O(h) (height) space.",
  },
  {
    question:
      "\"Given a binary tree, return the values visible from the right side, top to bottom.\" Why does tree BFS fit this naturally?",
    options: [
      "It doesn't — this needs an in-order DFS traversal",
      "BFS processes each level in order left-to-right, so simply taking the last node visited at each level directly gives the rightmost-visible value for that level, with no extra depth bookkeeping needed",
      "The problem has nothing to do with levels",
      "Right side view requires sorting the tree first",
    ],
    correctIndex: 1,
    explanation:
      "'Right side view' is exactly 'the last node processed at each level' when nodes are visited left to right — which is precisely what BFS's level-draining loop gives you for free, without needing to separately track depth the way a DFS-based solution would.",
  },
];

export default function TreeBfsPage() {
  const setModuleProgress = useProgressStore((s) => s.setModuleProgress);
  const completeModule = useProgressStore((s) => s.completeModule);

  useEffect(() => {
    setModuleProgress(MODULE_SLUG, { percent: 50 });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const steps = useMemo(() => treeBfsDemoSteps(DEMO_VALUES), []);

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 flex flex-col gap-10">
      <header>
        <div className="flex items-center gap-2 mb-2">
          <Badge variant="violet">Pattern</Badge>
          <Badge variant="neutral">Trees / Graphs</Badge>
        </div>
        <h1 className="text-2xl font-bold font-mono-data">Tree BFS</h1>
        <p className="text-text-muted mt-2 text-sm max-w-xl">
          Traverse a tree level by level using a queue — the go-to pattern whenever
          &ldquo;shallowest,&rdquo; &ldquo;level,&rdquo; or &ldquo;shortest path in an unweighted structure&rdquo; shows
          up in a problem.
        </p>
      </header>

      <TheorySection title="Recognition Signals">
        <PitfallList
          items={[
            "The problem mentions \"level order,\" \"by level,\" or \"minimum depth.\"",
            "You need the shortest path in an unweighted tree or graph — BFS finds it first.",
            "You need to process or aggregate nodes level by level (zigzag, right-side view, level averages).",
            "A DFS solution would need to track depth and post-process, when BFS gives you the level for free.",
          ]}
        />
      </TheorySection>

      <TheorySection title="Visual Blueprint">
        <p>
          Below: a queue starts with just the root. Each iteration dequeues one
          node, visits it, then enqueues its children (left, then right) — so the
          queue always contains exactly one level&apos;s worth of &ldquo;next up&rdquo; nodes at a
          time, which is what produces the level-by-level visit order.
        </p>
      </TheorySection>

      <VisualizerEngine
        steps={steps}
        codeSamples={PATTERN_CODE_SAMPLES.treeBfs}
        onComplete={() => completeModule(MODULE_SLUG)}
      >
        {(state) => <BSTView state={state} />}
      </VisualizerEngine>

      <TheorySection title="Annotated Code Template">
        <GlassCard>
          <pre className="font-mono-data text-xs leading-relaxed whitespace-pre-wrap">
{`function treeBfsTemplate(root) {
  const result = [];
  const queue = [root];

  while (queue.length > 0) {
    const levelSize = queue.length;
    const currentLevel = [];

    // Drain exactly this level before moving to the next
    for (let i = 0; i < levelSize; i++) {
      const node = queue.shift();
      currentLevel.push(node.value);
      if (node.left) queue.push(node.left);
      if (node.right) queue.push(node.right);
    }

    result.push(currentLevel);
  }
  return result;
}`}
          </pre>
        </GlassCard>
      </TheorySection>

      <TheorySection title="Complexity">
        <ComplexityTable
          rows={[
            {
              operation: "Level-order traversal",
              best: "O(n)",
              average: "O(n)",
              worst: "O(n)",
              space: "O(w) — widest level, up to O(n)",
            },
            {
              operation: "Shortest path in unweighted graph",
              best: "O(V + E)",
              average: "O(V + E)",
              worst: "O(V + E)",
              space: "O(V)",
            },
          ]}
        />
      </TheorySection>

      <TheorySection title="When to Use vs Not">
        <WhenToUse
          use={[
            "The problem mentions 'level order', 'by level', 'minimum depth', or the shortest path in an unweighted structure.",
            "You need to process or aggregate nodes level by level — zigzag order, right-side view, level averages, connecting same-level nodes.",
            "A DFS solution would need to track depth explicitly and post-process by level, when BFS gives the level boundary for free.",
          ]}
          avoid={[
            "The graph is weighted and you need shortest path by total weight, not by edge count — that calls for Dijkstra, not plain BFS.",
            "Memory is tight and the tree is wide but shallow — DFS uses O(height) space versus BFS's O(width), which can be far larger for a bushy tree.",
            "You need path-based properties like 'all root-to-leaf paths' or backtracking-style exploration — DFS naturally tracks the current path, BFS does not.",
          ]}
        />
      </TheorySection>

      <TheorySection title="Quiz">
        <Quiz moduleSlug={MODULE_SLUG} questions={QUIZ} />
      </TheorySection>

      <TheorySection title="Curated Problems">
        <ProblemList problems={problems["tree-bfs"] as Problem[]} />
      </TheorySection>
    </div>
  );
}
