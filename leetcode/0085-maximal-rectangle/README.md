# 85. Maximal Rectangle

**Commonly asked at:** Google, Meta

You're given an `m x n` binary matrix filled with `'0'` and `'1'`. Find the largest rectangle containing only `'1'`s and return its area.

**Example 1:**
```
Input: matrix = [["1","0","1","0","0"],
                 ["1","0","1","1","1"],
                 ["1","1","1","1","1"],
                 ["1","0","0","1","0"]]
Output: 6
Explanation: The largest all-1s rectangle spans rows 1-2, columns 2-4, area 3*2=6.
```

**Example 2:**
```
Input: matrix = [["0"]]
Output: 0
```

**Constraints:**
- rows == matrix.length
- cols == matrix[i].length
- 1 <= rows, cols <= 200
- matrix[i][j] is '0' or '1'

## Approach

Unlike Maximal Square, a rectangle doesn't have to be a square, so the neighbor-based square DP doesn't directly apply. But there's a way to reduce this to a problem that's already solved: "Largest Rectangle in Histogram" (#84). Imagine standing at the bottom of each row and looking upward — for every column, count how many consecutive `'1'`s are stacked directly above (and including) the current row. That turns each row into a histogram of heights, where a column's height resets to 0 the moment a `'0'` breaks the vertical run, and otherwise increases by 1 from the row above.

Once a row is turned into a histogram, the largest all-1s rectangle that has its *bottom edge* on that row is exactly the largest rectangle in that histogram — solvable with the classic monotonic-stack technique in O(cols): scan through the histogram bars, maintaining a stack of indices with strictly increasing heights, and whenever a bar shorter than the one on top of the stack appears, pop and finalize the rectangle for the popped bar (its height times however wide it could stretch using the current position and whatever's now below it on the stack).

Running this histogram computation and rectangle-scan for every row (updating the heights array incrementally as rows advance) checks every possible bottom edge, so the largest rectangle overall is the max across all rows.

**Time complexity:** O(rows * cols) — building each row's histogram is O(cols), and the monotonic-stack scan per row is also O(cols) amortized.

**Space complexity:** O(cols) for the running heights array and the stack used per row.
