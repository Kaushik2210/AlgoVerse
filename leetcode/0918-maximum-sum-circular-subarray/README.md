# 918. Maximum Sum Circular Subarray

You're given a circular integer array `nums` — the array wraps around, so the element after the last one is the first one again. Find the maximum possible sum of a non-empty subarray, where a subarray may now wrap around the end back to the beginning.

**Example 1:**
```
Input: nums = [1,-2,3,-2]
Output: 3
Explanation: [3] has the maximum sum, no wrap-around needed.
```

**Example 2:**
```
Input: nums = [5,-3,5]
Output: 10
Explanation: [5,5] wraps around the array: last element + first element.
```

**Example 3:**
```
Input: nums = [-3,-2,-3]
Output: -2
Explanation: All numbers are negative, so the best subarray is a single element.
```

**Constraints:**
- n == nums.length
- 1 <= n <= 3*10^4
- -3*10^4 <= nums[i] <= 3*10^4

## Approach

A max subarray sum with no wrap-around is just plain Kadane's algorithm. The new wrinkle is the subarray might wrap past the end of the array back to the start.

The key insight: a wrapping subarray is exactly the total sum of the array minus some *contiguous, non-wrapping* middle chunk that got left out. So to maximize a wrapping subarray, you want to minimize that excluded middle chunk — which is just Kadane's algorithm run in reverse, finding the **minimum** subarray sum instead of the maximum.

So the answer is one of two things:
- The best non-wrapping subarray, found with standard Kadane's (`max_sum`).
- `total - min_sum`, where `min_sum` is the smallest-sum subarray found with a minimum-tracking Kadane's — removing that chunk and keeping everything else (which wraps around).

Both `max_sum` and `min_sum` can be tracked in a single pass alongside the running total.

There's one trap: if every number in the array is negative, `total - min_sum` would end up subtracting the *entire* array (since the minimum subarray is the whole array), leaving an empty subarray worth 0 — but subarrays must be non-empty. The fix is simple: if `max_sum` (the ordinary Kadane's result) is already negative, that means every element is negative, so just return `max_sum` directly — the best you can do is pick the single largest (least negative) element.

**Time complexity:** O(n) — one pass tracking both the max and min running subarray sums.

**Space complexity:** O(1) — a handful of running variables, no extra data structures.
