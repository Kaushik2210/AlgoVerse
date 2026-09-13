# 52. N-Queens II

The n-queens puzzle asks how to place n queens on an n x n chessboard so that no two queens attack each other (no shared row, column, or diagonal). Given an integer `n`, return just the number of distinct solutions, without needing to construct the boards themselves.

**Example 1:**
```
Input: n = 4
Output: 2
Explanation: There are two distinct solutions to the 4-queens puzzle.
```

**Example 2:**
```
Input: n = 1
Output: 1
```

**Constraints:**
- 1 <= n <= 9

## Approach

This is the same backtracking search as N-Queens (LeetCode 51), just without the extra step of materializing each board as a grid of strings — only a running count of completed solutions is needed.

Since no two queens can share a row, place exactly one queen per row and try each column for that row in turn. To check a placement in O(1), track three sets: `used_cols` for columns already occupied, and two diagonal sets — `used_diag1` keyed by `row - col` (constant along one diagonal direction) and `used_diag2` keyed by `row + col` (constant along the other diagonal direction). A new queen at `(row, col)` is safe exactly when none of `col`, `row - col`, or `row + col` are already in their respective sets.

Recurse row by row: if `row == n`, a complete valid placement has been found, so increment the solution counter and return. Otherwise, try every column in the current row that isn't blocked, mark it used, recurse into the next row, then unmark it (backtrack) before trying the next column. This explores every arrangement that satisfies the constraints built up so far, pruning branches immediately once any constraint is violated instead of building out an entire invalid board.

**Time complexity:** O(n!) worst case — the branching factor shrinks with each row due to pruning, but the search space is still factorial in the worst case, same as the standard N-Queens search.

**Space complexity:** O(n) for the three tracking sets and the recursion stack depth.
