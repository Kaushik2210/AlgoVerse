# 9. Palindrome Number

Given an integer `x`, return `true` if `x` reads the same forwards and backwards, and `false` otherwise. Do it without converting the integer to a string.

**Example 1:**
```
Input: x = 121
Output: true
```

**Example 2:**
```
Input: x = -121
Output: false
Explanation: Reads as 121- backwards, so it's not a palindrome.
```

**Example 3:**
```
Input: x = 10
Output: false
Explanation: Reads as 01 backwards.
```

**Constraints:**
- -2^31 <= x <= 2^31 - 1

## Approach

Any negative number is immediately disqualified — the minus sign only ever appears at the front, so it can never match up with anything at the back. Same with any positive number that ends in 0 but isn't 0 itself: reversing it would produce a leading zero, which can't equal the original.

The string-free way to check is to reverse only *half* of the number and compare the two halves, rather than reversing the whole thing and risking overflow on numbers near the 32-bit boundary. Peel digits off the back of `x` with `% 10` / `// 10` and build up a `reversed_half` the usual way, but stop as soon as `x <= reversed_half` — at that point you've reversed enough digits to cover the second half of the original number.

For an even-length number, the two halves should be exactly equal (`x == reversed_half`). For an odd-length number, `reversed_half` will have one extra middle digit, so dropping it with `reversed_half // 10` should equal what's left of `x`. Checking `x == reversed_half or x == reversed_half // 10` covers both cases in one shot.

**Time complexity:** O(log x) — proportional to the number of digits, and only half of them are actually walked.

**Space complexity:** O(1).
