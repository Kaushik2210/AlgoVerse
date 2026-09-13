# 778. Swim in Rising Water

You are given an `n x n` integer matrix `grid` where each value `grid[i][j]` represents the elevation at that point `(i, j)`. It starts raining, and water gradually rises over time. At time `t`, the water level is `t`, meaning any cell with elevation less than equal to `t` is submerged or reachable.

You can swim from a square to another 4-directionally adjacent square if and only if the elevation of both squares individually are at most `t`. You can swim infinite distances in zero time. Of course, you must stay within the boundaries of the grid during your swim.

Return the least time until you can reach the bottom right square `(n - 1, n - 1)` if you start at the top left square `(0, 0)`.

**Example 1:**
```
Input: grid = [[0,2],[1,3]]
Output: 3
Explanation:
At time 0, you are in grid location (0, 0).
You cannot go anywhere else because 4-directionally adjacent neighbors have a higher elevation than t = 0.
You cannot reach point (1, 1) until time 3.
When the depth of water is 3, we can swim anywhere inside the grid.
```

**Example 2:**
```
Input: grid = [[0,1,2,3,4],[24,23,22,21,5],[12,13,14,15,16],[11,17,18,19,20],[10,9,8,7,6]]
Output: 16
```

**Constraints:**
- n == grid.length == grid[i].length
- 1 <= n <= 50
- 0 <= grid[i][j] < n^2
- Each value grid[i][j] is unique.

## Approach

The answer is the minimum possible value of "the maximum elevation crossed" along any path from the top-left to the bottom-right corner — since you can wait for the water to rise, the actual arrival time is dictated entirely by the single tallest cell you're forced to step on somewhere along whichever path is best.

This is a Dijkstra-like shortest path problem where the "distance" being minimized isn't a sum of edge weights but a max of node weights along the path. Use a min-heap of `(max_elevation_so_far, row, col)`, starting from `(grid[0][0], 0, 0)`.

Repeatedly pop the entry with the smallest "max elevation so far." The first time the bottom-right cell `(n-1, n-1)` gets popped, its recorded value is the answer — exactly like standard Dijkstra, popping a node from the heap finalizes its minimum cost, because anything still in the heap has a cost at least as large (the heap invariant), so no cheaper path to that node can ever be found later.

For each popped cell, look at its unvisited neighbors and push each one with cost `max(current_cost, grid[neighbor])` — the neighbor inherits whichever is larger: the elevation already crossed to reach here, or its own elevation (since stepping onto it requires the water to be at least that high too).

Mark cells visited when pushed (not when popped) to avoid enqueuing the same cell multiple times.

**Time complexity:** O(n^2 log n), since each of the n^2 cells is pushed and popped from the heap once, each with O(log(n^2)) = O(log n) heap operations.

**Space complexity:** O(n^2) for the visited grid and the heap.

## Alternative: binary search + BFS/DFS reachability

Since the answer is bounded by the range of grid values (0 to n^2 - 1), binary search on a candidate time `t`: for each candidate, run a BFS/DFS from `(0, 0)` only stepping onto cells with elevation `<= t`, and check whether `(n-1, n-1)` is reachable. The smallest `t` for which it's reachable is the answer. This runs in O(n^2 log(n^2)) as well, since each of the O(log(n^2)) binary search steps does an O(n^2) reachability check — asymptotically similar to the priority-queue approach, just structured differently (and it doesn't reuse work between binary search iterations the way the single Dijkstra pass does).
