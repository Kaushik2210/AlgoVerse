# 399. Evaluate Division

You're given a list of variable pairs `equations` and real number `values`, where `equations[i] = [Ai, Bi]` and `values[i]` represent the equation `Ai / Bi = values[i]`. Given some `queries[j] = [Cj, Dj]`, find `Cj / Dj` for each query. Return `-1.0` if the answer can't be determined, either because a variable never appears in the equations or there's no chain connecting the two.

**Example 1:**
```
Input: equations = [["a","b"],["b","c"]], values = [2.0,3.0], queries = [["a","c"],["b","a"],["a","e"],["a","a"],["x","x"]]
Output: [6.0,0.5,-1.0,1.0,-1.0]
Explanation: a/b = 2.0, b/c = 3.0, so a/c = a/b * b/c = 6.0. b/a = 1/(a/b) = 0.5. "e" never appears, so a/e is undetermined. a/a = 1.0 trivially. "x" never appears at all.
```

**Example 2:**
```
Input: equations = [["a","b"],["b","c"],["bc","cd"]], values = [1.5,2.5,5.0], queries = [["a","c"],["c","b"],["bc","cd"],["cd","bc"]]
Output: [3.75,0.4,5.0,0.2]
```

**Constraints:**
- 1 <= equations.length <= 20
- equations[i].length == 2
- 1 <= Ai.length, Bi.length <= 5
- values.length == equations.length
- 0.0 < values[i] <= 20.0
- 1 <= queries.length <= 20
- queries[i].length == 2

## Approach

Each equation `A / B = k` is really a weighted, directed edge: an edge from A to B with weight `k` (multiply by `k` to go from A to B), and automatically the reverse edge from B to A with weight `1/k` (divide by `k`, i.e. multiply by its reciprocal, to go the other way). Once the equations are turned into this weighted graph, a query `C / D` is just "what's the product of edge weights along any path from C to D?" — because dividing straight through a chain like `a/b * b/c = a/c` is exactly walking edge weights and multiplying them as you go.

Build the graph as an adjacency list mapping each variable to a list of `(neighbor, weight)` pairs, adding both the given edge and its reciprocal. For each query `(C, D)`: if either variable never appeared in any equation, immediately return `-1.0` — there's no node for it. If `C == D` and the node exists, return `1.0` directly (dividing something by itself). Otherwise run a DFS or BFS from `C`, carrying a running product that starts at `1.0` and gets multiplied by each edge's weight as the traversal moves along it. The moment the traversal reaches `D`, the running product is the answer. If the search exhausts every reachable node without ever finding `D`, they're in different connected components, so return `-1.0`.

**Time complexity:** O(Q * (V + E)) — building the graph is O(E), and each of the Q queries runs its own traversal touching at most all V nodes and E edges.

**Space complexity:** O(V + E) for the graph, plus O(V) for the visited set per query.
