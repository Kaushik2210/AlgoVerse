# 885. Spiral Matrix III

You start at cell `(rStart, cStart)` on a grid with `rows` rows and `cols` columns, facing east, and walk in a clockwise spiral, visiting every cell exactly once (only recording the ones that actually land inside the grid). Return the list of coordinates visited, in order.

**Example 1:**
```
Input: rows = 1, cols = 4, rStart = 0, cStart = 0
Output: [[0,0],[0,1],[0,2],[0,3]]
```

**Example 2:**
```
Input: rows = 5, cols = 6, rStart = 1, cStart = 4
Output: [[1,4],[1,5],[2,5],[2,4],[2,3],[1,3],[0,3],[0,4],[0,5],[3,5],[3,4],[3,3],[3,2],[2,2],[1,2],[0,2],[4,5],[4,4],[4,3],[4,2],[4,1],[3,1],[2,1],[1,1],[0,1],[4,0],[3,0],[2,0],[1,0],[0,0]]
```

**Constraints:**
- 1 <= rows, cols <= 100
- 0 <= rStart < rows
- 0 <= cStart < cols

## Approach

This isn't a grid we can index into and walk row by row — it's a literal spiral walk that starts somewhere in the middle and expands outward, and some of the path falls off the grid entirely (those cells just get skipped, not recorded).

So simulate it directly. Track the current position and a direction that cycles east, south, west, north. The key pattern in an outward spiral is the step length: go 1 step east, 1 step south, then the step length grows to 2 — 2 steps west, 2 steps north — then grows to 3 — 3 steps east, 3 steps south — and so on. In other words, the step length increases by one every *two* direction changes, not every one.

Walk the spiral cell by cell, and each time the current position lands inside the grid bounds, append it to the result. Stop as soon as we've collected `rows * cols` cells, since by then every valid cell has been visited exactly once (the spiral itself extends indefinitely but is guaranteed to have covered the whole grid by that point).

**Time complexity:** O(max(rows, cols)^2) — the spiral has to expand far enough past the grid's corners to guarantee every cell is covered, and that outer bound is quadratic in the larger dimension.

**Space complexity:** O(rows * cols) for the output list (excluding it, the walk itself uses O(1) extra state).
