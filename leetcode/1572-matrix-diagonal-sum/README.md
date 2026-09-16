# 1572. Matrix Diagonal Sum

**Commonly asked at:** Amazon

Given a square matrix `mat`, return the sum of the elements on the primary diagonal (top-left to bottom-right) plus the elements on the secondary diagonal (top-right to bottom-left). If a cell belongs to both diagonals (which only happens at the exact center of an odd-sized matrix), it should only be counted once.

**Example 1:**
```
Input: mat = [[1,2,3],[4,5,6],[7,8,9]]
Output: 25
Explanation: Primary diagonal = 1+5+9 = 15, secondary = 3+5+7 = 15, minus the double-counted center (5) = 25
```

**Example 2:**
```
Input: mat = [[5]]
Output: 5
```

**Constraints:**
- n == mat.length == mat[i].length
- 1 <= n <= 100
- 1 <= mat[i][j] <= 100

## Approach

For an `n x n` matrix, row `i` contributes `mat[i][i]` to the primary diagonal and `mat[i][n-1-i]` to the secondary diagonal. Walk through each row once and add both, except when `i == n - 1 - i` (the dead-center row of an odd-length matrix), where the primary and secondary cell are literally the same cell — add it only once there.

**Time complexity:** O(n) — a single pass over the rows, touching at most two cells per row.

**Space complexity:** O(1) — just a running total.
