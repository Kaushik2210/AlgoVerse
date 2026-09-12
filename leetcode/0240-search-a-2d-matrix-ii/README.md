# 240. Search a 2D Matrix II

Write an efficient algorithm that searches for a value `target` in an `m x n` integer matrix. The matrix has these properties:
- Integers in each row are sorted in ascending order from left to right.
- Integers in each column are sorted in ascending order from top to bottom.

**Example 1:**
```
Input: matrix = [[1,4,7,11,15],[2,5,8,12,19],[3,6,9,16,22],[10,13,14,17,24],[18,21,23,26,30]], target = 5
Output: true
```

**Example 2:**
```
Input: matrix = [[1,4,7,11,15],[2,5,8,12,19],[3,6,9,16,22],[10,13,14,17,24],[18,21,23,26,30]], target = 20
Output: false
```

**Constraints:**
- m == matrix.length
- n == matrix[i].length
- 1 <= n, m <= 300
- -10^9 <= matrix[i][j] <= 10^9
- Rows sorted ascending left to right, columns sorted ascending top to bottom

## Approach

Unlike Search a 2D Matrix (74), this matrix isn't fully sorted as one flattened sequence — each row and column is sorted independently, so a single binary search over the whole thing doesn't directly apply. But there's still a corner with a useful property to exploit: the top-right corner.

Start at `matrix[0][n-1]`, the top-right element. From there:
- Everything in its row to the left is smaller.
- Everything in its column below is larger.

So comparing the current cell to `target` tells you exactly which direction to move, discarding a whole row or column each time:
- If the current value equals `target`, found it.
- If the current value is greater than `target`, the entire column below (including this cell) is too big to matter, so move one column left.
- If the current value is less than `target`, the entire row to the left (including this cell) is too small to matter, so move one row down.

Repeat until you find the target or walk off the matrix (row goes past the bottom or column goes past the left edge), meaning it isn't present. Starting from the top-left or bottom-right corner doesn't work the same way, since moving in either direction from those corners could either increase or decrease the value — only the top-right (or symmetrically, bottom-left) corner gives a clean "one direction always bigger, the other always smaller" property.

**Time complexity:** O(m + n) — each step eliminates a full row or column, so there are at most m + n steps.

**Space complexity:** O(1).
