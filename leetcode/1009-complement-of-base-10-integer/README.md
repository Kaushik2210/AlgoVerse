# 1009. Complement of Base 10 Integer

The complement of a number is found by flipping every bit in its binary representation — every 0 becomes a 1 and every 1 becomes a 0. Given an integer `n`, return its complement.

**Example 1:**
```
Input: n = 5
Output: 2
Explanation: 5 is 101 in binary, flipping gives 010, which is 2
```

**Example 2:**
```
Input: n = 7
Output: 0
Explanation: 7 is 111 in binary, flipping gives 000, which is 0
```

**Example 3:**
```
Input: n = 10
Output: 5
Explanation: 10 is 1010 in binary, flipping gives 0101, which is 5
```

**Constraints:**
- 0 <= n < 10^9

## Approach

Flipping every bit of `n` is the same as computing `mask - n`, where `mask` is a number whose binary form is all 1s spanning exactly the bit width of `n` — because XORing with an all-1s mask of the right width flips every bit within that width, and `mask ^ n` equals `mask - n` when `n`'s bits are a subset of `mask`'s bits (which they are, by construction).

So the only real work is finding the smallest all-1s mask that's >= n: start with mask = 1 and keep doubling and adding 1 (or equivalently shifting left and OR-ing 1) until `mask >= n`. Then the answer is `mask ^ n` (equivalently `mask - n`).

Special case: n = 0. Its binary representation is a single bit `0`, so the complement should be `1`, not 0 — a mask of all 1s over "zero bits" would incorrectly stay 0, so this needs to be handled directly.

**Time complexity:** O(log n) to build the mask by doubling.

**Space complexity:** O(1).
