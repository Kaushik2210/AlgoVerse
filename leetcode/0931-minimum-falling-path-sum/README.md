# 931. Minimum Falling Path Sum

Given an `n x n` matrix, a "falling path" starts at any cell in the first row and moves to the next row at each step, choosing the cell directly below, or diagonally below-left, or diagonally below-right. Return the minimum possible sum of a falling path through the matrix.

**Example 1:**
```
Input: matrix = [[2,1,3],[6,5,4],[7,8,9]]
Output: 13
Explanation: One minimal path is [1,4,7], summing to 13.
```

**Example 2:**
```
Input: matrix = [[-19,57],[-40,-5]]
Output: -59
Explanation: The path is [-19,-40].
```

**Constraints:**
- n == matrix.length == matrix[i].length
- 1 <= n <= 100
- -100 <= matrix[i][j] <= 100

## Approach

Working forward from the top and trying every branch is exponential, but the problem has clean overlapping subproblems: the cheapest way to reach cell `(i, j)` only depends on the cheapest way to reach the three cells above it — `(i-1, j-1)`, `(i-1, j)`, `(i-1, j+1)` — plus `matrix[i][j]` itself.

So build up row by row. Start with the first row as-is (a path of length 1 costs exactly its own value). For every later row, each cell's best cost is its own value plus the minimum of the up-to-three reachable cells in the row above, being careful at the left and right edges where one of those neighbors doesn't exist. After processing the last row, the answer is the minimum value in it, since that reflects every path from any first-row start down to any last-row end.

Only the immediately previous row is ever needed, so the whole thing runs in a single rolling array rather than a full `n x n` table.

**Time complexity:** O(n^2) — each cell is processed once with O(1) work.

**Space complexity:** O(n) for the rolling previous-row array.
