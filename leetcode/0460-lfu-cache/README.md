# 460. LFU Cache

Design a Least Frequently Used (LFU) cache with a fixed `capacity`. Support `get(key)` (return the value, or -1 if absent, and count as one use) and `put(key, value)` (insert or update, counting as one use). When the cache is full and a new key needs to be inserted, evict the *least frequently used* key; if there's a tie in usage count, evict the *least recently used* among those tied keys. Both `get` and `put` must run in O(1) average time.

**Example 1:**
```
Input:
["LFUCache", "put", "put", "get", "put", "get", "get", "put", "get", "get", "get"]
[[2], [1, 1], [2, 2], [1], [3, 3], [2], [3], [4, 4], [1], [3], [4]]

Output:
[null, null, null, 1, null, -1, 3, null, -1, 3, 4]

Explanation:
LFUCache cache = new LFUCache(2);
cache.put(1, 1);   // freq(1)=1
cache.put(2, 2);   // freq(2)=1
cache.get(1);      // returns 1, freq(1)=2
cache.put(3, 3);   // capacity full, evict key 2 (freq 1, less used than key 1 at freq 2)
cache.get(2);      // returns -1 (evicted)
cache.get(3);      // returns 3, freq(3)=2
cache.put(4, 4);   // freq(1)=freq(3)=2, tie -> evict 1 (used less recently)
cache.get(1);      // returns -1 (evicted)
cache.get(3);      // returns 3
cache.get(4);      // returns 4
```

**Constraints:**
- 0 <= capacity <= 10^4
- 0 <= key <= 10^5
- 0 <= value <= 10^9
- At most 2*10^5 calls total to get and put

## Approach

This is one of those "easy to state, hard to get O(1)" design problems. The naive approach — keep a frequency counter per key and scan for the minimum every eviction — is O(n) per eviction, which fails the O(1) requirement at scale.

The O(1) trick is frequency bucketing: instead of one big structure, keep a hashmap from frequency count to an *ordered* collection of the keys currently at that frequency, ordered by recency (most-recent at one end). Concretely:
- `key_to_val`: key -> value
- `key_to_freq`: key -> current use count
- `freq_to_keys`: freq -> ordered dict of keys currently at that frequency (insertion order = recency order, so the oldest key at a frequency is always the first one)
- `min_freq`: tracks the smallest frequency currently in use, maintained incrementally

On `get(key)` (and the "touch" that happens inside `put` for an existing key): look up the value, then "bump" the key — remove it from its current frequency bucket, increment its frequency, and re-insert it at the back of the new bucket (most-recently-used at that new frequency level). If the bucket it just left is now empty and it happened to be the bucket at `min_freq`, bump `min_freq` up by 1, since nothing is at the old minimum anymore.

On `put(key, value)` for a new key when the cache is full: evict from `freq_to_keys[min_freq]`, popping the *first* (oldest / least-recently-used) key in that bucket — this is what gives the tie-break "least frequently used, then least recently used" behavior for free, since ordered-dict insertion order tracks recency within a frequency. Then insert the new key at frequency 1 and reset `min_freq` to 1 (any new key is necessarily now the global minimum frequency).

Both operations only ever touch a constant number of hashmap/ordered-dict entries — no scanning — so every operation is O(1) amortized.

**Time complexity:** O(1) for both `get` and `put`.

**Space complexity:** O(capacity) for the three maps combined.
