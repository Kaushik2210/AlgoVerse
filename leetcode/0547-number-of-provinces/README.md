# 547. Number of Provinces

There are `n` cities. Some are directly connected, some are not, and the connections aren't necessarily direct — city A might reach city C only through city B. A **province** is a group of directly or indirectly connected cities. You're given an `n x n` matrix `isConnected` where `isConnected[i][j] = 1` if city `i` and city `j` are directly connected, and `0` otherwise. Return the total number of provinces.

**Example 1:**
```
Input: isConnected = [[1,1,0],[1,1,0],[0,0,1]]
Output: 2
```

**Example 2:**
```
Input: isConnected = [[1,0,0],[0,1,0],[0,0,1]]
Output: 3
```

**Constraints:**
- 1 <= n <= 200
- isConnected[i][j] is 1 or 0
- isConnected[i][i] == 1
- isConnected[i][j] == isConnected[j][i]

## Approach

This is just "count the connected components" wearing a word problem's clothes. The matrix is an adjacency matrix for an undirected graph over `n` cities — row `i` tells you exactly which cities `i` touches directly.

Walk through every city. If it hasn't been visited yet, it's the start of a brand-new province, so bump the count and flood-fill outward from it (DFS or BFS, doesn't matter which) marking every city reachable from it as visited. Any city that gets swept up in that flood-fill is part of the same province, whether it's directly connected to the start or only reachable through a chain of other cities. Once the flood-fill runs dry, move to the next unvisited city and repeat.

Union-Find works just as well here — union every pair with `isConnected[i][j] == 1`, then count distinct roots — but plain DFS keeps things simpler for a matrix this size.

**Time complexity:** O(n^2) — the adjacency matrix itself has n^2 entries, and DFS/BFS touches each one at most once across the whole run.

**Space complexity:** O(n) for the visited set and recursion/queue.
