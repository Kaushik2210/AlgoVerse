import type { StepSequence } from "./types";

export interface HashEntry {
  id: string;
  key: string;
}

export interface HashTableVizState {
  /** one chain (array of entries) per bucket */
  buckets: HashEntry[][];
  numBuckets: number;
  size: number;
  loadFactor: number;
  /** bucket index currently being written to / scanned */
  activeBucket?: number;
  /** entry id currently highlighted within a chain (collision walk, found match) */
  activeEntry?: string;
  /** narration-friendly string showing the hash computation, e.g. "hash("cat") % 8 = 3" */
  hashLabel?: string;
  /** true only on the step where a resize just happened */
  justResized?: boolean;
}

let idCounter = 0;
function nid() {
  idCounter++;
  return `h${idCounter}`;
}

function snap(state: HashTableVizState): HashTableVizState {
  return { ...state, buckets: state.buckets.map((chain) => [...chain]) };
}

const RESIZE_THRESHOLD = 0.75;

/** djb2-ish string hash, kept small/deterministic for teaching purposes */
export function hashString(key: string, numBuckets: number): number {
  let h = 0;
  for (let i = 0; i < key.length; i++) {
    h = (h * 31 + key.charCodeAt(i)) >>> 0;
  }
  return h % numBuckets;
}

function makeEmptyBuckets(n: number): HashEntry[][] {
  return Array.from({ length: n }, () => []);
}

// ---------------------------------------------------------------------------
// Insert many keys in sequence, showing hashing, collision chaining, and
// resize+rehash whenever the load factor crosses the threshold.
// ---------------------------------------------------------------------------
export function insertManySteps(
  keys: string[],
  initialBuckets = 4
): StepSequence<HashTableVizState> {
  let numBuckets = initialBuckets;
  let buckets = makeEmptyBuckets(numBuckets);
  const steps: StepSequence<HashTableVizState> = [];
  let size = 0;

  steps.push({
    state: snap({ buckets, numBuckets, size, loadFactor: 0 }),
    narration: `Empty hash table with ${numBuckets} buckets. Inserting ${keys.length} key(s).`,
    highlightedLine: 1,
    stats: { buckets: numBuckets, size: 0, loadFactor: "0.00" },
  });

  for (const key of keys) {
    const idx = hashString(key, numBuckets);
    steps.push({
      state: snap({
        buckets,
        numBuckets,
        size,
        loadFactor: size / numBuckets,
        activeBucket: idx,
        hashLabel: `hash("${key}") % ${numBuckets} = ${idx}`,
      }),
      narration: `Hashing "${key}" → bucket ${idx}.`,
      highlightedLine: 3,
      stats: { buckets: numBuckets, size, loadFactor: (size / numBuckets).toFixed(2) },
    });

    const existing = buckets[idx].find((e) => e.key === key);
    if (existing) {
      steps.push({
        state: snap({
          buckets,
          numBuckets,
          size,
          loadFactor: size / numBuckets,
          activeBucket: idx,
          activeEntry: existing.id,
        }),
        narration: `"${key}" already exists in bucket ${idx} — value updated in place, no growth.`,
        highlightedLine: 5,
        stats: { buckets: numBuckets, size, loadFactor: (size / numBuckets).toFixed(2) },
      });
      continue;
    }

    if (buckets[idx].length > 0) {
      steps.push({
        state: snap({
          buckets,
          numBuckets,
          size,
          loadFactor: size / numBuckets,
          activeBucket: idx,
        }),
        narration: `Collision — bucket ${idx} already holds ${buckets[idx].length} entr${buckets[idx].length === 1 ? "y" : "ies"}. Chaining "${key}" onto the end.`,
        highlightedLine: 7,
        stats: { buckets: numBuckets, size, loadFactor: (size / numBuckets).toFixed(2) },
      });
    }

    const entry: HashEntry = { id: nid(), key };
    buckets[idx] = [...buckets[idx], entry];
    size++;

    steps.push({
      state: snap({
        buckets,
        numBuckets,
        size,
        loadFactor: size / numBuckets,
        activeBucket: idx,
        activeEntry: entry.id,
      }),
      narration: `Inserted "${key}" into bucket ${idx}. Load factor now ${(size / numBuckets).toFixed(2)}.`,
      highlightedLine: 8,
      stats: { buckets: numBuckets, size, loadFactor: (size / numBuckets).toFixed(2) },
    });

    if (size / numBuckets > RESIZE_THRESHOLD) {
      const oldBuckets = buckets;
      const oldNum = numBuckets;
      numBuckets = numBuckets * 2;
      steps.push({
        state: snap({ buckets: oldBuckets, numBuckets: oldNum, size, loadFactor: size / oldNum }),
        narration: `Load factor exceeded ${RESIZE_THRESHOLD} — resizing from ${oldNum} to ${numBuckets} buckets and rehashing every entry.`,
        highlightedLine: 10,
        stats: { buckets: oldNum, size, loadFactor: (size / oldNum).toFixed(2) },
      });

      const newBuckets = makeEmptyBuckets(numBuckets);
      for (const chain of oldBuckets) {
        for (const e of chain) {
          const newIdx = hashString(e.key, numBuckets);
          newBuckets[newIdx] = [...newBuckets[newIdx], e];
        }
      }
      buckets = newBuckets;
      steps.push({
        state: snap({
          buckets,
          numBuckets,
          size,
          loadFactor: size / numBuckets,
          justResized: true,
        }),
        narration: `Rehash complete. Every key now lands in a bucket based on the new bucket count. Load factor dropped to ${(size / numBuckets).toFixed(2)}.`,
        highlightedLine: 11,
        stats: { buckets: numBuckets, size, loadFactor: (size / numBuckets).toFixed(2) },
      });
    }
  }

  steps.push({
    state: snap({ buckets, numBuckets, size, loadFactor: size / numBuckets }),
    narration: `All ${keys.length} key(s) inserted. Final table: ${numBuckets} buckets, ${size} entries.`,
    highlightedLine: 13,
    stats: { buckets: numBuckets, size, loadFactor: (size / numBuckets).toFixed(2) },
  });

  return steps;
}

// ---------------------------------------------------------------------------
// Lookup — build the table silently, then walk the target bucket's chain.
// ---------------------------------------------------------------------------
export function lookupSteps(keys: string[], target: string, initialBuckets = 4): StepSequence<HashTableVizState> {
  // Build the table with the same growth logic, but don't emit build steps.
  let numBuckets = initialBuckets;
  let buckets = makeEmptyBuckets(numBuckets);
  let size = 0;
  for (const key of keys) {
    const idx = hashString(key, numBuckets);
    if (!buckets[idx].some((e) => e.key === key)) {
      buckets[idx] = [...buckets[idx], { id: nid(), key }];
      size++;
      if (size / numBuckets > RESIZE_THRESHOLD) {
        const oldBuckets = buckets;
        numBuckets *= 2;
        const newBuckets = makeEmptyBuckets(numBuckets);
        for (const chain of oldBuckets) {
          for (const e of chain) {
            const newIdx = hashString(e.key, numBuckets);
            newBuckets[newIdx] = [...newBuckets[newIdx], e];
          }
        }
        buckets = newBuckets;
      }
    }
  }

  const steps: StepSequence<HashTableVizState> = [];
  steps.push({
    state: snap({ buckets, numBuckets, size, loadFactor: size / numBuckets }),
    narration: `Table built with ${size} keys across ${numBuckets} buckets. Looking up "${target}".`,
    highlightedLine: 1,
    stats: { buckets: numBuckets, size, loadFactor: (size / numBuckets).toFixed(2) },
  });

  const idx = hashString(target, numBuckets);
  steps.push({
    state: snap({
      buckets,
      numBuckets,
      size,
      loadFactor: size / numBuckets,
      activeBucket: idx,
      hashLabel: `hash("${target}") % ${numBuckets} = ${idx}`,
    }),
    narration: `Hashing "${target}" → bucket ${idx}. Only that bucket's chain needs scanning.`,
    highlightedLine: 3,
    stats: { buckets: numBuckets, size, loadFactor: (size / numBuckets).toFixed(2) },
  });

  const chain = buckets[idx];
  for (const entry of chain) {
    steps.push({
      state: snap({
        buckets,
        numBuckets,
        size,
        loadFactor: size / numBuckets,
        activeBucket: idx,
        activeEntry: entry.id,
      }),
      narration: `Comparing against "${entry.key}" in the chain.`,
      highlightedLine: 5,
      stats: { buckets: numBuckets, size, loadFactor: (size / numBuckets).toFixed(2) },
    });
    if (entry.key === target) {
      steps.push({
        state: snap({
          buckets,
          numBuckets,
          size,
          loadFactor: size / numBuckets,
          activeBucket: idx,
          activeEntry: entry.id,
        }),
        narration: `Found "${target}" in bucket ${idx}.`,
        highlightedLine: 6,
        stats: { buckets: numBuckets, size, loadFactor: (size / numBuckets).toFixed(2) },
      });
      return steps;
    }
  }

  steps.push({
    state: snap({ buckets, numBuckets, size, loadFactor: size / numBuckets, activeBucket: idx }),
    narration: `Reached the end of bucket ${idx}'s chain — "${target}" is not in the table.`,
    highlightedLine: 8,
    stats: { buckets: numBuckets, size, loadFactor: (size / numBuckets).toFixed(2) },
  });
  return steps;
}

export const HASH_TABLE_CODE: Record<string, string> = {
  insert: `function insert(table, key) {
  const idx = hash(key) % table.numBuckets;
  const chain = table.buckets[idx]; // collisions live here

  if (chain.some((e) => e.key === key)) return; // update, no growth

  chain.push({ key });
  table.size++;

  if (table.size / table.numBuckets > 0.75) {
    resize(table); // double buckets, rehash every key
  }
}`,
  lookup: `function lookup(table, key) {
  const idx = hash(key) % table.numBuckets;
  const chain = table.buckets[idx];
  for (const entry of chain) {
    if (entry.key === key) return entry;
  }
  return undefined; // walked the whole chain, not found
}`,
};
