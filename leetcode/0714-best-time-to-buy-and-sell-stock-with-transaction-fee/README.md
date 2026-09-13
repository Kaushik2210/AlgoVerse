# 714. Best Time to Buy and Sell Stock with Transaction Fee

You're given an array `prices` where `prices[i]` is the price of a stock on day `i`, and an integer `fee` representing a transaction fee charged once per completed transaction (a buy followed by a sell). You may complete as many transactions as you like, but can't hold more than one share at a time (must sell before buying again). Return the maximum profit achievable.

**Example 1:**
```
Input: prices = [1,3,2,8,4,9], fee = 2
Output: 8
Explanation: Buy at 1, sell at 8 (profit 8-1-2=5). Buy at 4, sell at 9 (profit 9-4-2=3). Total: 8.
```

**Example 2:**
```
Input: prices = [1,3,7,5,10,3], fee = 3
Output: 6
```

**Constraints:**
- 1 <= prices.length <= 5*10^4
- 0 <= prices[i], fee < 5*10^4

## Approach

This is simpler than the cooldown variant since there's no forced waiting period — the only extra wrinkle is the flat fee subtracted once per round trip. That collapses cleanly back to a two-state DP: `hold`, the max profit achievable while currently holding a share, and `cash`, the max profit while holding nothing.

For each day, `hold` either stays the same as yesterday (do nothing) or comes from buying today using yesterday's `cash`: `hold = max(hold_prev, cash_prev - price)`. `cash` either stays the same as yesterday, or comes from selling today's share, in which case the fee is charged: `cash = max(cash_prev, hold_prev + price - fee)`. It doesn't matter whether the fee is subtracted at buy time or sell time as long as it's charged exactly once per completed round trip — subtracting it on the sell side is the more natural place since that's when the transaction "completes."

Initialize `hold = -prices[0]` (bought on day 0) and `cash = 0` (no transactions yet), then roll forward. The final answer is `cash`, since ending while still holding a share can never beat having sold it (worst case selling for the same price loses nothing but the fee is already baked into past decisions, and any unsold position is strictly dominated by having sold before the end).

**Time complexity:** O(n) — one pass over the prices array.

**Space complexity:** O(1) — only the two running state values are kept.
