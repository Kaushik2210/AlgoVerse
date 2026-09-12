# 77. Combinations

Given two integers `n` and `k`, return all possible combinations of `k` distinct numbers chosen from the range `[1, n]`. You can return the answer in any order.

**Example 1:**
```
Input: n = 4, k = 2
Output: [[1,2],[1,3],[1,4],[2,3],[2,4],[3,4]]
```

**Example 2:**
```
Input: n = 1, k = 1
Output: [[1]]
```

**Constraints:**
- 1 <= n <= 20
- 1 <= k <= n

## Approach

There's no shortcut around generating every combination — the brute-force idea and the optimal idea are really the same thing: backtracking, just done carefully so you never waste time on a pick you've already tried in a different order.

Build combinations one number at a time, always picking the next number from somewhere after the last one you picked. Keep a running list `combo` and a `start` pointer for where the next candidate can come from. At each call, if `combo` has reached length `k`, it's a complete combination, so save a copy of it. Otherwise, loop `num` from `start` to `n`, add `num` to `combo`, recurse with `start = num + 1` (never look backwards, that's what keeps `[1,2]` from also showing up as `[2,1]`), then pop `num` back off before trying the next candidate. That pop is the backtrack step — it resets the state so the next branch of the loop starts clean.

The `start` parameter is the whole trick: because you only ever move forward through the range, each set of `k` numbers gets generated exactly once, in increasing order, with no duplicate-checking needed.

**Time complexity:** O(k * C(n, k)) — there are C(n, k) combinations, and copying each one into the result costs O(k).

**Space complexity:** O(k) for the recursion depth and the `combo` buffer, not counting the output.
