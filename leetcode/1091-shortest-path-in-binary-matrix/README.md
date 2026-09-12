# 1091. Shortest Path in Binary Matrix

Given an `n x n` binary matrix `grid`, return the length of the shortest **clear path** from top-left `(0, 0)` to bottom-right `(n-1, n-1)`. A clear path only passes through cells with value `0`, and moves in any of the 8 directions (including diagonals) between adjacent cells. The path length is the number of visited cells. Return `-1` if no such path exists.

**Example 1:**
```
Input: grid = [[0,1],[1,0]]
Output: 2
Explanation: The only clear cells are (0,0) and (1,1), and they're diagonally adjacent.
```

**Example 2:**
```
Input: grid = [[0,0,0],[1,1,0],[1,1,0]]
Output: 4
Explanation: (0,0) -> (0,1) -> (1,2) -> (2,2), moving diagonally past the walls in the middle column, is a path of length 4.
```

**Example 3:**
```
Input: grid = [[1,0,0],[1,1,0],[1,1,0]]
Output: -1
Explanation: The starting cell (0,0) itself is blocked.
```

**Constraints:**
- n == grid.length == grid[i].length
- 1 <= n <= 100
- grid[i][j] is 0 or 1

## Approach

Every move costs exactly 1 step regardless of direction (even diagonals), so this is unweighted shortest path — which means plain BFS, not Dijkstra. BFS naturally explores the grid in expanding "rings" of distance, so the first time it reaches the bottom-right cell, that's guaranteed to be via the shortest possible path.

Start by checking the two trivial dead ends: if the start or end cell is blocked (`1`), return `-1` immediately. Otherwise seed a BFS queue with `(0, 0)` at distance 1 (counting the starting cell itself, per the problem's definition of path length), and mark it visited. Standard BFS from there: pop a cell, and if it's the target, return its distance. Otherwise push every one of its up-to-8 neighbors that's in bounds, unvisited, and clear (`0`), marking each as visited *at push time* (not pop time) to avoid queueing the same cell multiple times before it's processed. If the queue empties without ever reaching the target, no clear path exists, so return `-1`.

**Time complexity:** O(n^2) — each of the n^2 cells is visited and enqueued at most once, with a constant 8 neighbors checked per cell.

**Space complexity:** O(n^2) for the visited set and BFS queue.
