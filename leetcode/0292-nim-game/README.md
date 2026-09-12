# 292. Nim Game

You are playing the Nim game with a friend. There's a pile of `n` stones. You and your friend take turns removing 1, 2, or 3 stones, and you go first. The player who removes the last stone wins. Given `n`, return `true` if you can win the game assuming both players play optimally, otherwise return `false`.

**Example 1:**
```
Input: n = 4
Output: false
Explanation: Whatever you take (1, 2, or 3), your friend takes the rest and wins.
```

**Example 2:**
```
Input: n = 1
Output: true
```

**Example 3:**
```
Input: n = 2
Output: true
```

**Constraints:**
- 1 <= n <= 2^31 - 1

## Approach

This looks like it wants DP over every pile size, tracking which sizes are winning or losing positions for the player about to move. That DP does reveal the pattern quickly though: a position is losing (for the player to move) exactly when every move leads to a winning position for the opponent. `n = 0` is a loss for whoever has to move (no stones left to take, they've already lost by the rules). `n = 1, 2, 3` are wins, since you can just take everything. `n = 4` is a loss: no matter whether you take 1, 2, or 3, you leave your opponent with 3, 2, or 1 stones respectively — all wins for them. From there the pattern repeats: with 4 as a losing position, `n = 5, 6, 7` are wins again (take enough to leave the opponent at 4), and `n = 8` is losing again.

So losing positions are exactly the multiples of 4. The reasoning generalizes: from any non-multiple of 4, you can always remove 1, 2, or 3 stones to land your opponent exactly on the next lower multiple of 4, forcing them into a losing spot. From a multiple of 4, any move you make (taking 1, 2, or 3) necessarily leaves a number that is *not* a multiple of 4, handing your opponent a winning position instead. So the whole game reduces to a single check: you win unless `n` is a multiple of 4.

**Time complexity:** O(1) — a single modulo check.

**Space complexity:** O(1).
