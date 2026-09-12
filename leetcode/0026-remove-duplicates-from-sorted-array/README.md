# 26. Remove Duplicates from Sorted Array

You're given an integer array `nums` sorted in non-decreasing order. Remove the duplicates in place so each unique value appears only once, keeping the relative order, and return the count of unique values `k`. The first `k` elements of `nums` should hold the final result.

**Example 1:**
```
Input: nums = [1,1,2]
Output: 2, nums = [1,2,_]
```

**Example 2:**
```
Input: nums = [0,0,1,1,1,2,2,3,3,4]
Output: 5, nums = [0,1,2,3,4,_,_,_,_,_]
```

**Constraints:**
- 1 <= nums.length <= 3*10^4
- nums is sorted in non-decreasing order

## Approach

Because the array is sorted, all duplicates of a value are guaranteed to sit next to each other — no need for a hash set to track what's been seen.

Use two pointers: `slow` marks the last position in the "cleaned" prefix of the array, and `fast` scans ahead looking for the next genuinely new value. Since `nums` is sorted, `nums[fast] != nums[slow]` is exactly the condition for "this is a value we haven't placed yet." Whenever that's true, advance `slow` by one and copy `nums[fast]` into that spot — overwriting a duplicate that's already been accounted for.

By the end, everything from index 0 to `slow` holds each unique value exactly once, in order, and `slow + 1` is the count of unique values.

**Time complexity:** O(n) — `fast` sweeps the array exactly once.

**Space complexity:** O(1) — modifies the array in place with two integer pointers, no extra structure.
