# 741. Cherry Pickup

You're given an `n x n` grid. Each cell is `1` (a cherry), `0` (empty), or `-1` (a thorn, blocked). Starting at the top-left corner `(0, 0)`, you take a path to the bottom-right corner `(n-1, n-1)`, moving only right or down, picking up any cherries along the way (each cell can only be picked once). Then you walk back from `(n-1, n-1)` to `(0, 0)`, moving only left or up, picking up any cherries still there. Return the maximum number of cherries you can collect across both trips, or `0` if the round trip isn't possible.

**Example 1:**
```
Input: grid = [[0,1,-1],[1,0,-1],[1,1,1]]
Output: 5
Explanation: The path down-right-right-down then back up-left-left-up picks up 5 cherries total.
```

**Example 2:**
```
Input: grid = [[1,1,-1],[1,-1,1],[-1,1,1]]
Output: 0
```

**Constraints:**
- n == grid.length == grid[i].length
- 1 <= n <= 50
- grid[i][j] is -1, 0, or 1
- grid[0][0] != -1
- grid[n-1][n-1] != -1

## Approach

This is one of the trickier DP problems, so it's worth being careful about the key insight.

**The trip-and-back-trip trick.** A round trip from `(0,0)` to `(n-1,n-1)` and back is exactly the same *shape* as two separate paths that both go from `(0,0)` to `(n-1,n-1)` — just relabel the return trip in reverse and it's forward-moving too. So instead of simulating "go there, then come back," simulate **two paths moving forward at the same time**, both starting at `(0,0)` and both ending at `(n-1,n-1)`, each independently choosing right/down at every step.

**Why move them in lockstep.** If both paths always take the same number of total steps to reach their current cell (which they must, since they start and end together and each step moves one cell), then after `t` steps, path 1 is at some `(r1, c1)` with `r1 + c1 = t`, and path 2 is at some `(r2, c2)` with `r2 + c2 = t`. That means once you know `t`, `r1`, and `r2`, the columns are forced: `c1 = t - r1` and `c2 = t - r2`. So the whole state collapses to just `(t, r1, r2)` — a 3D DP instead of tracking 4 independent coordinates.

**The double-counting rule.** If the two paths land on the *same* cell at the same time step (`r1 == r2`, which also forces `c1 == c2`), that cherry can only be counted once, not twice — because in the original problem it's a single trip through that cell.

**Recurrence.** Let `dp[t][r1][r2]` be the max cherries collectible using both paths after `t` steps each. To arrive at `(r1, c1)` and `(r2, c2)` at step `t`, each path came from either "the cell above" or "the cell to the left" at step `t-1`:

```
dp[t][r1][r2] = value(r1, c1, r2, c2) + max over the 4 combinations of
                (dp[t-1][r1-1][r2-1], dp[t-1][r1-1][r2], dp[t-1][r1][r2-1], dp[t-1][r1][r2])
```

where `value` adds `grid[r1][c1]`, plus `grid[r2][c2]` only if `(r1,c1) != (r2,c2)`, and any state touching a `-1` thorn cell is invalid (`-infinity`/skipped).

The base case is `dp[0][0][0] = grid[0][0]` (both paths start together at the origin). The answer is `dp[2n-2][n-1][n-1]`, clamped to `0` if that state was never reachable (meaning no valid round trip exists).

**Time complexity:** O(n^3) — `t` ranges over `2n-1` values, and for each, `r1` and `r2` each range over up to `n` values.

**Space complexity:** O(n^2) if only the current and previous `t` layers are kept (or O(n^3) for a straightforward 3D table).
