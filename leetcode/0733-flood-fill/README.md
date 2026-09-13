# 733. Flood Fill

You're given an image represented as an `m x n` grid of integers, a starting pixel `(sr, sc)`, and a new color. Perform a flood fill starting from that pixel: change its color and the color of every pixel connected to it (4-directionally) that shares its original color, to the new color. Return the modified image.

**Example 1:**
```
Input: image = [[1,1,1],[1,1,0],[1,0,1]], sr = 1, sc = 1, color = 2
Output: [[2,2,2],[2,2,0],[2,0,1]]
```

**Example 2:**
```
Input: image = [[0,0,0],[0,0,0]], sr = 0, sc = 0, color = 0
Output: [[0,0,0],[0,0,0]]
```

**Constraints:**
- m == image.length, n == image[i].length
- 1 <= m, n <= 50
- 0 <= image[i][j], color < 2^16
- 0 <= sr < m, 0 <= sc < n

## Approach

This is exactly the flood-fill technique used to count islands: starting from `(sr, sc)`, spread outward to every neighbor that shares the same original color, repainting each one as you go.

First record the starting pixel's original color. If it's already equal to the new `color`, there's nothing to do — return immediately, since otherwise a naive fill would recurse forever flipping the same color back into itself. Otherwise, do a depth-first (or breadth-first) search from `(sr, sc)`: repaint the current pixel to the new color, then visit each of its 4-directional neighbors that are in bounds and still have the original color, repainting them too. Since a pixel is only ever visited while it still holds the original color, and it gets repainted the moment it's visited, no pixel is processed twice.

**Time complexity:** O(m * n) — each pixel is visited and repainted at most once.

**Space complexity:** O(m * n) for the recursion stack (or explicit stack/queue) in the worst case where the whole image is one connected region.
