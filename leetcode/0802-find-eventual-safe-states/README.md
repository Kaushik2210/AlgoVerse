# 802. Find Eventual Safe States

**Commonly asked at:** Google

You're given a directed graph `graph` where `graph[i]` lists the nodes that node `i` has an edge to. A node is a "terminal node" if it has no outgoing edges. A node is "safe" if every possible path starting from it eventually leads to a terminal node — meaning it can never get stuck in a cycle. Return all safe nodes, sorted in ascending order.

**Example 1:**
```
Input: graph = [[1,2],[2,3],[5],[0],[5],[],[]]
Output: [2,4,5,6]
Explanation: nodes 5 and 6 are terminal (no outgoing edges), and node 2 and node 4 only lead to node 5, so they're safe too. Nodes 0, 1, and 3 form a cycle among themselves (0->1->3->0), so a path starting from any of them can loop forever and never reach a terminal node.
```

**Example 2:**
```
Input: graph = [[1,2,3,4],[1,2],[3,4],[0,4],[]]
Output: [4]
```

**Constraints:**
- n == graph.length
- 1 <= n <= 10^4
- 0 <= graph[i].length <= n
- 0 <= graph[i][j] <= n - 1
- graph[i] is sorted in strictly increasing order
- The graph may contain self-loops
- The total number of edges is at most 4 * 10^4

## Approach

A node is safe exactly when every one of its outgoing edges leads to a safe node (with terminal nodes — zero outgoing edges — safe by definition, the base case). That's a dependency relationship running backward from terminal nodes, which is a natural fit for Kahn's-style topological processing, just run on the reverse graph.

Build the reverse graph (edge `v -> u` for every original edge `u -> v`) and track each node's `outDegree` in the *original* graph. Any node with `outDegree == 0` is immediately safe — it's terminal — and starts in the queue.

Process the queue: when node `u` is dequeued, it's confirmed safe. Look at its reverse-graph neighbors (its parents in the original graph, i.e. nodes with an edge into `u`) and decrement each parent's out-degree, since one of that parent's "does this path lead somewhere safe" obligations is now satisfied. Once a parent's out-degree hits 0, meaning *every* one of its outgoing edges now points at a confirmed-safe node, it becomes safe too and joins the queue.

Any node that's part of a cycle (or that can reach one) never gets its out-degree fully drained to 0, since at least one of its paths keeps looping back through unresolved nodes — so it's correctly left out of the final safe set.

**Time complexity:** O(V + E), where V is the number of nodes and E is the total number of edges — each edge is examined once when building the reverse graph and once when propagating safety.

**Space complexity:** O(V + E) for the reverse graph and the out-degree/queue bookkeeping.
