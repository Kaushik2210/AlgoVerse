# 371. Sum of Two Integers

Given two integers `a` and `b`, return their sum without using the `+` or `-` operators.

**Example 1:**
```
Input: a = 1, b = 2
Output: 3
```

**Example 2:**
```
Input: a = 2, b = 3
Output: 5
```

**Constraints:**
- -1000 <= a, b <= 1000

## Approach

Addition without `+` comes down to simulating what hardware adders do with bitwise operations. At each bit position, XOR of the two bits gives the sum ignoring any carry (since XOR is exactly "1 if the bits differ, which is where addition produces a 1 with no carry needed"), while AND of the two bits gives exactly the positions that generate a carry into the next bit. That carry then needs to be shifted left one position and folded back in the same way. Repeat — XOR to get the running sum, AND-then-shift to get the new carry — until there's no carry left to add, and the result is the final sum.

In a language with fixed-width integers this loop terminates naturally at the word size. Python integers are arbitrary precision and don't wrap, so left-shifting a negative number's bit pattern would never settle into a fixed 32-bit cycle on its own — the loop needs explicit 32-bit masking (`0xFFFFFFFF`) on every intermediate value to emulate two's-complement overflow, plus a final sign-correction step: if the 32-bit masked result's top bit is set, interpret it as a negative number by subtracting `2^32` before returning.

**Time complexity:** O(1) — at most 32 iterations since the carry always eventually clears within a fixed bit width.

**Space complexity:** O(1).
