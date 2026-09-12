# 190. Reverse Bits

Given a 32-bit unsigned integer `n`, reverse the order of its bits and return the resulting unsigned integer.

**Example 1:**
```
Input: n = 00000010100101000001111010011100
Output: 964176192 (00111001011110000010100101000000)
Explanation: The input binary string represents the unsigned integer 43261596,
so return 964176192 which its binary representation is 00111001011110000010100101000000.
```

**Example 2:**
```
Input: n = 11111111111111111111111111111101
Output: 3221225471 (10111111111111111111111111111111)
```

**Constraints:**
- The input is a binary string of length 32

## Approach

The core idea is simple: go through the 32 bits of `n` one at a time from the least significant end, and build the result by shifting each bit into the opposite end. For each of the 32 positions, take the lowest bit of `n` (`n & 1`), shift the accumulated result left by one to make room, OR in that bit, then shift `n` right by one to expose the next bit.

The trap is language-specific. In Java and C++, integers are fixed-width (32-bit), so shifting naturally wraps and stays within 32 bits with no extra work — the built-in overflow behavior does the masking for you. Python integers, though, are arbitrary precision with no fixed width, so a left shift can silently grow the value beyond 32 bits, and there's no implicit wraparound. That means the Python version needs an explicit `& 0xFFFFFFFF` mask on the result to force it back into the 32-bit unsigned range — a very easy thing to overlook coming from a fixed-width-integer language.

**Time complexity:** O(1) — always exactly 32 iterations, independent of the input value.

**Space complexity:** O(1) — a constant number of integer variables.
