# 1248. Count Number of Nice Subarrays

Given an array of integers `nums` and an integer `k`, a subarray is called "nice" if it contains exactly `k` odd numbers. Return the number of nice subarrays.

**Example 1:**
```
Input: nums = [1,1,2,1,1], k = 3
Output: 2
Explanation: [1,1,2,1] and [1,2,1,1] each contain exactly 3 odd numbers.
```

**Example 2:**
```
Input: nums = [2,4,6], k = 1
Output: 0
Explanation: There are no odd numbers at all, so no subarray can contain exactly 1.
```

**Constraints:**
- 1 <= nums.length <= 5 * 10^4
- 1 <= nums[i] <= 10^5
- 1 <= k <= nums.length

## Approach

This is the exact same shape as Binary Subarrays With Sum, just with "count of odd numbers" playing the role of "sum of a binary array" — every number is effectively 0 (even) or 1 (odd) for the purposes of this count. So the same "exactly = at most(k) - at most(k-1)" trick applies.

`at_most(limit)` counts subarrays containing at most `limit` odd numbers using a plain sliding window: expand with `right`, incrementing an odd counter when `nums[right]` is odd; shrink from the left whenever the odd count exceeds `limit`; add `right - left + 1` to the running total at each step, since every subarray ending at `right` starting anywhere from `left` onward has at most `limit` odds.

Subtracting `at_most(k-1)` from `at_most(k)` leaves exactly the subarrays with precisely `k` odd numbers, since anything with fewer than `k` odds is counted in both and cancels out.

**Time complexity:** O(n) — two linear passes.

**Space complexity:** O(1) — a running odd-count and pointers.
