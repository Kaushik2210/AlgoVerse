# 766. Toeplitz Matrix

**Commonly asked at:** Google

You're given an `m x n` matrix. Return `true` if it's a Toeplitz matrix, meaning every diagonal running from top-left to bottom-right has the same value all the way along it.

**Example 1:**
```
Input: matrix = [[1,2,3,4],[5,1,2,3],[9,5,1,2]]
Output: true
Explanation: Each diagonal has a single distinct value.
```

**Example 2:**
```
Input: matrix = [[1,2],[2,2]]
Output: false
Explanation: The diagonal "[1, 2]" has different values.
```

**Constraints:**
- m == matrix.length, n == matrix[i].length
- 1 <= m, n <= 20
- 0 <= matrix[i][j] <= 99

## Approach

A cell and the cell diagonally below-right of it (`row+1, col+1`) always sit on the exact same top-left-to-bottom-right diagonal. So the matrix is Toeplitz precisely when every cell matches its diagonal neighbor one row and one column down.

Scan every cell `(r, c)` that has such a neighbor in bounds (i.e. skip the last row and last column) and check `matrix[r][c] == matrix[r+1][c+1]`. If any pair disagrees, the diagonal isn't constant, so return `false` immediately. If every pair matches, the whole matrix is Toeplitz.

**Time complexity:** O(m * n) — every cell (except the last row/column) is checked once.

**Space complexity:** O(1) — no extra structures beyond the input.
