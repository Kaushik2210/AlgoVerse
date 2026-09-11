# 11. Container With Most Water

You're given an array `height`, where `height[i]` is the height of a vertical line drawn at position `i`. Pick two of these lines that, together with the x-axis, form a container, such that the container holds the most water. Return the maximum amount of water it can hold.

The amount of water held is determined by the shorter of the two chosen lines (water spills over the shorter side) times the horizontal distance between them.

**Example 1:**
```
Input: height = [1,8,6,2,5,4,8,3,7]
Output: 49
Explanation: lines at index 1 (height 8) and index 8 (height 7) — width 7 * min(8,7) = 49
```

**Example 2:**
```
Input: height = [1,1]
Output: 1
```

**Constraints:**
- 2 <= height.length <= 10^5
- 0 <= height[i] <= 10^4

## Approach

Trying every pair of lines and computing the area for each is the obvious brute force — O(n^2) pairs — which is too slow for 10^5 lines.

The two-pointer trick here relies on a specific observation: start with the widest possible container — one pointer at the very left, one at the very right. That gives you the maximum possible width, so if there's any water gain to be had elsewhere, it can only come from taller lines, not more width. Now, since the water level is capped by the *shorter* of the two current lines, moving the taller pointer inward can never help — the width shrinks and the limiting (shorter) height either stays the same or gets even more limited. So the only line worth ever moving is the *shorter* one, hoping to find something taller and increase the limiting height.

So: compute the area for the current pair, record the best seen so far, then move whichever pointer points at the shorter line inward by one. Repeat until the pointers meet. Every pair that gets skipped this way is provably no better than a pair you already considered, so nothing valuable is lost.

**Time complexity:** O(n) — the two pointers together traverse the array once.

**Space complexity:** O(1) — just a couple of pointers and a running maximum.
