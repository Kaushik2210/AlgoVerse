# 496. Next Greater Element I

You're given two arrays `nums1` and `nums2` without duplicates, where `nums1` is a subset of `nums2`. For each element in `nums1`, find its "next greater element" in `nums2`: the first element to its right in `nums2` that's strictly greater. If there isn't one, use -1. Return the answers for `nums1` in order, as an array.

**Example 1:**
```
Input: nums1 = [4,1,2], nums2 = [1,3,4,2]
Output: [-1,3,-1]
Explanation:
- 4 is at index 2 in nums2, nothing to its right is greater, so -1.
- 1 is at index 0 in nums2, the next greater to the right is 3.
- 2 is at index 3 in nums2, it's the last element, so -1.
```

**Example 2:**
```
Input: nums1 = [2,4], nums2 = [1,2,3,4]
Output: [3,-1]
```

**Constraints:**
- 1 <= nums1.length <= nums1.length <= 1000
- nums1 and nums2 consist of distinct integers
- All integers in nums1 also appear in nums2

## Approach

The "next greater element to the right" part is exactly the same monotonic-stack pattern as Daily Temperatures, just applied to `nums2` instead of a temperature list, and producing values instead of distances.

Walk `nums2` once with a stack kept in decreasing order. When the current value is greater than the value at the top of the stack, that top value has just found its next greater element — pop it and record `next_greater[value] = current_value` in a hashmap. Keep popping while the current value beats the new top. Push the current value once done resolving.

Anything left on the stack at the end never finds a next greater element, so it's implicitly -1 (the hashmap just won't have an entry, or fill defaults first).

Once the map is built for all of `nums2`, answering `nums1` is a simple O(1) lookup per element — map lookups default to -1 for anything not found.

**Time complexity:** O(n + m) where n = len(nums2) (one pass with the stack) and m = len(nums1) (lookups).

**Space complexity:** O(n) for the stack and the hashmap.
