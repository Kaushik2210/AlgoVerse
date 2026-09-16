# 1578. Minimum Time to Make Rope Colorful

**Commonly asked at:** Amazon, Microsoft, Bloomberg

Alice has `n` balloons arranged on a rope, with `colors[i]` the color of the `i`-th balloon and `neededTime[i]` the time it takes to remove it. A rope is "colorful" if no two adjacent balloons share the same color. Removing balloons is the only allowed operation, and Bob wants to make the rope colorful using the minimum total removal time. Return that minimum time.

**Example 1:**
```
Input: colors = "abaac", neededTime = [1,2,3,4,5]
Output: 3
Explanation: the two adjacent 'a's at indices 2 and 3 need one of them removed; remove the cheaper one (cost 3), keep the one costing 4.
```

**Example 2:**
```
Input: colors = "abc", neededTime = [1,2,3]
Output: 0
Explanation: already colorful.
```

**Constraints:**
- n == colors.length == neededTime.length
- 1 <= n <= 10^5
- 1 <= neededTime[i] <= 10^4
- colors consists of lowercase English letters

## Approach

Any maximal run of consecutive same-colored balloons needs to be whittled down to a single balloon — every balloon in that run except one has to be removed, since any two adjacent survivors in the same run would still violate the colorful condition. Given that constraint, the cheapest way to fix a run is obvious: **keep the single most expensive balloon in it** (the one costing the most to remove), and remove everything else in the run. That minimizes the total removal cost for that run, since removal cost is unavoidable for every balloon except the one kept, and keeping the priciest one keeps the removal total as small as possible.

So scan through `colors` once, identifying maximal runs of the same character. For each run, sum up `neededTime` across the whole run and also track the run's maximum `neededTime`. The cost contributed by that run is `sum - max` (remove everyone but the costliest). Add that to a running total across all runs, and move on to the next run.

**Time complexity:** O(n) — a single linear scan through the string, where each balloon is visited exactly once as part of whichever run it belongs to.

**Space complexity:** O(1) extra space beyond the input arrays.
