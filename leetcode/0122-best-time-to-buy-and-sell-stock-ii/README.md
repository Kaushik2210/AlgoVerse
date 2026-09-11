# 122. Best Time to Buy and Sell Stock II

You're given an array `prices` where `prices[i]` is the price of a stock on day `i`. You can buy and sell as many times as you want, but you can only hold one share at a time (you have to sell before you buy again). Find the maximum profit you can make.

**Example 1:**
```
Input: prices = [7,1,5,3,6,4]
Output: 7
Explanation: buy on day 1 (price 1), sell on day 2 (price 5), profit 4. Buy on day 3 (price 3), sell on day 4 (price 6), profit 3. Total 7.
```

**Example 2:**
```
Input: prices = [1,2,3,4,5]
Output: 4
Explanation: buy on day 0, sell on day 4, profit 4. (Or equivalently, buy/sell every consecutive pair — same total.)
```

**Example 3:**
```
Input: prices = [7,6,4,3,1]
Output: 0
Explanation: prices only go down, so no transaction is profitable.
```

**Constraints:**
- 1 <= prices.length <= 3 * 10^4
- 0 <= prices[i] <= 10^4

## Approach

Since there's no limit on the number of transactions, you don't actually need to think about "when do I buy and when do I sell" as a hard combinatorial search. The brute-force framing — try every possible set of buy/sell pairs — explodes quickly and is way more machinery than this needs.

Here's the reframe: any profitable stretch of days can be broken down into its individual day-to-day gains. If the price goes 1 -> 5 over three days, buying at the start and selling at the end nets the same profit as buying and selling on every single day where the price rose, then immediately buying back in. So instead of tracking actual buy/sell events, just walk through the array day by day, and whenever tomorrow's price is higher than today's, add that difference to your running profit. You're capturing every uphill segment of the price curve, which is exactly the total profit achievable — downhill segments contribute nothing since you'd never buy right before a drop.

This greedy approach is optimal because summing all positive consecutive differences is mathematically identical to summing the gains of the best non-overlapping buy/sell intervals — you're just decomposing each interval into its daily steps.

**Time complexity:** O(n) — one pass through the prices.

**Space complexity:** O(1) — just a running profit total.
