# 695. Max Area of Island

You're given an `m x n` binary grid where `1` represents land and `0` represents water. An island is a group of `1`s connected 4-directionally (up/down/left/right, not diagonally). Return the area (number of cells) of the largest island, or 0 if there's no island.

**Example 1:**
```
Input:
[[0,0,1,0,0],
 [0,0,0,0,0],
 [0,1,1,0,0],
 [0,1,0,0,0]]

Output: 3
Explanation: the L-shaped island of three connected 1s in the bottom-left area is the largest
```

**Example 2:**
```
Input: [[0,0,0],[0,0,0]]
Output: 0
```

**Constraints:**
- m == grid.length, n == grid[i].length
- 1 <= m, n <= 50
- grid[i][j] is 0 or 1

## Approach

This is a straightforward flood-fill counting problem. Scan every cell; whenever an unvisited land cell (`1`) is found, that's the start of a new island — flood-fill outward from it (DFS or BFS in the 4 directions), counting how many land cells belong to that connected component, and mark each visited cell so it's never counted or explored again. Track the maximum area seen across all islands found during the scan.

Marking visited cells can be done either with a separate visited set, or more simply by mutating the grid in place — flipping each visited `1` to `0` as it's counted, so it can never be picked up again by a later scan or re-explored within the same flood fill. That avoids extra space for a visited structure.

**Time complexity:** O(m*n) — every cell is visited a constant number of times: once by the outer scan, and once during whichever flood fill claims it.

**Space complexity:** O(m*n) worst case for the DFS recursion stack (or BFS queue) if the entire grid is one connected island.
