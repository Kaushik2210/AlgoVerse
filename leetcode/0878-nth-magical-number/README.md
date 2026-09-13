# 878. Nth Magical Number

A positive integer is magical if it's divisible by either `a` or `b`. Given `n`, `a`, and `b`, return the `n`-th magical number, modulo `10^9 + 7`.

**Example 1:**
```
Input: n = 1, a = 2, b = 3
Output: 2
Explanation: The magical numbers are 2, 3, 4, 6, 8, 9, ... The 1st is 2.
```

**Example 2:**
```
Input: n = 4, a = 2, b = 3
Output: 6
Explanation: The magical numbers are 2, 3, 4, 6, 8, 9, ... The 4th is 6.
```

**Constraints:**
- 1 <= n <= 10^9
- 2 <= a, b <= 4 * 10^4

## Approach

This is a two-divisor special case of "Ugly Number III" — same inclusion-exclusion counting, same binary-search-the-answer structure, just simpler with only one pairwise LCM term to worry about.

For any value `x`, the count of magical numbers <= `x` is `x/a + x/b - x/lcm(a,b)` (multiples of `a`, plus multiples of `b`, minus the double-counted multiples of both). This count is monotonically non-decreasing in `x`, so binary search for the smallest `x` where the count reaches `n` — that `x` is guaranteed to be a genuine multiple of `a` or `b` (the count only ever increases exactly at such values), so it's the answer before taking the modulus.

The search range: `lo = 1`, and `hi = n * min(a, b)` is a safe upper bound since the sparser of the two sequences alone reaches its `n`-th multiple by then (and combining with the other sequence only gets to `n` magical numbers sooner). Take the final answer modulo `10^9 + 7` only at the very end — never take it mid-search, since the binary search needs the true, unreduced ordering to converge correctly.

**Time complexity:** O(log(n * min(a,b))) for the binary search, each step O(1) after computing `lcm(a,b)` once up front.

**Space complexity:** O(1) extra space.
