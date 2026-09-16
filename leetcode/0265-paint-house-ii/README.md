# 265. Paint House II

**Commonly asked at:** Google

*Note: this problem is marked premium on LeetCode.*

There are a row of `n` houses, each house can be painted with one of the `k` colors. The cost of painting each house with a certain color is different. You have to paint all the houses such that no two adjacent houses have the same color.

The cost of painting each house with a certain color is represented by an `n x k` cost matrix `costs`. For example, `costs[0][0]` is the cost of painting house `0` with color `0`; `costs[1][2]` is the cost of painting house `1` with color `2`, and so on. Return the minimum cost to paint all houses.

**Example 1:**
```
Input: costs = [[1,5,3],[2,9,4]]
Output: 5
Explanation: Paint house 0 into color 0, paint house 1 into color 2. Minimum cost: 1 + 4 = 5;
```

**Example 2:**
```
Input: costs = [[1,3],[2,4]]
Output: 5
```

**Constraints:**
- costs.length == n
- costs[i].length == k
- 1 <= n <= 100
- 2 <= k <= 20
- 0 <= costs[i][j] <= 20

## Approach

Standard house-painting DP (same idea as Paint House with 2 colors, generalized to k), but computing "the minimum cost among all colors except this one" naively for every house/color pair is O(k) each time, giving O(n*k^2) — fine for the plain version but this variant is designed to be solved in O(n*k).

The trick: for each row, only two numbers matter — the smallest previous-house cost and the second-smallest, plus which color achieved the smallest. For any color `c` being considered on the current house:
- If `c` is *not* the color that achieved the previous row's minimum, the best previous cost it can build on is simply that overall minimum (`min1`).
- If `c` *is* the color that achieved the previous row's minimum, it can't reuse that same color's cost (adjacent houses must differ), so it falls back to the second-smallest (`min2`).

So each round: scan the previous row's cost array once to find `min1`, `min2`, and `min1_idx` (which color hit `min1`). Then build the current row in one more O(k) pass, where each color's cost is `costs[house][c] + (min2 if c == min1_idx else min1)`.

After processing every house this way, the answer is the minimum value in the final row.

**Time complexity:** O(n * k) — two O(k) passes per house.

**Space complexity:** O(k) for the rolling previous-row array (could even be reduced to a few scalar variables, but keeping the row makes the recurrence clearer).
