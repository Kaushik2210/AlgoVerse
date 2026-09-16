# 407. Trapping Rain Water II

**Commonly asked at:** Google, Amazon

Given an `m x n` integer matrix `heightMap` representing the height of each unit cell in a 2D elevation map, return the volume of water it can trap after raining.

**Example 1:**
```
Input: heightMap = [[1,4,3,1,3,2],[3,2,1,3,2,4],[2,3,3,2,3,1]]
Output: 4
Explanation: After the rain, water is trapped between the blocks. We have two small ponds 1 and 2 in the image above. The total volume of water trapped is 4.
```

**Example 2:**
```
Input: heightMap = [[3,3,3,3,3],[3,2,2,2,3],[3,2,1,2,3],[3,2,2,2,3],[3,3,3,3,3]]
Output: 10
```

**Constraints:**
- m == heightMap.length
- n == heightMap[i].length
- 1 <= m, n <= 200
- 0 <= heightMap[i][j] <= 2 * 10^5

## Approach

This is the 3D generalization of the classic two-pointer "Trapping Rain Water" — but with a 2D grid there's no single left-to-right direction to sweep, since water can be bounded by walls in any direction around it. The right tool here is a priority queue that always expands outward from the currently lowest wall on the boundary of the "explored" region, because that lowest wall is the tightest constraint on how much water anything just inside it can hold.

Start by pushing every border cell into a min-heap (keyed by height), and mark them all visited. Border cells themselves can never trap water (they have no outer wall on their open side), but they collectively form the initial boundary of the flood-fill region.

Then repeatedly pop the lowest-height cell from the heap — call its height `height` — and look at its unvisited neighbors. For each neighbor:
- Any water trapped there is bounded by `height` (the lowest wall reached so far around the frontier) versus the neighbor's own height: `max(0, height - heightMap[neighbor])`. Add that to the running total.
- Push the neighbor into the heap with height `max(height, heightMap[neighbor])` — once water has "filled in" up to `height`, the effective wall height going forward from this neighbor is whichever is taller: the wall that let us reach it, or its own terrain if it's taller than that wall.
- Mark it visited so it's never processed twice.

Popping the globally lowest boundary cell first guarantees that by the time any interior cell is processed, every path to the outside has already been accounted for at the correct (lowest) bounding height — this is exactly the same "always expand from the weakest link" logic as Dijkstra's shortest path, just measuring "max height along the path" instead of "sum of edge weights."

**Time complexity:** O(m * n * log(m * n)), since every cell is pushed and popped from the heap exactly once.

**Space complexity:** O(m * n) for the visited grid and the heap.
