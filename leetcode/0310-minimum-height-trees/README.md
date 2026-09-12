# 310. Minimum Height Trees

A tree is an undirected graph with `n` nodes labeled `0` to `n - 1` and `n - 1` edges. Given the graph as `edges`, pick any node as the root and the tree gets a height (the max distance from the root to any leaf). Return all the roots that give the **minimum possible height** — there can be one or two such roots.

**Example 1:**
```
Input: n = 4, edges = [[1,0],[1,2],[1,3]]
Output: [1]
Explanation: Rooting at node 1 gives a tree of height 1, the smallest possible.
```

**Example 2:**
```
Input: n = 6, edges = [[3,0],[3,1],[3,2],[3,4],[5,4]]
Output: [3,4]
Explanation: Both node 3 and node 4 give the minimum height of 2.
```

**Constraints:**
- 1 <= n <= 2 * 10^4
- edges.length == n - 1
- 0 <= ai, bi < n
- The given input is guaranteed to be a tree

## Approach

Checking every node as a candidate root and computing its height with a full BFS/DFS would be O(n^2), too slow for n up to 2*10^4. There's a much cleaner insight: the nodes that minimize the height are always the **centroid(s)** of the tree — the node(s) sitting right in the middle. A tree has at most 2 centroids (never 3+), and they can be found by repeatedly stripping away the outermost layer of leaves, like peeling an onion from the outside in.

Here's why that works intuitively: any leaf node can never be an optimal root, because rooting at its only neighbor instead would only shrink the height (you'd cut off one hop to the farthest point). So the leaves are always the worst choices, and removing them can only help. Repeat this stripping process — treat it as layers, like BFS from the "outside" — and whatever node(s) survive last, after every leaf has been trimmed away, are the tree's centroid(s), and rooting there gives the minimum possible height.

Concretely: build an adjacency list and track each node's degree. Start with all current leaves (degree <= 1) in a queue. Repeatedly pop the current layer of leaves, "remove" them by decrementing their neighbors' degrees, and push any neighbor that becomes a new leaf (degree drops to 1) as the next layer. Keep peeling layers until 2 or fewer nodes remain — those are the answer. (Special-case `n == 1`: the single node is its own answer with no edges to process.)

**Time complexity:** O(n) — every node and edge is processed a constant number of times across the peeling process.

**Space complexity:** O(n) for the adjacency list, degree array, and queue.
