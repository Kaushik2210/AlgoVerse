"use client";

import { useEffect, useMemo } from "react";
import Badge from "@/components/ui/Badge";
import GlassCard from "@/components/ui/GlassCard";
import { TheorySection, PitfallList } from "@/components/ui/TheorySection";
import ProblemList, { type Problem } from "@/components/ui/ProblemList";
import VisualizerEngine from "@/components/visualizers/VisualizerEngine";
import BSTView from "@/components/visualizers/BSTView";
import { treeBfsDemoSteps } from "@/lib/algorithms/patterns";
import { PATTERN_CODE_SAMPLES } from "@/lib/codeSamples/patterns";
import { useProgressStore } from "@/lib/store/progress";
import problems from "@/data/problems.json";

const MODULE_SLUG = "tree-bfs";
const DEMO_VALUES = [8, 3, 10, 1, 6, 14, 4, 7, 13];

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

      <TheorySection title="Curated Problems">
        <ProblemList problems={problems["tree-bfs"] as Problem[]} />
      </TheorySection>
    </div>
  );
}
