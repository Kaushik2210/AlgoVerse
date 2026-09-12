# 7. Reverse Integer

Given a signed 32-bit integer `x`, return `x` with its digits reversed. If reversing causes the value to go outside the signed 32-bit range `[-2^31, 2^31 - 1]`, return `0`.

**Example 1:**
```
Input: x = 123
Output: 321
```

**Example 2:**
```
Input: x = -123
Output: -321
```

**Example 3:**
```
Input: x = 120
Output: 21
```

**Constraints:**
- -2^31 <= x <= 2^31 - 1

## Approach

Peel digits off the end of `x` one at a time using `% 10` and `/ 10`, the same way you'd do it on paper, and build the reversed number by pushing each digit onto a running total: `result = result * 10 + digit`. Work with the sign separately (or let truncating division toward zero handle negative numbers naturally) so you don't have to special-case anything about the digit extraction.

The only real trap is overflow. This problem is normally solved in a language with fixed-width integers, where `result * 10 + digit` can silently wrap around. Since we have to report on that condition rather than let it happen, the trick is to check *before* the operation: if `result > INT_MAX // 10` (or `result == INT_MAX // 10` and the next digit would push it past the last digit of `INT_MAX`), it's about to overflow, so bail out and return 0 immediately. The same check mirrored against `INT_MIN` handles the negative side. Python integers don't overflow on their own, so the check has to be done explicitly by comparing against the 32-bit bounds after each step (or before adding the next digit).

**Time complexity:** O(log x) — one iteration per digit of the input.

**Space complexity:** O(1) — just a running integer accumulator.
