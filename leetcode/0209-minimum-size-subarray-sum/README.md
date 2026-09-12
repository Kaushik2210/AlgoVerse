# 209. Minimum Size Subarray Sum

You're given an array of positive integers `nums` and a positive integer `target`. Return the length of the shortest contiguous subarray whose sum is at least `target`. If no such subarray exists, return 0.

**Example 1:**
```
Input: target = 7, nums = [2,3,1,2,4,3]
Output: 2
Explanation: [4,3] has a sum of 7 and is the shortest such subarray.
```

**Example 2:**
```
Input: target = 4, nums = [1,4,4]
Output: 1
```

**Example 3:**
```
Input: target = 11, nums = [1,1,1,1,1,1,1,1]
Output: 0
```

**Constraints:**
- 1 <= target <= 10^9
- 1 <= nums.length <= 10^5
- 1 <= nums[i] <= 10^4

## Approach

Since every element is positive, growing the window always increases its sum and shrinking it always decreases it — that monotonic relationship is exactly what makes a sliding window work here (it would break down with negative numbers, since shrinking wouldn't reliably decrease the sum).

Expand a window by moving `right` forward, adding `nums[right]` to a running `window_sum`. Whenever the sum reaches or exceeds `target`, the current window is a valid candidate — record its length, then greedily shrink from the left (subtracting `nums[left]` and advancing `left`) for as long as the window is still valid, since a shorter window is always at least as good. This inner `while` loop is what finds the tightest possible window ending near the current `right` before moving on.

If the window sum never reaches `target` even using the whole array, no subarray qualifies, so the answer is 0.

**Time complexity:** O(n) — `left` and `right` each only move forward, so together they traverse the array at most twice.

**Space complexity:** O(1) — just a running sum and two pointers.
