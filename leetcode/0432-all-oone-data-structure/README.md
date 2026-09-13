# 432. All O`one Data Structure

Design a data structure that stores a stream of strings and supports all of the following in **O(1) average time**:

- `AllOne()` — initialize the data structure with an empty stream of strings.
- `inc(String key)` — increment the count of `key` by 1. If `key` doesn't exist, insert it with a count of 1.
- `dec(String key)` — decrement the count of `key` by 1. If the count reaches 0, remove it entirely. If `key` doesn't exist, do nothing.
- `getMaxKey()` — return any key with the highest count. Return `""` if no string is stored.
- `getMinKey()` — return any key with the lowest count. Return `""` if no string is stored.

**Example:**
```
Input:
["AllOne", "inc", "inc", "getMaxKey", "getMinKey", "inc", "getMaxKey", "getMinKey"]
[[], ["hello"], ["hello"], [], [], ["leet"], [], []]

Output:
[null, null, null, "hello", "hello", null, "hello", "leet"]

Explanation:
AllOne obj = new AllOne();
obj.inc("hello");         // counts: {hello: 1}
obj.inc("hello");         // counts: {hello: 2}
obj.getMaxKey();          // "hello" (only key, count 2)
obj.getMinKey();          // "hello" (only key, count 2)
obj.inc("leet");          // counts: {hello: 2, leet: 1}
obj.getMaxKey();          // "hello" (count 2 beats leet's count 1)
obj.getMinKey();          // "leet" (count 1 is lower than hello's count 2)
```

**Constraints:**
- 1 <= key.length <= 10
- key consists of lowercase English letters
- It's guaranteed that for each call to `dec`, `key` is existing in the data structure
- At most 5 * 10^4 calls total will be made to `inc`, `dec`, `getMaxKey`, and `getMinKey`

## Approach

The hard requirement is O(1) for *every* operation, including finding the max and min count keys. A plain hashmap of key -> count gives O(1) inc/dec, but `getMaxKey`/`getMinKey` would need a scan unless the counts are kept in some ordered structure that's still O(1) to update.

The structure that makes this work is a **doubly linked list of "bucket" nodes**, where each bucket holds a single count value and the *set* of all keys currently sitting at that count. The list is kept sorted by count from lowest (right after the head sentinel) to highest (right before the tail sentinel). Because buckets are linked, moving a key from count `c` to count `c+1` or `c-1` only ever touches its immediate neighboring bucket — no scanning.

Two hashmaps ride alongside the list:
- `key_count`: key -> its current count (just for bookkeeping).
- `key_node`: key -> the bucket node it currently lives in.

**`inc(key)`:** If the key is new, it belongs in a bucket with count 1. Check whether `head.next` already is that bucket (reuse it), otherwise create a fresh count-1 bucket right after `head`. If the key already exists, look at its current bucket, remove the key from it, and check whether the *next* bucket in the list already has count+1 — if so, drop the key into that existing bucket; if not, splice a brand new bucket in between with the right count. If removing the key emptied its old bucket, unlink that bucket from the list.

**`dec(key)`** is the mirror image: move the key one bucket to the left (toward lower counts) instead of right, creating a new bucket before the current one if none already has count-1. If the count would hit 0, just delete the key from both maps entirely instead of parking it in a count-0 bucket.

**`getMaxKey`/`getMinKey`:** Since the list is sorted by count, the maximum-count bucket is always `tail.prev` and the minimum-count bucket is always `head.next`. Grab any key out of that bucket's key set — O(1). If the list is empty (only sentinels), return `""`.

Every step here — moving a key to an adjacent bucket, creating/deleting a bucket, and reading the head/tail bucket — is O(1), because linked list splicing needs no traversal once you're holding the right node reference, and the hashmaps give that reference immediately.

**Time complexity:** O(1) average for `inc`, `dec`, `getMaxKey`, and `getMinKey`.

**Space complexity:** O(n) where n is the number of distinct keys stored, across the hashmaps and the bucket list.
