# 694. Number of Distinct Islands

**Commonly asked at:** Google, Facebook, Amazon

> **Note:** This is a LeetCode premium problem, so it can't be opened or submitted on a free account. Solved and verified independently against hand-built test cases.

You're given a grid of `0`s (water) and `1`s (land). An island is a group of land cells connected 4-directionally. Two islands are considered the same if one can be translated (shifted, not rotated or reflected) to exactly match the other. Return the number of distinct island shapes.

**Example 1:**
```
Input: grid = [[1,1,0,0,0],[1,1,0,0,0],[0,0,0,1,1],[0,0,0,1,1]]
Output: 1
Explanation: Both islands are 2x2 squares, so they're the same shape.
```

**Example 2:**
```
Input: grid = [[1,1,0,1,1],[1,0,0,0,0],[0,0,0,0,1],[1,1,0,1,1]]
Output: 3
```

**Constraints:**
- m == grid.length, n == grid[i].length
- 1 <= m, n <= 50
- `grid[i][j]` is `0` or `1`

## Approach

This is the standard island flood-fill, but with an extra twist: instead of just counting islands, we need a way to recognize when two islands have the *same shape*, regardless of where on the grid they sit.

The trick is to record each cell's position *relative to the island's starting cell* rather than its absolute grid coordinates. When flood-filling from a fresh unvisited land cell `(sr, sc)`, for every land cell `(r, c)` visited during that fill, record the offset `(r - sr, c - sc)`. That offset is completely independent of where the island happens to sit on the grid — two islands with the same shape but shifted to different locations produce the exact same set of offsets, because they're measured relative to each island's own anchor point.

Collect the sorted list (or tuple) of offsets for each island into a set of "shape signatures". The size of that set at the end is the number of distinct island shapes.

**Time complexity:** O(m * n) — every cell is visited by the outer scan once and by a flood fill at most once, and building/hashing each shape signature is proportional to that island's size, so the total is still bounded by the grid size.

**Space complexity:** O(m * n) for the visited tracking and the shape signatures.
