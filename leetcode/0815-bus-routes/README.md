# 815. Bus Routes

**Commonly asked at:** Google

You're given a list `routes` where `routes[i]` is the set of bus stops that the `i`-th bus visits in a loop, and you're standing at stop `source`. Find the minimum number of buses you must take to reach stop `target`. If it's not possible, return `-1`.

You can transfer buses at any stop that both routes pass through.

**Example 1:**
```
Input: routes = [[1,2,7],[3,6,7]], source = 1, target = 6
Output: 2
Explanation: take bus 0 from stop 1 to stop 7, then bus 1 from stop 7 to stop 6.
```

**Example 2:**
```
Input: routes = [[7,12],[4,5,15],[6],[15,19],[9,12,13]], source = 15, target = 12
Output: -1
Explanation: there's no route that connects the component containing 15 to the one containing 12.
```

**Constraints:**
- `1 <= routes.length <= 500`
- `1 <= routes[i].length <= 10^5`
- `0 <= routes[i][j] < 10^6`
- `0 <= source, target < 10^6`

## Approach

The instinct is to BFS over stops, but that misses the actual cost of the problem: switching stops on the *same* bus is free, only switching *buses* costs a step. So the graph to search isn't stops — it's routes. Two routes are "adjacent" the instant they share any stop, because that shared stop is where you can hop from one bus to the other.

Build a map from each stop to the list of route indices that pass through it. Then BFS starting from every route directly reachable from `source` (all routes touching the `source` stop, at a cost of 1 bus). From a route, for each stop it visits, walk to all other routes touching that stop and enqueue any route not visited yet, one bus further. The moment you visit a stop equal to `target` while processing some route, the current bus count is the answer, since you're standing at `target` after that bus ride.

Two visited sets are needed: visited routes (so the BFS doesn't re-expand a bus we've already taken) and visited stops (so we don't redundantly re-scan a stop's routes over and over — a stop only needs to trigger its route expansions once). Without the stop-visited check the algorithm is still correct, just wasteful, since a busy stop shared by many routes would get re-processed by every route that lands on it.

`source == target` is a trivial zero-bus case handled up front.

**Time complexity:** O(sum of routes[i].length) — every stop across every route is processed a bounded number of times thanks to the visited sets.

**Space complexity:** O(sum of routes[i].length) for the stop-to-routes map and the visited sets.
