# 416. Partition Equal Subset Sum

Given an integer array `nums` containing only positive integers, return `true` if the array can be split into two subsets such that the sum of elements in both subsets is equal.

**Example 1:**
```
Input: nums = [1,5,11,5]
Output: true
Explanation: [1,5,5] and [11] both sum to 11
```

**Example 2:**
```
Input: nums = [1,2,3,5]
Output: false
```

**Constraints:**
- 1 <= nums.length <= 200
- 1 <= nums[i] <= 100

## Approach

The phrase "split into two subsets with equal sum" is really just 0/1 subset-sum wearing a disguise. If the total sum is odd, it's immediately impossible — an odd total can never split into two equal halves — return false right away. Otherwise, the question becomes: does there exist a subset of `nums` whose sum is exactly `total / 2`? If yes, that subset and everything else automatically form the other, equal-sum half.

This is classic 0/1 knapsack: each number can be either included in the target-sum subset or not (used at most once, unlike coin-change-style problems with unlimited reuse). Keep a boolean DP array `dp[s]` = "can some subset of the numbers processed so far sum to exactly `s`". Start with `dp[0] = true` (the empty subset sums to 0) and everything else false. For each number, walk the possible sums *from high to low* down to that number's value, setting `dp[s] = dp[s] or dp[s - num]` — going high-to-low (as opposed to coin-change's low-to-high) is what keeps each number from being used more than once within a single number's update pass, since it guarantees `dp[s - num]` hasn't already been updated by this same number earlier in the same pass.

The answer is `dp[total // 2]`.

**Time complexity:** O(n * total) where total is the array sum — for each of n numbers, iterate over sums up to `total/2`.

**Space complexity:** O(total) for the 1D DP boolean array.
