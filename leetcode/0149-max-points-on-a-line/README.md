# 149. Max Points on a Line

You're given an array `points` where `points[i] = [xi, yi]` represents a point on the X-Y plane. Return the maximum number of points that all lie on the same straight line.

**Example 1:**
```
Input: points = [[1,1],[2,2],[3,3]]
Output: 3
Explanation: All three points lie on the line y = x.
```

**Example 2:**
```
Input: points = [[1,1],[3,2],[5,3],[4,1],[2,3],[1,4]]
Output: 4
```

**Constraints:**
- 1 <= points.length <= 300
- points[i].length == 2
- -10^4 <= xi, yi <= 10^4
- All points are distinct

## Approach

Checking every possible line by trying every subset of points is way too slow. A cleaner way to leverage geometry: any line is fully determined by the *slope* it has relative to some fixed point on it. So fix each point in turn as an "anchor," and for every other point compute the slope of the line connecting it to the anchor. Points sharing the same slope relative to the same anchor all lie on one line through that anchor. Count how many points share each slope value (using a hash map), and the largest count (plus 1 for the anchor itself) is the best line through that anchor. Track the best answer across all anchors.

The tricky part is representing "slope" in a way that's hashable and avoids floating-point precision issues. Instead of computing `dy / dx` as a float, reduce the pair `(dy, dx)` to lowest terms using their GCD and use that normalized pair as the map key. Also normalize the sign (e.g. always keep `dx` non-negative, flipping both signs if needed) so that `(dy, dx)` and `(-dy, -dx)` — which represent the same slope — hash to the same key. A vertical line needs special-casing since `dx = 0` (normalize it to a sentinel like `(0, 1)` — deliberately distinct from what a horizontal line's `(dx, dy)` reduces to, `(1, 0)`, so the two cases can never collide in the map). Two points with `dx == dy == 0` can't happen since points are distinct.

**Time complexity:** O(n^2) — for each of the n points as anchor, compute slopes to the other n-1 points.

**Space complexity:** O(n) for the slope-count hash map used per anchor.
