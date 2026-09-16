# 2192. All Ancestors of a Node in a Directed Acyclic Graph

**Commonly asked at:** Amazon, Google, Meta, Oracle

You're given a positive integer `n` representing the nodes of a directed acyclic graph, numbered `0` to `n-1`, and `edges` where `edges[i] = [fromi, toi]` describes a directed edge. Return a list where entry `i` is the sorted list of all ancestors of node `i` — every node that can reach node `i` through some directed path.

**Example 1:**
```
Input: n = 8, edges = [[0,3],[0,4],[1,3],[2,4],[2,7],[3,5],[3,6],[3,7],[4,6]]
Output: [[],[],[],[0,1],[0,2],[0,1,3],[0,1,2,3,4],[0,1,2,3]]
```

**Example 2:**
```
Input: n = 5, edges = [[0,1],[0,2],[0,3],[0,4],[1,2],[1,3],[1,4],[2,3],[2,4],[3,4]]
Output: [[],[0],[0,1],[0,1,2],[0,1,2,3]]
```

**Constraints:**
- 1 <= n <= 1000
- 0 <= edges.length <= min(2000, n * (n-1) / 2)
- edges[i].length == 2
- 0 <= fromi, toi <= n-1
- fromi != toi
- There are no duplicate edges
- The graph is a DAG

## Approach

A node's ancestor set is exactly the union of its direct parents plus everything those parents have as ancestors — so if we process nodes in an order where every parent is fully finalized before any of its children run, we can just propagate ancestor sets forward one hop at a time and every node ends up correct.

That processing order is a topological sort. Do a standard Kahn's-algorithm BFS: nodes with in-degree 0 start in the queue. When a node `u` is dequeued (meaning its own ancestor set is now final), walk its outgoing edges to each child `v` and merge `u`'s entire ancestor set, plus `u` itself, into `v`'s ancestor set. Decrement `v`'s in-degree, and once it hits zero (all of `v`'s parents have been finalized and folded in), `v` is ready to be dequeued and propagated onward itself.

Using a set (ordered, like a TreeSet/std::set, or a plain hash set sorted at the end) per node keeps the merges as simple union operations and avoids adding duplicate ancestors when a node has multiple paths reaching the same ancestor.

**Time complexity:** O(V + E * V) in the worst case — each of the E edges can trigger merging a set of up to V ancestors, though in practice it's bounded by the total ancestor-set sizes across all nodes, which is manageable given n <= 1000 and edges <= 2000.

**Space complexity:** O(V^2) worst case for storing every node's ancestor set.
