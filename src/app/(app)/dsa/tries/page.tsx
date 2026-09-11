"use client";

import { useEffect, useMemo, useState } from "react";
import GlassCard from "@/components/ui/GlassCard";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import ComplexityTable from "@/components/ui/ComplexityTable";
import { TheorySection, PitfallList, WhenToUse } from "@/components/ui/TheorySection";
import Quiz, { type QuizQuestion } from "@/components/ui/Quiz";
import VisualizerEngine from "@/components/visualizers/VisualizerEngine";
import TrieView from "@/components/visualizers/TrieView";
import { trieInsertSteps, trieSearchSteps } from "@/lib/algorithms/trie";
import { TRIE_CODE_SAMPLES } from "@/lib/codeSamples/trie";
import { useProgressStore } from "@/lib/store/progress";

const MODULE_SLUG = "tries";

type Op = "insert" | "search";

const OP_LABELS: Record<Op, string> = {
  insert: "Insert",
  search: "Search",
};

const SEED_WORDS = ["cat", "car", "card", "care", "dog"];

const QUIZ: QuizQuestion[] = [
  {
    question: "What does each edge in a trie represent?",
    options: ["A whole word", "A single character", "A word's frequency", "A pointer to a random node"],
    correctIndex: 1,
    explanation:
      "Each edge corresponds to exactly one character. A path from the root spells out a prefix (or a full word, if the final node is marked end-of-word) one character at a time.",
  },
  {
    question: "Two words, \"car\" and \"card\", are both inserted into a trie. What do they share?",
    options: [
      "Nothing — each word gets a separate path from the root",
      "The path for \"car\" (c-a-r), since \"card\" extends it with one more node",
      "Only the root node",
      "They can't both exist in the same trie",
    ],
    correctIndex: 1,
    explanation:
      "This shared-prefix structure is the entire point of a trie: \"card\" reuses the c → a → r path already built for \"car\" and just adds a 'd' child.",
  },
  {
    question: "Why might search(\"car\") return false even though \"car\" was fully walkable in the trie?",
    options: [
      "It can't — if every character is walkable, the word exists",
      "Because the final node reached isn't marked as end-of-word — it may only be a prefix of longer words like \"card\"",
      "Tries can't distinguish between words and prefixes at all",
      "Because tries are case-sensitive",
    ],
    correctIndex: 1,
    explanation:
      "Walking every character successfully only proves the string is a valid prefix. Whether it's also a complete word depends on an explicit end-of-word marker on that final node.",
  },
  {
    question: "What's the time complexity of both insert and search in a trie, for a word of length L?",
    options: ["O(1)", "O(L)", "O(L × n) where n is the number of stored words", "O(log n)"],
    correctIndex: 1,
    explanation:
      "Both operations walk exactly L characters, one node hop each — completely independent of how many other words are stored. That's the trie's key advantage over a hash set for prefix-heavy workloads.",
  },
];

export default function TriesPage() {
  const [op, setOp] = useState<Op>("insert");
  const [word, setWord] = useState("care");
  const setModuleProgress = useProgressStore((s) => s.setModuleProgress);

  useEffect(() => {
    setModuleProgress(MODULE_SLUG, { percent: 40 });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const cleanWord = word.trim().toLowerCase().replace(/[^a-z]/g, "");

  const steps = useMemo(() => {
    if (!cleanWord) return undefined;
    switch (op) {
      case "insert":
        return trieInsertSteps(SEED_WORDS, cleanWord);
      case "search":
        return trieSearchSteps(SEED_WORDS, cleanWord);
    }
  }, [op, cleanWord]);

  const codeSamples = TRIE_CODE_SAMPLES[op];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[1fr_480px] gap-8 px-4 sm:px-6 py-8 max-w-[1400px] mx-auto">
      <div className="flex flex-col gap-10 min-w-0">
        <header>
          <div className="flex items-center gap-2 mb-2">
            <Badge variant="cyan">Data Structure</Badge>
            <Badge variant="neutral">Intermediate</Badge>
          </div>
          <h1 className="text-2xl font-bold font-mono-data">Tries (Prefix Trees)</h1>
          <p className="text-text-muted mt-2 text-sm max-w-xl">
            A tree where each edge is a single character and each root-to-node
            path spells out a prefix — purpose-built for autocomplete,
            dictionaries, and any prefix-heavy string search.
          </p>
        </header>

        <TheorySection title="Intuition">
          <p>
            Store words in a hash set and every lookup is O(L) but shares
            nothing between words — &quot;car&quot;, &quot;card&quot;, and &quot;care&quot; are three totally
            separate entries. A trie instead builds one shared tree: all three
            words walk the same c → a → r path, then branch. That shared
            structure is exactly what makes prefix queries — &quot;what words start
            with ca?&quot; — cheap: just walk to the &quot;ca&quot; node and explore everything
            beneath it.
          </p>
          <p>
            Each node needs one more bit of information beyond its children:
            whether a word actually <em>ends</em> here. Without it, you can&apos;t tell
            the difference between &quot;car&quot; being a real word and &quot;car&quot; merely being
            a prefix of &quot;card&quot;.
          </p>
        </TheorySection>

        <TheorySection title="Formal Definition">
          <p>
            A trie is a tree where each node represents a character, each edge
            from a node to its child is labeled by the next character in some
            stored string, and each node carries a boolean{" "}
            <code className="font-mono-data text-cyan">isEnd</code> flag marking
            whether the path from the root to that node spells a complete
            stored word. The root itself represents the empty prefix.
          </p>
          <p>
            Insert and search both walk one character at a time: insert creates
            missing child nodes as it goes, search fails immediately the moment
            a required child doesn&apos;t exist.
          </p>
        </TheorySection>

        <TheorySection title="Complexity">
          <ComplexityTable
            rows={[
              { operation: "Insert (word of length L)", best: "O(L)", average: "O(L)", worst: "O(L)", space: "O(L)" },
              { operation: "Search (word of length L)", best: "O(1)", average: "O(L)", worst: "O(L)", space: "O(1)" },
              { operation: "Prefix query (length L)", best: "O(1)", average: "O(L)", worst: "O(L)", space: "O(1)" },
            ]}
          />
          <p className="text-xs text-text-muted">
            Every trie operation is independent of how many words are stored —
            it only depends on the length of the word being inserted or
            searched. The tradeoff is space: a trie with heavily divergent
            words (little shared prefix structure) can use more memory than a
            flat hash set.
          </p>
        </TheorySection>

        <TheorySection title="Common Pitfalls">
          <PitfallList
            items={[
              "Forgetting the end-of-word marker — without it you can't distinguish a real stored word from a prefix of a longer one.",
              "Confusing 'search' (exact word match) with 'starts with' (prefix match) — they differ only in whether you check isEnd at the final node.",
              "Not handling case sensitivity or non-alphabetic characters consistently when normalizing input strings.",
              "Assuming a trie is always more memory-efficient than a hash set — for sparse, unrelated words with little shared prefix, node overhead can lose out.",
            ]}
          />
        </TheorySection>

        <TheorySection title="When to Use vs Not">
          <WhenToUse
            use={[
              "You need autocomplete or 'starts with' prefix queries — a trie answers these directly, a hash set can't.",
              "You're building a spell-checker or dictionary with a large, overlapping vocabulary.",
              "You need to find the longest common prefix among a set of strings.",
            ]}
            avoid={[
              "You only ever need exact-match lookups with no prefix requirement — a hash set is simpler and often more memory-efficient.",
              "Your strings are long and share almost no prefixes — node overhead outweighs the sharing benefit.",
              "Memory is extremely constrained — each node typically holds a map/array of child pointers, which adds up.",
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
          <div className="flex items-center gap-2">
            <label htmlFor="word" className="text-xs font-mono-data text-text-muted">
              {op === "insert" ? "Word to insert:" : "Word to search:"}
            </label>
            <input
              id="word"
              type="text"
              value={word}
              onChange={(e) => setWord(e.target.value)}
              className="w-32 glass rounded-lg px-2 py-1 text-sm font-mono-data outline-none"
            />
          </div>
          <p className="mt-2 text-[11px] font-mono-data text-text-muted">
            seed words: {SEED_WORDS.join(", ")}
          </p>
        </GlassCard>

        {steps && (
          <VisualizerEngine
            key={`${op}-${cleanWord}`}
            steps={steps}
            codeSamples={codeSamples}
            onComplete={() => setModuleProgress(MODULE_SLUG, { percent: 80 })}
          >
            {(state) => <TrieView state={state} />}
          </VisualizerEngine>
        )}
      </div>
    </div>
  );
}
