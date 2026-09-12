# 341. Flatten Nested List Iterator

*Note: this is a LeetCode premium (subscriber-only) problem, so it can't be verified against the live judge, but it's implemented and tested against the interface described in the official problem statement below.*

You're given a nested list of integers `nestedList`, where each element is either an integer or a list whose elements may also be integers or other lists (arbitrary depth). Implement an iterator to flatten it: `NestedIterator(nestedList)` initializes the iterator, `next()` returns the next integer, and `hasNext()` returns whether there are more integers left.

**Example 1:**
```
Input: nestedList = [[1,1],2,[1,1]]
Output: [1,1,2,1,1]
Explanation: Flattening the list gives [1,1,2,1,1].
```

**Example 2:**
```
Input: nestedList = [1,[4,[6]]]
Output: [1,4,6]
Explanation: Flattening the list gives [1,4,6].
```

**Constraints:**
- 1 <= nestedList.length <= 1000
- The values of the integers in the nested list is in the range [-10^6, 10^6]

## Approach

The lazy, memory-heavy way is to fully flatten the whole structure into a plain list up front (a straightforward DFS that recurses into every nested list and collects integers) and then just iterate over that list with an index. That works, but it does all the flattening work eagerly, even if the caller only ever calls `next()` once — wasteful if the structure is huge and you only need a few elements.

A more "iterator-like" approach uses a stack to flatten lazily, one step at a time. Push the elements of the top-level list onto a stack in reverse order (so the first element ends up on top). The real work happens in a helper that ensures the top of the stack is an actual integer before `hasNext()`/`next()` look at it: while the stack isn't empty and the top item is a nested list rather than an integer, pop it and push its children back on in reverse order, effectively "unwrapping" one level of nesting. This repeats until either the stack is empty or the top is a genuine integer.

`hasNext()` runs that unwrapping helper and then just checks whether the stack is non-empty. `next()` also runs it (in case it hasn't been called since the last `next()`) and then pops and returns the integer sitting on top. This way, work is only done for the layers of nesting actually being iterated through, and no more.

**Time complexity:** `next()` and `hasNext()` are amortized O(1) — each nested list is unwrapped at most once across the whole life of the iterator, so the total unwrapping work over n calls is bounded by the total number of nodes (integers + nested lists) in the structure.

**Space complexity:** O(n) for the stack in the worst case (e.g. a list nested n levels deep, or n elements pushed at once).
