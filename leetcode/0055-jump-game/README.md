# 55. Jump Game

You're given an integer array `nums`. You start at index 0, and `nums[i]` is the maximum number of steps you can jump forward from index `i`. Return `true` if you can reach the last index, `false` otherwise.

**Example 1:**
```
Input: nums = [2,3,1,1,4]
Output: true
Explanation: Jump 1 step from index 0 to 1, then 3 steps to the last index.
```

**Example 2:**
```
Input: nums = [3,2,1,0,4]
Output: false
Explanation: You'll always end up stuck at index 3, whose max jump is 0, so index 4 is unreachable.
```

**Constraints:**
- 1 <= nums.length <= 10^4
- 0 <= nums[i] <= 10^5

## Approach

A brute-force approach would try every possible sequence of jumps recursively (or with DP marking each index reachable/unreachable from previously reachable indices) — that's O(n^2) in the DP version, since from each reachable index you scan forward through all its possible jump lengths.

But you don't actually need to track every reachable index individually — you only care about the *furthest* point you can reach so far. Walk through the array left to right, maintaining `farthest`, the furthest index reached using any position visited up to now. At each index `i`: if `i > farthest`, you've hit a gap — nothing that came before could jump far enough to even get here, so the end is unreachable. Otherwise, update `farthest = max(farthest, i + nums[i])`. If at any point `farthest >= n - 1`, the last index is reachable.

This greedy approach works because we don't care *how* we reach a farther index, only that some earlier position can get us there — so tracking the single best reach is exactly as good as tracking every reachable position.

**Time complexity:** O(n) — a single left-to-right pass.

**Space complexity:** O(1) — just one running variable.
