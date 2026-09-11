# 84. Largest Rectangle in Histogram

Given an array `heights` representing the heights of histogram bars, each with width 1, find the area of the largest rectangle that can fit within the histogram's outline.

**Example 1:**
```
Input: heights = [2,1,5,6,2,3]
Output: 10
Explanation: The rectangle spans bars at indices 2 and 3 (heights 5 and 6), using height 5, so area = 5 * 2 = 10.
```

**Example 2:**
```
Input: heights = [2,4]
Output: 4
```

**Constraints:**
- 1 <= heights.length <= 10^5
- 0 <= heights[i] <= 10^4

## Approach

For every bar, imagine it's the *shortest* bar in some rectangle — then that rectangle can stretch as far left and as far right as the bars stay at least that tall, and its area is `height[i] * (right_boundary - left_boundary - 1)`. Checking this directly for each bar by scanning outward both ways is O(n) per bar, so O(n^2) overall — that's the brute force.

The faster way uses a monotonic increasing stack of bar *indices*. As you scan left to right, whenever the current bar is shorter than the bar at the top of the stack, that top bar can no longer extend any further right — so its rectangle is now fully determined. Pop it off, and compute its area: the height is the popped bar's height, and the width is the distance between the current index and the index now exposed at the top of the stack (that's the nearest shorter bar on the left; if the stack is empty afterward, the popped bar extended all the way to index 0). Push the current index. This way each bar is pushed once and popped once.

To flush out bars still sitting on the stack at the end (ones that extend all the way to the right edge), append a sentinel bar of height 0 to the end of the array — it's guaranteed to be shorter than everything, forcing every remaining bar to be popped and resolved.

**Time complexity:** O(n) — each index is pushed onto and popped off the stack exactly once.

**Space complexity:** O(n) — for the stack, in the worst case (strictly increasing heights).
