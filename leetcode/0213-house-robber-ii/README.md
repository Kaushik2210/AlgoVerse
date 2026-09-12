# 213. House Robber II

This is the same setup as House Robber (198) — you're a robber planning to rob houses along a street, each with a given amount of money, and you can't rob two adjacent houses without triggering an alarm — except now the houses are arranged in a circle, so the first and last house are also adjacent to each other. Given an integer array `nums` representing the money in each house, return the maximum amount you can rob without robbing two adjacent houses.

**Example 1:**
```
Input: nums = [2, 3, 2]
Output: 3
Explanation: You cannot rob house 0 (money = 2) and house 2 (money = 2) together
since they're adjacent in this circular arrangement.
```

**Example 2:**
```
Input: nums = [1, 2, 3, 1]
Output: 4
Explanation: Rob house 0 (money = 1) and house 2 (money = 3). Total = 1 + 3 = 4.
```

**Example 3:**
```
Input: nums = [1, 2, 3]
Output: 3
```

**Constraints:**
- 1 <= nums.length <= 100
- 0 <= nums[i] <= 1000

## Approach

The only new wrinkle over plain House Robber is the wraparound: house 0 and the last house can't both be robbed. That's really just one extra constraint layered on top of an otherwise identical linear problem, so instead of designing new DP for circular adjacency, split it into two easier linear sub-problems and combine.

Any valid robbery plan either excludes house 0 or excludes the last house (it can't include both, since they're adjacent in the circle) — so the best circular answer is the better of "best linear robbery over houses 0 to n-2" (excluding the last house) and "best linear robbery over houses 1 to n-1" (excluding the first house). Run the standard House Robber DP on each of those two ranges and take the max. A single-house edge case needs its own check since slicing off "the rest" would leave an empty array in that case, and the answer is just that one house's value.

**Time complexity:** O(n) — two linear passes over sub-arrays of size roughly n, each O(n).

**Space complexity:** O(1) — the linear House Robber DP only needs two running variables, no arrays.
