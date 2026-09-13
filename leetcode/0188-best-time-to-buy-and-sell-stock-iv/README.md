# 188. Best Time to Buy and Sell Stock IV

You're given an integer `k` and an array `prices` where `prices[i]` is the price of a stock on day `i`. You may complete at most `k` transactions (each a buy followed by a sell; can't hold more than one share at a time). Return the maximum profit achievable.

**Example 1:**
```
Input: k = 2, prices = [2,4,1]
Output: 2
Explanation: Buy day 0 (2), sell day 1 (4). Profit: 2.
```

**Example 2:**
```
Input: k = 2, prices = [3,2,6,5,0,3]
Output: 7
Explanation: Buy day 1 (2), sell day 2 (6), profit 4. Buy day 4 (0), sell day 5 (3), profit 3. Total: 7.
```

**Constraints:**
- 1 <= k <= 100
- 1 <= prices.length <= 1000
- 0 <= prices[i] <= 1000

## Approach

This generalizes the two-transaction and unlimited-transaction stock problems by adding a transaction-count dimension to the state. Define `hold[t]` as the max profit while holding a share, having started (bought into) at most `t` transactions so far, and `cash[t]` as the max profit while not holding, having completed at most `t` transactions so far. A transaction is counted the moment you buy (equivalently, could count it at sell — just needs to be consistent).

For each day and each transaction count `t` from 1 to `k`: `hold[t] = max(hold[t], cash[t-1] - price)` (either keep holding from before, or use profit from having completed up to `t-1` transactions to buy into transaction `t`), and `cash[t] = max(cash[t], hold[t] + price)` (either stay in cash, or sell the share held under transaction `t`). Process `t` in increasing order within a day so that `cash[t-1]` used for `hold[t]` reflects the same day's updates consistently (this is the same in-place update trick used in 0/1 knapsack).

Initialize all `hold[t] = -infinity` conceptually (or just handle t=0 specially with `cash[0] = 0`), then before scanning days set `hold[t]` to `-prices[0]` only makes sense lazily — in practice, initialize `cash[0..k] = 0` and `hold[0..k] = -infinity`, then update day by day; the first time a `hold[t]` gets set it effectively becomes `-price` on that day. The answer is `cash[k]` at the end.

One important edge case: when `k` is very large (at least half the number of days), there's no benefit to capping transactions — the problem degenerates into the unlimited-transaction version, which can be solved directly and much faster (greedily summing every positive day-to-day price increase) to avoid an unnecessarily large O(n*k) table.

**Time complexity:** O(n * k) for the general case (O(n) for the unlimited-transactions shortcut when k is large).

**Space complexity:** O(k) for the two rolling arrays of size k+1.
