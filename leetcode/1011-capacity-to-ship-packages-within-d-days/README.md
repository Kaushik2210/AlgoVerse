# 1011. Capacity To Ship Packages Within D Days

A conveyor belt has packages that must be shipped from one port to another within `days` days. The `i`-th package has weight `weights[i]`. Each day, packages are loaded onto a ship in the given order, up to the ship's maximum weight capacity, and shipped. Find the least weight capacity of the ship that will result in all packages being shipped within `days` days.

**Example 1:**
```
Input: weights = [1,2,3,4,5,6,7,8,9,10], days = 5
Output: 15
Explanation: A ship capacity of 15 lets you ship the packages in 5 days:
1st day: 1, 2, 3, 4, 5
2nd day: 6, 7
3rd day: 8
4th day: 9
5th day: 10
```

**Example 2:**
```
Input: weights = [3,2,2,4,1,4], days = 3
Output: 6
```

**Constraints:**
- 1 <= days <= weights.length <= 5 * 10^4
- 1 <= weights[i] <= 500

## Approach

This is exactly the same shape as "Split Array Largest Sum": we're looking for the minimum value of some capacity such that a greedy pass over the array respects a count limit — here, "days" instead of "number of subarrays".

Define a feasibility check: given a candidate ship capacity `cap`, can all packages ship within `days` days? Simulate it greedily — load packages onto the current day's shipment as long as they fit under `cap`; the moment the next package would overflow, start a new day. Count days used; feasible if that count is <= `days`.

This feasibility is monotonic in `cap` — a bigger capacity never needs more days than a smaller one, since every load that fit before still fits, and more might now share a day. So binary search over candidate capacities. The capacity can't be below the single heaviest package (it must ride alone if needed) and never needs to exceed the total weight (ship everything in one day). Binary search that range, shrinking toward the smallest capacity for which the greedy simulation stays within `days`.

**Time complexity:** O(n log(sum(weights) - max(weights))) — each binary search step runs an O(n) greedy simulation.

**Space complexity:** O(1) extra space.
