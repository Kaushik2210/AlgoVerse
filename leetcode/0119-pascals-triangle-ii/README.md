# 119. Pascal's Triangle II

**Commonly asked at:** Amazon

Given an integer `rowIndex`, return the `rowIndex`-th row (0-indexed) of Pascal's triangle.

**Example 1:**
```
Input: rowIndex = 3
Output: [1,3,3,1]
```

**Example 2:**
```
Input: rowIndex = 0
Output: [1]
```

**Constraints:**
- 0 <= rowIndex <= 33

## Approach

Building the whole triangle from row 0 down to `rowIndex` and returning the last row works and is simple, but it uses O(rowIndex^2) space to store every earlier row when only the final one is needed.

The row-by-row recurrence `row[i] = row[i-1] * (rowIndex - i + 1) / i` (with `row[0] = 1`) lets each row be built from just the previous one, without keeping every earlier row around — start with a single-element list `[1]` and keep replacing it with the next row until reaching `rowIndex`.

Better still, the whole row can be produced in place with O(1) extra space beyond the output itself: initialize a list of `rowIndex + 1` ones, then for each position `j` from `1` to `rowIndex`, update `row[j] = row[j-1] * (rowIndex - j + 1) / j`. Because each `row[j]` only depends on the *already-updated* `row[j-1]` from the same pass (not a value from two rows back), a single left-to-right sweep over one array reconstructs the entire row using the binomial coefficient identity `C(n, j) = C(n, j-1) * (n - j + 1) / j`.

**Time complexity:** O(rowIndex) — one pass to fill the row.

**Space complexity:** O(rowIndex) for the output row, O(1) extra.
