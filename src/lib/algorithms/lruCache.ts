import type { StepSequence } from "./types";

export interface LRUNode {
  id: string;
  key: string;
  value: number;
}

export interface LRUOp {
  type: "get" | "put";
  key: string;
  value?: number;
}

export interface LRUVizState {
  capacity: number;
  /** doubly linked list order, front = most recently used, back = least recently used */
  order: LRUNode[];
  /** key -> node id, mirrors the linked list contents for O(1) lookup */
  map: Record<string, string>;
  /** node id currently being touched (found, moved, inserted) */
  current?: string;
  /** node id that was just evicted (shown briefly, already removed from order) */
  evicted?: LRUNode;
  /** which operation produced this state, for narration/highlight context */
  opLabel?: string;
  hit?: boolean;
}

let idCounter = 0;
function nid() {
  idCounter++;
  return `lru${idCounter}`;
}

function snap(state: LRUVizState): LRUVizState {
  return { ...state, order: [...state.order], map: { ...state.map } };
}

// ---------------------------------------------------------------------------
// Run a sequence of get/put operations against an LRU cache of given
// capacity, recording a step for every hashmap check, list move, insertion,
// and eviction — the hashmap and linked list are always kept in sync.
// ---------------------------------------------------------------------------
export function runOpsSteps(capacity: number, ops: LRUOp[]): StepSequence<LRUVizState> {
  let order: LRUNode[] = [];
  let map: Record<string, string> = {};
  const steps: StepSequence<LRUVizState> = [];

  steps.push({
    state: snap({ capacity, order, map }),
    narration: `Empty LRU cache, capacity ${capacity}. A hash map gives O(1) key lookup; a doubly linked list tracks recency order (front = most recently used).`,
    highlightedLine: 1,
  });

  for (const op of ops) {
    if (op.type === "get") {
      const opLabel = `get(${op.key})`;
      const nodeId = map[op.key];
      steps.push({
        state: snap({ capacity, order, map, opLabel }),
        narration: `${opLabel}: check the hash map for key "${op.key}".`,
        highlightedLine: 3,
      });

      if (!nodeId) {
        steps.push({
          state: snap({ capacity, order, map, opLabel, hit: false }),
          narration: `${opLabel}: miss — "${op.key}" is not in the cache. Returns -1.`,
          highlightedLine: 5,
        });
        continue;
      }

      const node = order.find((n) => n.id === nodeId)!;
      steps.push({
        state: snap({ capacity, order, map, current: nodeId, opLabel, hit: true }),
        narration: `${opLabel}: hit — found node for "${op.key}" (value ${node.value}) via the hash map.`,
        highlightedLine: 6,
      });

      order = [node, ...order.filter((n) => n.id !== nodeId)];
      steps.push({
        state: snap({ capacity, order, map, current: nodeId, opLabel, hit: true }),
        narration: `${opLabel}: move "${op.key}" to the front of the list — it's now the most recently used. Returns ${node.value}.`,
        highlightedLine: 8,
      });
      continue;
    }

    // put
    const { key, value } = op;
    const opLabel = `put(${key}, ${value})`;
    steps.push({
      state: snap({ capacity, order, map, opLabel }),
      narration: `${opLabel}: check the hash map for an existing entry.`,
      highlightedLine: 11,
    });

    const existingId = map[key];
    if (existingId) {
      const existing = order.find((n) => n.id === existingId)!;
      const updated: LRUNode = { ...existing, value: value! };
      order = [updated, ...order.filter((n) => n.id !== existingId)];
      map = { ...map, [key]: updated.id };
      steps.push({
        state: snap({ capacity, order, map, current: updated.id, opLabel }),
        narration: `${opLabel}: "${key}" already exists — update its value to ${value} and move it to the front (most recently used).`,
        highlightedLine: 13,
      });
      continue;
    }

    if (order.length >= capacity) {
      const lru = order[order.length - 1];
      steps.push({
        state: snap({ capacity, order, map, current: lru.id, opLabel }),
        narration: `${opLabel}: cache is at capacity (${capacity}) — "${lru.key}" is the least recently used entry (back of the list). Evict it.`,
        highlightedLine: 16,
      });
      order = order.slice(0, -1);
      const restMap = { ...map };
      delete restMap[lru.key];
      map = restMap;
      steps.push({
        state: snap({ capacity, order, map, evicted: lru, opLabel }),
        narration: `${opLabel}: evicted "${lru.key}" from both the hash map and the list.`,
        highlightedLine: 17,
      });
    }

    const node: LRUNode = { id: nid(), key, value: value! };
    order = [node, ...order];
    map = { ...map, [key]: node.id };
    steps.push({
      state: snap({ capacity, order, map, current: node.id, opLabel }),
      narration: `${opLabel}: insert "${key}" at the front of the list (most recently used) and record it in the hash map.`,
      highlightedLine: 20,
    });
  }

  steps.push({
    state: snap({ capacity, order, map }),
    narration: `All ${ops.length} operation(s) complete. Cache holds ${order.length}/${capacity} entries, front-to-back = most-to-least recently used.`,
    highlightedLine: 22,
    stats: { size: order.length, capacity },
  });
  return steps;
}

export const LRU_CACHE_CODE: Record<string, string> = {
  ops: `class LRUCache {
  constructor(capacity) { this.capacity = capacity; this.map = new Map(); this.list = new DoublyLinkedList(); }

  get(key) {                                    // O(1)
    if (!this.map.has(key)) return -1;          // miss
    const node = this.map.get(key);
    this.list.moveToFront(node);                // mark as most recently used
    return node.value;
  }

  put(key, value) {                             // O(1)
    if (this.map.has(key)) {
      const node = this.map.get(key);
      node.value = value;
      this.list.moveToFront(node);
      return;
    }
    if (this.list.size >= this.capacity) {
      const lru = this.list.removeBack();       // evict least recently used
      this.map.delete(lru.key);
    }
    const node = this.list.pushFront(key, value);
    this.map.set(key, node);
  }
}`,
};
