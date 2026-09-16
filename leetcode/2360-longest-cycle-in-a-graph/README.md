# 2360. Longest Cycle in a Graph

**Commonly asked at:** Amazon, Google, Microsoft, Nvidia

You're given a directed graph of `n` nodes where each node has at most one outgoing edge: `edges[i]` is the node that node `i` points to, or `-1` if it points nowhere. Return the length of the longest cycle in the graph, or `-1` if no cycle exists.

**Example 1:**
```
Input: edges = [3,3,4,2,3]
Output: 3
Explanation: nodes 2, 3, and 4 form the cycle 2 -> 4 -> 3 -> 2.
```

**Example 2:**
```
Input: edges = [2,-1,3,1]
Output: -1
Explanation: no cycle exists.
```

**Constraints:**
- n == edges.length
- 2 <= n <= 10^5
- -1 <= edges[i] < n
- edges[i] != i

## Approach

Since every node has at most one outgoing edge, following edges from any starting node traces out exactly one path — it either runs off the graph (hits `-1`), runs into a node some earlier, already-fully-explored walk already covered, or loops back into a node visited earlier in *this same* walk, which is the cycle.

Stamp every node with a global, ever-increasing `timer` value the first time it's visited, across all walks. For each unvisited node, start a fresh walk, remembering the timer value at the moment the walk began (`walkStartTime`). Follow `edges[u]` repeatedly, stamping each newly-seen node with the current timer and incrementing it, until either the pointer runs off the graph (`-1`) or lands on an already-stamped node.

If it lands on an already-stamped node, check whether that node's stamp is `>= walkStartTime`. If so, that node was stamped *during this walk*, meaning we've looped back into our own path — a cycle. Its length is simply `timer - visit_time[that node]`, since every node in the cycle got consecutive increasing stamps during this walk. If the stamp predates this walk, the path merged into some other already-processed walk with no cycle here, so nothing to record.

Track the maximum cycle length found across all starting walks, defaulting to -1 if none are found.

**Time complexity:** O(n) — every node is stamped exactly once across all walks combined, so the total work across every walk is linear.

**Space complexity:** O(n) for the visit-time array.
