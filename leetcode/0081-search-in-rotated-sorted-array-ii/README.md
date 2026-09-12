# 81. Search in Rotated Sorted Array II

You're given an integer array `nums`, sorted in non-decreasing order but then rotated at some unknown pivot, and it may contain duplicates. Given a `target`, return `true` if it exists in `nums`, `false` otherwise.

**Example 1:**
```
Input: nums = [2,5,6,0,0,1,2], target = 0
Output: true
```

**Example 2:**
```
Input: nums = [2,5,6,0,0,1,2], target = 3
Output: false
```

**Constraints:**
- 1 <= nums.length <= 5000
- -10^4 <= nums[i], target <= 10^4
- `nums` is guaranteed to be rotated at some pivot
- Duplicates are allowed

## Approach

The brute-force answer is a linear scan, O(n), and it always works regardless of duplicates. But the array is "almost sorted," so binary search should still get you O(log n) most of the time — the catch is that duplicates can break the usual trick of figuring out which half is sorted.

In the duplicate-free version (33), you can always tell which half of `[left, mid, right]` is properly sorted by comparing `nums[left]` and `nums[mid]`. With duplicates, that comparison becomes useless in the specific case where `nums[left] == nums[mid] == nums[right]` — the values on both ends and the middle all tie, so you genuinely can't tell whether the sorted run is on the left or right (e.g. `[1,1,1,0,1,1,1]` vs `[1,1,1,1,1,1,1]` look identical at these three positions). The only safe move there is to shrink the search window from both ends by one (`left += 1`, `right -= 1`) and try again — this is what can degrade worst-case time to O(n), e.g. an array of all-identical values.

Outside that ambiguous case, the logic is the same as the clean rotated-search problem: if `nums[left] <= nums[mid]`, the left half is sorted, so check whether `target` falls in `[nums[left], nums[mid])`; if it does, binary search left, else search right. If instead the right half is sorted, check whether `target` falls in `(nums[mid], nums[right]]`; if it does, search right, else search left.

**Time complexity:** O(log n) average case; O(n) worst case when many duplicates force the linear shrink.

**Space complexity:** O(1).
