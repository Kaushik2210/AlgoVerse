# 646. Maximum Length of Pair Chain

**Commonly asked at:** Amazon, Google, Cisco

You're given an array of number pairs `pairs` where `pairs[i] = [lefti, righti]` and `lefti < righti`. A pair `(c, d)` can follow a pair `(a, b)` if `b < c`. Chains can be formed this way, following pairs one after another. Return the length of the longest chain you can form. You don't need to use all the pairs, and pairs can be picked in any order (not necessarily the order given).

**Example 1:**
```
Input: pairs = [[1,2],[2,3],[3,4]]
Output: 2
Explanation: the longest chain is [1,2] -> [3,4].
```

**Example 2:**
```
Input: pairs = [[1,2],[7,8],[4,5]]
Output: 3
Explanation: the longest chain is [1,2] -> [4,5] -> [7,8].
```

**Constraints:**
- 1 <= pairs.length <= 1000
- -1000 <= lefti < righti <= 1000

## Approach

This is structurally identical to the classic "maximum number of non-overlapping intervals" activity-selection problem, just phrased with pairs and a strict "follow" condition instead of intervals and overlap. The greedy rule that solves activity selection applies directly here: always sort by the *end* value, and greedily pick the next pair whose start is strictly greater than the end of the last pair picked.

Why sorting by end (not by start, and not by length) works: picking the pair that finishes earliest among the currently-eligible ones leaves the maximum possible room for everything that could come after it — no other valid choice at that step could ever free up more room, so it never costs anything to take the earliest-finishing option, and it can only help. After sorting, walk through the pairs once, tracking `current_end` (initialized to negative infinity). Whenever a pair's start is strictly greater than `current_end`, it can extend the chain — take it, bump the count, and update `current_end` to this pair's end.

**Time complexity:** O(n log n) for the sort, then O(n) for the single greedy pass.

**Space complexity:** O(1) extra (ignoring the space used by the sort itself, or O(log n) if counting the sort's recursion/stack space).
