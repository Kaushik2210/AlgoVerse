# 59. Spiral Matrix II

**Commonly asked at:** Microsoft, Amazon

Given a positive integer `n`, generate an `n x n` matrix filled with the numbers `1` to `n^2` in spiral order.

**Example 1:**
```
Input: n = 3
Output: [[1,2,3],[8,9,4],[7,6,5]]
```

**Example 2:**
```
Input: n = 1
Output: [[1]]
```

**Constraints:**
- 1 <= n <= 20

## Approach

This is the inverse of "traverse a matrix in spiral order" — instead of reading values off an existing grid, values are written into a blank grid while walking the same spiral path.

Keep four boundaries: `top`, `bottom`, `left`, `right`, starting at the edges of the grid, and a counter starting at 1. Walk right across the top row (filling in the counter as you go and incrementing it each step), then shrink `top` down by one; walk down the right column, then shrink `right` in by one; walk left across the bottom row, then shrink `bottom` up by one; walk up the left column, then shrink `left` out by one. Repeat this four-sided loop until the boundaries cross (`top > bottom` or `left > right`), which happens naturally once every cell has been filled — for an odd `n` the very last step is a single center cell handled by the same loop without any special case, because the loop condition is checked before each side is walked.

Since it's an `n x n` square (not a general rectangle), there's no need to guard against the boundaries crossing mid-side the way a non-square spiral traversal sometimes requires — checking `top <= bottom` and `left <= right` before each of the four walks is enough.

**Time complexity:** O(n^2) — every cell is visited and written exactly once.

**Space complexity:** O(n^2) for the output matrix (O(1) extra beyond that).
