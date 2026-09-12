# 304. Range Sum Query 2D - Immutable

Given a 2D matrix `matrix`, handle multiple queries of the form: calculate the sum of the elements inside the rectangle defined by its upper-left corner `(row1, col1)` and lower-right corner `(row2, col2)`. Implement `NumMatrix`: `NumMatrix(int[][] matrix)` initializes the object, and `sumRegion(row1, col1, row2, col2)` returns the sum of the rectangle.

**Example 1:**
```
Input:
["NumMatrix", "sumRegion", "sumRegion", "sumRegion"]
[[[[3,0,1,4,2],[5,6,3,2,1],[1,2,0,1,5],[4,1,0,1,7],[1,0,3,0,5]]], [2,1,4,3], [1,1,2,2], [1,2,2,4]]
Output:
[null, 8, 11, 12]
Explanation:
NumMatrix numMatrix = new NumMatrix([[3,0,1,4,2],[5,6,3,2,1],[1,2,0,1,5],[4,1,0,1,7],[1,0,3,0,5]]);
numMatrix.sumRegion(2, 1, 4, 3); // sum of rows 2-4, cols 1-3 = 8
numMatrix.sumRegion(1, 1, 2, 2); // sum of rows 1-2, cols 1-2 = 11
numMatrix.sumRegion(1, 2, 2, 4); // sum of rows 1-2, cols 2-4 = 12
```

**Constraints:**
- Up to 10^4 calls to sumRegion

## Approach

This is the same idea as the 1D version (problem 303) extended to two dimensions: since the matrix never changes, precompute once and answer every query in O(1) using inclusion-exclusion.

Build a 2D prefix-sum table `prefix` where `prefix[r][c]` holds the sum of every cell strictly above row `r` and strictly left of column `c` — i.e. the sum of the rectangle `matrix[0..r-1][0..c-1]`. It's built with a (r+1) x (c+1) grid (padded with an extra row and column of zeros) so edge queries don't need special-casing, using the recurrence:

`prefix[r][c] = prefix[r-1][c] + prefix[r][c-1] - prefix[r-1][c-1] + matrix[r-1][c-1]`

That recurrence itself is inclusion-exclusion: the rectangle above-and-left plus the rectangle above (up to this column) plus the one to the left (up to this row) double-counts the overlapping top-left corner, so it's subtracted back out once, then the current cell's own value is added in.

Once the table is built, `sumRegion(row1, col1, row2, col2)` uses the same inclusion-exclusion trick one level up: take the sum of everything from the origin down to the bottom-right corner `(row2, col2)`, then subtract off the strip above `row1` and the strip left of `col1` — but those two strips both include the top-left rectangle outside `row1..row2, col1..col2`, so that overlap gets added back once:

`total = prefix[row2+1][col2+1] - prefix[row1][col2+1] - prefix[row2+1][col1] + prefix[row1][col1]`

**Time complexity:** O(rows * cols) to build the prefix table once; O(1) per `sumRegion` call afterward.

**Space complexity:** O(rows * cols) for the prefix table.
