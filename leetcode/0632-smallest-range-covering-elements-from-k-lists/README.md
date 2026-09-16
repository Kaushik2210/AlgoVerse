# 632. Smallest Range Covering Elements from K Lists

**Commonly asked at:** Google, Facebook

You're given `k` lists of integers, each sorted in non-decreasing order. Find the smallest range `[start, end]` such that it contains at least one number from each of the `k` lists. If there are multiple ranges of the same smallest width, return any one of them.

**Example 1:**
```
Input: nums = [[4,10,15,24,26],[0,9,12,20],[5,18,22,30]]
Output: [20,24]
Explanation: [20,24] includes 24 from list 1, 20 from list 2, and 22 from list 3.
```

**Example 2:**
```
Input: nums = [[1,2,3],[1,2,3],[1,2,3]]
Output: [1,1]
```

**Constraints:**
- k == nums.length
- 1 <= k <= 3500
- 1 <= nums[i].length <= 50
- -10^5 <= nums[i][j] <= 10^5
- nums[i] is sorted in non-decreasing order

## Approach

Since every list is already sorted, this is really a sliding-window problem over all `k` lists at once, except the window has to keep exactly one pointer advancing per list rather than sliding over a single array. A min-heap makes that manageable: seed it with the first element of every list, one entry per list, each tagged with which list and which index it came from.

At any point, the heap's minimum is the smallest value among the current "frontier" (one picked element per list), and separately track `currentMax`, the largest value among that same frontier. The range `[heap-min, currentMax]` is guaranteed to touch all `k` lists, since exactly one element from each list is currently represented — so it's a valid candidate range, and its width is `currentMax - heapMin`.

To try to shrink the range, repeatedly pop the current minimum off the heap (it can't possibly be part of a *smaller* valid range going forward, since it's the smallest thing currently in play) and advance that list's pointer to its next element, pushing the new value onto the heap. Update `currentMax` if that new value is bigger. Record the range whenever it beats the best found so far. This is exactly the sliding-window idea — dropping the minimum from the window and extending on the max side — except "the window" is the current set of one-per-list picks rather than a contiguous array slice.

Stop as soon as any list runs out of elements to advance to, since at that point no further valid all-lists-covered window can be formed.

**Time complexity:** O(n log k) where n is the total number of elements across all lists — each element is pushed and popped from the heap once, at O(log k) per heap operation.

**Space complexity:** O(k) for the heap, which always holds exactly one entry per list.
