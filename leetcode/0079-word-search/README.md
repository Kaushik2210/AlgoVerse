# 79. Word Search

You're given an `m x n` grid of characters `board` and a string `word`. Return true if `word` can be traced out by moving between horizontally or vertically adjacent cells, without reusing the same cell twice in one path.

**Example 1:**
```
Input: board = [["A","B","C","E"],["S","F","C","S"],["A","D","E","E"]], word = "ABCCED"
Output: true
```

**Example 2:**
```
Input: board = [["A","B","C","E"],["S","F","C","S"],["A","D","E","E"]], word = "ABCB"
Output: false
Explanation: the second B would have to reuse the same C cell used for the first C, which isn't allowed.
```

**Constraints:**
- m == board.length, n == board[i].length
- 1 <= m, n <= 6
- 1 <= word.length <= 15

## Approach

This is a search problem — try to trace the word out starting from every cell, and at each step branch into every direction that continues matching. The trick is doing it without accidentally reusing a cell within the same attempt.

For every starting cell in the grid, run a depth-first search: `dfs(r, c, i)` asks "can the rest of the word, starting from `word[i]`, be traced starting at cell `(r, c)`?" If `i` has already reached the end of the word, that path already succeeded — return true. Otherwise, bail out immediately if the position is out of bounds or the cell's letter doesn't match `word[i]`. If it does match, temporarily mark that cell as visited (overwrite it with a sentinel character like `'#'`, since board cells are alphabetic and `'#'` can never match a letter), then recurse into all four neighbors looking for `word[i+1]`. Afterward, restore the original character — this is the backtracking step, and it's essential: a cell that's off-limits for *this* path might be perfectly fine to reuse for a different path branching from a different starting cell.

If any of the four directions leads to a full match, propagate `true` back up. If a starting cell never finds a path, move to the next one; if none of them work, the word isn't present.

**Time complexity:** O(m * n * 4^L) — where L is the length of the word; from each of the m*n starting cells, the search branches up to 4 ways at each of up to L steps.

**Space complexity:** O(L) for the recursion stack, matching the depth of the search. The board itself is mutated temporarily but restored, so no extra grid is allocated.
