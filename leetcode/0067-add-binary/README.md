# 67. Add Binary

**Commonly asked at:** Meta, Amazon

You're given two binary strings `a` and `b`. Return their sum, also as a binary string.

**Example 1:**
```
Input: a = "11", b = "1"
Output: "100"
```

**Example 2:**
```
Input: a = "1010", b = "1011"
Output: "10101"
```

**Constraints:**
- 1 <= a.length, b.length <= 10^4
- `a` and `b` consist only of `'0'` or `'1'` characters
- Each string does not contain leading zeros except for the zero itself

## Approach

Same idea as adding two decimal numbers by hand, just in base 2 instead of base 10.

Walk both strings from the last character to the first with two pointers, treating a pointer that's exhausted its string as contributing a 0 bit. At each step, add the two bits plus any carry from before. The digit to write down is that sum mod 2, and the new carry is that sum divided by 2 (integer division) — in binary this just means: sum of 0 gives digit 0 carry 0, sum of 1 gives digit 1 carry 0, sum of 2 gives digit 0 carry 1, sum of 3 gives digit 1 carry 1. Keep going until both strings are exhausted and there's no carry left, then reverse the collected digits since they were built from least significant to most significant.

**Time complexity:** O(max(n, m)) where n and m are the lengths of `a` and `b`.

**Space complexity:** O(max(n, m)) for the result string.
