# 50. Pow(x, n)

Implement `pow(x, n)`, which computes `x` raised to the power `n` (i.e. `x^n`). `n` can be negative or zero.

**Example 1:**
```
Input: x = 2.00000, n = 10
Output: 1024.00000
```

**Example 2:**
```
Input: x = 2.10000, n = 3
Output: 9.26100
```

**Example 3:**
```
Input: x = 2.00000, n = -2
Output: 0.25000
Explanation: 2^-2 = 1/2^2 = 1/4 = 0.25
```

**Constraints:**
- -100.0 < x < 100.0
- -2^31 <= n <= 2^31 - 1
- n is an integer
- Either x is not zero or n > 0
- -10^4 <= x^n <= 10^4

## Approach

Multiplying `x` by itself `n` times one at a time is O(n), which is far too slow for `n` near 2^31. Fast exponentiation ("exponentiation by squaring") gets this down to O(log n) by exploiting that `x^n = (x^(n/2))^2` when `n` is even, and `x^n = x * (x^(n-1))` (or equivalently `x * (x^((n-1)/2))^2`) when `n` is odd.

Handle negative `n` by computing the result for `abs(n)` and then taking the reciprocal at the end — watch out for `n = INT_MIN`, whose absolute value doesn't fit in a 32-bit int, so widen to a 64-bit type (or in Python just let it be, since ints don't overflow) before negating.

Iteratively: keep a running `result` (starting at 1) and a running `base` (starting at `x`). Walk through the bits of `n`: whenever the current bit is 1, multiply `result` by the current `base`; then square `base` and shift to the next bit, regardless of whether that bit was set. This is the same doubling idea as binary exponentiation done bottom-up instead of recursively, and it avoids the recursion-depth concern entirely.

**Time complexity:** O(log n) — the base is squared once per bit of `n`.

**Space complexity:** O(1) with the iterative version (a recursive version would be O(log n) for the call stack).
