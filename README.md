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
- Twenty-five fully fleshed out reference modules: **Arrays & Sorting**,
  **Linked Lists**, **Binary Search Trees**, **Stacks**, **Queues**, **Hash
  Tables**, **Heaps**, **Graphs**, **Tries**, **Union-Find**, **Shortest
  Paths (Dijkstra)**, **Backtracking**, **AVL Trees**, **Red-Black Trees**,
  **Segment Trees**, **Fenwick Trees**, **Skip Lists**, **Bloom Filters**,
  **LRU Cache**, **Minimum Spanning Tree (Prim's & Kruskal's)**,
  **Topological Sort**, **Bellman-Ford**, **Floyd-Warshall**, **Dynamic
  Programming**, **Sorting Algorithms** — theory, complexity tables,
  pitfalls, a live custom-input visualizer, syntax-highlighted code, and a
  quiz. This completes the originally-planned Data Structures track
  (N-ary trees remain a minor, intentionally deferred omission — see
  roadmap).
  - Stacks cover push/pop/peek plus a balanced-parentheses LIFO demo.
  - Queues cover a simple queue and a circular queue with a live wraparound
    visualization.
  - Hash Tables visualize hashing, collision chaining as growing bucket rows, load
    factor, and resize/rehash.
  - Heaps cover min/max-heap insert (bubble up) and extract-root (bubble down),
    with a dual array + tree view kept in sync against the same underlying data.
  - Graphs cover an adjacency list representation with BFS and DFS traversal,
    visualizing the frontier expanding and the visited set growing.
  - Tries cover insert and search, with the character path lighting up as it's
    walked and a distinct end-of-word marker.
  - Union-Find covers union by rank and find with path compression, rendered
    as a forest of small trees laid out side by side, with a dedicated find()
    demo that visibly flattens a deliberately long chain.
  - Shortest Paths covers Dijkstra's algorithm on a small weighted graph, with
    a live distance table kept in sync against the graph view as nodes are
    relaxed and finalized.
  - Backtracking covers recursion via subset generation (include/exclude),
    with a growing/collapsing recursion tree synced live against an actual
    call-stack panel.
  - AVL Trees cover insert and search with explicit height/balance-factor
    recomputation and all four rotation cases (LL, RR, LR, RL), each node
    rendered with its live balance factor (delete is deferred — see roadmap).
  - Red-Black Trees cover insert and search with CLRS-style insertion fixup —
    red-uncle recoloring and black-uncle triangle/line rotations — nodes
    rendered in their actual red/black color, independent of the
    active/visited/target pointer-state ring.
  - Segment Trees cover bottom-up build, range-sum query, and point update,
    with a dual array + tree view kept in sync, distinguishing fully-in-range,
    partially-overlapping, and out-of-range nodes during a query.
  - Fenwick Trees (Binary Indexed Trees) cover build, prefix-sum query, and
    point update via the classic lowbit (`i & -i`) index walk, visualizing
    each index's responsibility range and the exact jump sequence as it
    climbs (update) or descends (query).
  - Skip Lists cover search and insert over a layered probabilistic linked
    list, with the core visual being the "drop-down" zigzag path — moving
    right along a level until the next node is too big, then dropping a
    level — that gives expected O(log n) search without any rotations.
  - Bloom Filters cover insert and lookup against a shared bit array via
    multiple hash functions, including a curated example that produces a
    genuine false positive (three independently-inserted items' bits happen
    to line up for an item that was never added) — verified against the
    actual hash implementation, not just asserted.
  - LRU Cache combines a hash map (key → node) with a doubly linked list
    (recency order), rendered in sync — get/put move nodes to the front and
    eviction removes from the back once over capacity, matching the classic
    capacity-2 trace.
  - Minimum Spanning Tree covers both Prim's (grown from a chosen start
    node, always crossing the frontier via the cheapest edge) and Kruskal's
    (globally sorted edges + union-find cycle detection) on the same
    weighted graph, with a toggle between the two — verified independently
    to produce the same total tree weight from completely different edge
    orderings.
  - Topological Sort covers Kahn's algorithm on a small DAG, visualizing
    live in-degree counts, the zero-in-degree queue, and the resulting
    linear order, reusing the graph view with directed-edge arrows.
  - Bellman-Ford covers single-source shortest paths with negative edge
    weights via repeated full-graph relaxation, with a toggle between a
    standard negative-edges-no-cycle scenario and a genuine negative-cycle
    scenario that gets correctly flagged by the extra (V-th) relaxation
    pass.
  - Floyd-Warshall covers all-pairs shortest paths via dynamic programming
    over an NxN distance matrix, with a dedicated `MatrixView` renderer
    highlighting the pivot row/column and the exact cell being checked as
    each intermediate vertex is considered — verified against Bellman-Ford
    run from every node (the demo graph has negative edges, so Dijkstra
    isn't a valid cross-check here).
  - Dynamic Programming covers three switchable examples on one shared
    `DPTableView` grid renderer — Fibonacci (1D), 0/1 Knapsack (2D), and
    Longest Common Subsequence (2D) — with the cell currently being
    computed and the earlier cell(s) it depends on both highlighted every
    step, so the recurrence relation is visible instead of just watching
    numbers appear. Hand-verified: Fibonacci(6) = 0,1,1,2,3,5,8; the
    knapsack example (weights [1,3,4,5], values [1,4,5,7], capacity 7)
    gives 9; LCS("AGGTAB", "GXTXAYB") gives 4 (classic textbook instances,
    chosen specifically because their answers are independently checkable).
  - Sorting Algorithms covers Bubble, Insertion, Selection, Merge, Quick,
    and Heap sort, with a complexity table comparing all six side by side.
    A step-through mode drives any single algorithm through the shared
    `ArrayBars` renderer; a race mode (new `SortRaceView`) runs 2-3
    algorithms at once against the same input off one shared "tick" — each
    one clamps to its own step count, so an algorithm that finishes in
    fewer steps visibly finishes first, with live (real, not placeholder)
    comparison and swap counters per algorithm. All six verified to
    produce a correctly sorted array independent of the
    step-sequence/visualization code.
- Nine pattern pages: **Two Pointers**, **Sliding Window**, **Tree BFS**,
  **Fast & Slow Pointers**, **Monotonic Stack**, **Merge Intervals**, **Top K
  Elements**, **Modified Binary Search**, **Subsets (Backtracking)** —
  recognition signals, a visual blueprint, an annotated code template, and
  curated LeetCode problems.
- **Mission Map** — collapsible skill-tree sidebar tracking per-module progress.
- **Command palette** (`Ctrl/Cmd K`) to jump to any structure, pattern, or page.
- Progress/XP/streak tracking persisted locally via Zustand.
- Light/dark theme toggle, `prefers-reduced-motion` support, keyboard-navigable
  visualizer controls.

## Roadmap

The originally-planned **Data Structures** track is now essentially
complete — every core structure and graph algorithm from the initial scope
is built, verified, and shipped. What's left is genuinely deferred, not
quietly dropped:

- **N-ary trees** — a minor omission. Every other tree variant (BST, AVL,
  Red-Black, Segment, Fenwick) is built; general N-ary trees were never
  circled back to.
- **The rest of the pattern library** — 9 patterns are built (Two Pointers,
  Sliding Window, Tree BFS, Fast & Slow Pointers, Monotonic Stack, Merge
  Intervals, Top K Elements, Modified Binary Search, Subsets/Backtracking).
  Roughly 20 more from the standard LeetCode pattern list, mostly
  DP-focused, are not started.
- **Monaco-based live code editor** — code panels are static,
  syntax-highlighted (Shiki), not editable/runnable.
- **KaTeX** for formal complexity proofs — complexity is currently shown as
  plain tables + prose, not rendered math notation.
- **Recharts-based analytics/heatmap dashboard** — progress tracking exists
  (Zustand + localStorage, Mission Map, ProgressRing) but there's no charted
  history or activity heatmap view.
- **Audio/sound design toggle** — not implemented; there is no sound in the
  app at all yet.
- **Multi-language code snippets** — every code panel is JavaScript only.
- **Gamified "boss battle" challenge mode** — XP/streak tracking exists as
  a foundation, but there's no distinct challenge-mode game loop built on
  top of it.

## Screenshots

_Coming soon._
