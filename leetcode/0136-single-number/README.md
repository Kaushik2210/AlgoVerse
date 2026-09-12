# 136. Single Number

You're given a non-empty array of integers `nums` where every element appears exactly twice except for one, which appears only once. Find that single element. You must do it with linear runtime and without using extra memory beyond a constant amount.

**Example 1:**
```
Input: nums = [2, 2, 1]
Output: 1
```

**Example 2:**
```
Input: nums = [4, 1, 2, 1, 2]
Output: 4
```

**Constraints:**
- 1 <= nums.length <= 3 * 10^4
- Every element appears twice except one, which appears once

## Approach

The obvious first idea is a hash map counting frequencies, then scanning for the value with count 1 — that's O(n) time but also O(n) space, which the constant-space requirement rules out.

The constant-space trick is XOR. XOR has two properties that make this work: `x ^ x = 0` (a number cancels itself out), and it's commutative/associative, so order doesn't matter. If you XOR every number in the array together, every value that appears twice cancels itself out to 0, and XOR-ing with 0 doesn't change anything. Whatever's left standing at the end is the one number that never had a partner to cancel it out.

So just walk the array once, keeping a running XOR of everything seen so far, and return it at the end.

**Time complexity:** O(n) — one pass over the array.

**Space complexity:** O(1) — a single accumulator variable.
