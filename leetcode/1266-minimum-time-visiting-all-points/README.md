# 1266. Minimum Time Visiting All Points

You're given an array `points` of integer coordinates on a plane. In one second you can move from a point to any of its 8 neighbors (horizontally, vertically, or diagonally by one unit). Return the minimum number of seconds needed to visit all the points, in the order they're given.

**Example 1:**
```
Input: points = [[1,1],[3,4],[-1,0]]
Output: 7
```

**Example 2:**
```
Input: points = [[3,2],[-2,2]]
Output: 5
```

**Constraints:**
- points.length >= 1
- -1000 <= points[i][0], points[i][1] <= 1000

## Approach

Since a diagonal step covers both an x-move and a y-move for the price of one second, the fastest way between two points `(x0,y0)` and `(x1,y1)` is: move diagonally for as long as both the x-gap and y-gap remain, then finish off whichever gap is longer with straight moves. That means the time between two points is `max(|x1-x0|, |y1-y0|)` — the Chebyshev distance — not the Manhattan distance, because diagonal moves let the smaller of the two gaps ride along for free.

The total time to visit every point in order is just the sum of this Chebyshev distance between each consecutive pair of points — there's no benefit to detouring since the points must be visited in the given sequence.

Verified against both example paths: `[[1,1],[3,4],[-1,0]]` -> 7 (max(2,3)=3 then max(4,4)=4, total 7) and `[[3,2],[-2,2]]` -> 5 (max(5,0)=5).

**Time complexity:** O(n) — one pass over consecutive point pairs.

**Space complexity:** O(1).
