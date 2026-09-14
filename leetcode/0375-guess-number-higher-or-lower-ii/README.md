# 375. Guess Number Higher or Lower II

You're playing a guessing game against a number picked from `[1, n]`, but this time it costs money. Each time you guess `x` and it's wrong, you pay `x` dollars. Return the minimum amount of money you need to guarantee you can win, no matter which number was picked — meaning you have to budget for the worst case, not just an average or lucky case.

**Example 1:**
```
Input: n = 10
Output: 16
Explanation: The worst-case guess sequence costs 16. Guessing 7 first, if told to go lower guess 3, then 1 or 2 as needed; if told to go higher guess 9, then 8 as needed.
```

**Example 2:**
```
Input: n = 1
Output: 0
Explanation: Only one possible number, so no guess (and no cost) is needed.
```

**Example 3:**
```
Input: n = 2
Output: 1
Explanation: Guess 1. If wrong, the answer must be 2 — no cost, since a wrong first guess at n=2 only reveals the other number for free. Worst case cost is 1.
```

**Constraints:**
- 1 <= n <= 200

## Approach

This isn't about finding the number fast (that's problem 374) — it's about minimizing the worst-case *cost* of guessing wrong along the way, where you get to choose your guesses adaptively but an adversary effectively controls which branch (higher/lower) punishes you the most.

Define `dp[i][j]` as the minimum amount of money needed to guarantee a win when the picked number could be anywhere in `[i, j]`. If you guess `g` in that range and you're wrong, the number is either in `[i, g-1]` or `[g+1, j]` — and since you don't get to pick which, you must budget for whichever side is more expensive to finish (the adversary always pushes you toward the costlier remaining branch). So guessing `g` costs:

```
g + max(dp[i][g-1], dp[g+1][j])
```

`dp[i][j]` is then the *minimum* over every possible first guess `g` in `[i, j]` of that expression — you get to choose `g` to minimize your worst case, but the adversary picks which half you fall into afterward to maximize it. That min-over-guesses, max-over-outcomes pattern is exactly a minimax DP.

Base case: any single-number range costs 0 (nothing to guess, you already know the answer). Build up `dp` by increasing range length so that by the time you compute `dp[i][j]`, every smaller sub-range it depends on is already filled in. The final answer is `dp[1][n]`.

Sanity-checked against the well-known result `n = 10 -> 16`, plus `n = 1 -> 0`, `n = 2 -> 1`, `n = 3 -> 2`, and `n = 8 -> 12` — all match.

**Time complexity:** O(n^3) — O(n^2) subranges `[i, j]`, each trying up to O(n) possible first guesses.

**Space complexity:** O(n^2) for the DP table.
