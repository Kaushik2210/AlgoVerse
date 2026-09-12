# 677. Map Sum Pairs

Implement the `MapSum` class:

- `MapSum()` — initializes the object.
- `void insert(String key, int val)` — inserts `key` with value `val`. If `key` already existed, overwrite its old value with `val` (not add to it).
- `int sum(String prefix)` — returns the sum of all values whose keys start with `prefix`.

**Example:**
```
Input:
["MapSum", "insert", "sum", "insert", "sum"]
[[], ["apple", 3], ["ap"], ["app", 2], ["ap"]]

Output:
[null, null, 3, null, 5]

Explanation:
MapSum mapSum = new MapSum();
mapSum.insert("apple", 3);
mapSum.sum("ap");           // returns 3 ("apple" -> 3)
mapSum.insert("app", 2);
mapSum.sum("ap");           // returns 5 ("apple" -> 3, "app" -> 2)
```

**Constraints:**
- 1 <= key.length, prefix.length <= 50
- key and prefix consist of only lowercase English letters
- 1 <= val <= 1000
- At most 50 calls total to insert and sum

## Approach

A **trie** makes "sum all values for keys starting with this prefix" cheap if every node along a key's path keeps a running sum of values for all keys that pass through it. Then `sum(prefix)` just means walking the trie down to the node matching `prefix` and reading its accumulated sum directly — no need to search or aggregate anything at query time.

The one wrinkle is that `insert` can be called again on a key that already exists, and the new value **replaces** the old one rather than adding to it. So a plain "add val to every node along the path" would double-count on re-insertion. Keep a separate `key -> val` map to look up whether the key was seen before and what its old value was; on insert, compute `delta = newVal - oldVal` (where `oldVal` is 0 for a brand-new key) and add that delta to every node along the key's path in the trie — this correctly adjusts every prefix sum whether the key is new or being overwritten.

For `sum(prefix)`: walk the trie one character at a time following `prefix`. If the path runs out before `prefix` is fully consumed, no key has that prefix, so return 0. Otherwise return the sum stored at the node where the walk ends.

**Time complexity:** O(L) per `insert` or `sum` call, where L is the length of the key/prefix — nothing scales with the number of stored keys.

**Space complexity:** O(N) where N is the total length of all inserted keys, for the trie nodes.
