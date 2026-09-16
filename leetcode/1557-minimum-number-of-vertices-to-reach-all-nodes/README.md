# 1557. Minimum Number of Vertices to Reach All Nodes

**Commonly asked at:** Amazon

You're given a directed acyclic graph (DAG) of `n` nodes labeled 0 to `n-1`, described by a list of directed `edges`. Find the smallest set of vertices such that, starting from them and following the directed edges, every node in the graph is reachable. Return this set (it's guaranteed to be unique).

**Example 1:**
```
Input: n = 6, edges = [[0,1],[0,2],[2,5],[3,4],[4,2]]
Output: [0,3]
Explanation: From 0 you can reach 1, 2, 5. From 3 you can reach 4, then 2, then 5. Together they reach everything.
```

**Example 2:**
```
Input: n = 5, edges = [[0,1],[2,1],[3,1],[1,4],[2,4]]
Output: [0,2,3]
Explanation: Nodes 0, 2, 3 have no incoming edges, so they must all be included.
```

**Constraints:**
- 2 <= n <= 10^5
- 1 <= edges.length <= min(10^5, n * (n - 1) / 2)
- edges[i].length == 2
- 0 <= from_i, to_i < n
- All pairs (from_i, to_i) are distinct

## Approach

In a DAG, any node with an incoming edge is reachable from whatever points to it, so it never needs to be a starting point itself. A node with **no** incoming edges, on the other hand, can only ever be reached by starting there directly — nothing else points to it.

That gives the whole answer directly: compute the in-degree of every node (a simple pass over `edges`, incrementing a counter for each edge's destination), then collect every node whose in-degree is 0.

Why this is both necessary and sufficient: it's necessary because a 0-in-degree node genuinely can't be reached any other way, so it must be included. It's sufficient because every other node (in-degree >= 1) has some predecessor, and by acyclicity that chain of predecessors must eventually bottom out at a 0-in-degree node — so once all 0-in-degree nodes are starting points, everything is reachable, and no larger set is ever needed since the 0-in-degree nodes are forced additions with no way to avoid them.

**Time complexity:** O(n + e) — one pass to compute in-degrees, one pass to collect the zero-in-degree nodes.

**Space complexity:** O(n) for the in-degree array (and the output).
