# 365. Water and Jug Problem

You're given two jugs with capacities `jug1Capacity` and `jug2Capacity` liters, and an infinite supply of water. Using the operations of filling a jug completely, emptying a jug completely, or pouring water from one jug into the other until either the source is empty or the destination is full, determine whether it's possible to end up with exactly `targetCapacity` liters of water total in the two jugs.

**Example 1:**
```
Input: jug1Capacity = 3, jug2Capacity = 5, targetCapacity = 4
Output: true
```

**Example 2:**
```
Input: jug1Capacity = 2, jug2Capacity = 6, targetCapacity = 5
Output: false
```

**Example 3:**
```
Input: jug1Capacity = 1, jug2Capacity = 2, targetCapacity = 2
Output: true
```

**Constraints:**
- 1 <= jug1Capacity, jug2Capacity, targetCapacity <= 10^6

## Approach

This looks like a graph/BFS search over jug states, but it's actually a well-known number theory result (Bezout's identity in disguise). Every operation you can perform — filling, emptying, pouring between jugs — only ever changes the total amount of water by an integer combination of `+jug1Capacity`, `-jug1Capacity`, `+jug2Capacity`, or `-jug2Capacity`. So any amount reachable in the combined jugs is expressible as `a * jug1Capacity + b * jug2Capacity` for some integers `a, b` (positive or negative).

By Bezout's identity, the set of values expressible as an integer combination of two numbers x and y is exactly the set of multiples of `gcd(x, y)`. So `targetCapacity` is reachable exactly when `gcd(jug1Capacity, jug2Capacity)` divides `targetCapacity`, with the additional constraint that `targetCapacity` can't exceed the combined capacity of both jugs (`jug1Capacity + jug2Capacity`), since that's the physical upper bound on how much water the two jugs can hold together.

Special case: `targetCapacity = 0` is trivially always achievable (both jugs empty).

**Time complexity:** O(log(min(jug1Capacity, jug2Capacity))) for the Euclidean gcd computation.

**Space complexity:** O(1).
