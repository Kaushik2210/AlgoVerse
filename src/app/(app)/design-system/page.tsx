"use client";

import { useState } from "react";
import GlassCard from "@/components/ui/GlassCard";
import Button from "@/components/ui/Button";
import ProgressRing from "@/components/ui/ProgressRing";
import Slider from "@/components/ui/Slider";
import Badge from "@/components/ui/Badge";

export default function DesignSystemPage() {
  const [sliderVal, setSliderVal] = useState(1.5);

  return (
    <div className="max-w-5xl mx-auto px-6 py-10 flex flex-col gap-10">
      <header>
        <h1 className="text-2xl font-bold font-mono-data">
          Design <span className="text-cyan text-glow-cyan">System</span>
        </h1>
        <p className="text-text-muted mt-1 text-sm">
          Every primitive AlgoVerse is built from. Dark-first, glassy, neon accents
          with strict semantic meaning.
        </p>
      </header>

      {/* Semantic colors */}
      <section>
        <h2 className="text-sm font-mono-data uppercase tracking-wider text-text-muted mb-3">
          Semantic Accents
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <GlassCard glow="cyan">
            <div className="h-2 w-2 rounded-full bg-cyan mb-3" />
            <p className="font-semibold text-cyan">Cyan · #00F0FF</p>
            <p className="text-xs text-text-muted mt-1">Active pointer / current index</p>
          </GlassCard>
          <GlassCard glow="violet">
            <div className="h-2 w-2 rounded-full bg-violet mb-3" />
            <p className="font-semibold text-violet">Violet · #A855F7</p>
            <p className="text-xs text-text-muted mt-1">Visited node</p>
          </GlassCard>
          <GlassCard glow="amber">
            <div className="h-2 w-2 rounded-full bg-amber mb-3" />
            <p className="font-semibold text-amber">Amber · #FFB020</p>
            <p className="text-xs text-text-muted mt-1">Target / found</p>
          </GlassCard>
        </div>
      </section>

      {/* Glass cards */}
      <section>
        <h2 className="text-sm font-mono-data uppercase tracking-wider text-text-muted mb-3">
          Glass Cards
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <GlassCard tilt>
            <p className="font-semibold mb-1">Tilt on hover</p>
            <p className="text-xs text-text-muted">
              Micro-interaction card — hover to see the subtle 3D tilt.
            </p>
          </GlassCard>
          <GlassCard>
            <p className="font-semibold mb-1">Static panel</p>
            <p className="text-xs text-text-muted">
              backdrop-blur + subtle border, no motion by default.
            </p>
          </GlassCard>
        </div>
      </section>

      {/* Buttons */}
      <section>
        <h2 className="text-sm font-mono-data uppercase tracking-wider text-text-muted mb-3">
          Buttons
        </h2>
        <GlassCard className="flex flex-wrap items-center gap-3">
          <Button variant="primary">Primary</Button>
          <Button variant="secondary">Secondary</Button>
          <Button variant="ghost">Ghost</Button>
          <Button variant="danger">Danger</Button>
          <Button variant="primary" size="sm">
            Small
          </Button>
        </GlassCard>
      </section>

      {/* Badges */}
      <section>
        <h2 className="text-sm font-mono-data uppercase tracking-wider text-text-muted mb-3">
          Badges
        </h2>
        <GlassCard className="flex flex-wrap gap-2">
          <Badge variant="cyan">O(n)</Badge>
          <Badge variant="violet">Visited</Badge>
          <Badge variant="amber">Found</Badge>
          <Badge variant="neutral">Easy</Badge>
        </GlassCard>
      </section>

      {/* Progress rings */}
      <section>
        <h2 className="text-sm font-mono-data uppercase tracking-wider text-text-muted mb-3">
          Progress Rings
        </h2>
        <GlassCard className="flex flex-wrap items-center gap-6">
          <ProgressRing percent={35} color="cyan" />
          <ProgressRing percent={68} color="violet" />
          <ProgressRing percent={100} color="amber" />
        </GlassCard>
      </section>

      {/* Slider */}
      <section>
        <h2 className="text-sm font-mono-data uppercase tracking-wider text-text-muted mb-3">
          Slider
        </h2>
        <GlassCard className="max-w-sm">
          <Slider
            label="Playback speed"
            value={sliderVal}
            min={0.5}
            max={4}
            step={0.5}
            onChange={setSliderVal}
            formatValue={(v) => `${v}x`}
          />
        </GlassCard>
      </section>

      <section>
        <h2 className="text-sm font-mono-data uppercase tracking-wider text-text-muted mb-3">
          Command Palette
        </h2>
        <GlassCard>
          <p className="text-sm text-text-muted">
            Press <kbd className="rounded border border-glass-border-token px-1.5 py-0.5 text-xs">Ctrl K</kbd> anywhere
            to jump between structures, patterns and pages.
          </p>
        </GlassCard>
      </section>
    </div>
  );
}
