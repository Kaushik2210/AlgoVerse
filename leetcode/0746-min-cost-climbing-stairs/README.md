# 746. Min Cost Climbing Stairs

You're given an array `cost` where `cost[i]` is the cost of stepping on stair `i`. Once you pay for a step you can climb either 1 or 2 steps from it. You start standing either on step `0` or step `1` (your choice, no cost to start), and you want to reach the "top" — one step past the last index. Return the minimum total cost to get there.

**Example 1:**
```
Input: cost = [10, 15, 20]
Output: 15
Explanation: Start on step 1 (free), pay 15, then step two steps to reach the top.
```

**Example 2:**
```
Input: cost = [1, 100, 1, 1, 1, 100, 1, 1, 100, 1]
Output: 6
Explanation: Start on step 0, pay 1, skip to step 2, pay 1, skip to step 4, pay 1, skip to step 6, pay 1, skip to step 7, pay 1, skip to step 9, pay 1, step to top. Total 6.
```

**Constraints:**
- 2 <= cost.length <= 1000
- 0 <= cost[i] <= 999

## Approach

Think about the cheapest way to arrive at each step, moving forward. `dp[i]` is the minimum cost to reach step `i` (having paid for step `i` itself, if `i` is a real stair). Since you can only arrive at step `i` from step `i-1` or step `i-2`, and you pay `cost[i]` no matter which one you came from:

```
dp[i] = cost[i] + min(dp[i-1], dp[i-2])
```

The base cases are `dp[0] = cost[0]` and `dp[1] = cost[1]`, since starting on either of those two steps is free. The answer isn't `dp[n-1]` though — the "top" is one step beyond the last stair, and you reach it from either the last step or the second-to-last step, so the answer is `min(dp[n-1], dp[n-2])`.

Since each `dp[i]` only depends on the previous two values, you don't need an array at all — just carry two rolling variables forward as you scan left to right.

**Time complexity:** O(n) — one pass over the cost array.

**Space complexity:** O(1) — only two rolling variables are kept.
