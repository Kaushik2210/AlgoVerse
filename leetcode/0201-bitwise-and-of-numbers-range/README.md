# 201. Bitwise AND of Numbers Range

Given two integers `left` and `right`, return the bitwise AND of all the numbers in the inclusive range `[left, right]`.

**Example 1:**
```
Input: left = 5, right = 7
Output: 4
Explanation: 5 & 6 & 7 = 101 & 110 & 111 = 100 = 4
```

**Example 2:**
```
Input: left = 0, right = 0
Output: 0
```

**Example 3:**
```
Input: left = 1, right = 2147483647
Output: 0
```

**Constraints:**
- 0 <= left <= right <= 2^31 - 1

## Approach

ANDing a huge range of consecutive numbers together one at a time is technically possible but can mean looping over billions of values, so it's not really an option once the range gets large — there has to be a shortcut based on what AND actually does to bit patterns.

The key observation: as soon as two numbers in the range disagree on some bit, every number that comes after in the range will eventually take both a 0 and a 1 in that position too (because as you count upward through a full range, low bits flip constantly), so that bit position is guaranteed to be zeroed out in the final AND. The only bits that survive are the ones that are identical across every number in `[left, right]` — and those are exactly the common leading bits that `left` and `right` already share.

So the problem reduces to: find the common binary prefix of `left` and `right`, and zero out everything after it. Do that by right-shifting both numbers together, one bit at a time, until they become equal — at that point you're looking at their shared prefix. Count how many shifts it took, then shift that shared value back to the left by the same amount to restore it to its original bit positions (with everything after the prefix filled with zeros).

**Time complexity:** O(log(right)) — at most 31 shifts since the numbers fit in a 32-bit signed int.

**Space complexity:** O(1).
