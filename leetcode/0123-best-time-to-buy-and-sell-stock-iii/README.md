# 123. Best Time to Buy and Sell Stock III

Given an array `prices` where `prices[i]` is the price of a stock on day `i`, find the maximum profit achievable with **at most two transactions**. A transaction is one buy followed by one sell, and you must sell before you buy again (you can't hold more than one share at a time).

**Example 1:**
```
Input: prices = [3,3,5,0,0,3,1,4]
Output: 6
Explanation: Buy on day 4 (price = 0), sell on day 6 (price = 3), profit = 3.
             Then buy on day 7 (price = 1), sell on day 8 (price = 4), profit = 3.
             Total profit = 6.
```

**Example 2:**
```
Input: prices = [1,2,3,4,5]
Output: 4
Explanation: Buy on day 1, sell on day 5, profit = 4. Only one transaction is needed/possible for max profit.
```

**Example 3:**
```
Input: prices = [7,6,4,3,1]
Output: 0
Explanation: Prices only fall, no profitable transaction exists.
```

**Constraints:**
- 1 <= prices.length <= 10^5
- 0 <= prices[i] <= 10^5

## Approach

The brute-force idea — try every pair of non-overlapping buy/sell intervals — is O(n^2) or worse and doesn't scale to n = 10^5.

Instead, track **four running states** in a single left-to-right pass, each representing the best profit achievable so far under that state:

- `buy1`: max profit after buying once (i.e. `-price`, the least money "spent" so far, tracked as a negative running max).
- `sell1`: max profit after completing the first buy-sell pair.
- `buy2`: max profit after buying a second time, funded by profit already banked from the first sale.
- `sell2`: max profit after completing the second buy-sell pair — this is the final answer.

Initialize `buy1 = buy2 = -infinity` (or `-prices[0]`) and `sell1 = sell2 = 0`. For each price `p`, update in this order (each state can only improve using values from *before* this day, so update greedily by taking the best of "do nothing" vs "act today"):

```
buy1  = max(buy1, -p)
sell1 = max(sell1, buy1 + p)
buy2  = max(buy2, sell1 - p)
sell2 = max(sell2, buy2 + p)
```

The key insight is that `buy2` folds in `sell1`'s profit as its "budget," so the second transaction is automatically constrained to start after the first one closes — no explicit day-splitting or interval search needed. Updating all four every day and taking running maxes naturally lets the algorithm choose to skip either transaction (state values simply stay at their initial best) if that's more profitable, which also handles the "at most two" requirement (zero or one transactions are valid fallbacks).

The answer is `sell2` (it's initialized to 0 and can never go negative, so an all-declining array correctly yields 0).

**Time complexity:** O(n) — one pass, constant work per day.

**Space complexity:** O(1) — four scalar variables.
