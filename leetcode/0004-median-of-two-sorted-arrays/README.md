# 4. Median of Two Sorted Arrays

**Commonly asked at:** Google, Amazon, Microsoft, Apple

Given two sorted arrays `nums1` and `nums2` of sizes `m` and `n`, return the median of the combined sorted array. Must run in O(log(m+n)) time.

**Example 1:**
```
Input: nums1 = [1,3], nums2 = [2]
Output: 2.0
Explanation: merged = [1,2,3], median is 2
```

**Example 2:**
```
Input: nums1 = [1,2], nums2 = [3,4]
Output: 2.5
Explanation: merged = [1,2,3,4], median is (2+3)/2
```

**Constraints:**
- 0 <= m, n (not both zero)
- Arrays are sorted in ascending order

## Approach

Merging the two arrays and reading off the middle gives the median in O(m+n), which already beats naively sorting the concatenation, but it's still not the O(log(m+n)) the problem demands. Getting to logarithmic time means never actually building the merged array — instead, binary search directly for the *partition point* that splits the combined array into a left half and a right half of the correct sizes.

Picture cutting each array with a vertical line: `nums1` is cut after its first `i` elements, `nums2` after its first `j` elements. If `i + j` equals half the combined length (rounding for odd totals), everything to the left of both cuts is exactly the left half of the merged array, and everything to the right is the right half — you never need to know the internal order between the two arrays, only that the cuts line up correctly.

That "line up correctly" condition is: the largest element left of the cut in `nums1` must be `<= ` the smallest element right of the cut in `nums2`, and symmetrically the largest element left of the cut in `nums2` must be `<=` the smallest element right of the cut in `nums1`. Binary search `i` (the cut in the smaller array, to keep the search space small) over `[0, m]`; once `i` is fixed, `j = (m + n + 1) // 2 - i` is forced algebraically so the left half always has the right size. At each candidate `i`, check the four boundary values (using `-infinity`/`+infinity` sentinels when a cut lands at an array's edge so there's no out-of-bounds special-casing):

- If `nums1[i-1] > nums2[j]`, `i` is too far right — search the left half by shrinking `hi = i - 1`.
- If `nums2[j-1] > nums1[i]`, `i` is too far left — search the right half by growing `lo = i + 1`.
- Otherwise the cut is valid: the median is `max(nums1[i-1], nums2[j-1])` if the total length is odd, or the average of that max and `min(nums1[i], nums2[j])` if even.

Always binary searching over the smaller array keeps `O(log(min(m, n)))`, which satisfies the required bound. Always swapping so `nums1` is the smaller array up front avoids `j` ever going negative or exceeding `n`.

**Time complexity:** O(log(min(m, n))) — binary search over the smaller array's partition point.

**Space complexity:** O(1) — no merged array is ever built.
