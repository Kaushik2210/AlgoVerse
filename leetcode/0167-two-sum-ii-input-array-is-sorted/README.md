# 167. Two Sum II - Input Array Is Sorted

Given a 1-indexed array of integers `numbers` that is already sorted in non-decreasing order, find two numbers that add up to `target`. Return the indices (1-indexed) as `[index1, index2]` where `index1 < index2`. You must use only constant extra space, and you can assume exactly one solution exists.

**Example 1:**
```
Input: numbers = [2, 7, 11, 15], target = 9
Output: [1, 2]
Explanation: 2 + 7 = 9, so index1 = 1, index2 = 2
```

**Example 2:**
```
Input: numbers = [2, 3, 4], target = 6
Output: [1, 3]
```

**Constraints:**
- 2 <= numbers.length <= 3 * 10^4
- -1000 <= numbers[i] <= 1000
- numbers is sorted in non-decreasing order
- -1000 <= target <= 1000
- Exactly one valid answer exists

## Approach

This is Two Sum (1) again, but the sortedness is a gift that lets you drop the hash map entirely and hit the O(1)-extra-space requirement. With a sorted array, a two-pointer sweep from both ends works: start `left` at the beginning and `right` at the end. Compute `numbers[left] + numbers[right]`.

- If it equals the target, you've found the pair — return the indices.
- If it's too small, the only way to increase the sum is to move `left` up (since the array is sorted, any smaller-indexed pairing with the current `left` is even smaller, so `left` needs to grow).
- If it's too large, move `right` down for the mirrored reason.

Each step eliminates at least one index from consideration for good, so the pointers converge toward the answer without ever needing to revisit a position. Remember to convert to 1-indexed output at the end.

**Time complexity:** O(n) — the two pointers together traverse the array at most once.

**Space complexity:** O(1) — just the two pointer variables, no auxiliary data structures.
