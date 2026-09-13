# 661. Image Smoother

You're given an `m x n` integer matrix `img` representing a grayscale image. Build a smoothed version where each cell's new value is the average, rounded down, of itself and all of its existing neighbors (up to 8 surrounding cells, fewer near edges and corners).

**Example 1:**
```
Input: img = [[1,1,1],[1,0,1],[1,1,1]]
Output: [[0,0,0],[0,0,0],[0,0,0]]
```

**Example 2:**
```
Input: img = [[100,200,100],[200,50,200],[100,200,100]]
Output: [[137,141,137],[141,138,141],[137,141,137]]
```

**Constraints:**
- m == img.length, n == img[i].length
- 1 <= m, n <= 200
- 0 <= img[i][j] <= 255

## Approach

For each cell, gather the sum and count of every valid cell in its 3x3 neighborhood (itself plus up to 8 neighbors), then the smoothed value is that sum divided by that count, rounded down (integer division).

Build a new output matrix rather than modifying in place, since computing cell `(r, c)`'s neighbors needs the *original* values of cells that might otherwise already have been overwritten by an earlier update. For each cell, loop over the 3x3 block of row offsets and column offsets from -1 to 1, skip anything outside the grid bounds, and accumulate the total and the number of cells actually counted. Divide to get the new value for that cell.

**Time complexity:** O(m * n) — each cell does a constant amount of work (at most 9 neighbor checks).

**Space complexity:** O(m * n) for the output matrix.
