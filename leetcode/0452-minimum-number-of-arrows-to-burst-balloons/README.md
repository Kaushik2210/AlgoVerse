# 452. Minimum Number of Arrows to Burst Balloons

There are spherical balloons stuck against a wall, each represented as a horizontal diameter by a pair `[x_start, x_end]`. Arrows are shot straight up and burst every balloon whose diameter they pass through. Given an array `points` of balloon diameters, return the minimum number of arrows needed to burst every balloon.

**Example 1:**
```
Input: points = [[10,16],[2,8],[1,6],[7,12]]
Output: 2
Explanation: One arrow at x = 6 bursts [2,8] and [1,6]. Another at x = 11 bursts [10,16] and [7,12].
```

**Example 2:**
```
Input: points = [[1,2],[3,4],[5,6],[7,8]]
Output: 4
Explanation: No balloons overlap, so each needs its own arrow.
```

**Constraints:**
- 1 <= points.length <= 10^5
- points[i].length == 2

## Approach

This is a classic interval-scheduling greedy problem. The goal is to group as many overlapping balloons as possible under a single arrow.

Sort the balloons **by their end coordinate**, not their start. That matters — sorting by end means you always consider the balloon that "runs out" soonest first, so placing an arrow at that balloon's end coordinate is the safest possible choice: it's guaranteed to hit every balloon overlapping it, without risking that some other balloon needing an earlier arrow gets missed.

Walk through the sorted balloons keeping track of the current arrow's position, initialized to the end of the first balloon. For each next balloon, if its start is past the current arrow position, it can't be hit by that arrow — fire a new one, placed at this balloon's end coordinate, and continue. If its start is at or before the arrow position, it's already covered, no new arrow needed.

**Time complexity:** O(n log n) for the sort; the single pass afterward is O(n).

**Space complexity:** O(1) extra (ignoring the space used by the sort itself, or O(log n) to O(n) depending on the sort implementation).
