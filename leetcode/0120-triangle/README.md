# 120. Triangle

**Commonly asked at:** Amazon

You're given a triangular array of numbers, where row `i` has `i + 1` elements. Starting at the top, on each step you move to an adjacent number in the row below — from index `j` you can move to index `j` or `j + 1`. Find the minimum possible sum along any path from the top to the bottom row.

**Example 1:**
```
Input: triangle = [[2],[3,4],[6,5,7],[4,1,8,3]]
Output: 11
Explanation: The path 2 -> 3 -> 5 -> 1 sums to 11, which is the minimum.
```

**Example 2:**
```
Input: triangle = [[-10]]
Output: -10
```

**Constraints:**
- 1 <= triangle.length <= 200
- triangle[0].length == 1
- triangle[i].length == triangle[i-1].length + 1

## Approach

Working top-down, each cell would need to know the best sum to reach it from above, but that requires tracking two possible parents per cell. It's cleaner to work bottom-up instead: define `dp[j]` as the minimum sum of a path starting at row `i`, column `j`, and going all the way down to the bottom.

At the last row, `dp[j]` is just `triangle[last][j]` itself — there's nowhere left to go. Moving up one row at a time, from cell `(i, j)` you can step down to either `(i+1, j)` or `(i+1, j+1)`, so:

```
dp[j] = triangle[i][j] + min(dp[j], dp[j+1])
```

using the dp values from the row below (dp[j] and dp[j+1] refer to the not-yet-overwritten row-below values when updated in place from right to left, or a fresh row otherwise). After processing row 0, `dp[0]` holds the minimum total path sum from the top to the bottom.

Doing this in place, reusing a single array sized to the last row and updating left-to-right or right-to-left carefully, keeps the space down to a single row instead of the full triangle.

**Time complexity:** O(n^2) where n is the number of rows — every cell in the triangle is visited once.

**Space complexity:** O(n) for the one-row dp array (the input itself can also be reused in place for O(1) extra space).
