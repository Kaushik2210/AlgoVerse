# 146. LRU Cache

Design a data structure that follows the constraints of a Least Recently Used (LRU) cache, supporting these operations in **O(1) average time each**:

- `LRUCache(int capacity)` — initialize the cache with a positive size limit.
- `int get(int key)` — return the value of `key` if it exists, otherwise return -1. This also counts as "using" the key, making it the most recently used.
- `void put(int key, int value)` — update the value of `key` if it exists, or insert it if it doesn't. If inserting causes the cache to exceed `capacity`, evict the least recently used key first.

**Example:**
```
Input:
["LRUCache", "put", "put", "get", "put", "get", "put", "get", "get", "get"]
[[2], [1, 1], [2, 2], [1], [3, 3], [2], [4, 4], [1], [3], [4]]

Output:
[null, null, null, 1, null, -1, null, -1, 3, 4]

Explanation:
LRUCache lru = new LRUCache(2);
lru.put(1, 1);          // cache: {1=1}
lru.put(2, 2);          // cache: {1=1, 2=2}
lru.get(1);              // returns 1, cache: {2=2, 1=1} (1 is now most recent)
lru.put(3, 3);          // evicts key 2 (least recent), cache: {1=1, 3=3}
lru.get(2);              // returns -1 (not found)
lru.put(4, 4);          // evicts key 1, cache: {3=3, 4=4}
lru.get(1);              // returns -1 (not found)
lru.get(3);              // returns 3
lru.get(4);              // returns 4
```

**Constraints:**
- 1 <= capacity <= 3000
- 0 <= key <= 10^4
- 0 <= value <= 10^5
- At most 2 * 10^5 calls total to get and put

## Approach

You need O(1) lookup by key (a hashmap does that) and O(1) reordering / eviction based on recency (a plain hashmap can't tell you what's "oldest"). The combination that gives both is a hashmap plus a **doubly linked list**, where the list's order tracks recency: most-recently-used at one end, least-recently-used at the other.

- The hashmap maps `key -> node`, where `node` lives in the doubly linked list and holds `(key, value)`.
- Two dummy sentinel nodes, `head` and `tail`, bookend the list — this removes edge cases for inserting/removing at the very front or back. Nodes are ordered so the end nearest `head` is most-recently-used and the end nearest `tail` is least-recently-used.
- `get(key)`: if the key isn't in the map, return -1. Otherwise, unlink the node from wherever it sits and re-insert it right after `head` (mark it most-recent), then return its value.
- `put(key, value)`: if the key already exists, update its value and move it to the front (same as `get`'s recency bump). Otherwise, create a new node, insert it at the front, and add it to the map — if that pushes the size over `capacity`, remove the node just before `tail` (the actual least-recently-used one) from both the list and the map.

Because a doubly linked list lets you unlink and relink any node in O(1) given a reference to it (no scanning needed to find neighbors), and the hashmap gives O(1) access to that reference by key, every operation stays O(1).

**Time complexity:** O(1) average for both `get` and `put`.

**Space complexity:** O(capacity) — the hashmap and linked list each hold at most `capacity` entries.
