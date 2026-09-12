# 523. Continuous Subarray Sum

You're given an integer array `nums` and an integer `k`. Return `true` if `nums` has a contiguous subarray of length at least 2 whose elements sum to a multiple of `k` (0 counts as a multiple of any `k`).

**Example 1:**
```
Input: nums = [23,2,4,6,7], k = 6
Output: true
Explanation: [2,4] sums to 6, a multiple of 6.
```

**Example 2:**
```
Input: nums = [23,2,6,4,7], k = 6
Output: true
Explanation: [23,2,6,4,7] sums to 42, a multiple of 6.
```

**Example 3:**
```
Input: nums = [23,2,6,4,7], k = 13
Output: false
```

**Constraints:**
- 1 <= nums.length <= 10^5
- 0 <= nums[i] <= 10^9
- 0 <= sum(nums[i]) <= 2^31 - 1
- 1 <= k <= 2^31 - 1

## Approach

A subarray `nums[j+1..i]` sums to a multiple of `k` exactly when `prefix_sum[i] % k == prefix_sum[j] % k` — subtracting two prefix sums that share the same remainder mod `k` always leaves something divisible by `k`. So the problem becomes: find two prefix sums (at least 2 indices apart) with the same remainder mod `k`.

Walk through the array keeping a running prefix sum and its remainder mod `k`. Track a hash map of each remainder to the **first** index at which it appeared. Seed the map with `{0: -1}` — a virtual "prefix sum of 0 before the array starts," which lets a subarray beginning at index 0 be detected too, since its remainder needs something to compare against.

At each index `i`, if the current remainder has been seen before at index `first_index[remainder]`, check whether the two indices are at least 2 apart (`i - first_index[remainder] >= 2`) — that's the length >= 2 requirement, since subtracting adjacent prefix sums would just isolate a single element. If it's far enough apart, a valid subarray exists. Only store the *first* occurrence of each remainder in the map (never overwrite it) — keeping the earliest index gives every later match the best possible chance of being far enough apart to qualify.

**Time complexity:** O(n) — one pass with O(1) average hash map operations.

**Space complexity:** O(min(n, k)) — the map holds at most `k` distinct remainders, or `n` if `n < k`.
