# 442. Find All Duplicates in an Array

You're given an integer array `nums` of length `n` where every value is in the range `[1, n]`, and each value appears either once or twice. Return every value that appears exactly twice, using only O(1) extra space beyond the output array.

**Example 1:**
```
Input: nums = [4,3,2,7,8,2,3,1]
Output: [2,3]
```

**Example 2:**
```
Input: nums = [1,1,2]
Output: [1]
```

**Example 3:**
```
Input: nums = [1]
Output: []
```

**Constraints:**
- n == nums.length
- 1 <= n <= 10^5
- 1 <= nums[i] <= n

## Approach

This uses the same "array as its own hash set" trick as the disappeared-numbers problem — each value `v` in `[1, n]` naturally maps to index `v - 1`.

Walk through the array once. For each value `x`, look at index `abs(x) - 1`. If the value sitting there is already negative, that means some earlier element already pointed to this same index — in other words, `abs(x)` has been seen before, so it's a duplicate; add `idx + 1` to the result. Otherwise, negate `nums[idx]` to mark "the value idx+1 has now been seen once."

Using `abs(x)` at every step matters, since by the time you reach the second occurrence of a value, the array might have already flipped the sign of the very slot you're now reading `x` from.

**Time complexity:** O(n) — one pass, with O(1) work per element.

**Space complexity:** O(1) extra, not counting the output array — duplicates are detected by mutating the input in place.
