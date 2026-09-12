# 118. Pascal's Triangle

Given an integer `numRows`, return the first `numRows` rows of Pascal's triangle. In Pascal's triangle, each number is the sum of the two numbers directly above it (with rows indexed from the top, starting at row 0).

**Example 1:**
```
Input: numRows = 5
Output: [[1],[1,1],[1,2,1],[1,3,3,1],[1,4,6,4,1]]
```

**Example 2:**
```
Input: numRows = 1
Output: [[1]]
```

**Constraints:**
- 1 <= numRows <= 30

## Approach

This is a direct simulation of the definition, nothing more. Every row starts and ends with `1` (there's nothing above the edges to add). For the entries in between, row `i`'s value at position `j` is the sum of row `i - 1`'s values at positions `j - 1` and `j` — literally the two numbers sitting above it in the previous row.

So build it row by row: start with `[1]` as row 0. For each subsequent row, begin with a `1`, then for each interior position walk through the previous row and add each pair of adjacent values together, and close the row with another `1`. Append the finished row to the result and use it as the "previous row" for the next iteration.

No combinatorics or factorial math is needed even though these are technically binomial coefficients — building it incrementally from the row above is simpler and avoids any risk of overflow from factorials.

**Time complexity:** O(numRows^2) — row `i` has `i + 1` entries, and summing over all rows up to `numRows` gives a total proportional to numRows^2.

**Space complexity:** O(numRows^2) for the output itself (unavoidable, since that's the size of the answer); O(1) extra beyond that.
