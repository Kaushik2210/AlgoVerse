# 699. Falling Squares

There's an infinite number line representing the ground. You're given `positions`, where `positions[i] = [lefti, sideLengthi]` describes a square of side length `sideLengthi` that gets dropped so its left edge lands at x-coordinate `lefti`. Squares are dropped one at a time, in order, and each one falls straight down until it lands either on the ground or on top of any square(s) it overlaps horizontally with, then stays there permanently. Return an array `ans` where `ans[i]` is the height of the *tallest* stack of squares after the `i`-th square has been dropped and settled.

**Example 1:**
```
Input: positions = [[1,2],[2,3],[6,1]]
Output: [2,5,5]
Explanation: square 1 lands on the ground, height 2. Square 2 overlaps square 1's range [1,3) with its own [2,5), lands on top of it at height 2+3=5. Square 3 at [6,7) doesn't overlap anything, lands at height 1, but the running max stays 5.
```

**Example 2:**
```
Input: positions = [[100,100],[200,100]]
Output: [100,100]
Explanation: the two squares don't overlap (100+100=200, and the second starts exactly at 200), so each lands on the ground independently.
```

**Constraints:**
- 1 <= positions.length <= 1000
- 1 <= lefti <= 10^8
- 1 <= sideLengthi <= 10^6

## Approach

Each square, once dropped, occupies a horizontal interval `[left, left + size)` at some settled height (its top). When the next square comes down, it has to land on top of the *tallest* previously-placed square whose horizontal interval overlaps its own — or on the ground (height 0) if nothing overlaps.

Since there are at most 1000 squares, a direct simulation is fast enough: keep a list of every square placed so far as `(left, right, top)`. For each new square, scan the placed list and take the max `top` among every interval that horizontally overlaps the new square's `[left, right)` — using strict overlap (`pl < right and left < pr`) so squares that merely touch edges don't count as overlapping. The new square's landing height is `base + size`, where `base` is that max top (or 0 if nothing overlapped). Record it, then update and append the running maximum height across all squares so far, which is what the answer array wants at each step.

This is the coordinate-compression-free version of the problem — with `positions.length <= 1000`, the O(n^2) interval scan is well within bounds. The same problem at larger scale would call for coordinate compression plus a segment tree doing range-max-query / range-update to keep each drop at O(log n), but that machinery isn't needed here.

**Time complexity:** O(n^2) — for each of the n squares, scanning all previously placed squares to find overlaps is O(n), and there are n squares.

**Space complexity:** O(n) for the list of placed squares and the output array.
