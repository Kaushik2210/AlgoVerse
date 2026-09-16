# 343. Integer Break

**Commonly asked at:** Amazon

Given an integer `n`, break it into the sum of at least two positive integers and maximize the product of those integers. Return the maximum product you can get.

**Example 1:**
```
Input: n = 2
Output: 1
Explanation: 2 = 1 + 1, 1 * 1 = 1
```

**Example 2:**
```
Input: n = 10
Output: 36
Explanation: 10 = 3 + 3 + 4, 3 * 3 * 4 = 36
```

**Constraints:**
- 2 <= n <= 58

## Approach

A bottom-up dynamic programming view: let `dp[i]` be the best product obtainable by breaking `i` into two or more parts. To compute `dp[i]`, try every way to split off a first piece `j` (from 1 to i-1), and the rest `i - j` can either stay whole or itself be broken further — so the contribution is `j * max(i - j, dp[i - j])`. Take the best such split across all `j`, and that's `dp[i]`. Build this up from `dp[1] = 0`ish base cases (1 can't be broken usefully) up to `dp[n]`.

There's also a faster greedy insight backing this up mathematically: for maximizing a product of a fixed sum, the parts should be as close to Euler's number `e ≈ 2.718` as possible, which in integers means using as many 3s as possible, with the remainder handled by using a 2 (or two 2s) instead of a lone 1 or an awkward leftover, since `3 * 3 > 2 * 2 * 2` per unit of sum consumed but a leftover of 1 is wasteful (better to pull a 3 back into a 4 = 2+2). Concretely: divide `n` by 3, and based on the remainder (0, 1, or 2) adjust how many 3s and 2s are used.

The DP version is easier to trust for correctness (it doesn't rely on the number-theory argument being applied correctly), so that's what's implemented, but both give the same answers.

**Time complexity:** O(n^2) for the DP with the double loop over i and its splits.

**Space complexity:** O(n) for the dp array.
