# 1201. Ugly Number III

Given four integers `n`, `a`, `b`, and `c`, return the `n`-th ugly number, where an ugly number here is defined as a positive integer divisible by `a`, `b`, or `c`.

**Example 1:**
```
Input: n = 3, a = 2, b = 3, c = 5
Output: 4
Explanation: The sequence of numbers divisible by 2, 3, or 5 is 2, 3, 4, 5, 6, ... The 3rd one is 4.
```

**Example 2:**
```
Input: n = 4, a = 2, b = 3, c = 4
Output: 6
Explanation: The sequence is 2, 3, 4, 6, 8, 9, 10, 12, ... The 4th one is 6.
```

**Example 3:**
```
Input: n = 5, a = 2, b = 11, c = 13
Output: 10
```

**Constraints:**
- 1 <= n, a, b, c <= 10^9
- 1 <= a * b * c <= 10^18
- The result will satisfy n, a, b, c <= 2 * 10^9

## Approach

This is unrelated to the pointer-merging trick used in "Ugly Number II" (that one builds the sequence forward from products of 2, 3, 5). Here the divisors `a`, `b`, `c` are arbitrary, so generating multiples one at a time and merging them is far too slow when `n` can be up to 10^9 — we need to jump straight to the answer.

The key tool is: for any number `x`, we can count exactly how many positive integers <= `x` are divisible by `a`, `b`, or `c`, using inclusion-exclusion:
```
count(x) = x/a + x/b + x/c - x/lcm(a,b) - x/lcm(a,c) - x/lcm(b,c) + x/lcm(a,b,c)
```
(integer division throughout), where `lcm(p, q) = p * q / gcd(p, q)`. This counts multiples of `a` or `b` or `c`, correcting for the pairwise double-counting and re-adding the triple-counted term, standard set-counting.

This count is monotonically non-decreasing in `x` (a bigger `x` never has fewer qualifying multiples below it), so binary search on `x` to find the smallest value whose count reaches `n` — that value is guaranteed to itself be a multiple of `a`, `b`, or `c` (otherwise the count wouldn't have just increased to reach `n` at exactly that point), so it *is* the `n`-th ugly number.

Search bounds: `lo = 1`, and `hi` needs to be safely above the true answer — `min(a, b, c) * n` is always enough since even the sparsest of the three sequences alone reaches its `n`-th multiple by then, and using `long`/64-bit arithmetic throughout avoids overflow since `lcm(a,b,c)` and `x/a` type computations can get large as `a, b, c` approach 10^9.

**Time complexity:** O(log(min(a,b,c) * n)) for the binary search, O(1) per feasibility check plus O(log(max value)) for the gcd computations (done once up front).

**Space complexity:** O(1) extra space.
