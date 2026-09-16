# 498. Diagonal Traverse

**Commonly asked at:** Google, Amazon, Microsoft

Given an `m x n` matrix, return all elements in diagonal order, the way the diagonals are traversed in the classic zig-zag pattern: alternating between going up-right and down-left along each diagonal.

**Example 1:**
```
Input: mat = [[1,2,3],[4,5,6],[7,8,9]]
Output: [1,2,4,7,5,3,6,8,9]
```

**Example 2:**
```
Input: mat = [[1,2],[3,4]]
Output: [1,2,3,4]
```

**Constraints:**
- 1 <= m, n <= 10^4
- 1 <= m * n <= 10^4

## Approach

Every cell `(r, c)` lies on the diagonal identified by `d = r + c` — all cells with the same `r + c` sum sit on the same anti-diagonal. There are `m + n - 1` such diagonals in total, and the direction of traversal alternates: even-numbered diagonals (`d` even) are walked from bottom-left to top-right (row decreasing, column increasing), odd-numbered diagonals are walked top-right to bottom-left (row increasing, column decreasing). Iterating `d` from `0` to `m + n - 2` and, for each, walking its cells in the right direction reproduces the zig-zag exactly.

For a fixed `d`, the row can range from `max(0, d - (n - 1))` to `min(d, m - 1)` — those bounds come from requiring both `r` and `c = d - r` to stay inside the matrix. Generate that list of rows in increasing order for odd diagonals, or reversed for even diagonals, and read off `mat[r][d - r]` for each.

This avoids any explicit direction-flag bookkeeping cell-by-cell: instead of walking a diagonal and detecting when to bounce off an edge, the boundary clamp is computed directly from `d`, and the direction is simply "forward or reversed" based on `d`'s parity.

**Time complexity:** O(m*n) — every cell is visited exactly once across all diagonals.

**Space complexity:** O(1) extra (excluding the O(m*n) output array).
