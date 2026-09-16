# 790. Domino and Tromino Tiling

**Commonly asked at:** Amazon, Google, Meta, Microsoft, Goldman Sachs, Bloomberg

You have a board that's 2 rows tall and `n` columns wide. You want to tile it completely using two shapes: a 2x1 domino (which can be placed vertically or horizontally) and an L-shaped tromino covering 3 cells (which can be rotated into any of 4 orientations). Return the number of distinct ways to fully tile the 2xn board, modulo `10^9 + 7`.

**Example 1:**
```
Input: n = 3
Output: 5
Explanation: The five tilings of a 2x3 board using dominoes and trominoes.
```

**Example 2:**
```
Input: n = 1
Output: 1
```

**Constraints:**
- 1 <= n <= 1000

## Approach

The tricky part of this problem is that a tromino can leave a jagged edge — one column filled and the next only half filled — so a naive "how many ways to tile the first k full columns" recurrence misses states where the boundary isn't flat.

Define `f(n)` as the number of ways to fully tile a flat 2xn board. Think about how column `n` (the last one) can be finished off, working backward from a fully tiled board of width `n`:

- Column `n` is closed off by a vertical domino on its own, on top of a fully-tiled 2x(n-1) board: contributes `f(n-1)`.
- Column `n` is closed off together with column `n-1` by two horizontal dominoes stacked, on top of a fully tiled 2x(n-2) board: contributes `f(n-2)`.
- Column `n` is closed off by a tromino that also pokes into column `n-1`, leaving a jagged notch that needs a matching tromino (in one of two mirrored orientations) to square it off against a fully tiled 2x(n-3) board: this pair of trominoes contributes `2 * f(n-3)`.

Putting it together (and it's a known identity that these are the only cases once you also account for the "half board" states folding into full-board states two steps back):

```
f(n) = 2*f(n-1) + f(n-3)
```

with base cases `f(0) = 1` (empty board, one way — do nothing), `f(1) = 1`, `f(2) = 2` (two horizontal dominoes, or two vertical dominoes).

Build this up iteratively from the bottom, taking everything modulo `10^9 + 7` along the way since the count grows exponentially.

**Time complexity:** O(n) — one pass filling in the recurrence.

**Space complexity:** O(n) for the array (can be trimmed to O(1) by keeping only the last three values).
