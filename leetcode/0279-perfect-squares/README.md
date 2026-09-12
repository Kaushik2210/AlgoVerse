# 279. Perfect Squares

Given an integer `n`, return the least number of perfect square numbers (1, 4, 9, 16, ...) that sum to `n`.

**Example 1:**
```
Input: n = 12
Output: 3
Explanation: 12 = 4 + 4 + 4
```

**Example 2:**
```
Input: n = 13
Output: 2
Explanation: 13 = 4 + 9
```

**Constraints:**
- 1 <= n <= 10^4

## Approach

This is structurally identical to the coin change problem (322) — perfect squares up to `n` (1, 4, 9, 16, ...) play the role of "coin denominations," and the question is the minimum count of them needed to sum exactly to `n`. Once you see that framing, the same bottom-up DP applies directly.

Build a `dp` array of size `n + 1`, where `dp[i]` is the fewest perfect squares summing to `i`. `dp[0] = 0` (zero squares needed for a sum of zero). For every `i` from 1 to `n`, try every perfect square `j*j <= i` as the "last square used," and take `dp[i] = min(dp[i], dp[i - j*j] + 1)` over all valid `j`. This works because if the optimal decomposition of `i` uses some perfect square `j*j` as one of its terms, removing that term leaves an optimal decomposition of `i - j*j` — the classic optimal-substructure argument that justifies DP here.

**Time complexity:** O(n * sqrt(n)) — for each of the n values, try up to sqrt(n) candidate perfect squares.

**Space complexity:** O(n) — for the dp array.
