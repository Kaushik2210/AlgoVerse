# 73. Set Matrix Zeroes

You're given an `m x n` matrix. If an element is 0, set its entire row and column to 0. Do it in place, modifying the matrix directly.

**Example 1:**
```
Input: matrix = [[1,1,1],[1,0,1],[1,1,1]]
Output: [[1,0,1],[0,0,0],[1,0,1]]
```

**Example 2:**
```
Input: matrix = [[0,1,2,0],[3,4,5,2],[1,3,1,5]]
Output: [[0,0,0,0],[0,4,5,0],[0,3,1,0]]
```

**Constraints:**
- 1 <= m, n <= 200

## Follow up
A straightforward O(mn) extra-space solution (a separate set of rows/columns to zero) is a simple fix. Can it be done using O(1) extra space?

## Approach

The obvious trap: if you zero out cells as soon as you find a 0, you'll create new zeros that then trigger more zeroing on the next scan — the marking and the mutating can't happen in the same pass over the same data. The straightforward fix is to first record every row and column that needs zeroing (using two boolean sets/arrays), then do a second pass applying them — that's O(m + n) extra space.

To get to O(1) extra space, reuse the matrix's own first row and first column as the marker arrays instead of allocating new ones. Before doing that, separately remember (in two booleans) whether the first row and first column themselves originally contained a zero — because they're about to get overwritten as scratch space and their original state would otherwise be lost.

Then: scan the matrix from `(1,1)` onward (skipping the first row/column, which are now serving as markers). Whenever `matrix[r][c] == 0`, set `matrix[r][0] = 0` and `matrix[0][c] = 0` to flag that row `r` and column `c` need zeroing.

Do a second pass over the same `(1,1)`-onward region: for each cell, if its row marker `matrix[r][0]` or column marker `matrix[0][c]` is 0, zero that cell out. This has to be a separate pass from the marking one, otherwise a cell you just zeroed could be misread as an original zero later in the same scan.

Finally, use the two booleans saved at the start to decide whether to zero out the first row and first column themselves — do this last so it doesn't corrupt the markers before the second pass is finished reading them.

**Time complexity:** O(m * n) — a constant number of passes over the matrix.

**Space complexity:** O(1) — the matrix itself is reused as marker storage.
