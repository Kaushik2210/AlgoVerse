# 693. Binary Number with Alternating Bits

Given a positive integer `n`, check whether its binary representation has adjacent bits that always alternate — no two consecutive bits are the same.

**Example 1:**
```
Input: n = 5
Output: true
Explanation: 5 in binary is 101, bits alternate 1-0-1
```

**Example 2:**
```
Input: n = 7
Output: false
Explanation: 7 in binary is 111, the last two bits are both 1
```

**Example 3:**
```
Input: n = 11
Output: false
Explanation: 11 in binary is 1011
```

**Constraints:**
- 1 <= n <= 2^31 - 1

## Approach

A number alternates bit-by-bit exactly when shifting it right by one and XORing with the original produces all 1s in the positions that mattered — because XORing two adjacent bits that differ always gives 1, and two adjacent bits that are equal gives 0. So `n ^ (n >> 1)` turns every "these two neighbors differ" check into a 1 bit, for every pair of adjacent bits in `n`.

If the original number alternates all the way through, this XOR result is a solid run of 1s from the lowest bit up through one past the highest bit of `n` — i.e. it's of the form `111...1`, which is exactly `2^k - 1` for some k. A number `m` of that all-ones form has a handy property: `m & (m + 1) == 0`, since `m + 1` rolls it over to a single 1 followed by all zeros, leaving no overlapping bits with `m`.

So the whole check is: compute `x = n ^ (n >> 1)`, then verify `x & (x + 1) == 0`.

**Time complexity:** O(1) — a fixed number of bit operations regardless of n's size.

**Space complexity:** O(1).
