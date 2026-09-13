# 256. Paint House

*Note: this is a LeetCode Premium (subscriber-only) problem, not freely accessible on LeetCode. It's included here anyway as a clean introduction to the "small fixed number of states per step" style of DP that generalizes to House Robber-style and Paint Fence-style problems.*

There are `n` houses in a row, each of which needs to be painted one of 3 colors: red, blue, or green. The cost of painting each house a given color is different, given as an `n x 3` cost matrix where `costs[i][0]`, `costs[i][1]`, `costs[i][2]` are the costs of painting house `i` red, blue, and green respectively. No two adjacent houses may be painted the same color. Return the minimum total cost to paint all houses.

**Example 1:**
```
Input: costs = [[17,2,17],[16,16,5],[14,3,19]]
Output: 10
Explanation: Paint house 0 blue (2), house 1 green (5), house 2 blue (3). 2+5+3=10.
```

**Example 2:**
```
Input: costs = [[7,6,2]]
Output: 2
```

**Constraints:**
- costs.length == n
- costs[i].length == 3
- 1 <= n <= 100
- 1 <= costs[i][j] <= 20

## Approach

There are only 3 colors, so the state at each house is small enough to track exhaustively: for each house, keep the minimum total cost of painting everything up through this house given that this particular house ends up red, blue, or green. Trying every full color assignment would be O(3^n), but since a house's best cost for a given color only depends on the *previous* house's best costs for the other two colors, this collapses into a simple forward DP with three running values.

Start with `red = costs[0][0]`, `blue = costs[0][1]`, `green = costs[0][2]` for house 0. For every subsequent house, compute new values: the new cost of painting this house red is `costs[i][0] + min(prev_blue, prev_green)` (it can't reuse whichever color the previous house had if that would repeat, but since this house is painted red, only the previous house's non-red options matter), and similarly for blue and green using the other two previous values. After processing all houses, the answer is the minimum of the three final running values.

**Time complexity:** O(n) — one pass over the houses, O(1) work per house.

**Space complexity:** O(1) — only the three running totals for the previous house are kept at any time.
