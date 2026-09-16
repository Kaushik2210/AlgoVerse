# 380. Insert Delete GetRandom O(1)

**Commonly asked at:** Amazon, Meta

Design a data structure supporting, all in average O(1) time: `insert(val)` (adds `val` if not already present, returns whether it was added), `remove(val)` (removes `val` if present, returns whether it was removed), and `getRandom()` (returns a uniformly random element from the current set of elements).

**Example:**
```
RandomizedSet s = new RandomizedSet();
s.insert(1);   // true
s.remove(2);   // false
s.insert(2);   // true
s.getRandom(); // 1 or 2, each with probability 1/2
s.remove(1);   // true
s.insert(2);   // false (already present)
s.getRandom(); // 2
```

## Approach

A hash set alone gives O(1) insert/remove/contains, but there's no way to get a *uniformly random* element out of it in O(1) — hash sets don't support random access by position. An array alone gives O(1) random access (just pick a random valid index) and O(1) append, but removing an arbitrary value requires finding it first (O(n) scan) and then shifting everything after it to close the gap (O(n)). Neither structure alone satisfies all three operations in O(1); combining them does.

Keep a backing **array** for O(1) `getRandom()` (index in `[0, len-1]` chosen uniformly), plus a **hash map** from value to its current index in that array, so `insert`/`remove`/`contains` don't need to scan.

`insert(val)`: if `val` is already in the map, return false. Otherwise append it to the array and record its index in the map, return true.

`remove(val)`: if `val` isn't in the map, return false. Otherwise, instead of removing it from the middle of the array (which would require shifting), **swap it with the last element of the array** first: look up `val`'s index, look up the last element's value, move the last element into `val`'s old slot (updating the map's entry for that moved value to point to the new index), then pop the array's last slot and delete `val` from the map. This turns an O(n) middle-removal into an O(1) swap-and-pop.

The one edge case worth being careful about: if `val` itself happens to already be the last element, the "swap with last" step would otherwise clobber the wrong bookkeeping — handling it just means the swap-with-self is harmless as long as the pop and map deletion still happen correctly afterward.

**Time complexity:** O(1) average for all three operations.

**Space complexity:** O(n) for the array and the map.
