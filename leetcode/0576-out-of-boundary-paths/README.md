# 576. Out of Boundary Paths

**Commonly asked at:** Amazon, Bloomberg

There is an `m x n` grid with a ball. The ball is initially at the position `[startRow, startColumn]`. You are allowed to move the ball to one of the four adjacent cells in the grid (possibly out of the grid crossing the grid boundary). You can apply at most `maxMove` moves to the ball.

Given the five integers `m`, `n`, `maxMove`, `startRow`, `startColumn`, return the number of paths to move the ball out of the grid boundary. Since the answer can be very large, return it modulo `10^9 + 7`.

**Example 1:**
```
Input: m = 2, n = 2, maxMove = 2, startRow = 0, startColumn = 0
Output: 6
```

**Example 2:**
```
Input: m = 1, n = 3, maxMove = 3, startRow = 0, startColumn = 1
Output: 12
```

**Constraints:**
- 1 <= m, n <= 50
- 0 <= maxMove <= 50
- 0 <= startRow < m
- 0 <= startColumn < n

## Approach

DP over move count. Keep a grid `dp[r][c]` representing how many distinct move sequences of the current length end with the ball standing at `(r, c)` (still inside the grid). Start with `dp[startRow][startColumn] = 1` and everything else 0.

For each of the `maxMove` moves available, build a fresh grid `new_dp` from the current one: for every cell `(r, c)` with a nonzero count, try moving in each of the four directions. If the destination lands inside the grid, add the count into `new_dp` at that destination — this represents a path that's still in-bounds and could keep moving. If the destination falls outside the grid, that count represents paths that just left the boundary on this exact move, so add it directly to `total_paths` (a running answer) instead — once a path leaves the boundary it's counted and done, it doesn't continue.

After exhausting all `maxMove` moves, `total_paths` holds the count of every distinct sequence of moves (of length at most `maxMove`, since some might exit early) that ends by crossing the boundary, taken modulo `10^9 + 7`.

**Time complexity:** O(maxMove * m * n), since each of the `maxMove` rounds does O(1) work per grid cell.

**Space complexity:** O(m * n) for the current and next dp grids.
