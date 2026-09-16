# 221. Maximal Square

**Commonly asked at:** Amazon, Google

You're given an `m x n` binary matrix filled with `'0'` and `'1'`. Find the largest square containing only `'1'`s and return its area.

**Example 1:**
```
Input: matrix = [["1","0","1","0","0"],
                 ["1","0","1","1","1"],
                 ["1","1","1","1","1"],
                 ["1","0","0","1","0"]]
Output: 4
Explanation: The largest all-1s square is 2x2, area 4.
```

**Example 2:**
```
Input: matrix = [["0","1"],["1","0"]]
Output: 1
```

**Constraints:**
- m == matrix.length
- n == matrix[i].length
- 1 <= m, n <= 300
- matrix[i][j] is '0' or '1'

## Approach

Checking every possible square by brute force (trying every top-left corner and every side length, verifying all cells are '1') is O((mn)^2) in the worst case — way too slow. The key insight is that whether a square of side `s` can have its bottom-right corner at `(i, j)` depends entirely on three smaller squares that almost fit: the square ending at `(i-1, j)`, at `(i, j-1)`, and at `(i-1, j-1)`.

Define `dp[i][j]` as the side length of the largest all-1s square whose bottom-right corner is exactly at `(i, j)`. If `matrix[i][j]` is `'0'`, no square can end there, so `dp[i][j] = 0`. If it's `'1'`, the square ending here can extend one further than the *smallest* of the three neighboring squares (up, left, and diagonal up-left) — because all three of those neighbors' squares have to actually be filled with 1s for the bigger square to hold together, and the smallest one is the bottleneck: `dp[i][j] = min(dp[i-1][j], dp[i][j-1], dp[i-1][j-1]) + 1`. Cells on the first row or first column can only ever support a 1x1 square (`dp[i][j] = 1` if the cell is '1'), since there's no room for a diagonal neighbor.

Track the maximum `dp` value seen; the answer is that maximum squared (area of a square with that side length).

**Time complexity:** O(m * n) — one pass filling in the dp table.

**Space complexity:** O(m * n) for the dp table (reducible to O(n) with a rolling row, since each cell only needs the row above and the current row so far).
