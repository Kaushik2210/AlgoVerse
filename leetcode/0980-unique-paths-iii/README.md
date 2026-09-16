# 980. Unique Paths III

**Commonly asked at:** Google

You're given an `m x n` grid where `1` marks the starting square, `2` marks the ending square, `0` marks squares you can walk on freely, and `-1` marks obstacles you can never walk on. Starting from the `1` square, find the number of distinct paths that walk on **every non-obstacle square exactly once** and finish on the `2` square. You can move up, down, left, or right, but never diagonally, and never onto an obstacle or off the grid.

**Example 1:**
```
Input: grid = [[1,0,0,0],[0,0,0,0],[0,0,2,-1]]
Output: 2
Explanation: there are two 4-directional paths that cover every 0, start at the 1, and end at the 2, without stepping on the -1.
```

**Example 2:**
```
Input: grid = [[1,0,0,0],[0,0,0,0],[0,0,0,2]]
Output: 4
```

**Example 3:**
```
Input: grid = [[0,1],[2,0]]
Output: 0
Explanation: there's no path that walks over every non-obstacle square exactly once and ends at 2.
```

**Constraints:**
- `1 <= m, n <= 20`
- `1 <= m * n <= 20`
- `-1 <= grid[i][j] <= 2`
- There's exactly one starting square and exactly one ending square

## Approach

The "walk on every empty square exactly once" requirement rules out plain path-counting DP (like the classic Unique Paths problems) — this is a Hamiltonian-path-style constraint, and with `m * n <= 20` it's small enough that backtracking DFS over all orderings is exactly the intended approach.

First scan the grid once to find the start, the end, and count how many `0` squares exist. That count plus 1 (for the end square itself) gives the exact number of *more* squares that must be stepped onto before (and including) reaching the end — call this `remaining`.

Then DFS from the start: at each step, mark the current square as visited (temporarily overwrite it, typically with the obstacle value `-1`, so future recursive calls from other directions can't step back onto it), explore all 4 neighbors with `remaining` decremented by one, then unmark it (restore the original value) before returning, so a *different* path through this cell from a *different* direction can still use it. That's the backtracking part — without restoring the cell, one failed path exploration would permanently block off future valid paths.

The base case: whenever the DFS lands on the end square (`grid[r][c] == 2`), check whether `remaining` has hit exactly 0. If it has, every square needed was visited on the way here, so this path counts. If `remaining` is nonzero, the walk reached the end too early (skipping over some empty squares) and doesn't count — importantly, it should not keep exploring past the end square anyway, so both cases just return.

**Time complexity:** O(4^k) in the worst case, where k is the number of empty squares — bounded tightly in practice since the grid can have at most 20 cells total.

**Space complexity:** O(k) for the recursion stack, using the grid itself in place to mark visited squares instead of a separate visited structure.
