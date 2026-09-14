# 447. Number of Boomerangs

You're given `n` points on a plane, all with distinct coordinate pairs (though two different points could still be the same as each other in the input). A boomerang is a tuple of points `(i, j, k)` such that the distance between `i` and `j` equals the distance between `i` and `k` (the order of `j` and `k` matters — `(i, j, k)` and `(i, k, j)` count separately). Return the number of boomerangs.

**Example 1:**
```
Input: points = [[0,0],[1,0],[2,0]]
Output: 2
Explanation: The boomerangs are [[1,0],[0,0],[2,0]] and [[1,0],[2,0],[0,0]]
```

**Example 2:**
```
Input: points = [[1,1]]
Output: 0
```

**Constraints:**
- n == points.length
- 1 <= n <= 500

## Approach

Checking every ordered triple directly is O(n^3), which is unnecessary — the problem only cares about distances *from* a fixed pivot point `i`, so it decomposes per-pivot.

For each point `i` acting as the pivot, compute its squared distance (no need for an actual sqrt — equal squared distances mean equal distances) to every other point, and tally how many points land at each distance in a hash map. If `count` points sit at some particular distance from `i`, any ordered pair of two *different* ones among them forms a valid boomerang with `i` first — that's `count * (count - 1)` ordered pairs (choose the `j` slot count ways, the `k` slot count-1 remaining ways). Sum that over every distance bucket and every pivot.

Verified against `[[0,0],[1,0],[2,0]]` -> 2 (pivot (1,0) is equidistant from the other two), `[[1,1]]` -> 0 (not enough points), and `[[1,1],[2,2],[3,3]]` -> 2 (pivot (2,2) is equidistant from the other two, same shape as example 1).

**Time complexity:** O(n^2) — for each of the n pivots, an O(n) pass over every other point.

**Space complexity:** O(n) for the per-pivot distance-count map.
