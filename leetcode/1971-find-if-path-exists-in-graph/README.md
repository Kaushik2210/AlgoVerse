# 1971. Find if Path Exists in Graph

You have a bidirectional graph of `n` vertices labeled `0` to `n - 1`, described by an edge list. Given a `source` vertex and a `destination` vertex, return `true` if there's a valid path between them (a vertex can reach itself with a path of length 0).

**Example 1:**
```
Input: n = 3, edges = [[0,1],[1,2],[2,0]], source = 0, destination = 2
Output: true
Explanation: 0 -> 1 -> 2, or directly 0 -> 2 since the edges form a triangle.
```

**Example 2:**
```
Input: n = 6, edges = [[0,1],[0,2],[3,5],[5,4],[4,3]], source = 0, destination = 5
Output: false
Explanation: {0,1,2} and {3,4,5} are two separate components, there's no way to cross between them.
```

**Constraints:**
- 1 <= n <= 2 * 10^5
- 0 <= edges.length <= 2 * 10^5
- No self-loops or repeated edges
- 0 <= source, destination < n

## Approach

This boils down to one question: are `source` and `destination` in the same connected component? If they are, a path exists (the graph is unweighted and undirected, so reachability is all that matters, not the actual route). If they're in different components, no amount of edges will ever connect them.

Build an adjacency list from the edge list, then run a single BFS or DFS starting from `source`, marking everything reachable as visited. As soon as `destination` shows up during the traversal, short-circuit and return `true`. If the traversal finishes without ever touching `destination`, return `false`.

Union-Find is the other natural fit here — union every edge, then check `find(source) == find(destination)` — and it's arguably cleaner for this exact shape of problem, but BFS/DFS needs no extra data structure beyond an adjacency list and a visited set.

**Time complexity:** O(V + E) — build the adjacency list in O(E), then visit each vertex and edge at most once during the traversal.

**Space complexity:** O(V + E) for the adjacency list plus the visited set and queue/stack.
