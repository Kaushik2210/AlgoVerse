# 350. Intersection of Two Arrays II

Given two integer arrays `nums1` and `nums2`, return an array of their intersection. Each element in the result must appear as many times as it shows up in both arrays (so duplicates matter here, unlike problem 349). The result can be in any order.

**Example 1:**
```
Input: nums1 = [1,2,2,1], nums2 = [2,2]
Output: [2,2]
```

**Example 2:**
```
Input: nums1 = [4,9,5], nums2 = [9,4,9,8]
Output: [4,9]
Explanation: [9,4] is also accepted.
```

**Constraints:**
- 1 <= nums1.length, nums2.length <= 1000

## Approach

Since duplicate counts now matter, plain sets throw away the exact information this problem needs. The fix is to count occurrences instead of just tracking presence — build a frequency map (`Counter` or a plain hash map) of every value in `nums1`, then walk `nums2` once: for each value that still has a positive remaining count in the map, add it to the result and decrement its count. Decrementing (rather than just checking membership) is what caps each value's appearances in the output at the minimum of its counts in the two arrays — once `nums1`'s supply of a value is used up, further occurrences of that value in `nums2` are correctly skipped.

To keep the hash map as small as possible, build it from the shorter of the two arrays and iterate over the longer one — a minor but easy optimization since it doesn't change the logic, only which array plays which role.

**Time complexity:** O(n + m) — one pass to build the frequency map, one pass to consume it while scanning the other array.

**Space complexity:** O(min(n, m)) for the frequency map, built from the smaller array.
