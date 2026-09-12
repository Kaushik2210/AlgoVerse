# 37. Sudoku Solver

Write a program to solve a Sudoku puzzle by filling the empty cells. A sudoku solution must satisfy the standard rules: each of the digits `1-9` must appear exactly once in each row, each column, and each of the nine `3x3` sub-boxes. The `'.'` character indicates empty cells. The board is given as a `9x9` grid (`List[List[str]]`) and is guaranteed to have exactly one solution — modify it in place.

**Example:**
```
Input: board =
[["5","3",".",".","7",".",".",".","."],
 ["6",".",".","1","9","5",".",".","."],
 [".","9","8",".",".",".",".","6","."],
 ["8",".",".",".","6",".",".",".","3"],
 ["4",".",".","8",".","3",".",".","1"],
 ["7",".",".",".","2",".",".",".","6"],
 [".","6",".",".",".",".","2","8","."],
 [".",".",".","4","1","9",".",".","5"],
 [".",".",".",".","8",".",".","7","9"]]

Output: (a fully filled valid board)
```

**Constraints:**
- board.length == 9, board[i].length == 9
- board[i][j] is a digit 1-9 or '.'
- It is guaranteed that the input board has only one solution

## Approach

This is classic constraint-satisfaction backtracking. The brute-force idea of trying all 9^(number of empty cells) fills is astronomically slow, but pruning as soon as a placement is invalid (rather than filling the whole board and checking at the end) keeps the search fast in practice.

**Fast validity tracking:** instead of re-scanning the row/column/box every time we want to check if a digit is placeable (which would be O(9) per check), maintain three arrays of sets (or bitmasks) — `rows[9]`, `cols[9]`, `boxes[9]` — where `rows[r]` holds the digits already present in row `r`, and similarly for columns and 3x3 boxes (box index computed as `(r // 3) * 3 + c // 3`). Placing or removing a digit is then an O(1) set update, and checking whether a digit is legal at `(r, c)` is an O(1) membership check across the three sets.

**Backtracking walk:** collect the coordinates of all empty cells up front. Recurse through them in order (or scan the grid for the next `'.'` at each step):
1. If no empty cells remain, the board is solved — done.
2. For the current empty cell `(r, c)`, try each digit `1-9`. If it's not already in `rows[r]`, `cols[c]`, or `boxes[b]`, place it (update the board and the three tracking sets), and recurse to solve the rest of the board.
3. If the recursive call succeeds, propagate success up.
4. If it fails, **undo** the placement (remove the digit from the board and the three tracking sets — this is the "undo on a failed branch" that makes backtracking correct) and try the next digit.
5. If no digit `1-9` works, this branch is a dead end — return failure so an earlier caller backtracks further.

Because the puzzle is guaranteed to have exactly one solution, the first successful fill found is *the* answer, so the recursion can stop and unwind immediately once solved (implemented by having the recursive function return a boolean "solved" signal that short-circuits further attempts).

**Time complexity:** worst case exponential in the number of empty cells (bounded by 9^k for k empty cells), but the O(1) constraint checks via the tracking sets, combined with immediate pruning of invalid branches, make this fast in practice for real puzzles (which have a unique solution and heavy constraints).

**Space complexity:** O(1) beyond the input board — the three tracking-set arrays hold at most 9 sets of up to 9 digits each, and the recursion depth is bounded by 81 (number of cells).
