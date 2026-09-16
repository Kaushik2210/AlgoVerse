# 89. Gray Code

**Commonly asked at:** Amazon

An n-bit gray code sequence is a list of `2^n` integers where each integer is in the range `[0, 2^n - 1]`, the first integer is 0, every integer appears exactly once, and each integer differs from the one before it (and the last differs from the first) by flipping exactly one bit. Given `n`, return any valid n-bit gray code sequence.

**Example 1:**
```
Input: n = 2
Output: [0,1,3,2]
Explanation:
00 - 0
01 - 1
11 - 3
10 - 2
Consecutive values (including 2 -> 0, wrapping around) differ by one bit.
```

**Example 2:**
```
Input: n = 1
Output: [0,1]
```

**Constraints:**
- 1 <= n <= 16

## Approach

There's a closed-form trick: the i-th value of the standard reflected binary gray code is `i ^ (i >> 1)`. Generating the sequence is then just computing this for every `i` from `0` to `2^n - 1`.

Why this works: converting a binary number to gray code by XORing it with itself shifted right by one means each output bit becomes "this bit XOR the bit just above it" in the original binary counting sequence. When you count from `i` to `i+1` in ordinary binary, only a run of trailing bits changes (a carry ripple), and it can be shown that the gray-coded versions of `i` and `i+1` always differ in exactly one bit, because the carry ripple's effect gets "absorbed" by the XOR-with-shifted-self construction — each step's binary increment flips one bit further up than the previous highest change, and the gray transform picks out just that one flip as the visible difference.

An equivalent, more visual construction (the reflect-and-prefix method) builds the n-bit sequence from the (n-1)-bit sequence: take the sequence for `n-1`, then append its reverse with a leading 1 bit (`2^(n-1)`) added to each reversed entry — because reversing preserves adjacency, and the join point differs only in the newly added high bit.

Either construction is verified by checking two things: every value in `[0, 2^n - 1]` appears exactly once, and each pair of consecutive values (with wraparound) differs in exactly one bit.

**Time complexity:** O(2^n) to generate all `2^n` values.

**Space complexity:** O(2^n) for the output list, O(1) extra beyond that.
