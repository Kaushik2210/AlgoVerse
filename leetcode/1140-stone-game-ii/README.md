# 1140. Stone Game II

**Commonly asked at:** Google

Alice and Bob are playing a game with piles of stones arranged in a row, `piles[i]` being the number of stones in the `i`-th pile. Alice moves first, and both players play optimally to maximize their **own** total stones. On each turn a player can take the first `X` piles remaining, where `1 <= X <= 2M`, and `M` starts at 1. Whatever `X` was actually taken, `M` then becomes `max(M, X)` for the *next* player's turn. Return the maximum number of stones Alice can end up with.

**Example 1:**
```
Input: piles = [2, 7, 9, 4, 4]
Output: 10
Explanation: Alice takes the first pile (2), which sets M=1 for Bob. Bob then takes the next two piles (7+9=16), which sets M=2 for Alice. With M=2 and only [4,4] left, Alice can take both. Alice's total is 2 + 4 + 4 = 10.
```

**Example 2:**
```
Input: piles = [1, 2, 3, 4, 5, 100]
Output: 104
```

**Constraints:**
- 1 <= piles.length <= 100
- 1 <= piles[i] <= 10^4

## Approach

This is a minimax game, so define `dp(index, m)` as the maximum number of stones the player **whose turn it currently is** can collect from `piles[index:]` onward, given the current value of `M` is `m`. Whatever this player doesn't take goes to the opponent's side, and both players are trying to maximize their own share, so the standard trick applies: the current player wants to maximize `(what I take now) + (total left after that) - (what my opponent manages to get from that point on)`, because the opponent playing optimally against the remainder is exactly `dp(index + X, max(m, X))`, and everything else in the remaining range belongs to the current player by elimination.

With a suffix-sum array `suffix[i]` giving the total stones in `piles[i:]`, "total remaining stones from `index` onward" is just `suffix[index]`. So:
```
dp(index, m) = max over X in [1, 2m] of ( suffix[index] - dp(index + X, max(m, X)) )
```
The base case is when `index + 2m >= n`: at that point `M` is big enough to take every remaining pile in one move, so the current player should just grab everything, giving `suffix[index]`.

Answer is `dp(0, 1)` — Alice's optimal take from the whole array with the starting `M = 1`. There's no need for anything fancier than returning that value directly; the problem asks for Alice's actual stone count, not a win/lose/tie label.

Memoize on `(index, m)` since both bound the state space to O(n^2) pairs, and each state tries at most `2m <= 2n` choices of `X`, keeping the whole thing well within limits for `n <= 100`.

**Time complexity:** O(n^3) — O(n^2) states, each doing O(n) work in the worst case.

**Space complexity:** O(n^2) for the memo table (plus O(n) for the suffix sums).
