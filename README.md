# AlgoVerse

A data structures & algorithms learning app that actually looks like a product, not a
tutorial site. Dark-mode-first, glassy HUD aesthetic, and every visualization is driven
by a single reusable step-sequence engine instead of one-off animations per topic.

Think Bloomberg Terminal meets a Vercel dashboard meets a sci-fi HUD.

## Why

Most DSA visualizers either look like a 2012 Bootstrap tutorial or bury the actual
learning under gimmicks. AlgoVerse tries to do neither: solid theory writeups, a real
step-through debugger for every algorithm (play/pause/step/scrub/speed), and a visual
language where color always means something (cyan = active pointer, violet = visited,
amber = found/target).

## Tech stack

- **Next.js 16** — App Router, TypeScript strict, Turbopack
- **Tailwind CSS v4** — CSS-first theme config
- **Framer Motion** — page transitions and micro-interactions
- **Custom SVG/Canvas** — the visualizer engine itself, no charting library
- **Zustand** — playback state + progress tracking, persisted to `localStorage`
- **Lucide React** — icons
- **next/font** — Sora (body/UI) + JetBrains Mono (code/data labels)
- **Shiki** — syntax highlighting for static code panels

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

```bash
npm run build   # production build
npm run lint    # eslint
```

## Project structure

```
src/
  app/
    (app)/                 # route group with the persistent Mission Map sidebar
      design-system/       # component showcase
      dsa/                 # data structure modules (theory + visualizer + quiz)
      patterns/            # pattern library modules
    page.tsx                # landing page
    layout.tsx               # fonts, theme, particle background, top bar
  components/
    ui/                     # GlassCard, Button, ProgressRing, Slider, Badge, CommandPalette...
    visualizers/             # the generic VisualizerEngine + per-structure renderers
    navigation/               # TopBar, MissionMap (skill-tree sidebar)
  lib/
    algorithms/               # pure algorithm implementations that emit step sequences
    store/                     # Zustand stores (theme, progress)
  data/
    problems.json              # curated LeetCode problems per pattern
```

## What's built

- Reusable **Visualizer Engine** — step-sequence driven playback controls (play/pause/
  step/scrub/speed), narration panel, live stats readout, and an optional highlighted
  code panel — shared by every visualization instead of bespoke per-topic code.
- Three fully fleshed out reference modules: **Arrays & Sorting**, **Linked Lists**,
  **Binary Search Trees** — theory, complexity tables, pitfalls, a live custom-input
  visualizer, syntax-highlighted code, and a quiz.
- Three pattern pages: **Two Pointers**, **Sliding Window**, **Tree BFS** — recognition
  signals, a visual blueprint, an annotated code template, and curated LeetCode problems.
- **Mission Map** — collapsible skill-tree sidebar tracking per-module progress.
- **Command palette** (`Ctrl/Cmd K`) to jump to any structure, pattern, or page.
- Progress/XP/streak tracking persisted locally via Zustand.
- Light/dark theme toggle, `prefers-reduced-motion` support, keyboard-navigable
  visualizer controls.

## Roadmap

This is a deliberately scoped first pass. Deferred for later:

- The full structure catalog (stacks, queues, heaps, graphs, tries, hash maps)
- The remaining pattern library (20+ patterns)
- Monaco-based live code editor
- KaTeX for formal complexity proofs
- Recharts-based analytics/heatmap dashboard
- Audio/sound design toggle
- Multi-language code snippets beyond JavaScript
- Gamified "boss battle" challenge mode

## Screenshots

_Coming soon._
