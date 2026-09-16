# 1631. Path With Minimum Effort

**Commonly asked at:** Google, Amazon

You're given a `rows x cols` matrix `heights`. You start at the top-left cell and want to reach the bottom-right cell, moving up/down/left/right. A path's "effort" is the maximum absolute difference in heights between two consecutive cells along it. Return the minimum possible effort over all paths.

**Example 1:**
```
Input: heights = [[1,2,2],[3,8,2],[5,3,5]]
Output: 2
Explanation: the path [1,3,5,3,5] has consecutive differences [2,2,2,2], max is 2. No path does better.
```

**Example 2:**
```
Input: heights = [[1,2,3],[3,8,4],[5,3,5]]
Output: 1
Explanation: the path [1,2,3,4,5] has consecutive differences all equal to 1.
```

**Constraints:**
- rows == heights.length
- cols == heights[i].length
- 1 <= rows, cols <= 100
- 1 <= heights[i][j] <= 10^6

## Approach

Like path-with-maximum-minimum-value, this is a bottleneck-path problem, not a sum-path problem, so it gets the Dijkstra treatment with the aggregation rule swapped: instead of a path's "distance" being the sum of edge weights, it's the *maximum* edge weight (the biggest single height jump) encountered along the way — and the goal is to minimize that maximum.

Run Dijkstra almost unmodified: a min-heap of `(effort, row, col)`, starting with `(0, 0, 0)` since the start cell needs zero effort to reach. Maintain `effort_to[r][c]`, the smallest possible "worst step" of any path found to `(r, c)` so far, initialized to infinity everywhere except the start. Pop the cell with the smallest recorded effort — standard Dijkstra greedy-finality guarantees this is that cell's true minimum effort, since the heap always surfaces the globally smallest unresolved effort first, and once popped, no unexplored path could improve on it (a min-heap for a min-style edge relaxation is exactly what Dijkstra needs). If it's the destination, return immediately.

Otherwise, for each neighbor, the effort to reach it via this cell is `max(effort to reach current cell, abs(height difference to neighbor))` — the path's max step so far, possibly extended by the new step. If that beats the neighbor's currently known best effort, update it and push it onto the heap. Skip stale heap entries (an effort value larger than what's already recorded for that cell) the same way plain Dijkstra does, since a better path was already found and processed.

**Time complexity:** O(rows * cols * log(rows * cols)) — same shape as Dijkstra: each cell's outgoing edges (up to 4) may each trigger one heap push, and each heap operation is O(log(number of cells)).

**Space complexity:** O(rows * cols) for the effort grid and the heap.
