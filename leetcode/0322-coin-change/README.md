# 322. Coin Change

You're given an array of coin denominations `coins` and a target `amount`. Return the fewest number of coins needed to make up that amount, using as many of each denomination as you like. If it's impossible to make the amount exactly, return `-1`.

**Example 1:**
```
Input: coins = [1,2,5], amount = 11
Output: 3
Explanation: 11 = 5 + 5 + 1
```

**Example 2:**
```
Input: coins = [2], amount = 3
Output: -1
Explanation: no combination of 2s ever sums to an odd number like 3
```

**Example 3:**
```
Input: coins = [1], amount = 0
Output: 0
Explanation: zero coins needed to make amount 0
```

**Constraints:**
- 1 <= coins.length <= 12
- 1 <= coins[i] <= 2^31 - 1
- 0 <= amount <= 10^4

## Approach

Greedily grabbing the biggest coin that fits doesn't always work — that's only safe for "nice" coin systems (like real-world currency). With arbitrary denominations, greedy can pick a large coin early and get stuck needing an amount nothing else can hit, when a different combination would've worked with fewer coins. So this needs to be a proper search over combinations, and dynamic programming handles that efficiently.

Define `dp[i]` as the fewest coins needed to make exactly the amount `i`. `dp[0] = 0` — making amount 0 takes zero coins, and that's the only value known upfront. Every other `dp[i]` starts as "infinity" (unreachable) until proven otherwise. For each amount `i` from 1 to the target, try every coin: if the coin's value is at most `i`, then one option is "use this coin, plus however many coins it took to make the remaining `i - coin`" — that's `dp[i - coin] + 1`. Take the best (minimum) of that option across all coins, and that's `dp[i]`.

By the time you reach `dp[amount]`, you've built up the optimal answer for every smaller amount along the way, so the recurrence always has correct data to pull from. If `dp[amount]` is still infinity at the end, no combination of coins reaches that amount exactly, so return `-1`.

**Time complexity:** O(amount * len(coins)) — for every amount from 1 to the target, try every coin once.

**Space complexity:** O(amount) — the dp array.
