# 698. Partition to K Equal Sum Subsets

Given an integer array `nums` and an integer `k`, return `true` if it's possible to divide the array into `k` non-empty subsets whose sums are all equal.

**Example 1:**
```
Input: nums = [4,3,2,3,5,2,1], k = 4
Output: true
Explanation: It's possible to divide it into 4 subsets (5), (1,4), (2,3), (2,3) with equal sums.
```

**Example 2:**
```
Input: nums = [1,2,3,4], k = 3
Output: false
```

**Constraints:**
- 1 <= k <= nums.length <= 16
- 1 <= nums[i] <= 10^4
- The frequency of each element is in the range [1, 4]

## Approach

First, check feasibility cheaply: the total sum must be divisible by `k` (otherwise equal subsets are impossible), and the target subset sum is `total / k`. Also, if any single element exceeds the target, it's immediately impossible.

From there this is a backtracking search: try to fill `k` buckets, one at a time, each up to the target sum, using every element exactly once. Two pruning choices make this tractable even though it's exponential in the worst case:

**Sort descending first.** Placing large elements early fails fast — a bucket that can't fit a big number gets rejected sooner, pruning huge chunks of the search tree before wasting time on small numbers.

**Fill one bucket completely before starting the next, and skip retrying equivalent empty buckets.** Think of it as: pick the next unplaced element, and try putting it into each bucket that has room. If a bucket is completely empty (sum 0 so far) and placing the element there still leads to failure down the line, there's no point trying the *next* empty bucket either — from the search's perspective, all empty buckets are interchangeable, so failing in one means every other empty bucket would fail identically. Immediately return false without exploring more empty buckets. Also, once a bucket exactly reaches the target sum, don't try adding anything else to it — move on to filling the next bucket.

Concretely: maintain a `buckets` array of size `k`, and a `used` boolean array (or sort descending and recurse index by index). At each step, take the next number to place, and for each bucket `i`:
- Skip if `buckets[i] + nums[idx] > target`.
- Skip duplicate attempts: if `buckets[i] == 0` and a previous empty bucket was already tried and failed at this position, break out of the loop (they're symmetric).
- Add `nums[idx]` to `buckets[i]`, recurse to place the next number, and backtrack (remove it) if that path fails.

The recursion bottoms out successfully when every number has been placed (all buckets, by construction, sum to a multiple of the target no greater than it, and the total was checked upfront to divide evenly, so full placement implies every bucket hit the target exactly).

**Time complexity:** Exponential in the worst case (roughly O(k^(n-k)) with pruning), but the empty-bucket pruning and descending order keep it fast enough for `n <= 16`.

**Space complexity:** O(n + k) for the recursion depth and the buckets array.
