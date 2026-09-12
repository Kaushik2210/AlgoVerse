# 258. Add Digits

Given an integer `num`, repeatedly add all its digits until the result has only one digit, and return it.

**Example 1:**
```
Input: num = 38
Output: 2
Explanation: 3 + 8 = 11, then 1 + 1 = 2. Since 2 has only one digit, return it.
```

**Example 2:**
```
Input: num = 0
Output: 0
```

**Constraints:**
- 0 <= num <= 2^31 - 1

## Approach

The literal way to do this is to sum the digits of `num`, then repeat on the result, looping until what's left is a single digit — a small `while num >= 10` loop with an inner digit-summing loop. That's correct and cheap given the input size, but it's worth calling out what's actually going on, because there's a constant-time shortcut hiding underneath.

Repeatedly summing digits until one remains is exactly the "digital root" of a number, and the digital root has a clean closed form tied to modular arithmetic base 9: a number and the sum of its digits always differ by a multiple of 9 (since each digit's place value is `10^k = (9+1)^k ≡ 1 (mod 9)`), so digit-summing never changes a number's value mod 9. That means the digital root is just `num mod 9`, with two edge cases: `num = 0` maps to `0` itself, and any positive multiple of 9 maps to `9` rather than `0` (since the process stops only once a single digit between 1 and 9 remains, and 0 only shows up for the input 0 itself). Folding that in: `0` if `num == 0`, otherwise `1 + (num - 1) % 9`.

**Time complexity:** O(1) with the digital-root formula, versus O(log num) per digit-sum pass (and a handful of passes) for the direct simulation.

**Space complexity:** O(1).
