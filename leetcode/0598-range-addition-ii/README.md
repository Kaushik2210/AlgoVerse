# 598. Range Addition II

**Commonly asked at:** Amazon, Bloomberg

You're given an `m x n` matrix `M` initialized to all 0s, and an array of operations `ops`, where `ops[i] = [ai, bi]` means: increment every element in the submatrix from `(0, 0)` to `(ai - 1, bi - 1)` by 1. Return the count of the maximum integer in the matrix after performing all operations.

**Example 1:**
```
Input: m = 3, n = 3, ops = [[2,2],[3,3]]
Output: 4
Explanation: The top-left 2x2 region gets incremented twice (once by each op), so that's the max value, and there are 2*2 = 4 such cells.
```

**Example 2:**
```
Input: m = 3, n = 3, ops = []
Output: 9
Explanation: No ops means every cell is 0, and every one of the 9 cells shares that max.
```

**Constraints:**
- 1 <= m, n <= 4 * 10^4
- 0 <= ops.length <= 10^4
- ops[i].length == 2
- 1 <= ai <= m
- 1 <= bi <= n

## Approach

Every operation is a rectangle anchored at the origin `(0,0)`, so cells closer to the origin always get incremented at least as often as cells farther away — the count at `(0,0)` is always >= the count at any other cell, since every op's rectangle covers `(0,0)`. That means the maximum value in the final matrix is always shared by the intersection of *every* op's rectangle: the region covered by all of them at once.

The intersection of rectangles all anchored at the origin is itself a rectangle anchored at the origin, whose dimensions are the smallest `a` and smallest `b` seen across all ops — any cell outside that region is missed by at least one op and so has a strictly smaller count than the cells inside it.

So there's no need to actually build the matrix or touch a single cell: track the running minimum of the `a` values and the running minimum of the `b` values across all ops (defaulting to `m` and `n` respectively when there are no ops), and the answer is just their product.

**Time complexity:** O(ops.length) — one pass to find the two minimums.

**Space complexity:** O(1) — no matrix ever gets built.
