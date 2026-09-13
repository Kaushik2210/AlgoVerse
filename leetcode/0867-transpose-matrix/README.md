# 867. Transpose Matrix

You're given a 2D integer array `matrix`. Return its transpose, meaning the matrix flipped over its main diagonal so rows become columns and columns become rows.

**Example 1:**
```
Input: matrix = [[1,2,3],[4,5,6],[7,8,9]]
Output: [[1,4,7],[2,5,8],[3,6,9]]
```

**Example 2:**
```
Input: matrix = [[1,2,3],[4,5,6]]
Output: [[1,4],[2,5],[3,6]]
```

**Constraints:**
- m == matrix.length, n == matrix[i].length
- 1 <= m, n <= 1000
- 1 <= m * n <= 10^5

## Approach

The transpose just swaps rows and columns: the value at `matrix[r][c]` in the input belongs at `result[c][r]` in the output. Since the input isn't necessarily square, the output has swapped dimensions (n rows, m columns), so it has to be a brand-new matrix rather than an in-place swap.

Allocate a new `n x m` matrix, then walk every cell `(r, c)` of the input and copy `matrix[r][c]` into `result[c][r]`.

**Time complexity:** O(m * n) — every cell is visited and copied exactly once.

**Space complexity:** O(m * n) for the output matrix.
