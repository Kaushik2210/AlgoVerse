# 461. Hamming Distance

**Commonly asked at:** Amazon

Given two integers `x` and `y`, return the Hamming distance between them — the number of positions at which their binary representations differ.

**Example 1:**
```
Input: x = 1, y = 4
Output: 2
Explanation: 1 = 0001, 4 = 0100, they differ in bit 0 and bit 2
```

**Example 2:**
```
Input: x = 3, y = 1
Output: 1
Explanation: 3 = 011, 1 = 001, they differ only in bit 1
```

**Constraints:**
- 0 <= x, y <= 2^31 - 1

## Approach

Two numbers differ at a bit position exactly where their XOR has a 1 bit — XOR is 1 only when the two input bits disagree. So `x ^ y` packs every differing position into a single number as a 1 bit, and the Hamming distance is just the count of 1 bits (the population count) in that XOR result.

Counting set bits can be done bit by bit with a shift-and-mask loop, but a faster way is Brian Kernighan's trick: repeatedly clear the lowest set bit with `v & (v - 1)` and count how many clears it takes to reach zero — this loops once per 1 bit rather than once per bit position.

**Time complexity:** O(k) where k is the number of set bits in `x ^ y`, bounded by 32.

**Space complexity:** O(1).
