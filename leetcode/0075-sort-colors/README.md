# 75. Sort Colors

You're given an array `nums` with `n` objects colored red, white, or blue, represented by the integers `0`, `1`, and `2`. Sort them in place so that same-colored objects are grouped together in the order red, white, blue — without using a library sort function.

**Example 1:**
```
Input: nums = [2,0,2,1,1,0]
Output: [0,0,1,1,2,2]
```

**Example 2:**
```
Input: nums = [2,0,1]
Output: [0,1,2]
```

**Constraints:**
- n == nums.length
- 1 <= n <= 300
- nums[i] is 0, 1, or 2

## Approach

Sorting with a general-purpose comparison sort would be O(n log n), but with only three distinct values there's a much faster way — this is the classic "Dutch national flag" problem. A simple version counts how many 0s, 1s, and 2s there are, then overwrites the array in two passes; that works, but it's possible to do it in a single pass with three pointers.

Keep three pointers: `low` marks the boundary before which everything is a confirmed 0, `high` marks the boundary after which everything is a confirmed 2, and `mid` scans through the unexamined middle region. At each step, look at `nums[mid]`. If it's a 0, swap it out to the `low` boundary and advance both `low` and `mid` (the swapped-in value at `mid` is already known to be a 1, since everything before `mid` was previously scanned). If it's a 1, it's already in the right zone, just advance `mid`. If it's a 2, swap it out to the `high` boundary and shrink `high` — but don't advance `mid` here, because the value swapped in from the `high` end hasn't been looked at yet and could be a 0, 1, or 2 itself.

The loop stops once `mid` passes `high`, at which point everything from `low` to `high` has been resolved and the whole array is partitioned into three correctly ordered zones.

**Time complexity:** O(n) — a single pass, `mid` only moves forward (or the window shrinks from the `high` side), so the total number of comparisons is bounded by n.

**Space complexity:** O(1) — sorted in place with three pointers, no extra storage.
