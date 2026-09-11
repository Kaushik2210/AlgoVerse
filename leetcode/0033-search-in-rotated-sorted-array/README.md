# 33. Search in Rotated Sorted Array

You're given a sorted array `nums` that's been rotated at some unknown pivot (e.g. `[0,1,2,4,5,6,7]` might become `[4,5,6,7,0,1,2]`). All values are distinct. Given a `target`, return its index, or `-1` if it isn't in the array. You must do it in O(log n) time.

**Example 1:**
```
Input: nums = [4,5,6,7,0,1,2], target = 0
Output: 4
```

**Example 2:**
```
Input: nums = [4,5,6,7,0,1,2], target = 3
Output: -1
```

**Constraints:**
- 1 <= nums.length <= 5000
- All values of `nums` are unique
- `nums` is an ascending array that's possibly rotated

## Approach

A plain linear scan would find the target in O(n), but the O(log n) requirement rules that out — and it also throws away the fact that the array is still "sorted", just cut and rejoined at some point.

The trick: at any midpoint, even though the whole array isn't sorted, at least one of the two halves around that midpoint always is. So do a modified binary search — at each step, first figure out which half (left of mid, or right of mid) is the properly sorted one by comparing `nums[lo]` to `nums[mid]`. Once you know which half is sorted, it's easy to check whether the target could be sitting inside that sorted half's value range. If it is, recurse into that half; if it's not, the target has to be in the other (rotated) half, so recurse there instead.

Each step still eliminates half the search space, exactly like standard binary search — it just takes one extra comparison per step to figure out which half is trustworthy.

**Time complexity:** O(log n) — binary search with a constant amount of extra work per step.

**Space complexity:** O(1) — iterative, just a couple of pointers.
