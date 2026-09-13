# 34. Find First and Last Position of Element in Sorted Array

Given a sorted array of integers `nums` (which may contain duplicates) and a `target`, return the starting and ending index of `target` in the array. If `target` isn't found, return `[-1, -1]`. Must run in O(log n) time.

**Example 1:**
```
Input: nums = [5,7,7,8,8,10], target = 8
Output: [3,4]
```

**Example 2:**
```
Input: nums = [5,7,7,8,8,10], target = 6
Output: [-1,-1]
```

**Example 3:**
```
Input: nums = [], target = 0
Output: [-1,-1]
```

## Approach

A linear scan finds both boundaries in O(n), but the O(log n) requirement on a sorted array is the tell for binary search — the trick is that one binary search only ever finds *a* occurrence of the target, not necessarily the first or last one when duplicates are involved. The fix is to run two separate, slightly different binary searches: one biased to find the leftmost occurrence, one biased to find the rightmost.

**Leftmost bound:** binary search for the first index where `nums[i] >= target`. Whenever `nums[mid] >= target`, the leftmost occurrence could be at `mid` or earlier, so pull `hi = mid`; otherwise push `lo = mid + 1`. When the loop ends, `lo` points at the first index `>= target` — check it actually equals `target` (otherwise target isn't present).

**Rightmost bound:** binary search for the first index where `nums[i] > target`, then subtract one. Same shape of loop, but the comparison is `nums[mid] > target` instead of `>=`. The result minus 1 is the last index equal to `target`.

Both searches are independent O(log n) passes over the same array, so the whole thing stays O(log n) overall. An empty array is handled for free since the loop simply never executes and the bounds check catches it.

**Time complexity:** O(log n) — two binary searches.

**Space complexity:** O(1).
