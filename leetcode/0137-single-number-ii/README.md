# 137. Single Number II

Given an integer array `nums` where every element appears exactly three times except for one, which appears exactly once, find and return that single element. The algorithm must run in linear time and use only constant extra space.

**Example 1:**
```
Input: nums = [2,2,3,2]
Output: 3
```

**Example 2:**
```
Input: nums = [0,1,0,1,0,1,99]
Output: 99
```

**Constraints:**
- 1 <= nums.length <= 3 * 10^4
- -2^31 <= nums[i] <= 2^31 - 1
- Each element appears exactly three times except one, which appears once

## Approach

A plain XOR of everything (the trick from Single Number, 136) doesn't work here, since XOR only cancels pairs — a value appearing three times XORs down to itself, not to zero, so it doesn't isolate the unique number.

The idea instead: look at things one bit position at a time. For any fixed bit position, sum up how many numbers in the array have a 1 in that position. If every number appeared exactly 3 times, that count would always be a multiple of 3. Since exactly one number breaks the pattern, the actual count mod 3 tells you whether the answer has a 1 in that bit (remainder 1) or a 0 (remainder 0). Doing this for all 32 bit positions and assembling the results reconstructs the answer bit by bit.

A slicker constant-space version tracks the running counts mod 3 directly with two bitmasks, `ones` and `twos`, instead of counting per bit with a loop over 32 positions each time. `ones` holds the bits that have appeared exactly once so far (mod 3), `twos` holds the bits that have appeared exactly twice so far (mod 3). For each new number `n`: update `ones = (ones ^ n) & ~twos` (a bit flips into "seen once" unless it was already at "seen twice", in which case it should clear out) and `twos = (twos ^ n) & ~ones` (symmetric logic using the just-updated `ones`). After processing every number, any bit that occurred a multiple of 3 times cancels back to 0 in both masks, and `ones` ends up holding exactly the bits of the number that appeared once.

**Time complexity:** O(n) — one pass through the array (with an inner loop of fixed size 32 for the bit-counting version, so still O(n) overall).

**Space complexity:** O(1) — a constant number of integer variables.
