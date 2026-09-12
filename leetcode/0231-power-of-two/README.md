# 231. Power of Two

Given an integer `n`, return `true` if it is a power of two. Otherwise, return `false`. An integer `n` is a power of two if there exists an integer `x` such that `n == 2^x`.

**Example 1:**
```
Input: n = 1
Output: true
Explanation: 2^0 = 1
```

**Example 2:**
```
Input: n = 16
Output: true
Explanation: 2^4 = 16
```

**Example 3:**
```
Input: n = 3
Output: false
```

**Constraints:**
- -2^31 <= n <= 2^31 - 1

## Approach

The straightforward way is to repeatedly divide by 2 while the number is even, and check whether it ends at exactly 1 — that's a fine O(log n) loop, but there's a neater one-shot trick using a well-known bit fact.

Any power of two, in binary, is a single `1` bit followed by all zeros (1, 10, 100, 1000, ...). Subtracting 1 from that flips the single set bit to 0 and turns every bit below it to 1 (100 - 1 = 011). ANDing the two together therefore always produces 0 for a true power of two, since there's no position where both have a 1. Non-powers of two have more than one set bit, and that AND won't fully cancel out.

So the whole check is just `n > 0 and (n & (n - 1)) == 0`. The `n > 0` guard matters because `n = 0` would otherwise slip through (`0 & -1 == 0` in two's complement), and it's also just correct on its own merits — 0 isn't 2 to any power, and negative numbers can't be either.

**Time complexity:** O(1) — a couple of bitwise operations regardless of the input's size.

**Space complexity:** O(1).
