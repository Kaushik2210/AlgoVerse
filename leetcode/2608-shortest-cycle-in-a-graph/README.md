# 2608. Shortest Cycle in a Graph

**Commonly asked at:** Google, Meta

You're given a bidirectional graph with `n` nodes and a list of `edges` (no repeated edges, no self-loops). Return the length of the shortest cycle in the graph, or `-1` if the graph has no cycle.

**Example 1:**
```
Input: n = 7, edges = [[0,1],[1,2],[2,0],[3,4],[4,5],[5,6],[6,3]]
Output: 3
Explanation: nodes 0, 1, 2 form a 3-cycle, which is shorter than the 4-cycle formed by nodes 3, 4, 5, 6.
```

**Example 2:**
```
Input: n = 4, edges = [[0,1],[0,2]]
Output: -1
Explanation: this is a tree — no cycle exists.
```

**Constraints:**
- 2 <= n <= 1000
- 1 <= edges.length <= 1000
- edges[i].length == 2
- 0 <= ui, vi <= n - 1
- ui != vi
- There are no repeated edges

## Approach

The shortest cycle through any particular edge can be found by BFS: run a BFS from a node and look for an edge connecting two already-discovered nodes that isn't the tree edge you used to reach one of them from the other — that "extra" edge closes a cycle, and its length is the sum of both endpoints' BFS depths plus one (for the closing edge itself).

Doing this from a single BFS root only reliably finds the shortest cycle passing through that particular node's BFS tree in the right shape, so to guarantee catching the true shortest cycle anywhere in the graph, run this BFS from *every* node as the root and take the minimum over all of them.

For each BFS root: track `dist[v]` (BFS depth) and `parent[v]` (the node this BFS tree edge came from) for every node. While expanding node `u`'s neighbors, if a neighbor `v` is unvisited, it's a normal tree-growth step. If `v` is already visited and isn't `u`'s own parent (skipping that avoids double-counting the tree edge itself as a fake cycle), then edge `u-v` closes a cycle of length `dist[u] + dist[v] + 1` — update the running minimum.

If no cycle is ever found across any of the n BFS runs, return -1.

**Time complexity:** O(n * (n + e)), where n is the number of nodes and e is the number of edges — one full BFS per starting node.

**Space complexity:** O(n + e) for the adjacency list, plus O(n) per BFS for the distance and parent arrays.
