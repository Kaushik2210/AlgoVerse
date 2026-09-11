# 200. Number of Islands

You're given a 2D grid of `'1'`s (land) and `'0'`s (water). An island is a group of land cells connected horizontally or vertically (not diagonally), surrounded by water. Count how many islands there are.

**Example 1:**
```
Input: grid = [
  ["1","1","1","1","0"],
  ["1","1","0","1","0"],
  ["1","1","0","0","0"],
  ["0","0","0","0","0"]
]
Output: 1
```

**Example 2:**
```
Input: grid = [
  ["1","1","0","0","0"],
  ["1","1","0","0","0"],
  ["0","0","1","0","0"],
  ["0","0","0","1","1"]
]
Output: 3
```

**Constraints:**
- 1 <= grid.length, grid[i].length <= 300
- `grid[i][j]` is `'0'` or `'1'`

## Approach

There isn't really a slower brute force to contrast against here — the natural approach *is* the efficient one, the trick is just making sure you don't recount cells that belong to an island you've already found.

Scan every cell in the grid. Whenever you land on an unvisited `'1'`, that's a brand-new island — increment the island count, then "flood fill" outward from that cell to mark every connected land cell as visited, so none of them get counted again later. The flood fill is just a depth-first (or breadth-first) search: from the current cell, recursively visit its up/down/left/right neighbors, but only if they're in bounds, are also land, and haven't been visited yet. Marking a cell visited can be done by flipping it to `'0'` in place (treat it like water, so the outer scan and the flood fill both skip it going forward) or by using a separate visited set if you don't want to mutate the input.

Because every cell is only ever flood-filled once (once visited, it's excluded from all future searches), the total work across every flood fill combined is still bounded by the size of the grid.

**Time complexity:** O(rows * cols) — every cell is visited by the outer scan once and by a flood fill at most once.

**Space complexity:** O(rows * cols) — worst case (the whole grid is one island), the recursion stack for the flood fill can grow that large.
