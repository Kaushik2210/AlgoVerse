# 121. Best Time to Buy and Sell Stock

You're given an array `prices` where `prices[i]` is the price of a stock on day `i`. You want to buy on one day and sell on a later day to maximize profit. You can only make one transaction (one buy, then one sell). Return the maximum profit you could make — or `0` if there's no way to make a profit.

**Example 1:**
```
Input: prices = [7,1,5,3,6,4]
Output: 5
Explanation: buy on day 2 (price 1), sell on day 5 (price 6), profit = 6 - 1 = 5
```

**Example 2:**
```
Input: prices = [7,6,4,3,1]
Output: 0
Explanation: prices only go down, so no transaction gives a profit — just don't buy.
```

**Constraints:**
- 1 <= prices.length <= 10^5
- 0 <= prices[i] <= 10^4

## Approach

The brute-force approach checks every possible buy day and every later sell day to find the best gap — that's every pair, so O(n^2). For 10^5 elements that's way too slow.

Here's the key insight: for any given sell day, the best possible profit is achieved by having bought at the *lowest* price seen so far, before that day. So instead of comparing every pair, you can walk through the array once, keeping track of the minimum price seen so far as you go. At each day, ask "if I sold today, what would my profit be if I'd bought at the cheapest point so far?" — that's just `price - min_so_far`. Track the best of those profits as you scan, and update the running minimum whenever you see a new low.

This works because you never need to consider buying on a day after a lower price already appeared — that would never be optimal.

**Time complexity:** O(n) — one pass through the prices array.

**Space complexity:** O(1) — just two running variables (minimum price and best profit).
