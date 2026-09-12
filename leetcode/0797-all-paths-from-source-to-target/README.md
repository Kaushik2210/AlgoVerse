# 797. All Paths From Source to Target

You're given a directed acyclic graph (DAG) of `n` nodes labeled `0` to `n - 1`, given as `graph` where `graph[i]` is the list of nodes reachable directly from node `i`. Return every possible path from node `0` to node `n - 1`, in any order.

**Example 1:**
```
Input: graph = [[1,2],[3],[3],[]]
Output: [[0,1,3],[0,2,3]]
Explanation: There are two paths: 0 -> 1 -> 3 and 0 -> 2 -> 3.
```

**Example 2:**
```
Input: graph = [[4,3,1],[3,2,4],[3],[4],[]]
Output: [[0,4],[0,3,4],[0,1,3,4],[0,1,2,3,4],[0,1,4]]
```

**Constraints:**
- n == graph.length
- 2 <= n <= 15
- 0 <= graph[i][j] < n
- graph[i] does not contain i (no self-loops)
- The input graph is guaranteed to be a DAG

## Approach

Because it's guaranteed acyclic, this is a straightforward exhaustive path search — no cycle detection or visited-set bookkeeping needed, since a DAG can never loop back and strand the search.

Do a DFS from node `0`, carrying the current path along as it grows. At each node, try every outgoing edge: append the neighbor to the path, recurse into it, then pop it back off when that branch is done (classic backtracking) so the next neighbor starts from a clean path. Whenever the DFS lands on node `n - 1`, the current path is a complete valid route, so make a copy of it and add it to the results.

Since `n` is capped at 15 and the graph is a DAG, the total number of paths stays small enough that this brute-force exploration of every branch is exactly the intended solution — there's no shortcut needed, just correct backtracking.

**Time complexity:** O(2^n * n) in the worst case — up to exponentially many paths can exist in a DAG, and building/copying each path costs O(n).

**Space complexity:** O(n) for the recursion depth and current path, not counting the output.
