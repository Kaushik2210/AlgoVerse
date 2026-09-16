# 566. Reshape the Matrix

**Commonly asked at:** Amazon, Google, Meta

You're given a matrix `mat` of size `m x n` and two integers `r` and `c` representing a desired number of rows and columns for the reshaped matrix. Reshaping fills the new matrix with the same elements, read in row-major order, laid out into the new shape. Return the reshaped matrix if `r * c == m * n`; otherwise return the original matrix unchanged.

**Example 1:**
```
Input: mat = [[1,2],[3,4]], r = 1, c = 4
Output: [[1,2,3,4]]
```

**Example 2:**
```
Input: mat = [[1,2],[3,4]], r = 2, c = 4
Output: [[1,2],[3,4]]
Explanation: The total element counts don't match, so the original matrix is returned.
```

**Constraints:**
- m == mat.length, n == mat[i].length
- 1 <= m, n <= 100
- -1000 <= mat[i][j] <= 1000
- 1 <= r, c <= 300

## Approach

First check whether reshaping is even possible: the total number of elements must stay the same, so if `r * c != m * n`, just return `mat` as-is.

Otherwise, think of both the original and the target matrix as being "flattened" into one long sequence read row by row, left to right. Element at flat index `k` in the original sits at `(k // n, k % n)`, and that same flat index in the target sits at `(k // c, k % c)`. So walk `k` from 0 to `m*n - 1`, read the value from the original position, and write it to the target position — no need to build an actual intermediate flat list, just convert indices back and forth directly.

**Time complexity:** O(m * n) — every element is read and written exactly once.

**Space complexity:** O(r * c) (equivalently O(m * n)) for the output matrix.
