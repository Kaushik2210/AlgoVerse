import type { StepSequence } from "./types";

export interface BloomFilterVizState {
  bits: boolean[];
  m: number;
  k: number;
  /** which bit index each hash function currently points to, in hash-function order */
  activeIndices?: number[];
  /** narration-friendly per-hash-function labels, e.g. "h2("cat") = 17" */
  hashLabels?: string[];
  itemLabel?: string;
  mode?: "insert" | "lookup";
  /** lookup only: whether every relevant bit was already set */
  allSet?: boolean;
  /** lookup only: true when allSet is true but the item was never actually inserted */
  isFalsePositive?: boolean;
}

const SEEDS = [17, 53, 97];

/** djb2-style string hash seeded differently per hash function, kept small and deterministic. */
function hashWith(key: string, seed: number, m: number): number {
  let h = seed >>> 0;
  for (let i = 0; i < key.length; i++) {
    h = (Math.imul(h, 31) + key.charCodeAt(i)) >>> 0;
  }
  return h % m;
}

export function bitIndices(key: string, m: number, k: number): number[] {
  return SEEDS.slice(0, k).map((seed) => hashWith(key, seed, m));
}

function snap(state: BloomFilterVizState): BloomFilterVizState {
  return { ...state, bits: [...state.bits] };
}

// ---------------------------------------------------------------------------
// Insert many items — for each, compute its k hash indices and set those bits.
// ---------------------------------------------------------------------------
export function insertManySteps(items: string[], m: number, k: number): StepSequence<BloomFilterVizState> {
  const bits = new Array(m).fill(false);
  const steps: StepSequence<BloomFilterVizState> = [];

  steps.push({
    state: snap({ bits, m, k }),
    narration: `Empty bit array of size ${m}. Inserting ${items.length} item(s), each hashed by ${k} independent hash functions.`,
    highlightedLine: 1,
  });

  for (const item of items) {
    const indices = bitIndices(item, m, k);
    const labels = indices.map((idx, i) => `h${i + 1}("${item}") = ${idx}`);
    steps.push({
      state: snap({ bits, m, k, activeIndices: indices, hashLabels: labels, itemLabel: item, mode: "insert" }),
      narration: `Hashing "${item}": ${labels.join(", ")}.`,
      highlightedLine: 3,
    });
    for (const idx of indices) bits[idx] = true;
    steps.push({
      state: snap({ bits, m, k, activeIndices: indices, hashLabels: labels, itemLabel: item, mode: "insert" }),
      narration: `Set bit${indices.length > 1 ? "s" : ""} [${indices.join(", ")}] to 1 for "${item}". These bits are now shared with anything else that happens to hash to the same positions.`,
      highlightedLine: 5,
    });
  }

  steps.push({
    state: snap({ bits, m, k }),
    narration: `Insertion complete. ${bits.filter(Boolean).length} of ${m} bits are set.`,
    highlightedLine: 7,
    stats: { bitsSet: bits.filter(Boolean).length, m, k },
  });
  return steps;
}

// ---------------------------------------------------------------------------
// Lookup — build the filter silently, then check the target's k bits.
// A "yes" answer can be a false positive: every bit happens to be set by
// some *combination* of other inserted items, even though the target itself
// was never inserted. A "no" answer (any bit is 0) is always correct — bloom
// filters never produce false negatives.
// ---------------------------------------------------------------------------
export function lookupSteps(items: string[], target: string, m: number, k: number): StepSequence<BloomFilterVizState> {
  const bits = new Array(m).fill(false);
  for (const item of items) for (const idx of bitIndices(item, m, k)) bits[idx] = true;

  const steps: StepSequence<BloomFilterVizState> = [];
  const wasInserted = items.includes(target);

  steps.push({
    state: snap({ bits, m, k }),
    narration: `Filter built from ${items.length} inserted item(s). Checking whether "${target}" might be a member.`,
    highlightedLine: 1,
  });

  const indices = bitIndices(target, m, k);
  const labels = indices.map((idx, i) => `h${i + 1}("${target}") = ${idx}`);
  steps.push({
    state: snap({ bits, m, k, activeIndices: indices, hashLabels: labels, itemLabel: target, mode: "lookup" }),
    narration: `Hashing "${target}": ${labels.join(", ")}.`,
    highlightedLine: 3,
  });

  const bitValues = indices.map((idx) => bits[idx]);
  for (let i = 0; i < indices.length; i++) {
    const idx = indices[i];
    steps.push({
      state: snap({
        bits,
        m,
        k,
        activeIndices: indices.slice(0, i + 1),
        hashLabels: labels,
        itemLabel: target,
        mode: "lookup",
      }),
      narration: `Checking bit ${idx}: ${bits[idx] ? "set (1)" : "unset (0)"}.${!bits[idx] ? ` "${target}" is definitely not a member — bloom filters never give false negatives.` : ""}`,
      highlightedLine: 5,
    });
    if (!bits[idx]) {
      steps.push({
        state: snap({ bits, m, k, activeIndices: indices, hashLabels: labels, itemLabel: target, mode: "lookup", allSet: false }),
        narration: `Result: "${target}" is definitely NOT in the set.`,
        highlightedLine: 8,
      });
      return steps;
    }
  }

  const allSet = bitValues.every(Boolean);
  const isFalsePositive = allSet && !wasInserted;
  steps.push({
    state: snap({
      bits,
      m,
      k,
      activeIndices: indices,
      hashLabels: labels,
      itemLabel: target,
      mode: "lookup",
      allSet,
      isFalsePositive,
    }),
    narration: isFalsePositive
      ? `All ${k} bits are set — but "${target}" was never inserted! Each bit was independently set by a different item (${items.join(", ")}), and they happen to line up. This is a false positive — the whole reason bloom filters only promise "possibly in the set" for a hit.`
      : `All ${k} bits are set — "${target}" is possibly in the set (and here, it genuinely was inserted).`,
    highlightedLine: 8,
    stats: { bitsChecked: k, allSet: allSet ? "yes" : "no" },
  });
  return steps;
}

export const BLOOM_FILTER_CODE: Record<string, string> = {
  insert: `function insert(bits, item, hashFns) {
  for (const h of hashFns) {
    bits[h(item) % bits.length] = 1; // set every hash's bit
  }
}`,
  lookup: `function mightContain(bits, item, hashFns) {
  for (const h of hashFns) {
    if (!bits[h(item) % bits.length]) return false; // definitely not a member
  }
  return true; // possibly a member — could be a false positive
}`,
};
