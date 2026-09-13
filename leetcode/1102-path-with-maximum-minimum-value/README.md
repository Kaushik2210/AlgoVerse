# 1102. Path With Maximum Minimum Value

You're given an `rows x cols` integer matrix `grid`. Find a path from the top-left cell to the bottom-right cell (moving up/down/left/right) that maximizes "the smallest value along the path" — the path's score is the minimum cell value it passes through (including the start and end cells), and you want the path whose score is as large as possible. Return that maximum score.

**Example 1:**
```
Input: grid = [[5,4,5],[1,2,6],[7,4,6]]
Output: 4
Explanation: the path 5 -> 4 -> 5 -> 6 -> 6 has minimum value 4, and no path does better.
```

**Example 2:**
```
Input: grid = [[2,2,1,2,2,2],[1,2,2,2,1,2]]
Output: 2
```

**Constraints:**
- 1 <= rows, cols <= 100
- 0 <= grid[i][j] <= 10^9

## Approach

This is a "widest path" / bottleneck-shortest-path problem, and it's solved the same way Dijkstra's algorithm solves shortest paths — just swapping the aggregation rule. Instead of tracking the smallest *sum* along a path and always expanding the currently cheapest frontier node, track the largest possible *minimum* along a path and always expand the currently most-promising frontier cell.

Use a max-heap keyed on "the bottleneck value achievable along the best known path to this cell so far." Start by pushing `(grid[0][0], 0, 0)`. Repeatedly pop the cell with the highest bottleneck score — because it's a max-heap, this cell's stored score is guaranteed to be its true final best-possible score, the same greedy-finality argument that makes Dijkstra correct (any not-yet-visited path can only be *worse or equal*, since scores never increase for later, less-promising pops). If that popped cell is the destination, its score is the answer — return immediately. Otherwise, mark it visited and push each unvisited neighbor with a score of `min(current cell's score, neighbor's grid value)`, since walking onto that neighbor caps the path's bottleneck at whichever is smaller.

Marking cells visited the moment they're popped (matching standard Dijkstra) avoids ever reprocessing a cell with a stale, lower score after its true best score has already been finalized.

**Time complexity:** O(rows * cols * log(rows * cols)) — each cell is pushed and popped from the heap a bounded number of times (at most once per neighbor edge into it, so O(4) pushes per cell), each heap operation costing O(log(rows*cols)).

**Space complexity:** O(rows * cols) for the visited grid and the heap.
