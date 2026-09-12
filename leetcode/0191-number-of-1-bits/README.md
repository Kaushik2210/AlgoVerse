# 191. Number of 1 Bits

Given a positive integer `n`, write a function that returns the number of set bits (the Hamming weight) in its binary representation.

**Example 1:**
```
Input: n = 11 (binary: 1011)
Output: 3
```

**Example 2:**
```
Input: n = 128 (binary: 10000000)
Output: 1
```

**Example 3:**
```
Input: n = 2147483645 (binary: 1111111111111111111111111111101)
Output: 30
```

**Constraints:**
- 1 <= n <= 2^31 - 1

## Approach

The straightforward way is to check the lowest bit (`n & 1`), add it to a counter, and shift `n` right by one, repeating until `n` is 0 — 32 iterations at most for a 32-bit number.

A faster trick uses `n & (n - 1)`, which clears the lowest set bit of `n` in a single operation (subtracting 1 flips all the trailing zeros to ones and the lowest set bit to zero, so ANDing with the original clears exactly that bit and nothing else). Repeating `n = n & (n - 1)` and counting how many times it takes to reach 0 gives the count of set bits directly — the loop only runs once per set bit, which is faster than the naive approach whenever the number is sparse (few 1s).

Either approach is correct and runs in effectively constant time for a fixed-width integer; the `n & (n - 1)` trick is just the more elegant, commonly-expected version in interviews.

**Time complexity:** O(k) where k is the number of set bits (at most 32) — each iteration clears exactly one set bit.

**Space complexity:** O(1) — a single counter variable.
