# 88. Merge Sorted Array

You're given two sorted integer arrays `nums1` and `nums2`, with `m` and `n` representing the number of real elements in each. `nums1` has a length of `m + n`, with the last `n` slots padded with zeros to leave room for `nums2`'s elements. Merge `nums2` into `nums1` in place so the result is one sorted array.

**Example 1:**
```
Input: nums1 = [1,2,3,0,0,0], m = 3, nums2 = [2,5,6], n = 3
Output: [1,2,2,3,5,6]
```

**Example 2:**
```
Input: nums1 = [1], m = 1, nums2 = [], n = 0
Output: [1]
```

**Example 3:**
```
Input: nums1 = [0], m = 0, nums2 = [1], n = 1
Output: [1]
```

**Constraints:**
- nums1.length == m + n
- nums2.length == n
- 0 <= m, n <= 200

## Approach

Merging from the front looks natural since both arrays are already sorted ascending, but that means constantly shifting `nums1`'s real elements out of the way to make room — expensive, and defeats the point of merging in place.

The fix is to merge from the **back** instead. `nums1` has exactly `m + n` slots and its last `n` are empty padding, so there's always free space at the end to write into without overwriting anything not yet read. Use three pointers: `i` at the last real element of `nums1` (index `m - 1`), `j` at the last element of `nums2` (index `n - 1`), and `k` at the very last slot of `nums1` (index `m + n - 1`).

At each step, compare `nums1[i]` and `nums2[j]`, place the bigger one at `nums1[k]`, and move that pointer (and `k`) back one. Keep going until `nums2` is fully placed (`j < 0`) — at that point, if there's still anything left in `nums1`, it's already in the correct spot and doesn't need to move. There's no need for a symmetric "while i >= 0" loop.

**Time complexity:** O(m + n) — each element from both arrays is placed exactly once.

**Space complexity:** O(1) — merged in place using only pointers, no auxiliary array.
