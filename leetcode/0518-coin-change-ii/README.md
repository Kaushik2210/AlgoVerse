# 518. Coin Change II

You're given an integer `amount` and an array `coins` of distinct coin denominations, with an unlimited supply of each denomination. Return the number of distinct combinations that make up `amount`. Order doesn't matter — using one coin of value 2 then one of value 3 is the same combination as 3 then 2, only counted once. If it's not possible to make `amount`, return 0.

**Example 1:**
```
Input: amount = 5, coins = [1,2,5]
Output: 4
Explanation: 5=5, 5=2+2+1, 5=2+1+1+1, 5=1+1+1+1+1
```

**Example 2:**
```
Input: amount = 3, coins = [2]
Output: 0
```

**Example 3:**
```
Input: amount = 0, coins = [1]
Output: 1
Explanation: there's exactly one way to make 0 - use no coins
```

**Constraints:**
- 1 <= coins.length <= 300
- 1 <= coins[i] <= 5000
- All values in coins are unique
- 0 <= amount <= 5000

## Approach

This is unbounded knapsack (each coin can be reused any number of times), but counting *combinations* rather than *permutations* is the subtlety that trips people up — a naive DP over "ways to make amount using any coins" without care about ordering ends up counting `1+2` and `2+1` as different, which overcounts.

The fix is to process coins one denomination at a time, in an outer loop, and update a DP array `dp[a]` = "number of ways to make amount `a` using only the coin denominations considered so far". Because each coin type is fully processed (looping over its own amounts) before moving to the next coin, a combination like `{1, 2}` only ever gets built in one order — coin 1 first, then coin 2 — never both `1,2` and `2,1` as separate paths. That's what turns permutation-counting into combination-counting.

Initialize `dp[0] = 1` (there's exactly one way to make 0 — use nothing) and `dp[a] = 0` for a > 0. For each coin, for each amount from the coin's value up to `amount` (ascending order, since a coin can be reused — this is the standard unbounded-knapsack direction, as opposed to the descending order used for 0/1 knapsack), add `dp[a - coin]` into `dp[a]`, since any way to make `a - coin` extends into a way to make `a` by adding one more of this coin.

The answer at the end is `dp[amount]`.

**Time complexity:** O(len(coins) * amount) — a nested loop over coins and amounts.

**Space complexity:** O(amount) for the 1D DP array.
