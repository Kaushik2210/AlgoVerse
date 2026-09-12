# 785. Is Graph Bipartite?

You're given an undirected graph with `n` nodes labeled `0` to `n - 1`, as an adjacency list `graph` where `graph[u]` lists all nodes adjacent to `u`. A graph is **bipartite** if its nodes can be split into two independent sets A and B such that every edge connects a node in A to a node in B. Return `true` if the graph is bipartite.

**Example 1:**
```
Input: graph = [[1,2,3],[0,2],[0,1,3],[0,2]]
Output: false
Explanation: Node 0 can't be split into two sets since 1, 2, and 3 are all its neighbors, and 1-2 and 2-3 already conflict.
```

**Example 2:**
```
Input: graph = [[1,3],[0,2],[1,3],[0,2]]
Output: true
Explanation: Split into {0, 2} and {1, 3}.
```

**Constraints:**
- graph.length == n
- 1 <= n <= 100
- 0 <= graph[u].length < n
- graph[u] does not contain u
- All values of graph[u] are unique
- The graph is guaranteed to be undirected: if v is in graph[u], u is in graph[v]

## Approach

A graph is bipartite exactly when it can be properly 2-colored — every edge connects two differently-colored nodes, with no edge ever connecting two nodes of the same color. So the problem is really: try to 2-color the graph, and see if it's possible.

Walk through every node. If it hasn't been colored yet, start a BFS/DFS from it and assign it color 0. For every neighbor of a node being processed: if the neighbor is uncolored, give it the opposite color and continue the traversal from there; if the neighbor is already colored and its color matches the current node's color, that's a same-color edge — a direct contradiction — so return `false` immediately.

The one detail that's easy to miss: the graph isn't guaranteed to be connected. If you only run this from a single starting node, disconnected components never get checked and a conflict hiding in another component would slip through. So the outer loop has to try starting a fresh coloring from *every* node that hasn't been colored yet — each connected component gets its own independent 2-coloring, and any one of them failing means the whole graph isn't bipartite.

**Time complexity:** O(V + E) — each node and edge is visited a constant number of times across all components.

**Space complexity:** O(V) for the color array and BFS/DFS queue or recursion stack.
