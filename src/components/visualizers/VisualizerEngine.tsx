"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import {
  Play,
  Pause,
  SkipBack,
  SkipForward,
  RotateCcw,
  StepBack,
  StepForward,
} from "lucide-react";
import GlassCard from "@/components/ui/GlassCard";
import Button from "@/components/ui/Button";
import Slider from "@/components/ui/Slider";
import CodePanel from "@/components/visualizers/CodePanel";
import CodeTabs from "@/components/ui/CodeTabs";
import type { StepSequence } from "@/lib/algorithms/types";
import type { CodeSamples } from "@/lib/codeSamples/types";
import { cn } from "@/lib/utils";

interface VisualizerEngineProps<T> {
  steps: StepSequence<T>;
  code?: string;
  /** Multi-language code samples (JS/Python/Java/C++). Takes priority over `code`. */
  codeSamples?: CodeSamples;
  /** Render prop for the actual visual (array bars, tree, linked list, ...) */
  children: (state: T, stepIndex: number) => React.ReactNode;
  /** Called once when the last step is reached during playback or manual navigation */
  onComplete?: () => void;
  className?: string;
}

const SPEED_MIN = 0.5;
const SPEED_MAX = 4;
const BASE_INTERVAL_MS = 900;

export default function VisualizerEngine<T>({
  steps,
  code,
  codeSamples,
  children,
  onComplete,
  className,
}: VisualizerEngineProps<T>) {
  const [index, setIndex] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [speed, setSpeed] = useState(1);
  const containerRef = useRef<HTMLDivElement>(null);
  const completedRef = useRef(false);

  const lastIndex = steps.length - 1;
  const step = steps[Math.min(index, lastIndex)];

  const goTo = useCallback(
    (i: number) => {
      const clamped = Math.max(0, Math.min(lastIndex, i));
      setIndex(clamped);
      if (clamped === lastIndex && !completedRef.current) {
        completedRef.current = true;
        onComplete?.();
      }
    },
    [lastIndex, onComplete]
  );

  const stepForward = useCallback(() => goTo(index + 1), [goTo, index]);
  const stepBack = useCallback(() => goTo(index - 1), [goTo, index]);
  const reset = useCallback(() => {
    setPlaying(false);
    setIndex(0);
  }, []);

  useEffect(() => {
    if (!playing) return;
    if (index >= lastIndex) {
      // eslint-disable-next-line react-hooks/set-state-in-effect -- stop autoplay once the sequence naturally ends
      setPlaying(false);
      return;
    }
    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    const interval = (reduceMotion ? BASE_INTERVAL_MS * 1.5 : BASE_INTERVAL_MS) / speed;
    const id = setTimeout(() => goTo(index + 1), interval);
    return () => clearTimeout(id);
  }, [playing, index, lastIndex, speed, goTo]);

  function onKeyDown(e: React.KeyboardEvent) {
    if (e.key === "ArrowRight") {
      e.preventDefault();
      stepForward();
    } else if (e.key === "ArrowLeft") {
      e.preventDefault();
      stepBack();
    } else if (e.code === "Space") {
      e.preventDefault();
      setPlaying((p) => !p);
    } else if (e.key.toLowerCase() === "r") {
      reset();
    }
  }

  const atEnd = index >= lastIndex;
  const atStart = index === 0;

  return (
    <div
      ref={containerRef}
      onKeyDown={onKeyDown}
      tabIndex={0}
      className={cn("flex flex-col gap-4 outline-none", className)}
      aria-label="Algorithm visualizer"
    >
      {/* visual stage */}
      <GlassCard className="min-h-[280px] flex items-center justify-center p-6">
        {children(step.state, index)}
      </GlassCard>

      {/* narration */}
      <GlassCard className="!py-3 !px-4">
        <p className="font-mono-data text-sm text-foreground/90" aria-live="polite">
          <span className="text-cyan mr-1.5">&gt;</span>
          {step.narration}
        </p>
      </GlassCard>

      {/* stats + controls */}
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto] gap-4 items-start">
        <GlassCard className="!py-3 !px-4">
          <div className="flex flex-wrap gap-x-6 gap-y-1">
            {step.stats &&
              Object.entries(step.stats).map(([k, v]) => (
                <div key={k} className="flex items-baseline gap-1.5 font-mono-data text-xs">
                  <span className="text-text-muted uppercase tracking-wide">{k}</span>
                  <span className="text-cyan font-semibold text-sm">{v}</span>
                </div>
              ))}
            {!step.stats && (
              <span className="text-xs text-text-muted">No stats for this step.</span>
            )}
            <div className="ml-auto font-mono-data text-xs text-text-muted">
              step {index + 1} / {steps.length}
            </div>
          </div>
        </GlassCard>
      </div>

      <GlassCard className="!py-3 !px-4 flex flex-col sm:flex-row items-center gap-4">
        <div className="flex items-center gap-1.5">
          <Button
            variant="ghost"
            size="icon"
            aria-label="Reset"
            onClick={reset}
          >
            <RotateCcw size={16} />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            aria-label="Jump to start"
            disabled={atStart}
            onClick={() => goTo(0)}
          >
            <SkipBack size={16} />
          </Button>
          <Button
            variant="secondary"
            size="icon"
            aria-label="Step back"
            disabled={atStart}
            onClick={stepBack}
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
            onClick={stepForward}
          >
            <StepForward size={16} />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            aria-label="Jump to end"
            disabled={atEnd}
            onClick={() => goTo(lastIndex)}
          >
            <SkipForward size={16} />
          </Button>
        </div>

        <div className="flex-1 w-full sm:max-w-xs">
          <Slider
            label="Speed"
            value={speed}
            min={SPEED_MIN}
            max={SPEED_MAX}
            step={0.5}
            onChange={setSpeed}
            formatValue={(v) => `${v}x`}
          />
        </div>

        <div className="flex-1 w-full">
          <input
            type="range"
            min={0}
            max={lastIndex}
            value={index}
            onChange={(e) => goTo(Number(e.target.value))}
            aria-label="Scrub through steps"
            className="w-full h-1.5 rounded-full appearance-none cursor-pointer outline-none accent-violet"
          />
        </div>
      </GlassCard>

      {codeSamples ? (
        <CodeTabs codeSamples={codeSamples} highlightedLine={step.highlightedLine} />
      ) : (
        code && <CodePanel code={code} highlightedLine={step.highlightedLine} />
      )}
    </div>
  );
}
