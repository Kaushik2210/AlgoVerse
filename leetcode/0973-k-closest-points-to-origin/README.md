# 973. K Closest Points to Origin

You're given an array of points on the X-Y plane, `points`, and an integer `k`. Return the `k` points closest to the origin `(0, 0)`, in any order.

**Example 1:**
```
Input: points = [[1,3],[-2,2]], k = 1
Output: [[-2,2]]
Explanation: sqrt(1^2+3^2) = sqrt(10) ~ 3.16, sqrt((-2)^2+2^2) = sqrt(8) ~ 2.83, so [-2,2] is closer.
```

**Example 2:**
```
Input: points = [[3,3],[5,-1],[-2,4]], k = 2
Output: [[3,3],[-2,4]]
```

**Constraints:**
- 1 <= k <= points.length <= 10^4
- -10^4 <= x_i, y_i <= 10^4

## Approach

Sorting every point by distance and taking the first `k` works in O(n log n), but a max-heap of size `k` gets this down to O(n log k), which is better whenever `k` is small relative to `n`.

Compare distances using squared Euclidean distance (`x*x + y*y`) instead of the actual square root — since square root is monotonic for non-negative values, comparing squared distances gives the exact same ordering without the cost (and precision concerns) of floating point.

Maintain a heap that never grows past size `k`. Python's `heapq` is a min-heap, so to simulate a max-heap keyed on distance, push tuples of `(-dist, x, y)` — negating flips the ordering so the heap's smallest tuple (by Python's default tuple comparison) is really the *farthest* point among those currently kept. Push every point onto the heap; whenever its size exceeds `k`, pop — that pop always discards the current farthest point, since it sits at the top of this negated max-heap. After processing every point, exactly the `k` closest ones remain.

**Time complexity:** O(n log k) — each of the n points does one heap push/pop, each O(log k).

**Space complexity:** O(k) for the heap.
