# 1406. Stone Game III

**Commonly asked at:** Amazon, Google, Meta, Bloomberg

Alice and Bob take turns playing a game, Alice first. There are `n` piles of stones arranged in a row, `stoneValue[i]` is the value of the `i`-th pile. On each turn, the current player takes the next 1, 2, or 3 piles from the remaining piles (always from the front of what's left), and their score increases by the sum of the values of the piles taken. Both players play optimally to maximize their own score. Return `"Alice"` if Alice wins, `"Bob"` if Bob wins, or `"Tie"` if the scores end up equal.

**Example 1:**
```
Input: stoneValue = [1,2,3,7]
Output: "Bob"
Explanation: Alice's best move is taking the first pile, leaving [2,3,7]; Bob then takes all three, scoring 12 against Alice's 1.
```

**Example 2:**
```
Input: stoneValue = [1,2,3,-9]
Output: "Alice"
```

**Example 3:**
```
Input: stoneValue = [1,2,3,6]
Output: "Tie"
```

**Constraints:**
- 1 <= stoneValue.length <= 5 * 10^4
- -1000 <= stoneValue[i] <= 1000

## Approach

Rather than tracking each player's absolute score, track the *score differential* from the perspective of whichever player is currently about to move — this is the standard trick for optimal-play turn games, since maximizing your own lead is equivalent to maximizing (your score) - (opponent's score), and it collapses two players' strategies into one recurrence.

Let `dp[i]` be the best possible score differential (current mover minus the other player) achievable using only piles `stoneValue[i:]`. The base case `dp[n] = 0` (no piles left, no further differential to gain). For a given `i`, the current mover picks taking 1, 2, or 3 piles starting at `i`: if they take `x` piles, they immediately gain `sum(stoneValue[i:i+x])`, and then it becomes the opponent's turn on the remaining piles `stoneValue[i+x:]` — from *that* state, the opponent (now the "current mover" for `dp[i+x]`) gets their own best differential `dp[i+x]` relative to whoever moves after them, which from the original mover's perspective is a differential working *against* them. So:
```
dp[i] = max over x in {1,2,3} (sum(stoneValue[i:i+x]) - dp[i+x])
```
Compute `dp` from `i = n-1` down to `0`, accumulating the running sum of the 1/2/3 taken piles as `x` increases instead of re-summing each time. The final answer is `dp[0]`: positive means Alice (who moves first) finishes ahead, negative means Bob finishes ahead, zero is a tie.

**Time complexity:** O(n) — n states, each with at most 3 transitions.

**Space complexity:** O(n) for the `dp` array (can be reduced to O(1) with a small sliding window of the last 3 values, though the array form is clearer).
