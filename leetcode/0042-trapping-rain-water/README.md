# 42. Trapping Rain Water

You're given `n` non-negative integers `height` representing an elevation map, where each bar has width 1. Compute how much rainwater it can trap after raining.

**Example 1:**
```
Input: height = [0,1,0,2,1,0,1,3,2,1,2,1]
Output: 6
```

**Example 2:**
```
Input: height = [4,2,0,3,2,5]
Output: 9
```

**Constraints:**
- n == height.length
- 1 <= n <= 2 * 10^4
- 0 <= height[i] <= 10^5

## Approach

The key realization: how much water sits *above* any single bar depends only on two things — the tallest bar to its left, and the tallest bar to its right. Water gets trapped up to the shorter of those two walls (water can't be held higher than its lowest boundary), and you subtract the bar's own height because that part is already filled with the bar itself.

`water[i] = max(0, min(leftMax[i], rightMax[i]) - height[i])`

**Brute force:** for every index, scan left to find the max and scan right to find the max. That's O(n) work per index, so O(n^2) overall.

**Better — prefix/suffix max arrays:** precompute `leftMax[i]` (tallest bar from 0..i) and `rightMax[i]` (tallest bar from i..n-1) in two linear passes, then a third pass sums up `min(leftMax[i], rightMax[i]) - height[i]` for each bar. O(n) time, O(n) extra space.

**Best — two pointers:** you don't actually need both arrays materialized. Keep a pointer at each end of the array along with a running `leftMax` and `rightMax`. At each step, advance whichever side has the smaller running max — that side's water level is *guaranteed* to be `min(leftMax, rightMax)` regardless of what's further past the other pointer, because the smaller side is the binding constraint no matter what taller bars might still be waiting on the other end. This collapses the three-pass approach into one pass with O(1) space.

**Time complexity:** O(n) — a single pass with two pointers.

**Space complexity:** O(1) — just a few running variables, no auxiliary arrays.
