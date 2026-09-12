# 542. 01 Matrix

Given an `m x n` binary matrix `mat`, return the distance to the nearest `0` for each cell, where distance is measured in steps between orthogonally adjacent cells (up/down/left/right).

**Example 1:**
```
Input:
[[0,0,0],
 [0,1,0],
 [0,0,0]]

Output:
[[0,0,0],
 [0,1,0],
 [0,0,0]]
```

**Example 2:**
```
Input:
[[0,0,0],
 [0,1,0],
 [1,1,1]]

Output:
[[0,0,0],
 [0,1,0],
 [1,2,1]]
```

**Constraints:**
- m == mat.length, n == mat[i].length
- 1 <= m, n <= 10^4
- 1 <= m*n <= 10^4
- mat[i][j] is 0 or 1
- At least one cell of mat is 0

## Approach

This is the exact same shape of problem as Walls and Gates and Rotting Oranges: rather than doing a separate search outward from every `1` cell to find its nearest `0` (which would repeat work across overlapping search areas), reverse it and run one multi-source BFS starting from every `0` cell simultaneously.

Seed a queue with every cell that's already `0`, with distance 0, and mark all of them visited. Every other cell starts unvisited. Run level-by-level BFS: for each cell dequeued, check its 4 neighbors; any unvisited neighbor gets its distance set to current distance + 1, gets marked visited, and gets pushed onto the queue. Since BFS processes cells in strictly increasing distance order, the first time any `1` cell is reached is guaranteed to be via the shortest path to the closest `0` — no need to compare against other candidate `0`s or ever revisit a cell.

The answer matrix can be built by mutating the input in place (using the original `0`s as already correct, and overwriting `1`s with their computed distance as BFS reaches them) or with a separate distance grid.

**Time complexity:** O(m*n) — every cell is enqueued and processed at most once.

**Space complexity:** O(m*n) for the BFS queue and the visited/distance tracking.
