# 168. Excel Sheet Column Title

Given an integer `columnNumber`, return its corresponding column title the way it appears in an Excel sheet (A, B, ..., Z, AA, AB, ..., AZ, BA, ..., ZZ, AAA, ...).

**Example 1:**
```
Input: columnNumber = 1
Output: "A"
```

**Example 2:**
```
Input: columnNumber = 28
Output: "AB"
```

**Example 3:**
```
Input: columnNumber = 701
Output: "ZY"
```

**Constraints:**
- 1 <= columnNumber <= 2^31 - 1

## Approach

This looks like converting a number to base 26, and it almost is — except Excel columns are "1-indexed" per digit (there's no digit for 0; A represents 1, not 0, and Z represents 26, not 25). A normal base conversion would use digits 0-25, but here every position uses digits 1-26. That mismatch is exactly why naively doing `columnNumber % 26` and `columnNumber // 26` breaks down at multiples of 26 (26 itself should map to 'Z', not wrap around like a 0 digit would).

The fix is a small offset: before taking the remainder each round, subtract 1 from `columnNumber`. This shifts the range from 1-26 down to 0-25, which then behaves like a normal base-26 digit — `(columnNumber - 1) % 26` gives a value 0-25 that maps directly to 'A'-'Z', and `(columnNumber - 1) // 26` gives the number to keep dividing down for the next digit. Repeat, prepending each computed letter, until `columnNumber` reaches 0.

**Time complexity:** O(log₂₆ n) — the number of divisions needed is proportional to the number of base-26 digits, i.e. logarithmic in `columnNumber`.

**Space complexity:** O(log₂₆ n) — for the output string, which grows with the number of digits.
