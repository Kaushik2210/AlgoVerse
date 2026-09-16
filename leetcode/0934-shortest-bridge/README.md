# 934. Shortest Bridge

**Commonly asked at:** Google, Amazon

You're given an `n x n` binary grid containing exactly two islands (groups of `1`s connected 4-directionally, with the two islands not touching each other). You may flip any number of `0`s to `1`s. Return the minimum number of `0`s you must flip to connect the two islands into one.

**Example 1:**
```
Input: grid = [[0,1],[1,0]]
Output: 1
```

**Example 2:**
```
Input: grid = [[0,1,0],[0,0,0],[0,0,1]]
Output: 2
```

**Constraints:**
- n == grid.length == grid[i].length
- 2 <= n <= 100
- `grid[i][j]` is `0` or `1`
- There are exactly two islands

## Approach

The number of flips needed to connect the islands is exactly the shortest 4-directional path (measured in water cells) between the two islands — so this is a shortest-path problem once we know where both islands are.

First, find one of the two islands with a simple scan-and-flood-fill: the moment you spot a `1`, flood fill outward (DFS is fine here) to mark every cell of that island as visited, collecting all of its coordinates. Now treat every one of those coordinates as a simultaneous starting point for a multi-source breadth-first search: push them all into a queue at distance 0, and expand outward one ring at a time across water cells. The first time this BFS reaches a cell belonging to the *other* island (a `1` that wasn't part of the island you started from), the number of water cells it crossed to get there is the answer — BFS explores in increasing distance order, so the first hit is guaranteed to be the shortest bridge.

**Time complexity:** O(n^2) — the initial flood fill and the BFS both visit each cell at most once.

**Space complexity:** O(n^2) for the visited tracking and the BFS queue.
