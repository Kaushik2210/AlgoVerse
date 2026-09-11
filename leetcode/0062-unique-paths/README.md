# 62. Unique Paths

A robot sits at the top-left corner of an `m x n` grid. It can only move down or right, one cell at a time, and it's trying to reach the bottom-right corner. How many distinct paths can it take?

**Example 1:**
```
Input: m = 3, n = 7
Output: 28
```

**Example 2:**
```
Input: m = 3, n = 2
Output: 3
Explanation: from the top-left, there are 3 ways to reach the bottom-right: Right->Down->Down, Down->Right->Down, Down->Down->Right.
```

**Constraints:**
- 1 <= m, n <= 100

## Approach

You could brute-force this by recursing from the start cell, branching into "move right" and "move down" at every step, but that recomputes the same subproblems over and over — the number of ways to reach any given cell only depends on the number of ways to reach the cell above it and the cell to its left, so it's a classic case for dynamic programming.

The number of paths to reach cell `(i, j)` is `paths(i-1, j) + paths(i, j-1)` — you either arrived by moving down into this cell, or by moving right into it. Every cell in the top row and every cell in the leftmost column only has one way to be reached (straight down or straight right along the edge), so those are the base case, all set to 1.

Since each row only depends on the row above it, you don't need to keep the whole 2D table around — just one 1D array representing the "current row," updated in place left to right: `row[j] += row[j - 1]` folds in the contribution from the left, while `row[j]`'s old value (before the update) is exactly what it inherited from the row above.

**Time complexity:** O(m * n) — fill in one value per cell.

**Space complexity:** O(n) — only one row is kept at a time, instead of the full m x n table.
