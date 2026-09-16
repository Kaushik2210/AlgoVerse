# 1329. Sort the Matrix Diagonally

**Commonly asked at:** Google

A "diagonal" here means every cell that shares the same value of `row - col`, i.e. a line going from top-left toward bottom-right. Given an `m x n` grid `mat`, sort each such diagonal in ascending order (from its top-left end to its bottom-right end) and return the resulting grid.

**Example 1:**
```
Input: mat = [[3,3,1,1],[2,2,1,2],[1,1,1,2]]
Output: [[1,1,1,1],[1,2,2,2],[1,2,3,3]]
```

**Constraints:**
- m == mat.length
- n == mat[i].length
- 1 <= m, n <= 100
- 1 <= mat[i][j] <= 100

## Approach

Every cell `(i, j)` on the same top-left-to-bottom-right diagonal shares the value `i - j`, and that's the only grouping key needed. Sorting each diagonal independently and writing it back is really just a bucket-sort-and-scatter problem.

First pass: walk the matrix and drop every value into a bucket keyed by `i - j`. Second pass: sort every bucket. Third pass: walk the matrix again in the same row-major order, and for each cell pull the next value out of its diagonal's sorted bucket — since row-major order visits a diagonal top-to-bottom (i.e. in exactly the order the sorted values should be placed), popping from the front of each sorted bucket as you go fills the diagonal correctly.

In the code, buckets are sorted descending and popped from the end (equivalent to popping from the front of an ascending list but avoids an O(n) shift each time), which keeps every operation cheap.

**Time complexity:** O(m * n * log(min(m, n))) — each diagonal has at most min(m, n) elements, and every element is sorted once as part of its diagonal's bucket.

**Space complexity:** O(m * n) for the diagonal buckets.
