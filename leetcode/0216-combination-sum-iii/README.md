# 216. Combination Sum III

**Commonly asked at:** Amazon

Find all valid combinations of `k` numbers, chosen from 1 through 9, that add up to `n`. Each number can be used at most once per combination, and no combination should appear as a duplicate (regardless of order — return each valid set once).

**Example 1:**
```
Input: k = 3, n = 7
Output: [[1,2,4]]
```

**Example 2:**
```
Input: k = 3, n = 9
Output: [[1,2,6],[1,3,5],[1,4,7]]
```

**Example 3:**
```
Input: k = 4, n = 1
Output: []
Explanation: There are no valid combinations, since the smallest 4 distinct numbers (1+2+3+4=10) already exceed 1.
```

**Constraints:**
- 2 <= k <= 9
- 1 <= n <= 60

## Approach

This is Combination Sum but with two constraints tracked simultaneously instead of one: not just "the numbers picked so far must sum to at most `n`," but also "exactly `k` of them must be picked, no more, no fewer."

Backtrack through candidates 1 through 9 in increasing order, always trying to extend the current partial combination. To avoid ever producing the same set twice (e.g. `[1,2,4]` and `[2,1,4]`), only ever consider candidates strictly greater than the last one picked — this naturally builds each combination in sorted order and never revisits an earlier number, since every number can be used at most once.

At each step there are two things to check: how many numbers are still needed (`k - len(current)`) and how much sum is still needed (`n - current_sum`). If the current partial combination already has `k` numbers, it's a complete candidate — check whether its sum equals exactly `n`, and if so record it. If the remaining budget of numbers hits 0 before the sum matches, or the remaining sum goes negative, that branch is dead and should be abandoned immediately (this pruning keeps runtime small despite the small fixed universe of digits 1-9). Otherwise, try each next candidate from `start` up to 9, add it to the current path, recurse with an updated remaining count and remaining sum, then remove it (backtrack) before trying the next candidate.

**Time complexity:** O(C(9, k)) in the size of the output, since there are at most `C(9, k)` ways to choose k distinct digits from 1-9 — a small, bounded search space regardless of pruning, since digits only go up to 9.

**Space complexity:** O(k) for the recursion stack and the current combination path, not counting the output storage.
