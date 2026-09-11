# 198. House Robber

You're a robber planning to hit a row of houses, each with some amount of money (`nums[i]` for house i). The catch: any two houses that are directly adjacent have connected security systems, so if you rob both of them on the same night, an alarm goes off. Given the amounts in each house, find the maximum amount you can rob without ever robbing two adjacent houses.

**Example 1:**
```
Input: nums = [1,2,3,1]
Output: 4
Explanation: rob house 0 (1) and house 2 (3), total = 4
```

**Example 2:**
```
Input: nums = [2,7,9,3,1]
Output: 12
Explanation: rob house 0 (2), house 2 (9), and house 4 (1), total = 12
```

**Constraints:**
- 1 <= nums.length <= 100
- 0 <= nums[i] <= 400

## Approach

Trying every possible subset of non-adjacent houses is exponential — for each house you'd branch into "rob it" or "skip it," and skipping enforces skipping the neighbor, giving roughly 2^n combinations to check by brute force.

The key insight: at each house, you only really need to know one thing to decide optimally — what's the best total achievable using only the houses up to this point. And that best total has a clean recurrence: when you arrive at house `i`, you either skip it (in which case your best is whatever the best was up through house `i-1`), or you rob it (in which case you add its money to the best total through house `i-2`, since you can't touch house `i-1`). You always want the better of those two options.

So build this up from the start: track `rob1` (best total ending two houses back) and `rob2` (best total ending one house back). For each new house, the new best is `max(rob2, rob1 + nums[i])` — either carry forward the best-so-far, ignoring this house, or take this house's money plus the best total from two houses ago. Slide the window forward as you go. At the end, `rob2` holds the answer.

**Time complexity:** O(n) — single pass through the houses.

**Space complexity:** O(1) — only two running totals are kept, regardless of the number of houses.
