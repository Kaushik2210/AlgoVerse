# 1411. Number of Ways to Paint N x 3 Grid

You have a grid with `n` rows and 3 columns, and 3 available colors ("Red", "Yellow", "Green"). Paint every cell so that no two horizontally or vertically adjacent cells share a color. Return the number of ways to do this, modulo `10^9 + 7`.

**Example 1:**
```
Input: n = 1
Output: 12
Explanation: There are 12 valid ways to paint a single 1x3 row.
```

**Example 2:**
```
Input: n = 5000
Output: 30228214
```

**Constraints:**
- n == grid.length
- 1 <= n <= 5000

## Approach

A single row of 3 cells with no two adjacent cells matching, using 3 colors, only ever comes in two shapes:
- **"aba"** — outer two cells share a color, middle differs (e.g. red-green-red). There are 3 choices for the outer color and 2 for the middle, so 6 combinations.
- **"abc"** — all three cells different colors. There are 3! = 6 permutations.

So every row's coloring is one of 12 total patterns, split evenly into 6 "aba"-shaped and 6 "abc"-shaped. The real question is how many ways a row of each shape can be followed by a valid next row (one where every column differs from the one above it).

Working out the column-compatibility by hand: an "aba" row can be followed by 3 different "aba" rows or 2 different "abc" rows; an "abc" row can be followed by 2 different "aba" rows or 2 different "abc" rows. That gives a tiny DP with two running totals — `aba` = count of ways to paint the grid so far ending in an aba-shaped row, `abc` = same for abc-shaped — updated row by row:

```
new_aba = aba * 3 + abc * 2
new_abc = aba * 2 + abc * 2
```

Start both counters at 6 (for the first row), iterate `n - 1` more times, then sum them for the final answer, taking everything mod `10^9 + 7` along the way since counts grow exponentially.

**Time complexity:** O(n) — one constant-work update per row.

**Space complexity:** O(1) — only two running counters are kept.
