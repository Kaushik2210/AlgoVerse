# 69. Sqrt(x)

Given a non-negative integer `x`, return the square root of `x` rounded **down** to the nearest integer. The result should be an integer — no built-in exponent or square root functions like `x ** 0.5` are allowed.

**Example 1:**
```
Input: x = 4
Output: 2
```

**Example 2:**
```
Input: x = 8
Output: 2
Explanation: sqrt(8) = 2.828..., truncated to 2.
```

**Constraints:**
- 0 <= x <= 2^31 - 1

## Approach

The brute-force way is to count up from 0 until `i * i > x`, which is O(sqrt(x)) — fine for small inputs but slow for numbers near 2^31.

**Binary search** is the better fit: the function `f(i) = i * i` is monotonically increasing for non-negative `i`, so the set of integers whose square is `<= x` forms a contiguous range starting at 0. We're looking for the largest `i` in `[0, x]` such that `i * i <= x`.

Binary search over `lo = 0, hi = x` (or `hi = x // 2 + 1` as a tighter bound since for `x >= 2` the answer never exceeds `x // 2`). At each step, compare `mid * mid` to `x`:
- If `mid * mid <= x`, `mid` is a valid candidate — record it as the current best answer and search the right half (`lo = mid + 1`) for something larger.
- If `mid * mid > x`, `mid` is too big — search the left half (`hi = mid - 1`).

The last recorded valid candidate is the answer. Handle `x = 0` and `x = 1` as immediate returns (or let the general loop handle them, since binary search degenerates correctly for tiny ranges).

**Overflow note:** in Python this is a non-issue since integers are arbitrary precision, but in Java/C++ `mid * mid` can overflow a 32-bit int when `mid` is around 2^16 and `x` is near 2^31 — cast `mid` to `long`/`long long` before squaring.

**Time complexity:** O(log x) — binary search halves the range each step.

**Space complexity:** O(1).
