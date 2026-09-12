# 787. Cheapest Flights Within K Stops

There are `n` cities connected by flights, given as `flights[i] = [fromi, toi, pricei]`. Given `src`, `dst`, and `k`, find the cheapest price to travel from `src` to `dst` with at most `k` stops in between. Return `-1` if there's no such route.

**Example 1:**
```
Input: n = 4, flights = [[0,1,100],[1,2,100],[2,0,100],[1,3,600],[2,3,200]], src = 0, dst = 3, k = 1
Output: 700
Explanation: 0 -> 1 -> 3 costs 100 + 600 = 700 (1 stop). The cheaper 0 -> 1 -> 2 -> 3 costs 400 but needs 2 stops, which exceeds k = 1.
```

**Example 2:**
```
Input: n = 3, flights = [[0,1,100],[1,2,100],[0,2,500]], src = 0, dst = 2, k = 1
Output: 200
Explanation: 0 -> 1 -> 2 costs 200 with exactly 1 stop.
```

**Constraints:**
- 1 <= n <= 100
- 0 <= flights.length <= (n * (n - 1) / 2)
- flights[i] = [fromi, toi, pricei], 0 <= pricei <= 10^4
- 0 <= src, dst, k < n
- src != dst

## Approach

The tempting move is plain Dijkstra, but that's actually wrong here: Dijkstra finalizes the cheapest distance to each node the first time it's popped, with no regard for how many edges (stops) it took to get there. A route that's cheap but uses too many stops could get finalized first and block a slightly pricier route that fits within `k` stops from ever being considered. The stop-count limit means this isn't a pure shortest-path problem anymore — it's shortest path *bounded by hop count*, which calls for a Bellman-Ford-style relaxation instead.

Run Bellman-Ford for exactly `k + 1` rounds (at most `k` stops means at most `k + 1` edges in the route). Keep a `dist` array of the cheapest known cost to reach each city, initialized to infinity except `dist[src] = 0`. In each round, relax every edge using a **snapshot of `dist` from the start of that round** (not the array being updated live) — this is the key detail: if you update `dist` in place while relaxing, you might let a route sneak in more hops than the current round allows, because a node's distance from *this same round* could feed into another edge relaxation *in the same round*, silently giving that route one extra stop for free. Using a copy of the previous round's distances forces each round to correspond to exactly one more edge used.

After `k + 1` rounds, `dist[dst]` holds the cheapest price reachable within `k` stops, or infinity if unreachable.

**Time complexity:** O(k * E) — k+1 rounds, each relaxing every edge once.

**Space complexity:** O(n) for the distance arrays.
