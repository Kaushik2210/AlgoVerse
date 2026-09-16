# 1314. Matrix Block Sum

**Commonly asked at:** Amazon, Google, Meta

Given an `m x n` matrix `mat` and an integer `k`, return a matrix `answer` where `answer[r][c]` is the sum of every `mat[i][j]` with `i` and `j` both within `k` of `r` and `c` respectively (i.e. `r - k <= i <= r + k` and `c - k <= j <= c + k`), clipped to stay inside the matrix bounds.

**Example 1:**
```
Input: mat = [[1,2,3],[4,5,6],[7,8,9]], k = 1
Output: [[12,21,16],[27,45,33],[24,39,28]]
```

**Example 2:**
```
Input: mat = [[1,2,3],[4,5,6],[7,8,9]], k = 2
Output: [[45,45,45],[45,45,45],[45,45,45]]
Explanation: k=2 makes every block cover the entire 3x3 matrix, whose total is 45.
```

**Constraints:**
- m == mat.length
- n == mat[i].length
- 1 <= m, n, k <= 100
- 1 <= mat[i][j] <= 100

## Approach

Computing each block's sum directly means summing up to a `(2k+1) x (2k+1)` region for every one of the `m*n` cells — expensive when `k` is large. A 2D prefix sum matrix turns any rectangle sum into O(1) work after O(m*n) preprocessing.

Build `prefix` with one extra row and column of padding so `prefix[r+1][c+1]` holds the sum of the rectangle from `(0,0)` to `(r,c)` inclusive: `prefix[r+1][c+1] = mat[r][c] + prefix[r][c+1] + prefix[r+1][c] - prefix[r][c]` (the standard inclusion-exclusion for a running 2D sum, subtracting the doubly-counted top-left region).

Then for every cell `(r, c)`, clamp the block's corners to the matrix bounds: `r1 = max(0, r-k)`, `c1 = max(0, c-k)`, `r2 = min(m-1, r+k)`, `c2 = min(n-1, c+k)`. The sum of that rectangle is `prefix[r2+1][c2+1] - prefix[r1][c2+1] - prefix[r2+1][c1] + prefix[r1][c1]` — the same inclusion-exclusion trick used to build the prefix table, now used to extract an arbitrary rectangle from it.

**Time complexity:** O(m*n) — building the prefix sums and filling the answer are both linear in the number of cells.

**Space complexity:** O(m*n) — the padded prefix sum matrix (the output matrix isn't counted as extra space).
