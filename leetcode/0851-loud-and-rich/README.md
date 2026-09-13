# 851. Loud and Rich

There are `n` people labeled 0 to `n-1`, each with a distinct amount of money and a distinct "quietness" score, given as an array `quiet` (`quiet[x]` is person `x`'s quietness, lower means quieter). You're also given `richer`, a list of pairs `[a, b]` meaning person `a` has strictly more money than person `b`. For every person `x`, find the quietest person among everyone who has money greater than or equal to `x` (including `x` themselves), and return their label in `answer[x]`.

**Example 1:**
```
Input: richer = [[1,0],[2,1],[3,1],[3,7],[4,3],[5,3],[6,3]], quiet = [3,2,5,4,6,1,7,0]
Output: [5,5,2,5,4,5,6,7]
Explanation: answer[0] = 5. Person 5 has more money than person 3, who has more than person 1, who has more than person 0.
Among everyone with money >= person 0 (0, 1, 2, 3, 4, 5, 6), person 5 is the quietest (quiet[5] = 1).
```

**Example 2:**
```
Input: richer = [], quiet = [0]
Output: [0]
```

**Constraints:**
- 1 <= quiet.length == n <= 500
- 0 <= richer.length <= n * (n - 1) / 2
- richer[i].length == 2
- 0 <= a_i, b_i < n
- a_i != b_i
- All pairs (a_i, b_i) are distinct
- The observations in richer are all consistent (no cycles)

## Approach

Build a graph where each `[a, b]` pair in `richer` (a is richer than b) becomes a directed edge `b -> a` — pointing from the poorer person to the richer one. We want, for each person `x`, the quietest person reachable from `x` by following these edges (plus `x` itself), since following an edge only ever moves to someone with strictly more money, so everyone reachable this way has money >= x's money.

This is a DFS-with-memoization problem: define `quietest(x)` as the label of the quietest person among `x` and everyone reachable from `x`. Recursively, `quietest(x)` starts as `x` itself, then for every direct neighbor `y` of `x` (someone richer than `x`), compare `quiet[quietest(x)]` against `quiet[quietest(y)]` and keep whichever is quieter. Memoize each `quietest(x)` once computed so it's never recomputed — since the richer relationships are acyclic (guaranteed consistent), this is safe and each node's answer is computed exactly once.

**Time complexity:** O(n + e) where e is the number of richer relationships — each node and edge is visited once thanks to memoization.

**Space complexity:** O(n + e) for the adjacency list, memo array, and recursion stack.
