# 133. Clone Graph

You're given a reference to a node in a connected undirected graph. Each node has an integer value and a list of its neighbors. Return a deep copy (clone) of the graph — a brand new set of nodes, wired up with the same connections, sharing no references with the original.

**Example 1:**
```
Input (adjacency list): [[2,4],[1,3],[2,4],[1,3]]
Output: [[2,4],[1,3],[2,4],[1,3]]
```
Explanation: node 1 connects to nodes 2 and 4, node 2 connects to 1 and 3, etc. The clone must reproduce this exact structure with entirely new node objects.

**Constraints:**
- The number of nodes is in the range [0, 100]
- 1 <= Node.val <= 100
- Node.val is unique for each node
- The graph is undirected and connected, no repeated edges, no self-loops

## Approach

The tricky part isn't copying nodes — it's that the graph is undirected and generally cyclic (node A points to B, B points back to A), so a naive recursive copy would recurse into B while copying A, then recurse back into A while copying B, forever.

The fix is a hashmap from original node to its already-created clone. Do a DFS (or BFS) from the given starting node. Before recursing into a node, check the map: if it's already there, just return the existing clone instead of making a new one and recursing again — that's what breaks the cycle. Otherwise, create the clone immediately, put it in the map *before* recursing into its neighbors (this is the key ordering — if you wait until after processing neighbors, a cycle back to this node would trigger infinite recursion since the map wouldn't have the entry yet), then for each neighbor of the original, recursively clone it and append the result to the new node's neighbor list.

Every node gets visited and cloned exactly once because the map lookup short-circuits repeat visits, so the algorithm still terminates cleanly even though the underlying graph has cycles.

**Time complexity:** O(V + E) — each node is visited once and each edge is traversed once (from each endpoint).

**Space complexity:** O(V) for the hashmap and the recursion stack.
