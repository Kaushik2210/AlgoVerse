# 1094. Car Pooling

**Commonly asked at:** Amazon, Google

There's a car with `capacity` empty seats that only ever drives east (in one direction, never turns around). You're given `trips`, where `trips[i] = [numPassengers, from, to]` means that trip picks up `numPassengers` at location `from` and drops them off at location `to`. Return `true` if it's possible to pick up and drop off all passengers for all the given trips without the car's passenger count ever exceeding `capacity`.

**Example 1:**
```
Input: trips = [[2,1,5],[3,3,7]], capacity = 4
Output: false
Explanation: Between mile 3 and 5, both trips overlap, adding 2 + 3 = 5 passengers, which exceeds capacity 4.
```

**Example 2:**
```
Input: trips = [[2,1,5],[3,3,7]], capacity = 5
Output: true
```

**Constraints:**
- 1 <= trips.length <= 1000
- trips[i].length == 3
- 1 <= numPassengers <= 100
- 0 <= from < to <= 1000
- 1 <= capacity <= 10^5

## Approach

This is the classic "max simultaneous overlap" problem in disguise. Instead of simulating mile-by-mile (which would be slow and awkward given the ranges), record only the net change in passenger count at each meaningful point: at `from`, `numPassengers` get added, and at `to`, that many get dropped off.

Use a difference array (or a hash map keyed by location, since coordinates go up to 1000 a plain array of size 1001 works fine) where `delta[from] += numPassengers` and `delta[to] -= numPassengers`. Then walk the array in increasing order of location, keeping a running total — that running total at any point is exactly how many passengers are in the car at that mile. If it ever exceeds `capacity`, return `false`. If the whole sweep finishes cleanly, return `true`.

The key insight is that a drop-off at mile `to` frees the seat before a pickup at the same mile `to` needs it, which is exactly what applying the `-numPassengers` delta at index `to` (rather than `to - 1`) captures.

**Time complexity:** O(n + maxLocation) — one pass to build the deltas, one pass to sweep them.

**Space complexity:** O(maxLocation) for the delta array.
