# 260. Single Number III

Given an integer array `nums` where exactly two elements appear only once and every other element appears exactly twice, find the two elements that appear only once. Return them in any order.

**Example 1:**
```
Input: nums = [1,2,1,3,2,5]
Output: [3,5]
Explanation: [5,3] is also accepted
```

**Example 2:**
```
Input: nums = [-1,0]
Output: [-1,0]
```

**Constraints:**
- 2 <= nums.length <= 3 * 10^4
- Each element appears twice except two, which appear once
- 1 <= number of elements appearing once <= 2

## Approach

Plain XOR (the trick from Single Number, 136) still gets you partway there: XORing every number in the array cancels out all the pairs, leaving `xor_all = a ^ b`, where `a` and `b` are the two unique numbers. The problem is that this single combined value mixes the two answers together — the challenge is separating `a` from `b` without knowing either one yet.

The key insight: since `a != b`, `xor_all` must have at least one bit set to 1, and any bit that's set represents a position where `a` and `b` differ. Pick any one such bit — the standard trick is to isolate the lowest set bit with `xor_all & (-xor_all)` (two's complement makes this grab exactly the rightmost 1 bit). That bit can be used as a splitter: every number in the array either has a 1 in that position or a 0. Since `a` and `b` differ there by construction, they land in different groups. Every *paired* number, on the other hand, has both of its copies land in the *same* group, since they're identical — so within each group, all the true duplicates still cancel out via XOR, and each group is left holding exactly one of the two unique numbers.

So: partition the array into two groups by that bit, XOR each group independently, and the two results are `a` and `b`.

**Time complexity:** O(n) — a constant number of passes over the array.

**Space complexity:** O(1) — no extra data structures, just a few integers.
