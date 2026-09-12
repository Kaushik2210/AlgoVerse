# 51. N-Queens

Place `n` queens on an `n x n` chessboard so that no two queens attack each other — meaning no two share a row, a column, or a diagonal. Return every distinct board arrangement that achieves this, each represented as a list of strings where `'Q'` marks a queen and `'.'` marks an empty square.

**Example 1:**
```
Input: n = 4
Output: [[".Q..","...Q","Q...","..Q."],["..Q.","Q...","...Q",".Q.."]]
Explanation: There are exactly two distinct solutions for the 4-queens puzzle.
```

**Example 2:**
```
Input: n = 1
Output: [["Q"]]
```

**Constraints:**
- 1 <= n <= 9

## Approach

Trying every possible placement of `n` queens on `n^2` squares independently is wildly wasteful. The first real simplification: since no two queens can share a row, exactly one queen goes in each row. So instead of deciding "which squares hold queens," the problem reduces to "which column does the queen in row 0 go in, which column for row 1," and so on — one decision per row, backtracking when a choice conflicts with an earlier one.

The remaining question is how to check conflicts quickly. A shared column is just `col` already used. Diagonals are the trickier part: on the same "/"-diagonal (top-right to bottom-left, i.e. `\` direction), `row - col` is constant for every square on it. On the same "\"-diagonal, `row + col` is constant. So three hash sets — used columns, used `row - col` values, used `row + col` values — let every conflict check happen in O(1), instead of scanning the board.

Backtrack row by row: for the current row, try every column not already flagged in one of the three sets, mark all three sets, recurse into the next row, then unmark them on the way back out to try the next column. When `row == n`, every queen has been placed validly — reconstruct the board strings from the recorded column-per-row array and add that arrangement to the results.

**Time complexity:** O(n!) in the worst case — the first row has n choices, the next row has at most n - 1 valid remaining columns, and so on, though the diagonal/column pruning cuts this down heavily in practice.

**Space complexity:** O(n) for the recursion depth and the three tracking sets, aside from the space used to store the output boards.
