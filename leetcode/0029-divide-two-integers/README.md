# 29. Divide Two Integers

Divide two integers `dividend` and `divisor` without using multiplication, division, or the mod operator, and return the quotient after truncating toward zero. Assume a 32-bit signed integer environment: if the result overflows that range, return `2^31 - 1`.

**Example 1:**
```
Input: dividend = 10, divisor = 3
Output: 3
Explanation: 10/3 = 3.33333.. which is truncated to 3.
```

**Example 2:**
```
Input: dividend = 7, divisor = -3
Output: -2
Explanation: 7/-3 = -2.33333.. which is truncated to -2.
```

**Constraints:**
- -2^31 <= dividend, divisor <= 2^31 - 1
- divisor != 0

## Approach

Without multiply/divide/mod, the only tool left is addition and bit shifts, so this comes down to repeated subtraction — but naive repeated subtraction (subtract the divisor one at a time) is way too slow for values near 2^31. Speed it up with the standard trick: subtract the *largest* multiple of the divisor that still fits, using doubling.

Work with the absolute values of both numbers (track the sign separately by XOR-ing the signs of the two inputs). For the current remaining dividend, start with the divisor and keep doubling it (`divisor << 1`) along with a running power-of-two counter, as long as the doubled value still fits inside what's left. Once doubling would overshoot, subtract that largest chunk from the remaining dividend, add the corresponding power of two to the quotient, and repeat the whole doubling process from the divisor again on whatever's left. This is exactly how long division works in binary — it's O(log^2 n) instead of O(n).

The classic trap is `dividend = INT_MIN, divisor = -1`: the mathematical answer is `2^31`, which overflows a 32-bit signed int. Convert to absolute values using a 64-bit-safe approach (or just work with Python's arbitrary precision and clamp at the end) and clamp the final result to `INT_MAX` if it would exceed the 32-bit range.

**Time complexity:** O(log^2 n) — outer loop runs O(log n) times (each iteration removes at least one bit's worth of value), and each iteration's inner doubling loop is also O(log n).

**Space complexity:** O(1).
