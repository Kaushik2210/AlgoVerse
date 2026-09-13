# 247. Strobogrammatic Number II

*Note: this is a LeetCode Premium (subscriber-only) problem, not freely accessible on LeetCode. It's included here anyway since it's the natural generation follow-up to "Strobogrammatic Number" (246).*

Given an integer `n`, return all strobogrammatic numbers with exactly `n` digits, in any order. A strobogrammatic number reads the same when rotated 180 degrees.

**Example 1:**
```
Input: n = 2
Output: ["11","69","88","96"]
```

**Example 2:**
```
Input: n = 1
Output: ["0","1","8"]
```

**Constraints:**
- `1 <= n <= 14`

## Approach

Build the numbers from the outside in. A strobogrammatic number of length `n` is formed by wrapping a valid strobogrammatic "core" of length `n - 2` with a matching digit pair on both ends — one of `0<->0`, `1<->1`, `6<->9`, `8<->8`, `9<->6` — since rotating the whole thing 180 degrees both flips the outer pair into each other and rotates the inner core in place.

That gives a clean recursion: `build(length)` returns every strobogrammatic string of that length.
- Base case `length == 0`: the empty string (used when `n` is even, so the recursion bottoms out with nothing left to wrap).
- Base case `length == 1`: `"0"`, `"1"`, `"8"` — the only digits that rotate to themselves (used when `n` is odd, since one digit has to sit unpaired in the middle).
- Otherwise: take every result from `build(length - 2)` and wrap it with each of the 5 valid digit pairs.

The one constraint layered on top: a number can't have a leading zero (unless the entire number is just `"0"`, which only happens when `n == 1`). So the leading-zero pair is skipped, but only at the outermost recursive call — inner cores are allowed to start with `0`, since that `0` isn't the leading digit of the final number. Tracking the original `n` alongside the shrinking `length` lets the recursion tell the outermost call apart from inner ones.

**Time complexity:** O(5^(n/2)) — each of the roughly n/2 wrapping layers has up to 5 choices, and every valid combination is eventually emitted (the output size itself is exponential in n, so this is close to optimal).

**Space complexity:** O(5^(n/2)) for the output list, plus O(n) recursion depth.
