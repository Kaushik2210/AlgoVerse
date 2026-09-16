# 1463. Cherry Pickup II

**Commonly asked at:** Google

You're given a grid with `rows` rows and `cols` columns, where `grid[i][j]` is the number of cherries at that cell (`0` means empty). Two robots start on row 0: one at column `0`, the other at column `cols - 1`. Every step, each robot must move to the row below it, choosing one of three columns: `col - 1`, `col`, or `col + 1`, and must always stay inside the grid. Both robots pick up whatever cherries are in the cells they land on; if they ever land on the same cell in the same row, that cell's cherries are only collected once. Return the maximum number of cherries the two robots can collect together.

**Example 1:**
```
Input: grid = [[3,1,1],[2,5,1],[1,5,5],[2,1,1]]
Output: 24
Explanation: robot 1 (starting at column 0) visits (0,0), (1,0), (2,1), (3,0); robot 2 (starting at column 2) visits (0,2), (1,1), (2,2), (3,1). Row by row that's 3+1=4, 2+5=7, 5+5=10, 2+1=3, totaling 24.
```

**Example 2:**
```
Input: grid = [[1,0,0,0,0,0,1],[2,0,0,0,0,3,0],[2,0,9,0,0,0,0],[0,3,0,5,4,0,0],[1,0,2,3,0,0,6]]
Output: 28
```

**Constraints:**
- 2 <= rows, cols <= 70
- 0 <= grid[i][j] <= 100

## Approach

The key observation that shrinks the state space: both robots move down exactly one row on every single step, and they start on the same row (row 0). So no matter what choices either one makes, they're **always on the same row as each other**. That means the state doesn't need two independent row values — just one shared row plus the two column positions, `(row, col1, col2)`.

Define `dp(row, col1, col2)` as the maximum cherries collectible from `row` onward, given robot 1 is at `col1` and robot 2 is at `col2` in the current row. Collect this row's cherries first — `grid[row][col1] + grid[row][col2]`, but only count a column once if `col1 == col2`, since the two robots occupy the same cell. If `row` is the last row, that's the whole answer for this state (no more moves possible). Otherwise, try all `3 x 3 = 9` combinations of each robot independently choosing `-1`, `0`, or `+1` for its next column, recurse into `dp(row + 1, ...)` for each, and take the best; add that to this row's cherry count. Any combination that would push a column out of `[0, cols - 1]` is invalid and excluded (treated as negative infinity so it never wins the max).

The answer is `dp(0, 0, cols - 1)`, since that's exactly where the two robots begin. Memoize on `(row, col1, col2)` — there are `rows * cols * cols` such states, and each does O(9) work, so it's efficient even at the upper bound of 70x70.

**Time complexity:** O(rows * cols^2) — that many states, each doing constant work (9 transitions).

**Space complexity:** O(rows * cols^2) for the memo table.
