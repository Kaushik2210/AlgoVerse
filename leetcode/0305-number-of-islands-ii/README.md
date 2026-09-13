# 305. Number of Islands II

> **Note:** This is a LeetCode premium problem, so it can't be opened or submitted on a free account. Solved and verified independently against hand-built test cases.

You're given an `m x n` grid, entirely water at the start. You're given a list `positions` where `positions[i] = [ri, ci]` turns that cell into land, one at a time, in order. After each addition, count the number of islands (a group of land cells connected horizontally/vertically). Return an array with the island count after every addition.

**Example 1:**
```
Input: m = 3, n = 3, positions = [[0,0],[0,1],[1,2],[2,1]]
Output: [1,1,2,3]
Explanation: adding (0,0) -> 1 island. Adding (0,1), adjacent to (0,0) -> still 1. Adding (1,2), not adjacent to any land -> 2. Adding (2,1), not adjacent to any land -> 3.
```

**Example 2:**
```
Input: m = 1, n = 1, positions = [[0,0]]
Output: [1]
```

**Constraints:**
- 1 <= m, n, positions.length <= 10^4
- positions[i].length == 2
- 0 <= ri < m, 0 <= ci < n

## Approach

Recomputing islands with a fresh BFS/DFS flood-fill after every single addition would be O(k * m * n) — way too slow. This screams union-find: land only ever gets *added*, never removed, so every addition is naturally an "incremental union" operation, exactly what a disjoint-set structure is built for.

Use a union-find over all `m * n` grid cells (indexed as `row * n + col`), plus a boolean grid tracking which cells are currently land. For each incoming position `(r, c)`:
- If it's already land (a duplicate position appearing again in the input), nothing changes — just record the current island count again.
- Otherwise, mark it land and optimistically assume it starts a brand-new island, incrementing the running island count.
- Then check its up to 4 neighbors: for every neighbor that's already land, try to union the new cell with it. Each successful union (meaning the two cells weren't already in the same set) means two previously-separate islands just got merged into one — decrement the island count once per successful union.

Because union-find's `find` uses path compression and `union` uses union-by-rank, each operation is nearly O(1) amortized (technically O(α(n)), the inverse Ackermann function, which is effectively constant for any realistic input size). Recording the island count after processing each position gives the full answer array directly.

**Time complexity:** O((m*n) + k * α(m*n)) where k is the number of positions — O(m*n) to initialize the union-find and land grid, then O(α(m*n)) amortized per position for its find/union calls.

**Space complexity:** O(m*n) for the union-find parent/rank arrays and the land grid.
