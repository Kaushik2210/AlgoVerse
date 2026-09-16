# 1049. Last Stone Weight II

**Commonly asked at:** Amazon

You have stones with weights given in `stones`. Same smashing rule as before (two stones combine into the absolute difference of their weights, or destroy each other if equal) — but this time you get to choose which pair to smash at each step. Return the smallest possible weight of the final remaining stone (0 if none remain).

**Example 1:**
```
Input: stones = [2,7,4,1,8,1]
Output: 1
Explanation: Split the stones into groups {2,7,1,1} (sum 11) and {4,8} (sum 12) — the closest possible split of the total (23) — leaving a final difference of 1.
```

**Example 2:**
```
Input: stones = [31,26,33,21,40]
Output: 5
```

**Constraints:**
- 1 <= stones.length <= 30
- 1 <= stones[i] <= 100

## Approach

Since you choose the order and pairing of every smash, think of it in reverse: assign every stone a `+` or `-` sign, and the final leftover weight is `|sum of + stones - sum of - stones|`. Any such signed sum is achievable through some sequence of smashes (each smash just flips one stone's effective sign relative to the running total), so the problem quietly becomes: split the stones into two groups so the difference between their sums is as small as possible.

That's exactly the shape of Partition Equal Subset Sum, except instead of asking "can the difference be made exactly 0", it asks "what's the smallest difference achievable" — which is really "what's the achievable subset sum closest to (but not exceeding) half the total".

Run a subset-sum DP: track the set of sums achievable using some subset of the stones seen so far, restricted to sums at most `total // 2` (going past the halfway point can never help, since the true minimum split is symmetric around it). After processing every stone, the largest achievable sum in that set, call it `best`, represents one group; the other group has `total - best`. The answer is `total - 2 * best`.

**Time complexity:** O(n * total) where total is the sum of all stones — the subset-sum DP considers each stone against every achievable sum so far.

**Space complexity:** O(total) for the set/array of achievable sums.
