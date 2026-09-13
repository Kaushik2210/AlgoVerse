# 1289. Minimum Falling Path Sum II

Given an `n x n` integer matrix `grid`, return the minimum sum of a falling path, where a falling path picks exactly one cell from each row, and no two chosen cells from consecutive rows can be in the same column (unlike the diagonal-neighbor version, here you're free to jump to *any* other column in the next row).

**Example 1:**
```
Input: grid = [[1,2,3],[4,5,6],[7,8,9]]
Output: 13
Explanation: The minimum path picks 1 (row 0, col 0), 5 (row 1, col 1), 7 (row 2, col 0) — 1+5+7 = 13.
```

**Example 2:**
```
Input: grid = [[7]]
Output: 7
```

**Constraints:**
- n == grid.length == grid[i].length
- 1 <= n <= 200
- -99 <= grid[i][j] <= 99

## Approach

This is the same row-by-row DP shape as the diagonal version (Minimum Falling Path Sum), but the "not the same column" constraint means each cell in the current row can, in principle, come from any of the `n - 1` other columns in the row above — checking all of them for every cell would be `O(n)` per cell, `O(n^2)` per row, `O(n^3)` total.

The fix: for any given column `j`, the best previous-row value that's *not* in column `j` is either the overall smallest value in the previous row (if that smallest one isn't in column `j`), or the second-smallest value (if it is). So instead of tracking just the minimum of the previous row, track both the minimum and the second minimum, along with which column the minimum came from.

Then for every cell in the current row: if its column matches where the previous row's minimum sat, it has to use the second-minimum instead; otherwise it's free to use the true minimum. That's an O(1) lookup per cell instead of an O(n) rescan, bringing the whole thing down to O(n^2).

**Time complexity:** O(n^2) — for each row, one pass to find min/second-min, one pass to fill in the row.

**Space complexity:** O(n) for the rolling previous-row array (excluding the O(1) extra tracking variables).
