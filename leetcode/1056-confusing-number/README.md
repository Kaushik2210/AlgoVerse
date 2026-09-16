# 1056. Confusing Number

**Commonly asked at:** Google

> **Note:** This is a LeetCode premium problem, so it can't be opened or submitted on a free account. Solved and verified independently against hand-built test cases.

A confusing number is one that, when rotated 180 degrees, becomes a *different* valid number. Only the digits 0, 1, 6, 8, and 9 remain valid digits after rotation (0, 1, 8 map to themselves, 6 maps to 9, and 9 maps to 6); any other digit makes the rotation invalid, not confusing. Given a number `n`, return whether it's confusing.

**Example 1:**
```
Input: n = 6
Output: true
Explanation: 6 rotates to 9, a different valid number.
```

**Example 2:**
```
Input: n = 89
Output: true
Explanation: 89 rotates to 68, a different valid number.
```

**Example 3:**
```
Input: n = 11
Output: false
Explanation: 11 rotates to 11, the same number.
```

**Constraints:**
- 0 <= n <= 10^9

## Approach

Peel the number apart one digit at a time from the least significant end (via `% 10` and `// 10`), and build the rotated number as you go. Two things need checking along the way: every digit encountered must be one of 0, 1, 6, 8, 9 (a mapping/lookup table handles that plus the digit substitution in one step — anything outside the table immediately disqualifies the number, since rotating something like a 2 or 7 doesn't produce a valid digit at all), and the final rotated value must differ from the original.

The subtle part is digit order. Rotating a number 180 degrees doesn't just substitute each digit in place — it also reverses their order (rotating "89" gives "68", not "86", since the whole string flips end to end). Conveniently, peeling digits off `n` from the units place naturally visits them in reverse order already. So building the rotated result by repeatedly doing `rotated = rotated * 10 + substituted_digit` (shifting left and appending, the same way you'd build any number digit by digit from its most-significant end) produces exactly the digit-reversed, digit-substituted result — because the first digit peeled off `n` (its original units digit) is exactly what should become the new leading digit after a 180-degree flip.

**Time complexity:** O(log n) — proportional to the number of digits in n.

**Space complexity:** O(1) — a fixed-size lookup table and a couple of integers.
