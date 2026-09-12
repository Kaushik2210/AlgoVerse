# 994. Rotting Oranges

You're given an `m x n` grid where each cell is `0` (empty), `1` (fresh orange), or `2` (rotten orange). Every minute, any fresh orange adjacent (4-directionally) to a rotten orange also becomes rotten. Return the minimum number of minutes until no fresh orange remains. If that's impossible, return -1.

**Example 1:**
```
Input:
[[2,1,1],
 [1,1,0],
 [0,1,1]]

Output: 4
```

**Example 2:**
```
Input: [[2,1,1],[0,1,1],[1,0,1]]
Output: -1
Explanation: the orange in the bottom-left corner is never reached, since it has no orthogonal path from any rotten cell
```

**Example 3:**
```
Input: [[0,2]]
Output: 0
Explanation: no fresh oranges to begin with
```

**Constraints:**
- m == grid.length, n == grid[i].length
- 1 <= m, n <= 10
- grid[i][j] is 0, 1, or 2

## Approach

This is a multi-source BFS where "minute" maps directly onto "BFS level/depth" — every rotten orange at minute 0 spreads simultaneously, and the number of minutes elapsed is exactly the number of BFS layers processed.

Scan the grid once: collect every initially-rotten cell into a queue as BFS starting points, and count the total number of fresh oranges (needed at the end to check whether everything actually got infected). Then run standard level-by-level BFS: process the queue one full layer at a time, for each rotten cell spread to fresh neighbors, mark them rotten, decrement the fresh count, and queue them as next layer's rotten cells. Each full layer processed corresponds to one minute elapsing — only increment the minute counter after processing a layer that actually rotted at least one new orange (to avoid counting a trailing minute that did nothing).

After BFS completes, if any fresh oranges remain uninfected (fresh count > 0), some oranges were unreachable — return -1. Otherwise return the accumulated minute count.

**Time complexity:** O(m*n) — every cell is enqueued and processed at most once.

**Space complexity:** O(m*n) for the BFS queue in the worst case (e.g. all oranges start rotten).
