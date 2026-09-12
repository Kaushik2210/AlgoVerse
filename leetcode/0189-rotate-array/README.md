# 189. Rotate Array

Given an integer array `nums`, rotate it to the right by `k` steps, where `k` is non-negative. Do it in place, modifying `nums` directly.

**Example 1:**
```
Input: nums = [1,2,3,4,5,6,7], k = 3
Output: [5,6,7,1,2,3,4]
```

**Example 2:**
```
Input: nums = [-1,-100,3,99], k = 2
Output: [3,99,-1,-100]
```

**Constraints:**
- 1 <= nums.length <= 10^5
- -2^31 <= nums[i] <= 2^31 - 1
- 0 <= k <= 10^5

## Approach

A rotation by `k` moves the last `k` elements to the front and shifts everything else right, which is fiddly to do directly without extra buffers or O(n*k) shifting. There's a neat trick using three reversals that does it in place in linear time.

First, note `k` might be larger than the array length, so normalize with `k %= n` — rotating by `n` is a no-op, so only the remainder matters.

The reversal trick: reverse the entire array, then reverse the first `k` elements, then reverse the remaining `n - k` elements. Reversing the whole thing puts everything in reverse order, which correctly gets the target last-k-elements to the front, but each individual segment is now backwards internally — so reversing each of the two segments separately fixes the internal order back to normal while leaving the segments in their new (rotated) positions.

**Time complexity:** O(n) — three reversal passes, each linear, so still O(n) total.

**Space complexity:** O(1) — all reversals happen in place on the original array.
