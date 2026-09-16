# 171. Excel Sheet Column Number

**Commonly asked at:** Microsoft

Given a string `columnTitle` that represents a column title as it appears in an Excel sheet, return its corresponding column number.

**Example 1:**
```
Input: columnTitle = "A"
Output: 1
```

**Example 2:**
```
Input: columnTitle = "AB"
Output: 28
```

**Example 3:**
```
Input: columnTitle = "ZY"
Output: 701
```

**Constraints:**
- 1 <= columnTitle.length <= 7
- columnTitle consists only of uppercase English letters
- columnTitle is in the range ["A", "FXSHRXW"]

## Approach

This is base-26 conversion, except the digits run 1-26 instead of 0-25 (there's no "zero" letter — A is 1, not 0). Treat it like converting any base-N string to a number: walk the characters left to right, and at each step multiply the running total by 26 and add the value of the new character (`char - 'A' + 1`).

The "1-indexed instead of 0-indexed" quirk doesn't actually complicate the algorithm at all — it only matters if you were trying to go the other direction (number to column title), where you'd need to adjust for the off-by-one before taking a mod-26 digit. Going title-to-number, the standard positional accumulation `result = result * 26 + digit` works unchanged.

**Time complexity:** O(n) where n is the length of columnTitle.

**Space complexity:** O(1).
