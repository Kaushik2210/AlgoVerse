# 1029. Two City Scheduling

There are `2n` people, and each person `i` costs `costs[i][0]` to fly to city A or `costs[i][1]` to fly to city B. Find the minimum total cost to fly every person to one of the two cities, such that exactly `n` people arrive in each city.

**Example 1:**
```
Input: costs = [[10,20],[30,200],[400,50],[30,20]]
Output: 110
Explanation: send persons 0 and 1 to city A for 10 + 30 = 40,
and persons 2 and 3 to city B for 50 + 20 = 70, total 110.
```

**Example 2:**
```
Input: costs = [[259,770],[448,54],[926,667],[184,139],[840,118],[577,469]]
Output: 1859
```

**Constraints:**
- 2n == costs.length
- 2 <= costs.length <= 100
- costs.length is even
- 1 <= costs[i][0], costs[i][1] <= 1000

## Approach

A brute force trying every way to split 2n people into two groups of n is combinatorially explosive. The greedy insight comes from looking not at each person's absolute costs, but at the *difference* between their two costs.

If sending person `i` to city A costs 10 and to city B costs 20, the "penalty" for sending them to B instead of A is +10 — they clearly belong in the group headed to A if there's a free slot. Conversely, someone with A-cost 400 and B-cost 50 desperately wants to go to B. So define each person's score as `cost[i][0] - cost[i][1]`: the most negative scores are the people who benefit the most from going to A, and the most positive scores benefit the most from going to B.

Sort everyone by this difference ascending. The first `n` people (smallest, most negative differences — the ones who save the most by going to A relative to B) are sent to city A; the remaining `n` (largest differences — the ones who save the most by going to B) are sent to city B. This is optimal because any alternative assignment that swaps someone from the "A group" with someone from the "B group" can be shown to only increase or keep equal the total cost, since the A group members all have a difference less than or equal to any B group member's difference by construction of the sort.

**Time complexity:** O(n log n) for the sort, dominating the O(n) summation pass.

**Space complexity:** O(1) extra (O(log n) for the sort's recursion, ignoring the input array itself).
