# 90. Subsets II

Given an integer array `nums` that may contain duplicates, return all possible subsets (the power set). The solution set must not contain duplicate subsets. Return the solution in any order.

**Example 1:**
```
Input: nums = [1,2,2]
Output: [[],[1],[1,2],[1,2,2],[2],[2,2]]
```

**Example 2:**
```
Input: nums = [0]
Output: [[],[0]]
```

**Constraints:**
- 1 <= nums.length <= 10
- -10 <= nums[i] <= 10

## Approach

This is Subsets (78) with duplicate values in the input, which would otherwise generate duplicate subsets (e.g. picking "the first 2" vs "the second 2" as the only element in an otherwise identical subset). It uses the exact same backtracking skeleton — at each step, record the current path as a subset, then try extending it with each remaining candidate — with one rule added to dodge duplicates.

Sort the array first so equal values are adjacent. Then, within a single call's loop over candidates to extend the current path with, skip a candidate if it equals the previous candidate considered at that same loop (`i > start and nums[i] == nums[i-1]`). This is the same trick used in Combination Sum II: it doesn't stop equal values from ever being used together (a subset like `[2,2]` is still built by using both at *different* recursion depths), it only stops the same value from being chosen twice as the "next pick" at one decision point, which is exactly what would otherwise generate the same subset twice.

**Time complexity:** O(2^n) in the worst case — the power set of n elements has up to 2^n subsets, though duplicate-skipping prunes actual duplicate branches.

**Space complexity:** O(n) for the recursion depth and path, on top of the O(n * 2^n) needed to store the output subsets.
