# 283. Move Zeroes

You're given an integer array `nums`. Move all the zeroes to the end of the array while keeping the relative order of the non-zero elements, doing it in place without making a copy of the array.

**Example 1:**
```
Input: nums = [0,1,0,3,12]
Output: [1,3,12,0,0]
```

**Example 2:**
```
Input: nums = [0]
Output: [0]
```

**Constraints:**
- 1 <= nums.length <= 10^4

## Approach

This is a two-pointer partitioning problem: everything before `slow` should end up non-zero, everything from `slow` onward hasn't been decided yet.

`fast` scans through the whole array. Whenever it finds a non-zero value, that value belongs in the non-zero region, so swap it into position `slow` and advance `slow`. If `nums[fast]` is already at `slow` (no zeros seen yet), the swap is a harmless no-op; once a zero has been skipped over, the swap is what pulls the next non-zero value forward while pushing the zero back toward the end.

Swapping instead of just overwriting is what keeps this correct without extra bookkeeping — the zero that gets displaced by the swap simply lands wherever `nums[fast]` used to be, which is always further right than `slow`, so it naturally drifts toward the end as the algorithm continues.

**Time complexity:** O(n) — one pass with two pointers.

**Space complexity:** O(1) — done in place with a couple of index variables.
