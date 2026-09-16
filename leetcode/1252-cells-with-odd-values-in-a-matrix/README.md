# 1252. Cells with Odd Values in a Matrix

**Commonly asked at:** Google

You start with an `m x n` matrix of zeros. For each `[ri, ci]` in `indices`, increment every value in row `ri` by 1 and every value in column `ci` by 1. Return the number of cells with an odd value after all the increments are applied.

**Example 1:**
```
Input: m = 2, n = 3, indices = [[0,1],[1,1]]
Output: 6
Explanation: The final matrix is [[1,3,1],[1,3,1]] — all 6 cells are odd.
```

**Example 2:**
```
Input: m = 2, n = 2, indices = [[1,1],[0,0]]
Output: 0
Explanation: The final matrix is [[2,2],[2,2]] — no odd cells.
```

**Constraints:**
- 1 <= m, n <= 50
- 1 <= indices.length <= 100
- 0 <= ri < m
- 0 <= ci < n

## Approach

Actually building the matrix and running every increment (row sweep + column sweep for each index) works but is wasteful — `O(indices.length * (m + n))` time and `O(m*n)` space for something whose answer only depends on parity.

The value at cell `(i, j)` is exactly (number of times row `i` was targeted) + (number of times column `j` was targeted). Only the parity of that sum matters for "is it odd", and the parity of a sum is odd exactly when one addend is odd and the other is even (both odd or both even gives an even sum). So there's no need to track exact counts per cell at all — just count how many times each row was hit and each column was hit.

Tally `row_count[i]` and `col_count[j]` by scanning `indices` once. Then count how many rows ended up with an odd count (`odd_rows`) and how many columns did (`odd_cols`); the rest are even. A cell is odd exactly when it sits in an (odd row, even column) or an (even row, odd column), so the answer is `odd_rows * even_cols + even_rows * odd_cols`.

**Time complexity:** O(indices.length + m + n) — one pass to tally, one pass each over rows and columns to count parities.

**Space complexity:** O(m + n) for the row and column counters.
