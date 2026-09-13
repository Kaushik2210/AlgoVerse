# 311. Sparse Matrix Multiplication

> **Note:** This is a LeetCode premium problem, so it can't be opened or submitted on a free account. Solved and verified independently against hand-built test cases.

You're given two sparse matrices `mat1` (dimensions `m x k`) and `mat2` (dimensions `k x n`), where most entries are zero. Return the product `mat1 x mat2`, a matrix of dimensions `m x n`.

**Example 1:**
```
Input: mat1 = [[1,0,0],[-1,0,3]], mat2 = [[7,0,0],[0,0,0],[0,0,1]]
Output: [[7,0,0],[-7,0,3]]
```

**Example 2:**
```
Input: mat1 = [[0]], mat2 = [[0]]
Output: [[0]]
```

**Constraints:**
- m == mat1.length, k == mat1[0].length == mat2.length, n == mat2[0].length
- 1 <= m, n, k <= 100
- Matrix entries are in the range [-100, 100]
- Most entries in both matrices are 0

## Approach

The textbook way to multiply matrices is the triple nested loop: for each output cell `(i, j)`, sum `mat1[i][x] * mat2[x][j]` over every `x` from 0 to k-1. That's O(m * n * k) regardless of how many entries are actually zero, and since these matrices are described as sparse (mostly zero), a lot of that work multiplies by zero for nothing.

The fix is to skip zero entries entirely. For each row `i` of `mat1`, scan across it, and whenever you find a nonzero value `mat1[i][x]`, that value only matters for column `x` of `mat2`. So instead of a blind inner loop over all of `mat2`'s row `x`, only walk the nonzero entries of that row of `mat2` and add `mat1[i][x] * mat2[x][j]` into `result[i][j]` for each. Any row of `mat1` or `mat2` that's all zero contributes nothing and its inner work is skipped almost entirely.

**Time complexity:** O(m * k * n) in the worst case (dense matrices), but O(nonzero entries in mat1 * average row density of mat2) in practice — much faster when the matrices are genuinely sparse.

**Space complexity:** O(m * n) for the output matrix.
