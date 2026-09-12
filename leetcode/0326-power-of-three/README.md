# 326. Power of Three

Given an integer `n`, return `true` if it is a power of three. Otherwise, return `false`. An integer `n` is a power of three if there exists an integer `x` such that `n == 3^x`.

**Example 1:**
```
Input: n = 27
Output: true
Explanation: 27 = 3^3
```

**Example 2:**
```
Input: n = 0
Output: false
```

**Example 3:**
```
Input: n = 21
Output: false
Explanation: 21 is not a power of 3.
```

**Constraints:**
- -2^31 <= n <= 2^31 - 1

## Approach

Base-3 doesn't have a bitwise trick like powers of two do (no single-set-bit shortcut), so the most direct approach is to repeatedly divide by 3 while `n` is evenly divisible, and check whether it bottoms out at exactly 1. Any factor other than 3 along the way — meaning a nonzero remainder at some step — rules it out immediately, and `n <= 0` is ruled out up front since it can't be a positive power of three.

There's also a neat constant-time trick specific to this problem: 3 is prime, so the largest power of three that fits in a signed 32-bit integer, `3^19 = 1162261467`, is only divisible by other powers of three (1, 3, 9, ..., 3^19) and nothing else. So `n` is a power of three exactly when `n > 0` and `1162261467 % n == 0` — check whether that fixed largest power of three is evenly divisible by `n`. This sidesteps the loop entirely, though it leans on knowing the specific bound for a 32-bit integer rather than reasoning generally, so the loop version below is the one implemented as the primary solution since it doesn't depend on a magic constant.

**Time complexity:** O(log₃ n) — one division per step until `n` shrinks to 1 or produces a remainder.

**Space complexity:** O(1).
