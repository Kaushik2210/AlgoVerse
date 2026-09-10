"use client";

import { useEffect, useMemo, useState } from "react";
import GlassCard from "@/components/ui/GlassCard";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import ComplexityTable from "@/components/ui/ComplexityTable";
import { TheorySection, PitfallList, WhenToUse } from "@/components/ui/TheorySection";
import Quiz, { type QuizQuestion } from "@/components/ui/Quiz";
import VisualizerEngine from "@/components/visualizers/VisualizerEngine";
import LRUCacheView from "@/components/visualizers/LRUCacheView";
import { runOpsSteps, LRU_CACHE_CODE, type LRUOp } from "@/lib/algorithms/lruCache";
import { useProgressStore } from "@/lib/store/progress";

const MODULE_SLUG = "lru-cache";

const DEFAULT_OPS_TEXT =
  "put 1 1, put 2 2, get 1, put 3 3, get 2, put 4 4, get 1, get 3, get 4";

function parseOps(text: string): LRUOp[] {
  return text
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean)
    .map((token) => {
      const parts = token.split(/\s+/);
      const type = parts[0].toLowerCase() === "get" ? "get" : "put";
      const key = parts[1] ?? "?";
      const value = parts[2] !== undefined ? Number(parts[2]) : undefined;
      return { type, key, value } as LRUOp;
    });
}

const QUIZ: QuizQuestion[] = [
  {
    question: "Why does an LRU cache combine a hash map with a doubly linked list, instead of using just one?",
    options: [
      "It doesn't — either one alone is sufficient",
      "The hash map gives O(1) key lookup, and the doubly linked list gives O(1) move-to-front and O(1) eviction from the back — a plain array or single structure can't do both in O(1)",
      "Linked lists are always faster than arrays",
      "Hash maps can't store duplicate values",
    ],
    correctIndex: 1,
    explanation:
      "A hash map alone can't track recency order; a linked list alone can't do O(1) key lookup (you'd have to scan). Combining them gets O(1) for every operation.",
  },
  {
    question: "On a cache hit (get on an existing key), what happens to that entry?",
    options: [
      "Nothing — reads don't affect order",
      "It's deleted and reinserted with a new key",
      "It's moved to the front of the list — it's now the most recently used",
      "It's moved to the back of the list",
    ],
    correctIndex: 2,
    explanation:
      "Any access — get or put — marks an entry as most recently used, which means moving its node to the front of the list in O(1) (it's already reachable via the hash map).",
  },
  {
    question: "When does an LRU cache evict an entry, and which one?",
    options: [
      "Randomly, whenever it feels like it",
      "The oldest-inserted entry, regardless of recent access",
      "Only on a put() that would exceed capacity — it evicts the entry at the back of the list, the least recently used",
      "The entry with the smallest value",
    ],
    correctIndex: 2,
    explanation:
      "Eviction only happens when put() would push the cache over capacity, and it always removes the back of the list — whichever entry hasn't been touched the longest.",
  },
  {
    question: "Why must the doubly linked list be doubly (not singly) linked?",
    options: [
      "It doesn't need to be — singly linked would work identically",
      "Removing an arbitrary node (on a cache hit, to move it to the front) needs O(1) access to its previous node, which only a doubly linked list provides",
      "Doubly linked lists use less memory",
      "It's required for the hash map to work",
    ],
    correctIndex: 1,
    explanation:
      "On a hit, you must unlink a node from wherever it currently sits and move it to the front. With only a 'next' pointer you'd have to scan from the head to find its predecessor — a 'prev' pointer makes that O(1).",
  },
];

export default function LRUCachePage() {
  const [capacity, setCapacity] = useState(2);
  const [opsText, setOpsText] = useState(DEFAULT_OPS_TEXT);
  const [ops, setOps] = useState<LRUOp[]>(parseOps(DEFAULT_OPS_TEXT));
  const setModuleProgress = useProgressStore((s) => s.setModuleProgress);

  useEffect(() => {
    setModuleProgress(MODULE_SLUG, { percent: 40 });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function applyOps() {
    const parsed = parseOps(opsText);
    if (parsed.length > 0) setOps(parsed);
  }

  const steps = useMemo(() => runOpsSteps(Math.max(1, capacity), ops), [capacity, ops]);
  const code = LRU_CACHE_CODE.ops;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[1fr_480px] gap-8 px-4 sm:px-6 py-8 max-w-[1400px] mx-auto">
      <div className="flex flex-col gap-10 min-w-0">
        <header>
          <div className="flex items-center gap-2 mb-2">
            <Badge variant="cyan">Data Structure</Badge>
            <Badge variant="neutral">Advanced</Badge>
          </div>
          <h1 className="text-2xl font-bold font-mono-data">LRU Cache</h1>
          <p className="text-text-muted mt-2 text-sm max-w-xl">
            A fixed-capacity cache that evicts its Least Recently Used entry
            when full — built from a hash map for O(1) lookup plus a doubly
            linked list for O(1) recency tracking, always kept in sync.
          </p>
        </header>

        <TheorySection title="Intuition">
          <p>
            A cache needs two things at once: O(1) lookup by key (a hash map
            gives you this) and a way to know, in O(1), which entry to evict
            once you&apos;re full (you need the least recently used one). Neither
            structure alone provides both — a hash map has no notion of order,
            and a plain list can&apos;t be searched in O(1).
          </p>
          <p>
            The fix is to run them side by side and keep them synchronized:
            the linked list holds the actual entries in recency order (front =
            most recently used, back = least recently used), and the hash map
            stores <code className="font-mono-data text-cyan">key → node reference</code>{" "}
            so any entry can be found and unlinked/relinked in O(1) — no
            scanning required.
          </p>
        </TheorySection>

        <TheorySection title="Formal Definition">
          <p>
            An LRU cache of capacity <code className="font-mono-data text-cyan">C</code> maintains a
            hash map <code className="font-mono-data text-cyan">map: key → node</code> and a doubly
            linked list ordered by recency of access.
          </p>
          <p>
            <strong>get(key)</strong>: if{" "}
            <code className="font-mono-data text-cyan">key ∉ map</code>, return a miss. Otherwise,
            move the corresponding node to the front of the list (mark it most
            recently used) and return its value.
          </p>
          <p>
            <strong>put(key, value)</strong>: if the key already exists, update
            its value and move it to the front. Otherwise, if the list has{" "}
            <code className="font-mono-data text-cyan">C</code> entries, remove the node at the back
            (the least recently used) from both the list and the map — then
            insert the new entry at the front of the list and record it in the
            map.
          </p>
        </TheorySection>

        <TheorySection title="Complexity">
          <ComplexityTable
            rows={[
              { operation: "get", best: "O(1)", average: "O(1)", worst: "O(1)", space: "O(1)" },
              { operation: "put", best: "O(1)", average: "O(1)", worst: "O(1)", space: "O(1)" },
              { operation: "Overall structure", best: "-", average: "-", worst: "-", space: "O(C)" },
            ]}
          />
          <p className="text-xs text-text-muted">
            Every operation is O(1) because the hash map removes the need to
            search the list, and the doubly linked list removes the need to
            shift elements — the two structures cover each other&apos;s weaknesses.
          </p>
        </TheorySection>

        <TheorySection title="Common Pitfalls">
          <PitfallList
            items={[
              "Forgetting that get() is also a 'use' — a cache hit must move the entry to the front, not just read its value.",
              "Using a singly linked list — removing an arbitrary node to move it to the front needs a prev pointer for O(1) unlinking.",
              "Evicting before checking whether the key already exists on put() — updating an existing key should never trigger eviction.",
              "Letting the hash map and linked list drift out of sync — every insert, move, and eviction must update both structures atomically.",
            ]}
          />
        </TheorySection>

        <TheorySection title="When to Use vs Not">
          <WhenToUse
            use={[
              "You need a fixed-memory cache with automatic eviction of stale entries — web caches, database query caches, LRU-based memoization.",
              "Access patterns have temporal locality (recently used items are likely to be used again soon) — LRU exploits exactly this.",
              "You need every operation to be O(1), not amortized or O(log n).",
            ]}
            avoid={[
              "Access patterns are closer to uniformly random or cyclic beyond cache size — LRU can perform worse than simpler policies (e.g. FIFO) in pathological cyclic-access cases.",
              "You need frequency-based eviction instead of recency-based — an LFU (Least Frequently Used) cache fits that better.",
              "Thread-safety across many concurrent writers matters — a naive LRU needs external locking, which can become a bottleneck.",
            ]}
          />
        </TheorySection>

        <TheorySection title="Quiz">
          <Quiz moduleSlug={MODULE_SLUG} questions={QUIZ} />
        </TheorySection>
      </div>

      <div className="lg:sticky lg:top-20 self-start flex flex-col gap-4 min-w-0">
        <GlassCard className="!py-3 !px-4">
          <div className="flex items-center gap-2 mb-3">
            <label className="text-xs font-mono-data text-text-muted">Capacity:</label>
            <input
              type="number"
              min={1}
              max={6}
              value={capacity}
              onChange={(e) => setCapacity(Number(e.target.value))}
              className="w-16 glass rounded-lg px-2 py-1 text-sm font-mono-data outline-none"
            />
          </div>
          <div className="flex gap-2">
            <input
              value={opsText}
              onChange={(e) => setOpsText(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && applyOps()}
              aria-label="Operations, comma separated, e.g. put 1 1, get 1"
              placeholder="put 1 1, get 1, put 2 2"
              className="flex-1 glass rounded-lg px-3 py-2 text-sm font-mono-data outline-none focus:border-cyan/50"
            />
            <Button variant="secondary" size="sm" onClick={applyOps}>
              Apply
            </Button>
          </div>
          <p className="text-[11px] text-text-muted mt-1.5 font-mono-data">
            format: &quot;put key value&quot; or &quot;get key&quot;, comma separated
          </p>
        </GlassCard>

        {steps && (
          <VisualizerEngine
            key={`${capacity}-${ops.map((o) => `${o.type}${o.key}${o.value ?? ""}`).join(",")}`}
            steps={steps}
            code={code}
            onComplete={() => setModuleProgress(MODULE_SLUG, { percent: 80 })}
          >
            {(state) => <LRUCacheView state={state} />}
          </VisualizerEngine>
        )}
      </div>
    </div>
  );
}
