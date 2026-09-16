# 309. Best Time to Buy and Sell Stock with Cooldown

**Commonly asked at:** Amazon, Google

You're given an array `prices` where `prices[i]` is the price of a stock on day `i`. You may complete as many transactions as you like (buy one and sell one share repeatedly), but you can't hold more than one share at a time, and after selling, you must wait one full day before buying again (a one-day cooldown). Return the maximum profit achievable.

**Example 1:**
```
Input: prices = [1,2,3,0,2]
Output: 3
Explanation: Buy day 0 (1), sell day 1 (2), cooldown day 2, buy day 3 (0), sell day 4 (2). Profit: (2-1)+(2-0)=3.
```

**Example 2:**
```
Input: prices = [1]
Output: 0
```

**Constraints:**
- 1 <= prices.length <= 5000
- 0 <= prices[i] <= 1000

## Approach

With unlimited transactions but a cooldown restriction, the decision on any given day depends on more than just "am I holding a share or not" — it also matters whether you *just* sold, since that forces a cooldown before buying again. That extra wrinkle means the state machine needs three states instead of two:

- `hold`: max profit if you're holding a share at the end of today
- `sold`: max profit if you just sold your share today (so tomorrow is a forced cooldown)
- `rest`: max profit if you're not holding and didn't just sell (free to buy tomorrow)

Transitions for each day, computed from yesterday's values: `hold` today is either you kept holding from yesterday, or you buy today using cash from being in `rest` yesterday (you can't buy right after selling — that's the cooldown): `hold = max(hold_prev, rest_prev - price)`. `sold` today means you sell what you were holding: `sold = hold_prev + price`. `rest` today means you stayed idle, which is valid whether you were resting or had just sold yesterday: `rest = max(rest_prev, sold_prev)`.

Initialize day 0 with `hold = -prices[0]` (bought immediately), `sold = -infinity` (can't have sold with nothing bought yet), `rest = 0`. Roll forward through all days; the answer is `max(sold, rest)` at the end (ending while holding a share can never be optimal since you'd just be leaving profit on the table).

**Time complexity:** O(n) — one pass over the prices array.

**Space complexity:** O(1) — only the three running state values are kept.
