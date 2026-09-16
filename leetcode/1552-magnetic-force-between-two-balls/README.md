# 1552. Magnetic Force Between Two Balls

**Commonly asked at:** Google, Amazon

There are `n` baskets at positions given by array `position`. You have `m` balls, and you must place them into baskets such that the minimum magnetic force between any two balls is maximized. The magnetic force between two balls in baskets at positions `x` and `y` is `|x - y|`. Return the maximum possible value of that minimum force.

**Example 1:**
```
Input: position = [1,2,3,4,7], m = 3
Output: 3
Explanation: Placing balls at positions 1, 4, 7 gives minimum pairwise distance 3, the best possible.
```

**Example 2:**
```
Input: position = [5,4,3,2,1,1000000000], m = 2
Output: 999999999
Explanation: Placing 2 balls at positions 1 and 1000000000 maximizes the (only) pairwise distance.
```

**Constraints:**
- n == position.length
- 2 <= n <= 10^5
- 1 <= position[i] <= 10^9
- All positions are distinct
- 2 <= m <= position.length

## Approach

This is the "maximize the minimum" flavor of binary search on the answer — the mirror image of the earlier "minimize the maximum" problems in this batch, so the search direction flips.

Sort `position` first. For a candidate minimum force `d`, check feasibility greedily: always place the first ball at the first (leftmost) position, then walk forward placing the next ball at the first position that's at least `d` away from the last placed ball. Count how many balls this greedy placement uses; `d` is feasible if it places at least `m` balls, since greedy spacing at exactly `d` uses the fewest balls possible to guarantee minimum spacing `d` (placing balls any more eagerly only wastes ball budget, so greedy is optimal for this feasibility check).

Feasibility here is monotonic in the opposite direction from before: a *smaller* `d` is always easier to satisfy (more balls fit), and a *larger* `d` gets harder. We want the largest `d` that's still feasible. Binary search over `d` from 1 up to `position[-1] - position[0]` (the full span), using the "round up" mid (`(lo + hi + 1) // 2`) so the search doesn't get stuck: if `d` is feasible, push `lo` up to `mid`, otherwise pull `hi` down to `mid - 1`. Converges to the maximum feasible minimum distance.

**Time complexity:** O(n log n) to sort, plus O(n log(max - min)) for the binary search, each step an O(n) greedy scan.

**Space complexity:** O(log n) for sorting, O(1) extra otherwise.
