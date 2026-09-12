# 417. Pacific Atlantic Water Flow

There's an `m x n` grid of heights representing a continent. The Pacific Ocean touches the left and top edges of the grid, and the Atlantic touches the right and bottom edges. Water can flow from a cell to any of its 4 neighbors with height less than or equal to the current cell's height (water flows downhill, or across flat ground). Return the coordinates of every cell from which water can reach *both* oceans.

**Example 1:**
```
Input:
[[1,2,2,3,5],
 [3,2,3,4,4],
 [2,4,5,3,1],
 [6,7,1,4,5],
 [5,1,1,2,4]]

Output: [[0,4],[1,3],[1,4],[2,2],[3,0],[3,1],[4,0]]
```

**Constraints:**
- m == heights.length, n == heights[r].length
- 1 <= m, n <= 200
- 0 <= heights[r][c] <= 10^5

## Approach

The direct question — "from this cell, can water reach the Pacific, and can it also reach the Atlantic" — means running a reachability search from every single cell, which is O(m*n) work per cell and O((mn)^2) overall. Too slow, and also awkward because "can flow to" is defined in the downhill direction, so a forward search from an interior cell has to explore a lot of terrain.

The fix is to reverse the direction of the search and start from the oceans instead. Water can flow from cell A to cell B if `height[A] >= height[B]`. Reversing that: think of a search that starts at the ocean border and walks "uphill or flat" — from a cell to a neighbor with height greater than or equal to the current cell's height. Any cell reachable that way, by definition, would have water able to flow downhill from it all the way back down to that piece of ocean border.

Run one multi-source BFS/DFS starting from all Pacific-adjacent cells (the entire top row and left column) simultaneously, moving to neighbors with height >= current height, marking every cell reached as "can reach Pacific". Run a second, separate multi-source search from all Atlantic-adjacent cells (bottom row and right column) the same way, marking "can reach Atlantic". A cell qualifies for the answer exactly when it was marked reachable in both searches.

**Time complexity:** O(m*n) — each of the two searches visits each cell a constant number of times, since a visited-marker array prevents revisiting.

**Space complexity:** O(m*n) for the two visited-marker grids and the BFS/DFS queue or stack.
