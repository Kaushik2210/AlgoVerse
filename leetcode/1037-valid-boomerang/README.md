# 1037. Valid Boomerang

You're given `points`, an array of 3 points `[x, y]` in the plane. Return `true` if these points make a "boomerang" — meaning they are not all on the same straight line.

**Example 1:**
```
Input: points = [[1,1],[2,3],[3,2]]
Output: true
```

**Example 2:**
```
Input: points = [[1,1],[2,2],[3,3]]
Output: false
```

**Constraints:**
- points.length == 3
- points[i].length == 2

## Approach

With only three fixed points, this is really just a collinearity check. Take the two vectors from the first point to the other two — `(x1-x0, y1-y0)` and `(x2-x0, y2-y0)` — and compute their 2D cross product. That cross product is zero exactly when the two vectors are parallel, which happens exactly when all three points sit on one line. So the points form a valid boomerang precisely when that cross product is *not* zero.

Using the cross product avoids computing a slope (which breaks for vertical lines) and needs only integer arithmetic, so there's no precision concern either.

Verified against `[[1,1],[2,3],[3,2]]` -> true and `[[1,1],[2,2],[3,3]]` -> false, plus a vertical-line case `[[0,0],[0,1],[0,2]]` -> false and a right-angle bend `[[0,0],[0,1],[1,0]]` -> true.

**Time complexity:** O(1) — a fixed number of arithmetic operations regardless of input.

**Space complexity:** O(1).
