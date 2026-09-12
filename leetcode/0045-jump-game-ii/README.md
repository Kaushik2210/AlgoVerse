# 45. Jump Game II

You're given an array `nums` where `nums[i]` is the maximum number of steps you can jump forward from index `i`. Starting at index 0, return the minimum number of jumps needed to reach the last index. You're guaranteed it's always possible to reach the end.

**Example 1:**
```
Input: nums = [2,3,1,1,4]
Output: 2
Explanation: Jump 1 step from index 0 to 1, then 3 steps to the last index.
```

**Example 2:**
```
Input: nums = [2,3,0,1,4]
Output: 2
```

**Constraints:**
- 1 <= nums.length <= 10^4
- 0 <= nums[i] <= 1000
- It's guaranteed you can reach nums[length - 1]

## Approach

A DP where `dp[i]` is the minimum jumps to reach index `i` works (try every previous reachable index and take the min + 1), but that's O(n^2) in the worst case. This can be done greedily in one linear pass by thinking in terms of "levels" — like a BFS over ranges instead of individual indices.

Picture the jumps as expanding levels: level 0 is just index 0. Level 1 is every index reachable in one jump from level 0. Level 2 is every index reachable in one jump from anywhere in level 1. The answer is the level number that contains the last index — which is exactly BFS shortest-path thinking, just without an explicit queue, because a whole level is a contiguous range `[current_end + 1, farthest]`.

Walk through the array once, tracking `current_end` (the farthest index reachable using the jumps taken so far) and `farthest` (the farthest index reachable from anywhere within the current level, updated as you scan). Whenever the loop index `i` reaches `current_end`, that means the current level has been fully explored — commit a jump (`jumps += 1`), and the next level's boundary becomes `current_end = farthest`. Stop scanning at `len(nums) - 2`, since once you've fully processed the level that contains or reaches the last index, no more jumps are needed — the loop only needs to guarantee `current_end` reaches the last index, not actually step onto it.

**Time complexity:** O(n) — a single pass through the array.

**Space complexity:** O(1) — just a few running variables.
