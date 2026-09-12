# 261. Graph Valid Tree

*Note: this is a LeetCode Premium (subscriber-only) problem, not freely accessible on LeetCode. It's included here anyway because "is this graph a valid tree" (via union-find or a cycle-and-connectivity check) is an extremely common interview question and a natural companion to Redundant Connection.*

You have `n` nodes labeled 0 to n-1 and a list of undirected `edges`, where `edges[i] = [a, b]` means there's an edge between nodes `a` and `b`. Return `true` if these edges form a valid tree.

**Example 1:**
```
Input: n = 5, edges = [[0,1],[0,2],[0,3],[1,4]]
Output: true
```

**Example 2:**
```
Input: n = 5, edges = [[0,1],[1,2],[2,3],[1,3],[1,4]]
Output: false
Explanation: nodes 1, 2, 3 form a cycle
```

**Constraints:**
- 1 <= n <= 2000
- 0 <= edges.length <= 5000
- edges[i].length == 2
- 0 <= a_i, b_i < n
- a_i != b_i
- No repeated edges (undirected, so [0,1] and [1,0] are the same edge)

## Approach

A graph with n nodes is a valid tree exactly when two conditions both hold: it's fully connected (every node reachable from any other) and it has no cycles. There's a nice shortcut baked into the edge count: a connected graph with n nodes and no cycle has exactly n-1 edges, and conversely, a graph with exactly n-1 edges that's connected is guaranteed to be acyclic (extra edges are what create cycles, so if there are exactly enough edges for a spanning tree and everything is still reachable, there's no room left for a cycle). That means checking "edges.length != n - 1" up front is an instant `false` for both "too many edges" (must contain a cycle) and "too few edges" (can't possibly be connected) — saving a full traversal in those cases.

For the remaining case (exactly n-1 edges), the check reduces to confirming there's no cycle — because with exactly n-1 edges, acyclic implies connected already (a forest with n-1 edges across n nodes must be a single tree, not multiple disconnected trees, since more than one tree with n total nodes would need fewer than n-1 edges total). Union-find handles this cleanly: for each edge, if its two endpoints already share the same root, that edge closes a cycle — return false. Otherwise union them. If every edge gets processed without finding a cycle, it's a valid tree.

**Time complexity:** O(n * alpha(n)) — near-constant-time union-find operations, once per edge.

**Space complexity:** O(n) for the union-find parent array.
