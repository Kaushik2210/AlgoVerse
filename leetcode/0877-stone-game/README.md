# 877. Stone Game

**Commonly asked at:** Amazon, Google

Alice and Bob play a game with piles of stones arranged in a row, given as an array `piles` (with an even total number of piles). Taking turns, starting with Alice, each player takes the entire pile from either the very beginning or the very end of the remaining row, adding its stones to their score. Both players play optimally to maximize their own score. Return `true` if Alice wins (strictly more stones than Bob), `false` otherwise.

**Example 1:**
```
Input: piles = [5,3,4,5]
Output: true
Explanation: Alice can always win with optimal play, e.g. take 5, then whatever Bob takes, Alice can secure 18 vs Bob's 14.
```

**Example 2:**
```
Input: piles = [3,7,2,3]
Output: true
```

**Constraints:**
- 2 <= piles.length <= 500
- piles.length is even
- sum(piles[i]) is odd

## Approach

Tracking each player's absolute score separately gets messy fast, because whether a move is "good" depends on the opponent's best response, and that response depends on the game state left behind — a classic minimax structure. The clean simplification is to track *score differential* instead of absolute scores: define `dp[i][j]` as the best possible (my score - opponent's score) that the player currently *choosing* can achieve from the subarray `piles[i..j]`, playing optimally against an opponent who's also optimal.

At state `(i, j)`, the current player picks either the left pile `piles[i]` or the right pile `piles[j]`. Whichever one they pick, they gain that many stones, but then it becomes the opponent's turn on the remaining subarray, and whatever differential the opponent achieves from there works *against* the current player (it's the opponent's score minus the current player's score for the rest of the game), so it gets subtracted: `dp[i][j] = max(piles[i] - dp[i+1][j], piles[j] - dp[i][j-1])`. This differential framing means every recursive call is from the perspective of "whoever moves next," so the same recurrence and the same dp table work no matter whose actual turn it is.

Base case: a single pile trivially gives its own value as the differential (`dp[i][i] = piles[i]`), since there's no opponent response left. Fill by increasing interval length; the final answer is whether `dp[0][n-1] > 0` — Alice moves first, so a positive final differential means she comes out ahead.

Note that for this specific problem (even length, distinct pile count) there's actually a slick O(1) proof that Alice always wins by taking all evenly (or all oddly) indexed piles depending on which sum is larger, but the DP is the general technique that also solves the harder variant "Predict the Winner" (#486) which allows uneven splits.

**Time complexity:** O(n^2) — the dp table has O(n^2) cells, each filled in O(1).

**Space complexity:** O(n^2) for the dp table (reducible to O(n) with rolling arrays).
