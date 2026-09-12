# 134. Gas Station

There are `n` gas stations along a circular route. At station `i` there is `gas[i]` amount of gas, and travelling from station `i` to station `i + 1` costs `cost[i]` gas. You start with an empty tank at one of the stations. Return the starting station's index if you can travel around the circuit once in the clockwise direction without running out of gas, otherwise return -1. If a solution exists, it's guaranteed to be unique.

**Example 1:**
```
Input: gas = [1,2,3,4,5], cost = [3,4,5,1,2]
Output: 3
```

**Example 2:**
```
Input: gas = [2,3,4], cost = [3,4,3]
Output: -1
```

**Constraints:**
- n == gas.length == cost.length
- 1 <= n <= 10^5
- 0 <= gas[i], cost[i] <= 10^4

## Approach

Brute-forcing every possible starting station and simulating the full loop for each one is O(n^2) — way too slow for n up to 10^5, and completely unnecessary once you notice two things.

First: a valid starting station exists at all if and only if the total gas across every station is at least the total cost across every leg — `sum(gas) >= sum(cost)`. That's just conservation: if the whole circuit doesn't produce enough gas to cover the whole circuit's cost, no starting point can possibly work, and if it does produce enough, some starting point has to work (this is the part that needs a bit of trust, but it holds).

Second, and this is the key insight for finding *which* station: walk the route starting from station 0, tracking a running "tank" total as `gas[i] - cost[i]` accumulated so far. Whenever this running total dips below the lowest point it has hit anywhere in the whole traversal, remember that station as the current best candidate for "station right after the deepest hole." Equivalently: track where the running sum reaches its global minimum, and the answer is the station immediately after that low point. The intuition is that if you started at that particular low point instead of station 0, your tank would never dip below zero anywhere else on the loop — everywhere else was a shallower deficit or a surplus relative to that worst point.

So one linear pass computes both the total-feasibility check and, simultaneously, the actual starting index: keep a running `tank` (also doubling as the total across the full pass) and a separate `current_tank` reset-tracking variable — whenever `current_tank` goes negative, that's a sign the segment since the last reset point can't work, so reset `current_tank` to 0 and move the candidate start to the next station.

**Time complexity:** O(n) — one pass over the stations.

**Space complexity:** O(1) — just a few running totals.
