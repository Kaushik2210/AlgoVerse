"use client";

import { useEffect, useMemo, useState } from "react";
import GlassCard from "@/components/ui/GlassCard";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import ComplexityTable from "@/components/ui/ComplexityTable";
import { TheorySection, PitfallList, WhenToUse } from "@/components/ui/TheorySection";
import Quiz, { type QuizQuestion } from "@/components/ui/Quiz";
import VisualizerEngine from "@/components/visualizers/VisualizerEngine";
import HashTableView from "@/components/visualizers/HashTableView";
import { insertManySteps, lookupSteps } from "@/lib/algorithms/hashTable";
import { HASH_TABLE_CODE_SAMPLES } from "@/lib/codeSamples/hashTable";
import { useProgressStore } from "@/lib/store/progress";

const MODULE_SLUG = "hash-tables";

type Op = "insert" | "lookup";

const OP_LABELS: Record<Op, string> = {
  insert: "Insert (build table)",
  lookup: "Lookup",
};

const DEFAULT_KEYS = "cat, dog, ant, owl, fox, bee, cow, elk, bat";

const QUIZ: QuizQuestion[] = [
  {
    question: "What causes a collision in a hash table?",
    options: [
      "Two different keys hashing to the same bucket index",
      "Inserting the same key twice",
      "The table running out of memory",
      "Using a string key instead of a number key",
    ],
    correctIndex: 0,
    explanation:
      "A hash function maps a huge key space down to a small number of buckets, so by the pigeonhole principle, different keys will sometimes land on the same index — that's a collision.",
  },
  {
    question: "With separate chaining, what happens when a collision occurs?",
    options: [
      "The insert silently fails",
      "The new entry is appended to a list stored at that bucket, alongside any existing entries",
      "The table immediately resizes",
      "The old entry is overwritten",
    ],
    correctIndex: 1,
    explanation:
      "Chaining keeps a small list (or linked list) per bucket. A collision just means that bucket's chain grows by one — lookups then scan the chain to find the exact key.",
  },
  {
    question: "Why does a hash table resize (and rehash every key) once the load factor gets too high?",
    options: [
      "To save memory",
      "To keep chains short — as load factor grows, more keys pile into fewer buckets, degrading O(1) average lookups toward O(n)",
      "It's required by the JavaScript spec",
      "To make iteration order deterministic",
    ],
    correctIndex: 1,
    explanation:
      "Average-case O(1) operations depend on chains staying short. If size/numBuckets keeps growing, chains get long and every operation starts approaching O(n). Doubling the bucket count and rehashing keeps the load factor — and chain lengths — bounded.",
  },
];

export default function HashTablesPage() {
  const [op, setOp] = useState<Op>("insert");
  const [keysText, setKeysText] = useState(DEFAULT_KEYS);
  const [target, setTarget] = useState("fox");
  const setModuleProgress = useProgressStore((s) => s.setModuleProgress);

  useEffect(() => {
    setModuleProgress(MODULE_SLUG, { percent: 40 });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const keys = useMemo(
    () =>
      keysText
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean),
    [keysText]
  );

  const steps = useMemo(() => {
    if (keys.length === 0) return undefined;
    return op === "insert" ? insertManySteps(keys) : lookupSteps(keys, target || keys[0]);
  }, [op, keys, target]);

  const codeSamples = HASH_TABLE_CODE_SAMPLES[op];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[1fr_480px] gap-8 px-4 sm:px-6 py-8 max-w-[1400px] mx-auto">
      <div className="flex flex-col gap-10 min-w-0">
        <header>
          <div className="flex items-center gap-2 mb-2">
            <Badge variant="cyan">Data Structure</Badge>
            <Badge variant="neutral">Intermediate</Badge>
          </div>
          <h1 className="text-2xl font-bold font-mono-data">Hash Tables</h1>
          <p className="text-text-muted mt-2 text-sm max-w-xl">
            A key-value structure that trades a little memory for average O(1)
            insert/lookup/delete — by converting any key into a bucket index via a
            hash function, then handling the inevitable collisions.
          </p>
        </header>

        <TheorySection title="Intuition">
          <p>
            Imagine a wall of labeled cubbyholes. Instead of scanning every cubby to
            find your item, a <strong>hash function</strong> converts your key
            directly into a cubby number — so you go straight there. That&apos;s the whole
            trick: turn &quot;where is this?&quot; from a search problem into a
            calculation.
          </p>
          <p>
            The catch: two different keys can hash to the same cubby (a{" "}
            <strong>collision</strong>). This module visualizes the most common fix —{" "}
            <strong>separate chaining</strong>, where each bucket holds a small list of
            everything that landed there — plus what happens when the table gets too
            crowded: it <strong>resizes</strong> (grows the bucket count) and{" "}
            <strong>rehashes</strong> every existing key into the new, larger table.
          </p>
        </TheorySection>

        <TheorySection title="Formal Definition">
          <p>
            A hash table maintains an array of <code className="font-mono-data text-cyan">numBuckets</code>{" "}
            slots. A hash function{" "}
            <code className="font-mono-data text-cyan">h(key) → [0, numBuckets)</code>{" "}
            maps any key to a bucket index. Each bucket holds a chain (list) of
            entries that hashed there. The{" "}
            <strong>load factor</strong>{" "}
            <code className="font-mono-data text-cyan">size / numBuckets</code>{" "}
            measures how full the table is on average; once it crosses a threshold
            (commonly 0.75), the table doubles its bucket count and re-inserts every
            key, since each key&apos;s bucket depends on{" "}
            <code className="font-mono-data text-cyan">numBuckets</code>.
          </p>
        </TheorySection>

        <TheorySection title="Complexity">
          <ComplexityTable
            rows={[
              { operation: "Insert (average)", best: "O(1)", average: "O(1)", worst: "O(n)", space: "O(1)" },
              { operation: "Lookup (average)", best: "O(1)", average: "O(1)", worst: "O(n)", space: "O(1)" },
              { operation: "Delete (average)", best: "O(1)", average: "O(1)", worst: "O(n)", space: "O(1)" },
              { operation: "Resize + rehash", best: "O(n)", average: "O(n)", worst: "O(n)", space: "O(n)" },
            ]}
          />
          <p className="text-xs text-text-muted mt-2">
            Worst case (O(n)) only happens with a pathological hash function that
            sends every key to the same bucket — a good hash function makes this
            vanishingly rare in practice.
          </p>
        </TheorySection>

        <TheorySection title="Common Pitfalls">
          <PitfallList
            items={[
              "Using a poor hash function that clusters keys into a few buckets — collapses average O(1) toward worst-case O(n).",
              "Forgetting that resizing means every key's bucket index changes — you must rehash all of them, not just move them as-is.",
              "Mutating a key after inserting it (e.g. mutating an object used as a key) — its hash no longer matches the bucket it's stored in.",
              "Assuming hash table iteration order is insertion order — it generally isn't (though some languages/runtimes special-case this).",
            ]}
          />
        </TheorySection>

        <TheorySection title="When to Use vs Not">
          <WhenToUse
            use={[
              "Fast membership checks / deduplication (sets) or key-value lookups (maps, caches, memoization).",
              "You don't care about ordering and need average O(1) reads/writes.",
              "Counting frequencies, grouping, or building an index from a large dataset.",
            ]}
            avoid={[
              "You need sorted order or range queries — a balanced BST or sorted array wins.",
              "Keys aren't easily hashable or hash collisions would be adversarially exploitable.",
              "Memory is extremely tight — hash tables trade space for speed via extra bucket overhead.",
            ]}
          />
        </TheorySection>

        <TheorySection title="Quiz">
          <Quiz moduleSlug={MODULE_SLUG} questions={QUIZ} />
        </TheorySection>
      </div>

      <div className="lg:sticky lg:top-20 self-start flex flex-col gap-4 min-w-0">
        <GlassCard className="!py-3 !px-4">
          <div className="flex flex-wrap gap-2 mb-3">
            {(Object.keys(OP_LABELS) as Op[]).map((o) => (
              <Button
                key={o}
                size="sm"
                variant={op === o ? "primary" : "secondary"}
                onClick={() => setOp(o)}
              >
                {OP_LABELS[o]}
              </Button>
            ))}
          </div>
          <div className="flex flex-col gap-1.5">
            <label htmlFor="keys" className="text-xs font-mono-data text-text-muted">
              Keys to insert (comma separated):
            </label>
            <input
              id="keys"
              value={keysText}
              onChange={(e) => setKeysText(e.target.value)}
              className="glass rounded-lg px-3 py-2 text-sm font-mono-data outline-none focus:border-cyan/50"
              placeholder="e.g. cat, dog, ant, owl"
            />
          </div>
          {op === "lookup" && (
            <div className="mt-3 flex items-center gap-2">
              <label htmlFor="target" className="text-xs font-mono-data text-text-muted">
                Key to find:
              </label>
              <input
                id="target"
                value={target}
                onChange={(e) => setTarget(e.target.value)}
                className="w-28 glass rounded-lg px-2 py-1 text-sm font-mono-data outline-none"
              />
            </div>
          )}
        </GlassCard>

        {steps && (
          <VisualizerEngine
            key={`${op}-${keys.join(",")}-${target}`}
            steps={steps}
            codeSamples={codeSamples}
            onComplete={() => setModuleProgress(MODULE_SLUG, { percent: 80 })}
          >
            {(state) => <HashTableView state={state} />}
          </VisualizerEngine>
        )}
      </div>
    </div>
  );
}
