# 871. Minimum Number of Refueling Stops

**Commonly asked at:** Google, Uber

A car starts at position 0 with `startFuel` fuel and needs to reach a target at position `target`, using 1 unit of fuel per unit of distance. Along the way there are gas stations, given as `stations[i] = [position_i, fuel_i]`, sorted by position. Stopping at a station instantly refills the tank by `fuel_i` (there's no upper bound on tank size). Return the minimum number of refueling stops needed to reach `target`, or -1 if it's not possible.

**Example 1:**
```
Input: target = 1, startFuel = 1, stations = []
Output: 0
Explanation: Start with enough fuel to reach the target already.
```

**Example 2:**
```
Input: target = 100, startFuel = 1, stations = [[10,100]]
Output: -1
Explanation: Can't even reach the first station.
```

**Example 3:**
```
Input: target = 100, startFuel = 10, stations = [[10,60],[20,30],[30,30],[60,40]]
Output: 2
Explanation: Drive to station 10 (fuel: 10 - 10 + 60 = 60), then drive to station 60 (fuel: 60 - 50 + 40 = 50), which is enough to reach 100.
```

**Constraints:**
- 1 <= target, startFuel <= 10^9
- 0 <= stations.length <= 500
- 0 <= position_i < position_{i+1} < target
- 1 <= fuel_i < 10^9

## Approach

The greedy insight: it never hurts to delay deciding which stations to actually use for fuel. Drive forward station by station; whenever the current fuel would run out before reaching the next station, "retroactively" grab the biggest fuel stop already passed — as if that fuel had been picked up at the moment it was optimal to. This is equivalent to always making the locally best choice without ever having to guess ahead.

Concretely: maintain a max-heap of fuel amounts from every station passed so far. Walk through the stations in order; before considering each one, check if the current fuel is enough to reach it — if not, keep popping the largest fuel amount off the heap and adding it to the tank (counting each pop as one stop) until either the fuel is enough or the heap is empty (in which case it's impossible, return -1). After clearing that station, add its fuel value to the heap (it becomes available for a "retroactive" refuel later) and continue. After processing all stations, do one final check: if the current fuel isn't enough to reach `target`, keep popping the heap the same way until it is or the heap runs dry.

This works because using the largest available fuel amount whenever forced to refuel is always at least as good as using a smaller one — it maximizes the fuel banked for future stretches, and it's never wrong to grab it "late" since fuel from a passed station is available at any later point regardless of when it's actually added to the tank.

**Time complexity:** O(n log n) — each station is pushed and popped from the heap at most once.

**Space complexity:** O(n) for the heap.
