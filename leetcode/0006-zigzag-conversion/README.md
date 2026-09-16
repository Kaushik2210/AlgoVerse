# 6. Zigzag Conversion

**Commonly asked at:** Amazon, PayPal

You're given a string `s` and a number of rows `numRows`. Imagine writing `s` diagonally down and up in a zigzag pattern across `numRows` rows (down the first row to the last, then back up, then down again), then read the result off row by row, left to right. Return that row-by-row string.

**Example 1:**
```
Input: s = "PAYPALISHIRING", numRows = 3
Output: "PAHNAPLSIIGYIR"
Explanation:
P   A   H   N
A P L S I I G
Y   I   R
```

**Example 2:**
```
Input: s = "PAYPALISHIRING", numRows = 4
Output: "PINALSIGYAHRPI"
Explanation:
P     I    N
A   L S  I G
Y A   H R
P     I
```

**Example 3:**
```
Input: s = "A", numRows = 1
Output: "A"
```

**Constraints:**
- 1 <= s.length <= 1000
- s consists of English letters, `,` and `.`
- 1 <= numRows <= 1000

## Approach

The brute-force way is to actually build a 2D grid, simulate the pen moving down then diagonally up, place each character at its (row, col), then scan the grid row by row skipping blanks. That works but wastes a lot of space on a mostly-empty grid.

The simplification: you never actually need columns. Each character only needs to know *which row* it lands on, and the rows are read out in order, so you can keep one string builder per row and just append characters to the right one as you scan `s` left to right. Track the current row and a direction flag (going down or going up). Start at row 0 going down; every step append the current character to that row's bucket, then move to the next row in the current direction. Whenever you hit row 0 or row `numRows - 1`, flip the direction. This reproduces the exact zigzag order without ever materializing empty grid cells.

Edge case: `numRows == 1` means there's no zigzag at all — every character stays on row 0, so the answer is just `s` itself (the direction-flip logic actually handles this correctly on its own since row 0 is both the top and bottom, but it's worth being aware of).

After the scan, concatenate the row buckets in order to get the final string.

**Time complexity:** O(n) — every character is visited and appended exactly once.

**Space complexity:** O(n) — the row buffers together hold every character of `s` plus O(numRows) for the buffer list itself.
