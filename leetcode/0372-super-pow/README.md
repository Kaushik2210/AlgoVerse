# 372. Super Pow

**Commonly asked at:** Amazon, Google, Meta, Microsoft

Given an integer `a` and a huge non-negative integer `b` given as an array of digits (most significant digit first), return `a^b mod 1337`.

**Example 1:**
```
Input: a = 2, b = [3]
Output: 8
```

**Example 2:**
```
Input: a = 2, b = [1,0]
Output: 1024
```

**Example 3:**
```
Input: a = 1, b = [4,3,3,8,5,2]
Output: 1
```

**Constraints:**
- 1 <= a <= 2^31 - 1
- 1 <= b.length <= 2000
- 0 <= b[i] <= 9
- b doesn't contain leading zeros

## Approach

`b` is too large to convert to a normal integer and exponentiate directly, so process its digits one at a time from left to right and build up the result using a recurrence based on how the exponent grows as each new digit is appended.

If `result` currently holds `a^(prefix) mod 1337` for the digits processed so far, then appending the next digit `d` turns the exponent from `prefix` into `prefix * 10 + d`. Since `a^(prefix * 10 + d) = (a^prefix)^10 * a^d`, the update is: raise the current result to the 10th power, multiply by `a^d`, and take mod 1337 at each step to keep numbers small (using modular exponentiation for both the `^10` and the `a^d` parts so the numbers involved never blow up).

Start with `result = 1` (representing `a^0`) and fold in each digit of `b` left to right.

A small helper computes `base^exp mod mod` using fast exponentiation (also useful for the `^10` and `a^d` pieces), taking `base mod 1337` first to keep it bounded.

**Time complexity:** O(len(b) * log(10)) since each digit does a constant number of fast-exponentiation steps for small fixed exponents (10 and at most 9).

**Space complexity:** O(1) beyond the input.
