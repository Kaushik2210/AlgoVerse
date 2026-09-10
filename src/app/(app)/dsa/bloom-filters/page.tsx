"use client";

import { useEffect, useMemo, useState } from "react";
import GlassCard from "@/components/ui/GlassCard";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import ComplexityTable from "@/components/ui/ComplexityTable";
import { TheorySection, PitfallList, WhenToUse } from "@/components/ui/TheorySection";
import Quiz, { type QuizQuestion } from "@/components/ui/Quiz";
import VisualizerEngine from "@/components/visualizers/VisualizerEngine";
import BloomFilterView from "@/components/visualizers/BloomFilterView";
import { insertManySteps, lookupSteps, BLOOM_FILTER_CODE } from "@/lib/algorithms/bloomFilter";
import { useProgressStore } from "@/lib/store/progress";

const MODULE_SLUG = "bloom-filters";

type Op = "insert" | "lookup";

const OP_LABELS: Record<Op, string> = {
  insert: "Insert",
  lookup: "Lookup",
};

// Curated so that "fish" reads as a false positive: its 3 hash bits are each
// independently set by cat, lion, and dog — even though fish was never
// inserted. "tiger" is a genuine true negative (one of its bits is unset).
const M = 26;
const K = 3;
const DEFAULT_ITEMS = ["cat", "dog", "lion"];
const FALSE_POSITIVE_WORD = "fish";

const QUIZ: QuizQuestion[] = [
  {
    question: "A bloom filter lookup says an item 'might be in the set.' What can go wrong?",
    options: [
      "Nothing — the answer is always exactly correct",
      "It could be a false positive — the item was never inserted, but all its bits happen to be set by other items",
      "It could be a false negative — the item was inserted but the filter says no",
      "The filter might crash",
    ],
    correctIndex: 1,
    explanation:
      "Bloom filters trade certainty for space: a 'maybe' answer can be a false positive, but a 'definitely not' answer is always correct — false negatives never happen.",
  },
  {
    question: "Why can a bloom filter never produce a false negative?",
    options: [
      "It stores the actual items, not just hashes",
      "Inserting an item always sets its bits to 1, and those bits are never cleared — so a truly inserted item's bits are always found set",
      "It re-hashes on every lookup",
      "It uses a checksum to verify",
    ],
    correctIndex: 1,
    explanation:
      "Once an item is inserted, all k of its bits are set to 1 and (in a standard bloom filter) never unset — so checking those same bits later will always find them set.",
  },
  {
    question: "What happens to the false-positive rate as more items are inserted into a fixed-size bit array?",
    options: [
      "It stays exactly the same",
      "It decreases",
      "It increases — more set bits means more chances for an uninserted item's bits to all coincidentally be set",
      "It becomes zero after enough insertions",
    ],
    correctIndex: 2,
    explanation:
      "As the bit array fills up with 1s, the odds that a random item's k hash positions all happen to already be set go up — this is exactly the false-positive mechanism.",
  },
  {
    question: "Why use multiple hash functions instead of just one?",
    options: [
      "It's not necessary — one is just as good",
      "Multiple independent hashes reduce the false-positive rate — an uninserted item is far less likely to have ALL k positions coincidentally set than just one",
      "It makes insertion O(1) instead of O(k)",
      "It allows deletion",
    ],
    correctIndex: 1,
    explanation:
      "One hash function alone would give a high false-positive rate. Requiring k independent hashes to all agree sharply cuts the odds of a coincidental match.",
  },
];

export default function BloomFiltersPage() {
  const [op, setOp] = useState<Op>("insert");
  const [itemsText, setItemsText] = useState(DEFAULT_ITEMS.join(", "));
  const [items, setItems] = useState<string[]>(DEFAULT_ITEMS);
  const [lookupTarget, setLookupTarget] = useState(FALSE_POSITIVE_WORD);
  const setModuleProgress = useProgressStore((s) => s.setModuleProgress);

  useEffect(() => {
    setModuleProgress(MODULE_SLUG, { percent: 40 });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function applyItems() {
    const parsed = itemsText
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean);
    if (parsed.length > 0) setItems(parsed);
  }

  const steps = useMemo(() => {
    switch (op) {
      case "insert":
        return insertManySteps(items, M, K);
      case "lookup":
        return lookupSteps(items, lookupTarget, M, K);
    }
  }, [op, items, lookupTarget]);

  const code = BLOOM_FILTER_CODE[op];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[1fr_480px] gap-8 px-4 sm:px-6 py-8 max-w-[1400px] mx-auto">
      <div className="flex flex-col gap-10 min-w-0">
        <header>
          <div className="flex items-center gap-2 mb-2">
            <Badge variant="cyan">Data Structure</Badge>
            <Badge variant="neutral">Advanced</Badge>
          </div>
          <h1 className="text-2xl font-bold font-mono-data">Bloom Filters</h1>
          <p className="text-text-muted mt-2 text-sm max-w-xl">
            A space-efficient probabilistic structure for set membership — it
            can say &quot;definitely not in the set&quot; with certainty, but
            &quot;possibly in the set&quot; can occasionally be wrong. That
            trade-off is the entire point.
          </p>
        </header>

        <TheorySection title="Intuition">
          <p>
            Storing a huge set exactly (in a hash table or tree) costs memory
            proportional to the number of items. A bloom filter instead uses a
            small, fixed-size bit array and accepts a controlled chance of
            error in exchange for using far less space — often a small
            constant number of bits per item, regardless of how large the
            items themselves are.
          </p>
          <p>
            Inserting an item runs it through <code className="font-mono-data text-cyan">k</code>{" "}
            independent hash functions, each producing a bit index, and sets
            all <code className="font-mono-data text-cyan">k</code> bits to 1. Looking up an item
            checks those same <code className="font-mono-data text-cyan">k</code> bits: if{" "}
            <em>any</em> of them is 0, the item is definitely not in the set —
            no false negatives, ever. If <em>all</em> are 1, the item is
            probably in the set — but those bits could have been set by some
            combination of other items, giving a false positive.
          </p>
        </TheorySection>

        <TheorySection title="Formal Definition">
          <p>
            A bloom filter is a bit array{" "}
            <code className="font-mono-data text-cyan">B</code> of size{" "}
            <code className="font-mono-data text-cyan">m</code>, all initialized to 0, plus{" "}
            <code className="font-mono-data text-cyan">k</code> independent hash functions{" "}
            <code className="font-mono-data text-cyan">h₁ ... hₖ</code>, each mapping an item to an
            index in <code className="font-mono-data text-cyan">[0, m)</code>.
          </p>
          <p>
            <strong>Insert(x)</strong>: for each{" "}
            <code className="font-mono-data text-cyan">i</code> in <code className="font-mono-data text-cyan">1..k</code>,
            set <code className="font-mono-data text-cyan">B[hᵢ(x)] = 1</code>.
          </p>
          <p>
            <strong>MightContain(x)</strong>: return true only if{" "}
            <code className="font-mono-data text-cyan">B[hᵢ(x)] = 1</code> for every{" "}
            <code className="font-mono-data text-cyan">i</code> in <code className="font-mono-data text-cyan">1..k</code>. A
            false result is always correct; a true result can be a false
            positive.
          </p>
        </TheorySection>

        <TheorySection title="Complexity">
          <ComplexityTable
            rows={[
              { operation: "Insert", best: "O(k)", average: "O(k)", worst: "O(k)", space: "O(1) per item" },
              { operation: "Lookup", best: "O(1)", average: "O(k)", worst: "O(k)", space: "O(1)" },
              { operation: "Overall structure", best: "-", average: "-", worst: "-", space: "O(m) bits total" },
            ]}
          />
          <p className="text-xs text-text-muted">
            Both operations touch exactly k bits — constant relative to how
            many items have been inserted, which is the whole appeal versus a
            hash set that grows with the data.
          </p>
        </TheorySection>

        <TheorySection title="Common Pitfalls">
          <PitfallList
            items={[
              "Treating a positive lookup as certain — it's only 'possibly in the set'; always account for the false-positive rate in your design.",
              "Trying to delete an item by clearing its bits — that can also unset bits shared with other items, silently turning them into false negatives (use a counting bloom filter if deletion is needed).",
              "Picking too few hash functions or too small a bit array for the expected item count — the false-positive rate grows fast as the array fills up.",
              "Using hash functions that aren't independent enough — correlated hashes collide together, defeating the point of using multiple functions.",
            ]}
          />
        </TheorySection>

        <TheorySection title="When to Use vs Not">
          <WhenToUse
            use={[
              "You need a fast 'have I seen this before' check over a huge set and can tolerate a small false-positive rate (e.g. checking a cache before an expensive disk/network lookup).",
              "Memory is at a premium and exact membership isn't required — databases (e.g. to skip disk reads for keys that definitely don't exist) and web crawlers (avoid re-visiting URLs) use this heavily.",
              "You never need to enumerate the set's contents — a bloom filter can't list what's inside it, only answer membership questions.",
            ]}
            avoid={[
              "You need zero false positives — use a hash set or tree instead.",
              "You need to delete items — a standard bloom filter offers no safe way to unset bits.",
              "You need to retrieve the actual items, not just check membership — bloom filters store no data, only hashed presence.",
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
          <div className="flex gap-2">
            <input
              value={itemsText}
              onChange={(e) => setItemsText(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && applyItems()}
              aria-label="Items to insert, comma separated"
              placeholder="e.g. cat, dog, lion"
              className="flex-1 glass rounded-lg px-3 py-2 text-sm font-mono-data outline-none focus:border-cyan/50"
            />
            <Button variant="secondary" size="sm" onClick={applyItems}>
              Apply
            </Button>
          </div>
          <p className="text-[11px] text-text-muted mt-1.5 font-mono-data">
            m = {M} bits, k = {K} hash functions. Default set is curated so
            looking up &quot;{FALSE_POSITIVE_WORD}&quot; demonstrates a real
            false positive.
          </p>
          {op === "lookup" && (
            <div className="mt-3 flex items-center gap-2 flex-wrap">
              <label className="text-xs font-mono-data text-text-muted">Lookup:</label>
              <input
                type="text"
                value={lookupTarget}
                onChange={(e) => setLookupTarget(e.target.value)}
                className="w-28 glass rounded-lg px-2 py-1 text-sm font-mono-data outline-none"
              />
              <Button variant="ghost" size="sm" onClick={() => setLookupTarget(FALSE_POSITIVE_WORD)}>
                Try the false positive
              </Button>
            </div>
          )}
        </GlassCard>

        {steps && (
          <VisualizerEngine
            key={`${op}-${items.join(",")}-${lookupTarget}`}
            steps={steps}
            code={code}
            onComplete={() => setModuleProgress(MODULE_SLUG, { percent: 80 })}
          >
            {(state) => <BloomFilterView state={state} />}
          </VisualizerEngine>
        )}
      </div>
    </div>
  );
}
