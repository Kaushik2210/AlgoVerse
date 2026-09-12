# 684. Redundant Connection

You're given a graph that started as a tree with `n` nodes labeled 1 to n, then had one extra edge added — so it now has `n` edges instead of `n-1`, which means somewhere there's exactly one cycle. `edges` is a list of `[u, v]` pairs given in the order they were added. Return the edge that, if removed, turns the graph back into a tree. If multiple edges could be removed to achieve this, return the one that appears last in the input.

**Example 1:**
```
Input: edges = [[1,2],[1,3],[2,3]]
Output: [2,3]
Explanation: 1-2 and 1-3 already connect all three nodes into a tree; the edge 2-3 is the redundant one that closes a cycle, and it's the last edge in the input that does so
```

**Example 2:**
```
Input: edges = [[1,2],[2,3],[3,4],[1,4],[1,5]]
Output: [1,4]
```

**Constraints:**
- n == edges.length
- 3 <= n <= 1000
- edges[i].length == 2
- 1 <= u_i < v_i <= edges.length
- No repeated edges

## Approach

A tree with n nodes has exactly n-1 edges and no cycles; adding any one more edge on top of a tree necessarily creates exactly one cycle. The edge that closes that cycle — the first edge, in input order, that connects two nodes already in the same connected component — is a redundant edge. Since the problem guarantees exactly one such extra edge exists, and asks for the one appearing last in the input if there's a choice, processing edges in order and returning the very first one that closes a cycle is automatically also the correct "last valid answer": no earlier edge could have closed a cycle (the graph wouldn't have been a valid tree-plus-one-edge otherwise), so the one edge that does is the answer.

Union-find is the natural tool: start with every node as its own component. Process edges in given order — for each `[u, v]`, check whether `u` and `v` are already in the same component (find(u) == find(v)). If they are, this edge connects two already-connected nodes, so it's the one closing the cycle — return it immediately. Otherwise, union their components and move to the next edge.

Path compression and union by rank/size keep this close to O(1) amortized per edge.

**Time complexity:** O(n * alpha(n)) — n union-find operations, each near-constant time with path compression.

**Space complexity:** O(n) for the union-find parent array.
