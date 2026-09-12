# 494. Target Sum

You're given an integer array `nums` and an integer `target`. Assign a `+` or `-` sign in front of each number, then sum them all up. Return the number of different ways you can assign the signs so the resulting sum equals `target`.

**Example 1:**
```
Input: nums = [1,1,1,1,1], target = 3
Output: 5
Explanation: -1+1+1+1+1 = 3, +1-1+1+1+1 = 3, +1+1-1+1+1 = 3, +1+1+1-1+1 = 3, +1+1+1+1-1 = 3
```

**Example 2:**
```
Input: nums = [1], target = 1
Output: 1
```

**Constraints:**
- 1 <= nums.length <= 20
- 0 <= nums[i] <= 1000
- 0 <= sum(nums) <= 1000
- -1000 <= target <= 1000

## Approach

The brute-force way tries all 2^n sign assignments — fine for small n but exponential. The trick is to notice this is secretly subset-sum in disguise: split the numbers into two groups, the ones assigned `+` (call their sum `P`) and the ones assigned `-` (call their sum `N`). Then `P - N = target`, and also `P + N = sum(nums)` (every number lands in exactly one group). Adding those two equations: `2P = target + sum(nums)`, so `P = (target + sum(nums)) / 2`.

That reframes the whole problem as: how many subsets of `nums` sum to exactly `P`? That's the classic subset-sum *counting* problem, solvable with 0/1 knapsack DP. A few edge cases fall out of the algebra directly: if `target + sum(nums)` is odd, `P` isn't an integer, so there's no valid split — return 0. If `abs(target) > sum(nums)`, it's impossible to reach even with every number pointed the right direction — return 0 too (this also naturally protects against a negative `P`).

DP: `dp[s]` = number of subsets summing to `s`. Start with `dp[0] = 1` (one way to make sum 0 — pick nothing). For each number, update sums from high to low (0/1 knapsack style, so each number is only used once per subset) — `dp[s] += dp[s - num]` for `s` from `P` down to `num`. The answer is `dp[P]`.

**Time complexity:** O(n * P) where P is the computed target subset sum, bounded by total sum (<=1000).

**Space complexity:** O(P) for the DP array.
