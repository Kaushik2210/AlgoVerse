# 1780. Check if Number is a Sum of Powers of Three

**Commonly asked at:** Amazon, Google, Meta, Bloomberg

Given an integer `n`, return `true` if it's possible to express `n` as the sum of distinct powers of 3, and `false` otherwise.

(There's no distinct LeetCode problem titled "Armstrong Number" — this one covers the same "digit-manipulation number theory" territory, checking a number's structure by repeatedly peeling off a base.)

**Example 1:**
```
Input: n = 12
Output: true
Explanation: 12 = 3^1 + 3^2
```

**Example 2:**
```
Input: n = 91
Output: true
Explanation: 91 = 3^0 + 3^2 + 3^4
```

**Example 3:**
```
Input: n = 21
Output: false
```

**Constraints:**
- 1 <= n <= 10^7

## Approach

"Distinct powers of 3" is exactly what base-3 (ternary) representation encodes — every non-negative integer has a unique base-3 expansion, and a digit of 1 at position `k` means `3^k` is included, while a digit of 0 means it's excluded. A sum of *distinct* powers of 3 is only possible if the ternary representation uses only the digits 0 and 1 — any digit of 2 means that power of 3 would need to be used twice, which breaks distinctness (and no combination of other powers can make up the difference, since a power of 3 is always bigger than the sum of every smaller power of 3).

So the whole problem reduces to converting `n` to base 3 and checking for a 2 anywhere: repeatedly take `n % 3` (the next ternary digit) and divide `n` by 3, failing fast the moment a 2 shows up.

Verified against `n = 12` -> true (ternary 110), `n = 91` -> true (ternary 10101), and `n = 21` -> false (ternary 210, has a 2).

**Time complexity:** O(log n) — the number of ternary digits in `n`.

**Space complexity:** O(1).
