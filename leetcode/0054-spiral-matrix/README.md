# 54. Spiral Matrix

You're given an `m x n` matrix. Return all its elements in spiral order — starting at the top-left, going right across the top row, down the right column, left across the bottom row, up the left column, then shrinking inward and repeating.

**Example 1:**
```
Input: matrix = [[1,2,3],[4,5,6],[7,8,9]]
Output: [1,2,3,6,9,8,7,4,5]
```

**Example 2:**
```
Input: matrix = [[1,2,3,4],[5,6,7,8],[9,10,11,12]]
Output: [1,2,3,4,8,12,11,10,9,5,6,7]
```

**Constraints:**
- 1 <= m, n <= 10
- -100 <= matrix[i][j] <= 100

## Approach

The spiral is really just "walk the boundary of the current rectangle, then shrink the rectangle and repeat." So track four boundaries — `top`, `bottom`, `left`, `right` — that define the still-unvisited rectangle, and peel off one full layer per loop iteration.

Each layer does four walks in order: left-to-right across `top`, top-to-bottom down `right`, right-to-left across `bottom`, bottom-to-top up `left`. After each walk, shrink the corresponding boundary inward (`top++`, `right--`, `bottom--`, `left++`), since that row/column is now fully visited.

The subtlety is the last two walks of each layer need guards: if the rectangle has collapsed to a single row, `top` will have already passed `bottom` by the time you'd do the bottom walk, and doing it anyway would revisit the top row's cells in reverse. So check `top <= bottom` before the bottom walk and `left <= right` before the left walk — these only matter on the final layer where the rectangle degenerates to a single row or column. The outer `while top <= bottom and left <= right` stops once every cell has been consumed.

**Time complexity:** O(m * n) — every cell is visited and appended exactly once.

**Space complexity:** O(1) extra space, not counting the output array.
