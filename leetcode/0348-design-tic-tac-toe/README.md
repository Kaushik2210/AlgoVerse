# 348. Design Tic-Tac-Toe

*Note: this problem is LeetCode Premium — the description below is reconstructed from the public problem statement for reference.*

Design a Tic-Tac-Toe game played on an `n x n` board by two players. Implement `TicTacToe` with:
- `TicTacToe(n)`: initializes the board.
- `move(row, col, player)`: indicates that `player` (1 or 2) places their mark at `(row, col)`. Moves are guaranteed to be valid (always on an empty cell). Returns the winning player's number (1 or 2) if this move completes a full row, column, or either diagonal, otherwise returns 0.

**Example:**
```
n = 3
move(0, 0, 1)  // 0
move(1, 1, 2)  // 0
move(0, 1, 1)  // 0
move(2, 2, 2)  // 0
move(0, 2, 1)  // 1, player 1 completes row 0: (0,0), (0,1), (0,2)
```

**Constraints:**
- 2 <= n <= 100
- player is 1 or 2
- 0 <= row, col < n
- Each (row, col) is played at most once

## Approach

Checking the whole board for a win after every move would cost O(n) or worse per call, and doing it n^2 times over a full game adds up. There's a way to check in O(1) per move instead, by not storing the board at all — just running tallies.

Keep an integer counter per row, per column, and one each for the two diagonals. Represent player 1's mark as `+1` and player 2's as `-1`. Every move adds its player's delta to exactly the counters for the row, column, and (if applicable) diagonal(s) that cell belongs to. A line is completely filled by one player exactly when its counter's absolute value reaches `n` — since the only way `n` marks in a line can sum to `+-n` is if every single one of them is the same player's mark (any mix of +1s and -1s across the same n cells would partially cancel and never reach the full magnitude).

So after updating the row/column/diagonal counters for the move just played, just check whether any of those specific counters (only the ones this move touched — a move can't complete a line it isn't part of) has hit `+-n` in absolute value. If so, the mover just won; return their player number. Otherwise return 0.

**Time complexity:** O(1) per `move` call.

**Space complexity:** O(n) for the row and column counter arrays (the two diagonal counters are O(1)).
