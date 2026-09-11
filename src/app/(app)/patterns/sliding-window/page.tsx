"use client";

import { useEffect, useMemo } from "react";
import Badge from "@/components/ui/Badge";
import GlassCard from "@/components/ui/GlassCard";
import { TheorySection, PitfallList } from "@/components/ui/TheorySection";
import ProblemList, { type Problem } from "@/components/ui/ProblemList";
import VisualizerEngine from "@/components/visualizers/VisualizerEngine";
import ArrayBars from "@/components/visualizers/ArrayBars";
import { slidingWindowDemoSteps } from "@/lib/algorithms/patterns";
import { PATTERN_CODE_SAMPLES } from "@/lib/codeSamples/patterns";
import { useProgressStore } from "@/lib/store/progress";
import problems from "@/data/problems.json";

const MODULE_SLUG = "sliding-window";
const DEMO_VALUES = [2, 1, 5, 1, 3, 2, 7, 4, 1];
const WINDOW_K = 3;

export default function SlidingWindowPage() {
  const setModuleProgress = useProgressStore((s) => s.setModuleProgress);
  const completeModule = useProgressStore((s) => s.completeModule);

  useEffect(() => {
    setModuleProgress(MODULE_SLUG, { percent: 50 });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const steps = useMemo(
    () => slidingWindowDemoSteps(DEMO_VALUES, WINDOW_K),
    []
  );

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 flex flex-col gap-10">
      <header>
        <div className="flex items-center gap-2 mb-2">
          <Badge variant="violet">Pattern</Badge>
          <Badge variant="neutral">Arrays / Strings</Badge>
        </div>
        <h1 className="text-2xl font-bold font-mono-data">Sliding Window</h1>
        <p className="text-text-muted mt-2 text-sm max-w-xl">
          Maintain a contiguous window over the data and slide it forward, updating
          an incremental result instead of recomputing from scratch — turns O(n·k)
          brute force into O(n).
        </p>
      </header>

      <TheorySection title="Recognition Signals">
        <PitfallList
          items={[
            "The problem asks for a \"contiguous subarray/substring\" satisfying some condition.",
            "You're looking for a max/min/count over all windows of a fixed size k.",
            "The condition is monotonic — as the window grows, it can only become more/less valid, which is what makes shrinking safe.",
            "A brute force solution recomputes a sum/count from scratch for every window position.",
          ]}
        />
      </TheorySection>

      <TheorySection title="Visual Blueprint">
        <p>
          Below: fixed-size window of size {WINDOW_K} scanning for the maximum sum
          subarray. Instead of resumming every window from scratch, each slide adds
          the incoming element and subtracts the outgoing one — O(1) per step
          instead of O(k).
        </p>
      </TheorySection>

      <VisualizerEngine
        steps={steps}
        codeSamples={PATTERN_CODE_SAMPLES.slidingWindow}
        onComplete={() => completeModule(MODULE_SLUG)}
      >
        {(state) => <ArrayBars state={state} />}
      </VisualizerEngine>

      <TheorySection title="Annotated Code Template">
        <GlassCard>
          <pre className="font-mono-data text-xs leading-relaxed whitespace-pre-wrap">
{`// Variable-size window ("expand then shrink while invalid")
function slidingWindowTemplate(arr) {
  let left = 0;
  let windowState = initialState();

  for (let right = 0; right < arr.length; right++) {
    // 1. Expand: fold arr[right] into the window state
    add(windowState, arr[right]);

    // 2. Shrink while the window violates the constraint
    while (isInvalid(windowState)) {
      remove(windowState, arr[left]);
      left++;
    }

    // 3. Window [left, right] is valid here — record the answer
    updateAnswer(left, right, windowState);
  }
}`}
          </pre>
        </GlassCard>
      </TheorySection>

      <TheorySection title="Curated Problems">
        <ProblemList problems={problems["sliding-window"] as Problem[]} />
      </TheorySection>
    </div>
  );
}
