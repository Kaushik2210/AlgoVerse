# 463. Island Perimeter

You're given a grid of `0`s (water) and `1`s (land) representing a map with exactly one island (a group of land cells connected 4-directionally), and no lakes (water fully enclosed inside the island). Return the perimeter of that island.

**Example 1:**
```
Input: grid = [[0,1,0,0],[1,1,1,0],[0,1,0,0],[1,1,0,0]]
Output: 16
```

**Example 2:**
```
Input: grid = [[1]]
Output: 4
```

**Constraints:**
- m == grid.length, n == grid[i].length
- 1 <= m, n <= 100
- `grid[i][j]` is `0` or `1`
- There is exactly one island

## Approach

There's no need for a flood fill or connectivity search at all — the perimeter can be computed with a single pass over the grid using a simple counting trick.

Each individual land cell contributes 4 to the perimeter on its own (its four edges), but every time two land cells sit directly next to each other (sharing an edge), that shared edge is internal and should be subtracted twice — once for each of the two cells whose edge it covers up. So: scan every cell, and whenever it's land, add 4 to a running total, then for its right neighbor and its bottom neighbor specifically (checking each pair only once avoids double-subtracting), if that neighbor is also land, subtract 2 (one edge removed from each of the two adjacent cells).

**Time complexity:** O(m * n) — a single scan over the grid, checking each cell against at most two neighbors.

**Space complexity:** O(1) — no extra structures needed.
