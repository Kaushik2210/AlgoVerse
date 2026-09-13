# 36. Valid Sudoku

Given a 9x9 Sudoku board (partially filled, with `'.'` for empty cells), determine if the filled-in cells so far are valid according to the rules: each row, each column, and each of the nine 3x3 sub-boxes must contain the digits 1-9 with no repeats. Empty cells are ignored — you're only checking that what's already placed doesn't violate the rules, not that the board is solvable or complete.

**Example 1:**
```
Input: board (partially filled 9x9 grid)
Output: true
```

**Example 2:**
```
Input: board with two 8's in the same column
Output: false
```

**Constraints:**
- board.length == 9, board[i].length == 9
- board[i][j] is a digit 1-9 or '.'

## Approach

The direct way is to check the nine rows, nine columns, and nine boxes as nine separate passes each with their own duplicate-detection set — that's correct but makes three full passes over the board (27 checks total, each re-touching cells).

Since every cell belongs to exactly one row, one column, and one box, all three checks can be done in a single pass over the grid. For each filled cell `(r, c)` with digit `d`, compute which box it belongs to as `box = (r // 3) * 3 + (c // 3)` — this maps every cell to one of 9 box ids in a way that groups each 3x3 block together. Keep three arrays of 9 sets (or hash sets keyed by `(row, digit)`, `(col, digit)`, `(box, digit)`): before adding `d` to `rows[r]`, `cols[c]`, and `boxes[box]`, check if it's already in any of them — if so, the board is invalid. If a full pass over all 81 cells completes with no collisions, the board is valid.

The box-index formula is the only mildly clever part: dividing both row and column by 3 collapses the 9x9 grid into a 3x3 grid of boxes, and multiplying the row-box by 3 and adding the column-box linearizes that 3x3 grid into indices 0-8.

**Time complexity:** O(1) — the board is always 9x9 (81 cells), so it's a bounded amount of work regardless of framing; more descriptively, O(N^2) for an N x N board with N=9.

**Space complexity:** O(1) — the tracking sets hold at most 81 entries total, bounded by the fixed board size.
