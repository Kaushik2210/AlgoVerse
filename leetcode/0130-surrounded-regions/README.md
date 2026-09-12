# 130. Surrounded Regions

You're given an `m x n` grid of characters, each either `'X'` or `'O'`. Capture every region of `'O'`s that is completely surrounded by `'X'`s (flip those `'O'`s to `'X'`) — a region only escapes capture if it's connected, directly or through other `'O'`s, to an `'O'` on the border of the board. Modify the board in place.

**Example 1:**
```
Input:
X X X X
X O O X
X X O X
X O X X

Output:
X X X X
X X X X
X X X X
X O X X
```
Explanation: the middle blob of `O`s is fully enclosed and gets captured, but the bottom-left `O` touches the border, so it (and anything connected to it) survives.

**Constraints:**
- m == board.length, n == board[i].length
- 1 <= m, n <= 200
- board[i][j] is 'X' or 'O'

## Approach

The naive instinct is to check, for every `'O'`, whether it can reach the border — but doing that region by region is wasteful since regions can be large and overlap in their border-checking work. Flip the problem around: instead of asking which `'O'`s are surrounded, find which `'O'`s are *not* surrounded (i.e. connected to the border), and everything else must be surrounded.

Run a DFS/BFS starting from every `'O'` sitting on the border of the board. Any `'O'` reachable from one of these starting points is safe — mark it with a temporary sentinel character (like `'#'`) so it's easy to tell apart from both the untouched `'O'`s and the `'X'`s. After all border-connected regions are flood-filled and marked, do a single pass over the whole board: any cell still `'O'` was never reachable from the border, so it's surrounded — flip it to `'X'`. Any cell marked `'#'` was safe, so flip it back to `'O'`.

This is the same insight as "count islands not touching the edge" — it's cheaper to flood-fill outward from the boundary once than to check reachability-to-boundary for every interior cell.

**Time complexity:** O(m*n) — each cell is visited a constant number of times: once during border-seeded flood fill (at most) and once during the final cleanup pass.

**Space complexity:** O(m*n) worst case for the DFS recursion stack (or BFS queue) if the entire board is one connected region of `'O'`s.
