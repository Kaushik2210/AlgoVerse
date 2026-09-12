# 332. Reconstruct Itinerary

You're given a list of airline tickets `tickets` where `tickets[i] = [fromi, toi]` represents a flight from `fromi` to `toi`. Reconstruct the itinerary in order, starting from `"JFK"`, using all the tickets exactly once. If multiple valid itineraries exist, return the one that's lexicographically smallest when read as a single string. Assume all tickets form at least one valid itinerary using every ticket.

**Example 1:**
```
Input: tickets = [["MUC","LHR"],["JFK","MUC"],["SFO","SJC"],["LHR","SFO"]]
Output: ["JFK","MUC","LHR","SFO","SJC"]
```

**Example 2:**
```
Input: tickets = [["JFK","SFO"],["JFK","ATL"],["SFO","ATL"],["ATL","JFK"],["ATL","SFO"]]
Output: ["JFK","ATL","JFK","SFO","ATL","SFO"]
Explanation: Another valid itinerary is ["JFK","SFO","ATL","JFK","ATL","SFO"], but it's larger lexicographically.
```

**Constraints:**
- 1 <= tickets.length <= 300
- fromi.length == 3, toi.length == 3, uppercase English letters
- fromi != toi

## Approach

Using every ticket exactly once and ending with a complete itinerary is precisely an **Eulerian path** — a path that traverses every edge of a graph exactly once. The classic algorithm for finding one is Hierholzer's algorithm, and the lexicographically-smallest tie-break is handled just by choosing edges in sorted order whenever there's a choice.

Build an adjacency structure where each airport maps to a **min-heap** of its destinations (a heap makes it cheap to always pop the smallest unused destination first). Then run a DFS from `"JFK"`: at each airport, while there are still unused outgoing tickets, pop the lexicographically smallest destination and recurse into it, consuming that ticket. The key trick of Hierholzer's algorithm is *when* to record a node: only add the current airport to the result **after** exhausting all of its outgoing edges (post-order), then reverse the whole result at the end.

Why post-order works: if a node gets stuck in a dead end that doesn't use every ticket (which can happen when greedily always taking the smallest destination), that dead-end node still gets appended to the result before backtracking — and because of the reversal at the end, dead-end detours end up correctly nested inside the final path rather than stranded. This is exactly what makes Hierholzer's algorithm robust to needing "detours": a node that runs out of unvisited edges early gets flushed to the result immediately, and the algorithm naturally backtracks to a node with remaining edges and continues from there.

**Time complexity:** O(E log E) — E tickets are pushed onto heaps once, and each pop/push is O(log E).

**Space complexity:** O(E) for the adjacency heaps and the result path.
