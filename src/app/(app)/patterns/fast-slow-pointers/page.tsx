"use client";

import { useEffect, useMemo } from "react";
import Badge from "@/components/ui/Badge";
import GlassCard from "@/components/ui/GlassCard";
import { TheorySection, PitfallList } from "@/components/ui/TheorySection";
import ProblemList, { type Problem } from "@/components/ui/ProblemList";
import VisualizerEngine from "@/components/visualizers/VisualizerEngine";
import LinkedListView from "@/components/visualizers/LinkedListView";
import { fastSlowMiddleSteps } from "@/lib/algorithms/patterns";
import { PATTERN_CODE_SAMPLES } from "@/lib/codeSamples/patterns";
import { useProgressStore } from "@/lib/store/progress";
import problems from "@/data/problems.json";

const MODULE_SLUG = "fast-slow-pointers";
const DEMO_VALUES = [4, 8, 15, 16, 23, 42, 7];

export default function FastSlowPointersPage() {
  const setModuleProgress = useProgressStore((s) => s.setModuleProgress);
  const completeModule = useProgressStore((s) => s.completeModule);

  useEffect(() => {
    setModuleProgress(MODULE_SLUG, { percent: 50 });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const steps = useMemo(() => fastSlowMiddleSteps(DEMO_VALUES), []);

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 flex flex-col gap-10">
      <header>
        <div className="flex items-center gap-2 mb-2">
          <Badge variant="violet">Pattern</Badge>
          <Badge variant="neutral">Linked Lists</Badge>
        </div>
        <h1 className="text-2xl font-bold font-mono-data">Fast &amp; Slow Pointers</h1>
        <p className="text-text-muted mt-2 text-sm max-w-xl">
          Also called &quot;Floyd&apos;s tortoise and hare&quot; — run two pointers through
          a linked list at different speeds. Their relative positions reveal structure
          (the middle, a cycle, its length) in a single O(n) pass with O(1) space.
        </p>
      </header>

      <TheorySection title="Recognition Signals">
        <PitfallList
          items={[
            "You're working with a linked list (or any 'next pointer' style chain) and need the middle, a cycle, or the k-th-from-end node.",
            "The brute-force approach needs to know the total length first, or uses O(n) extra memory (a hash set of visited nodes) to detect a cycle.",
            "A problem can be reframed as 'follow a next function repeatedly' — even without an explicit linked list (e.g. detecting a numeric cycle).",
            "You want O(1) extra space instead of two full passes or an auxiliary visited-set.",
          ]}
        />
      </TheorySection>

      <TheorySection title="Visual Blueprint">
        <p>
          Below: <strong>finding the middle of a linked list</strong>. Slow advances one
          node per tick, fast advances two. When fast runs out of nodes, slow is
          sitting exactly in the middle — because it has covered exactly half the
          distance fast has.
        </p>
        <p>
          The same race also detects cycles (<strong>Floyd&apos;s cycle detection</strong>):
          if the list loops back on itself, the faster pointer eventually laps the
          slower one and they land on the same node. If fast ever hits{" "}
          <code className="font-mono-data text-cyan">null</code> instead, there&apos;s no
          cycle. A flat node chain can&apos;t visually represent a real loop, so that
          case is shown as code only below — the mechanics are identical to the middle-
          finding race above, just with an equality check added each tick.
        </p>
      </TheorySection>

      <VisualizerEngine
        steps={steps}
        codeSamples={PATTERN_CODE_SAMPLES.fastSlowMiddle}
        onComplete={() => completeModule(MODULE_SLUG)}
      >
        {(state) => <LinkedListView state={state} />}
      </VisualizerEngine>

      <TheorySection title="Annotated Code Template">
        <GlassCard>
          <pre className="font-mono-data text-xs leading-relaxed whitespace-pre-wrap">
{`function fastSlowTemplate(head) {
  let slow = head;
  let fast = head;

  // Loop while fast (and fast.next) can still advance
  while (fast && fast.next) {
    slow = slow.next;       // 1 step
    fast = fast.next.next;  // 2 steps

    // For cycle detection: they meet -> there's a loop
    if (slow === fast) return true;
  }

  // fast reached the end -> slow is at the middle / no cycle exists
  return slow;
}`}
          </pre>
        </GlassCard>
        <p className="text-xs text-text-muted mt-2">
          For cycle detection specifically, see <code className="font-mono-data text-cyan">hasCycle</code>{" "}
          in the code panel above.
        </p>
      </TheorySection>

      <TheorySection title="Curated Problems">
        <ProblemList problems={problems["fast-slow-pointers"] as Problem[]} />
      </TheorySection>
    </div>
  );
}
