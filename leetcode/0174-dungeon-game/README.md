# 174. Dungeon Game

A knight starts in the top-left cell of an `m x n` dungeon grid and must reach the princess in the bottom-right cell, moving only right or down at each step. Each cell has a value: positive values are health potions (add to the knight's health), negative values are demons (subtract from health), and 0 cells do nothing. The knight dies the instant his health drops to 0 or below, so it must stay strictly positive at every point along the path, including before entering the first cell. Return the minimum initial health the knight needs to guarantee reaching the princess.

**Example 1:**
```
Input: dungeon = [[-2,-3,3],[-5,-10,1],[10,30,-5]]
Output: 7
Explanation: Taking the path RIGHT -> RIGHT -> DOWN -> DOWN, starting with 7 HP:
7 -2=5 -3=2 +3=5 +1=6 -5=1. Health stays >= 1 the whole way, and no smaller
starting value keeps it positive at every step along any path.
```

**Example 2:**
```
Input: dungeon = [[0]]
Output: 1
Explanation: The knight needs at least 1 HP just to be alive standing on the only (and final) cell.
```

**Constraints:**
- m == dungeon.length
- n == dungeon[i].length
- 1 <= m, n <= 200
- -1000 <= dungeon[i][j] <= 1000

## Approach

The instinct is to compute this forward from the top-left, tracking "health so far" along each path — but that fails because the minimum *starting* health needed isn't determined by the running sum alone; a path that dips very low in the middle needs more starting cushion than the final running total would suggest, and different paths trade off differently. What actually needs to propagate is "how much health do I need to have *upon entering* this cell to survive the rest of the journey from here" — and that's naturally a backward computation, since the requirement at a cell depends on the requirement of the cells you'd move to *next* (right or down), not on how you got there.

So define `dp[i][j]` as the minimum health needed right before entering cell `(i, j)` to survive from there to the princess. Compute it from the bottom-right corner backward. At the destination, the knight needs enough health to survive that cell's own value and still have at least 1 HP left, so `dp[m-1][n-1] = max(1, 1 - dungeon[m-1][n-1])`. For any other cell, the knight will go on to whichever neighbor (right or down) needs less incoming health, so `need = min(dp[i+1][j], dp[i][j+1]) - dungeon[i][j]`, and `dp[i][j] = max(1, need)` (health can never be required to be less than 1). Cells on the last row or last column only have one neighbor option instead of two. The final answer is `dp[0][0]`.

**Time complexity:** O(m * n) — every cell is visited once in the backward pass.

**Space complexity:** O(m * n) for the dp table (reducible to O(n) with a rolling row, but the straightforward table is clearer).
