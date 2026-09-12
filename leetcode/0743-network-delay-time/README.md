# 743. Network Delay Time

There are `n` network nodes labeled `1` to `n`. You're given `times`, a list of directed edges `times[i] = (ui, vi, wi)` meaning a signal travels from node `ui` to node `vi` taking `wi` time. Send a signal from node `k`. Return the minimum time for all `n` nodes to receive the signal, or `-1` if that's impossible.

**Example 1:**
```
Input: times = [[2,1,1],[2,3,1],[3,4,1]], n = 4, k = 2
Output: 2
Explanation: From node 2, node 1 and node 3 are reached at time 1, then node 4 is reached at time 2 through node 3.
```

**Example 2:**
```
Input: times = [[1,2,1]], n = 2, k = 1
Output: 1
```

**Example 3:**
```
Input: times = [[1,2,1]], n = 2, k = 2
Output: -1
Explanation: Node 1 is unreachable from node 2.
```

**Constraints:**
- 1 <= k <= n <= 100
- 1 <= times.length <= 6000
- times[i].length == 3
- 1 <= ui, vi <= n, ui != vi
- 0 <= wi <= 100
- All (ui, vi) pairs are unique

## Approach

This is shortest paths from a single source in a graph with non-negative weights, which is exactly Dijkstra's algorithm. The answer is the time at which the *last* node hears the signal, so it's the maximum over each node's shortest distance from `k` — and if any node is unreachable, the answer is `-1`.

Build a weighted adjacency list from `times`. Run Dijkstra from `k`: keep a `dist` array initialized to infinity (except `dist[k] = 0`), and a min-heap of `(distance, node)` pairs seeded with `(0, k)`. Repeatedly pop the smallest-distance entry; if it's stale (a shorter distance to that node was already finalized), skip it. Otherwise, relax every outgoing edge — for each neighbor, if going through the current node gives a shorter distance than what's recorded, update it and push the new `(distance, neighbor)` onto the heap.

Once the heap empties, every node's shortest distance from `k` is known. If any node was never reached (still infinity), return `-1`. Otherwise return the maximum distance across all `n` nodes — that's the moment the slowest-to-reach node finally gets the signal.

**Time complexity:** O(E log E) — every edge can be pushed onto the heap once, and each heap operation is O(log E).

**Space complexity:** O(V + E) for the adjacency list, distance array, and heap.
