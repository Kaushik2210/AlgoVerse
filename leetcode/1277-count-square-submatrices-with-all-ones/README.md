# 1277. Count Square Submatrices with All Ones

**Commonly asked at:** Amazon

Given an `m x n` binary matrix, count the total number of square submatrices that contain only `1`s (of every possible size, not just the largest).

**Example 1:**
```
Input: matrix = [[0,1,1,1],[1,1,1,1],[0,1,1,1]]
Output: 15
Explanation: 10 squares of size 1x1, 4 squares of size 2x2, 1 square of size 3x3, total 15.
```

**Example 2:**
```
Input: matrix = [[1,0,1],[1,1,0],[1,1,0]]
Output: 7
Explanation: 6 squares of size 1x1, 1 square of size 2x2, total 7.
```

**Constraints:**
- 1 <= m, n <= 300
- matrix[i][j] is 0 or 1

## Approach

This is the same idea as the "maximal square" problem, just with a different final answer. Define `dp[i][j]` as the side length of the **largest** all-ones square whose bottom-right corner is exactly cell `(i, j)`. If `matrix[i][j] == 0`, no square can end there, so `dp[i][j] = 0`. Otherwise:

```
dp[i][j] = 1 + min(dp[i-1][j], dp[i][j-1], dp[i-1][j-1])
```

The reasoning: to extend a square of side `k` ending at `(i, j)`, the cell above, the cell to the left, and the cell diagonally up-left must all support at least a `(k-1)`-side square ending there — the smallest of those three caps how big a square can end at `(i, j)`.

The key extra insight for *this* problem: `dp[i][j]` doesn't just tell you the largest square ending at `(i,j)` — it tells you the **count** of distinct all-ones squares ending at `(i, j)`, because every smaller size from `1` up to `dp[i][j]` also fits (a square of side `k` ending there is valid for every `k` from 1 to the max, since shrinking a valid square from its bottom-right corner keeps it inside the same all-ones region). So the total answer is just the sum of `dp[i][j]` over every cell.

Edge cells (`i == 0` or `j == 0`) simply have `dp[i][j] = matrix[i][j]`, since no square bigger than 1x1 can end on the boundary.

**Time complexity:** O(m*n) — each cell is processed once with O(1) work.

**Space complexity:** O(m*n) for the dp table (can be reduced to O(n) with a rolling row, or O(1) by overwriting the input in place).
