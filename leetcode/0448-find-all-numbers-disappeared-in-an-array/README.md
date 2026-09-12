# 448. Find All Numbers Disappeared in an Array

You're given an array `nums` of `n` integers where each value is between 1 and `n` (inclusive), but some values appear more than once while others don't appear at all. Return every number in the range `[1, n]` that is missing from `nums`, without using any extra space beyond the output array.

**Example 1:**
```
Input: nums = [4,3,2,7,8,2,3,1]
Output: [5,6]
```

**Example 2:**
```
Input: nums = [1,1]
Output: [2]
```

**Constraints:**
- n == nums.length
- 1 <= n <= 10^5
- 1 <= nums[i] <= n

## Approach

The naive fix is a hash set of everything seen, then scanning `[1, n]` for what's missing — that works but uses O(n) extra space, which the problem is nudging you away from.

Since every value is guaranteed to fall in `[1, n]`, the array itself can double as a hash set: value `v` "belongs" at index `v - 1`. Walk through the array once, and for every value `x` you see, go to index `abs(x) - 1` and negate whatever is there (using `abs(x)` because a value may have already been negated by an earlier duplicate). Negating in place is a way of marking "the number at this index-plus-one exists somewhere in the array" without needing a separate structure.

After this pass, any index still holding a positive number means its corresponding number `index + 1` was never marked — i.e. it never appeared in the original array. Collect those.

Optionally restore the array's signs afterward if you don't want to mutate the input's meaning — the problem only asks for the output, so this solution leaves it negated in place.

**Time complexity:** O(n) — two linear passes: one to mark, one to collect.

**Space complexity:** O(1) extra, not counting the output array — the input array itself is reused as the marker structure.
