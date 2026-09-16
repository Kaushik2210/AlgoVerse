# 1232. Check If It Is a Straight Line

**Commonly asked at:** Google, Amazon

You're given an array of `coordinates`, where `coordinates[i] = [x, y]`. Return `true` if these points all lie on one straight line.

**Example 1:**
```
Input: coordinates = [[1,2],[2,3],[3,4],[4,5],[5,6],[6,7]]
Output: true
```

**Example 2:**
```
Input: coordinates = [[1,1],[2,2],[3,4],[4,5],[5,6],[7,7]]
Output: false
```

**Constraints:**
- 2 <= coordinates.length <= 1000
- coordinates[i].length == 2

## Approach

The obvious way to check three points are collinear is to compare slopes, but slope involves division, and division by zero (a vertical line) needs special-casing everywhere. Cross products sidestep that entirely.

Fix the direction vector `(dx, dy)` from the first point to the second. A third point `(x, y)` lies on that same line exactly when the vector from the first point to it, `(x - x0, y - y0)`, is parallel to `(dx, dy)` — and two 2D vectors are parallel exactly when their cross product is zero: `dx * (y - y0) - dy * (x - x0) == 0`. So walk every remaining point and check that cross product against the fixed direction from the first two points; the moment one doesn't line up, the answer is false.

This only uses integer multiplication and subtraction, so there's no floating-point precision to worry about, and vertical/horizontal lines fall out naturally without special cases.

Verified against both example arrays, plus a vertical line `[[0,0],[0,1],[0,5]]` -> true and a single bent point `[[0,0],[1,1],[1,0]]` -> false.

**Time complexity:** O(n) — one pass over the points after fixing the first two.

**Space complexity:** O(1).
