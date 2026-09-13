# 1162. As Far from Land as Possible

You're given an `n x n` grid of `0`s (water) and `1`s (land). Find the water cell whose distance to the nearest land cell is as large as possible, and return that distance (measured as Manhattan/4-directional grid steps). If the grid is all land or all water, return `-1`.

**Example 1:**
```
Input: grid = [[1,0,1],[0,0,0],[1,0,1]]
Output: 2
Explanation: The cell (1,1) is distance 2 from the nearest land cell.
```

**Example 2:**
```
Input: grid = [[1,0,0],[0,0,0],[0,0,0]]
Output: 4
```

**Constraints:**
- n == grid.length == grid[i].length
- 1 <= n <= 100
- `grid[i][j]` is `0` or `1`

## Approach

Computing the nearest-land distance for each water cell independently (a separate BFS or search from every cell) would be wasteful — the trick is to run the search in reverse, from all land at once.

Push every land cell into a queue simultaneously as sources of a multi-source breadth-first search, each starting at distance 0. Expand outward one ring at a time across water cells, marking each newly reached water cell with the distance at which it was first reached (BFS guarantees that's the shortest distance to *some* land cell, since all sources start at the same time). Track the maximum distance seen as the BFS proceeds — the last cell reached (or more precisely, the largest distance recorded) is the answer. If there were no land cells or no water cells to begin with, return `-1` immediately since the answer is undefined.

**Time complexity:** O(n^2) — every cell is enqueued and processed at most once.

**Space complexity:** O(n^2) for the queue and the visited/distance tracking.
