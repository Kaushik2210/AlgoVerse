"use client";

import { useCallback, useEffect, useState } from "react";
import { Play, Pause, RotateCcw, StepForward, StepBack } from "lucide-react";
import GlassCard from "@/components/ui/GlassCard";
import Button from "@/components/ui/Button";
import ArrayBars from "@/components/visualizers/ArrayBars";
import type { SortAlgo, SortVizState } from "@/lib/algorithms/sorting";
import { SORT_LABELS } from "@/lib/algorithms/sorting";
import type { StepSequence } from "@/lib/algorithms/types";
import { cn } from "@/lib/utils";

interface Racer {
  algo: SortAlgo;
  steps: StepSequence<SortVizState>;
}

const BASE_INTERVAL_MS = 500;

/**
 * Drives 2-3 sort step-sequences off ONE shared "tick" instead of one index
 * per algorithm — each racer clamps to its own step count, so an algorithm
 * that finishes in fewer steps visibly finishes first. That's the actual
 * race: same clock, different step counts.
 */
export default function SortRaceView({ racers }: { racers: Racer[] }) {
  const [tick, setTick] = useState(0);
  const [playing, setPlaying] = useState(false);

  const maxLen = Math.max(...racers.map((r) => r.steps.length));
  const lastTick = maxLen - 1;

  const goTo = useCallback(
    (t: number) => setTick(Math.max(0, Math.min(lastTick, t))),
    [lastTick]
  );

  useEffect(() => {
    if (!playing) return;
    if (tick >= lastTick) {
      // eslint-disable-next-line react-hooks/set-state-in-effect -- stop autoplay once every racer has finished
      setPlaying(false);
      return;
    }
    const id = setTimeout(() => goTo(tick + 1), BASE_INTERVAL_MS);
    return () => clearTimeout(id);
  }, [playing, tick, lastTick, goTo]);

  const reset = () => {
    setPlaying(false);
    setTick(0);
  };

  const atEnd = tick >= lastTick;
  const atStart = tick === 0;

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-4">
        {racers.map((racer) => {
          const clampedIdx = Math.min(tick, racer.steps.length - 1);
          const step = racer.steps[clampedIdx];
          const finished = clampedIdx === racer.steps.length - 1;
          return (
            <GlassCard key={racer.algo} className={cn("!py-3 !px-4", finished && "border-violet/50")}>
              <div className="flex items-center justify-between mb-2">
                <span
                  className={cn(
                    "font-mono-data text-xs font-semibold uppercase tracking-wide",
                    finished ? "text-violet" : "text-cyan"
                  )}
                >
                  {SORT_LABELS[racer.algo]} {finished && "— done"}
                </span>
                <div className="flex gap-4 font-mono-data text-[11px] text-text-muted">
                  <span>
                    comparisons <span className="text-cyan font-semibold">{step.state.comparisons}</span>
                  </span>
                  <span>
                    swaps <span className="text-amber font-semibold">{step.state.swaps}</span>
                  </span>
                </div>
              </div>
              <ArrayBars state={step.state} />
            </GlassCard>
          );
        })}
      </div>

      <GlassCard className="!py-3 !px-4 flex items-center gap-3">
        <Button variant="ghost" size="icon" aria-label="Reset" onClick={reset}>
          <RotateCcw size={16} />
        </Button>
        <Button
          variant="secondary"
          size="icon"
          aria-label="Step back"
          disabled={atStart}
          onClick={() => goTo(tick - 1)}
        >
          <StepBack size={16} />
        </Button>
        <Button
          variant="primary"
          size="icon"
          aria-label={playing ? "Pause" : "Play"}
          disabled={atEnd && !playing}
          onClick={() => setPlaying((p) => !p)}
        >
          {playing ? <Pause size={16} /> : <Play size={16} />}
        </Button>
        <Button
          variant="secondary"
          size="icon"
          aria-label="Step forward"
          disabled={atEnd}
          onClick={() => goTo(tick + 1)}
        >
          <StepForward size={16} />
        </Button>
        <div className="flex-1">
          <input
            type="range"
            min={0}
            max={lastTick}
            value={tick}
            onChange={(e) => goTo(Number(e.target.value))}
            aria-label="Scrub through the race"
            className="w-full h-1.5 rounded-full appearance-none cursor-pointer outline-none accent-violet"
          />
        </div>
        <span className="font-mono-data text-xs text-text-muted shrink-0">
          tick {tick + 1} / {maxLen}
        </span>
      </GlassCard>
    </div>
  );
}
