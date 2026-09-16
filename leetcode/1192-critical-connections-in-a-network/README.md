# 1192. Critical Connections in a Network

**Commonly asked at:** Google, Amazon

There are `n` servers numbered `0` to `n-1` connected by `connections`, an undirected, connected graph with no repeated edges. A critical connection is an edge that, if removed, would split the network into two or more disconnected pieces. Return all critical connections, in any order.

**Example 1:**
```
Input: n = 4, connections = [[0,1],[1,2],[2,0],[1,3]]
Output: [[1,3]]
Explanation: 0, 1, and 2 form a triangle — removing any one of those three edges still leaves the rest connected through the other two. But edge [1,3] is the only link to server 3, so removing it disconnects server 3 entirely.
```

**Example 2:**
```
Input: n = 2, connections = [[0,1]]
Output: [[0,1]]
```

**Constraints:**
- 2 <= n <= 10^5
- n - 1 <= connections.length <= 10^5
- 0 <= ai, bi <= n - 1
- ai != bi
- There are no repeated connections

## Approach

A critical connection is exactly a "bridge" in graph theory: an edge that isn't part of any cycle, so no alternate route exists around it. Tarjan's bridge-finding algorithm identifies every bridge with a single DFS.

Run a DFS from any node, assigning each node two numbers as it's discovered:
- `disc[u]`: the order in which `u` was first visited (its discovery time).
- `low[u]`: the smallest discovery time reachable from `u`'s DFS subtree, either through further tree edges or through a single "back edge" up to an ancestor.

While exploring `u`'s neighbors, skip the specific edge back to `u`'s own parent (its tree edge), since that's not a genuine back edge — but still allow other edges that happen to point at the parent's *value* through a different edge if one existed (this problem's "no repeated connections" guarantee means that case doesn't arise here, so tracking the parent edge by index rather than by node value keeps this precise). For every other already-visited neighbor `v`, that's a genuine back edge, so pull `low[u]` down to `disc[v]`. For every unvisited neighbor, recurse into it as a new tree edge, then after it returns, fold its `low` value up: `low[u] = min(low[u], low[child])`.

The key test: after fully exploring a child `v` of `u`, if `low[v] > disc[u]`, it means nothing in `v`'s subtree can reach back to `u` or anything earlier — there's no alternate path around the edge `u-v`, so it's a bridge.

Because `n` can be up to 10^5, a plain recursive DFS risks overflowing the call stack on a long path, so the DFS here is done iteratively with an explicit stack, each frame tracking the current node, which of its edges leads back to its parent (so that one can be skipped), and how far through its adjacency list it's gotten so it can resume where it left off.

**Time complexity:** O(V + E), where V is the number of servers and E is the number of connections — standard DFS bound, each edge examined a constant number of times.

**Space complexity:** O(V + E) for the adjacency lists, discovery/low arrays, and the explicit DFS stack.
