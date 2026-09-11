# 64. Minimum Path Sum

You're given an `m x n` grid filled with non-negative numbers. Find a path from the top-left to the bottom-right that minimizes the sum of the numbers along it. You can only move down or right.

**Example 1:**
```
Input: grid = [[1,3,1],[1,5,1],[4,2,1]]
Output: 7
Explanation: the path 1 -> 3 -> 1 -> 1 -> 1 minimizes the sum.
```

**Example 2:**
```
Input: grid = [[1,2,3],[4,5,6]]
Output: 12
```

**Constraints:**
- 1 <= m, n <= 200
- 0 <= grid[i][j] <= 200

## Approach

This is the same shape of problem as Unique Paths, just with costs instead of counts. Trying every down/right path and taking the minimum is exponential, since the same cell gets revisited by many different paths — a clear sign to cache results per cell instead of recomputing them.

Define `cost(i, j)` as the cheapest way to reach cell `(i, j)` from the top-left. To arrive at `(i, j)`, you either came from directly above or directly to the left, so `cost(i, j) = grid[i][j] + min(cost(i-1, j), cost(i, j-1))` — pay for the current cell, plus whichever of the two possible previous cells was cheaper to reach. The first row can only be reached by moving right the whole way, and the first column only by moving down the whole way, so those are filled in directly as running sums before the general recurrence kicks in.

Just like Unique Paths, each row only needs the row above it, so the 2D table collapses to a single 1D array reused across rows — `row[j] = grid[i][j] + min(row[j], row[j-1])`, where `row[j]` on the right side still holds the value from the row above before being overwritten.

**Time complexity:** O(m * n) — every cell is processed once.

**Space complexity:** O(n) — one row of running costs, instead of the full grid.
