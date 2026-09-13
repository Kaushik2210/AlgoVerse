# 685. Redundant Connection II

This is the directed version of Redundant Connection (684). You're given a directed graph that started as a rooted tree with `n` nodes (every node except the root has exactly one parent, reachable from the root), then had one extra directed edge added on top — so it now has `n` edges instead of `n-1`. `edges` is a list of `[u, v]` pairs (`u -> v`) given in the order added. Return the edge that, if removed, restores a valid rooted tree. If multiple edges could work, return the one that appears last in the input.

**Example 1:**
```
Input: edges = [[1,2],[1,3],[2,3]]
Output: [2,3]
Explanation: Node 3 has two parents, 1 and 2. Removing [1,3] would also leave a valid tree, but [2,3] is the one that appears last, matching the required tie-break, and removing it (keeping [1,2],[1,3]) already forms a valid tree.
```

**Example 2:**
```
Input: edges = [[1,2],[2,3],[3,4],[4,1],[1,5]]
Output: [4,1]
Explanation: No node has two parents here — the extra edge just closes a pure cycle (1 -> 2 -> 3 -> 4 -> 1), and [4,1] is the edge that closes it.
```

**Constraints:**
- n == edges.length
- 2 <= n <= 1000
- edges[i].length == 2
- 1 <= u_i, v_i <= n
- u_i != v_i

## Approach

Unlike the undirected version, a directed "tree plus one edge" can go wrong in three different shapes, so this needs real case analysis on top of union-find:

1. **A node has two parents, and removing the right one alone fixes everything.** Walk through edges tracking each node's parent. If some node `v` already has a parent when a second edge `u2 -> v` arrives, that's a conflict: `candidate1 = [existing_parent, v]` (the first edge into v) and `candidate2 = [u2, v]` (the second, conflicting edge). Since a valid rooted tree needs every non-root node to have exactly one parent, the answer must be one of these two edges — never anything else.
2. **A node has two parents, but only removing the *first* offending edge actually eliminates the cycle** (removing the second one still leaves a cycle among the other edges). This is the subtle case: having two parents and being part of a cycle can co-occur.
3. **No node has two parents at all — it's a pure cycle**, same as the undirected version: some edge, when unioned, connects two nodes already in the same component.

The algorithm handles all three together:
- First pass: detect a two-parent conflict as above. If found, remember `candidate1` and `candidate2`, and skip the second conflicting edge (`candidate2`) entirely when doing the union-find pass below — pretend it was never added.
- Union-find pass over all edges except the skipped one: for each edge `[u, v]`, if `find(u) == find(v)`, this edge closes a cycle among the remaining edges.
  - If no two-parent conflict was found earlier, this cycle-closing edge is the direct answer (pure cycle case).
  - If a two-parent conflict *was* found, this means removing `candidate2` wasn't enough — a cycle still exists elsewhere, so the answer must be `candidate1` instead (removing the first conflicting edge breaks both problems at once).
- If the union-find pass completes with no cycle, and a two-parent conflict was found, then removing `candidate2` alone was sufficient — return `candidate2`.

**Time complexity:** O(n * alpha(n)) — two passes over the edges, with near-constant union-find operations.

**Space complexity:** O(n) for the parent-tracking array and the union-find structure.
