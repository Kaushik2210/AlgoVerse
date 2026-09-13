# 986. Interval List Intersections

You're given two lists of closed intervals, `firstList` and `secondList`, where each list is sorted by start time and each list's own intervals are already disjoint (non-overlapping). Return the intersection of the two interval lists — every interval that's covered by both lists — sorted.

**Example 1:**
```
Input: firstList = [[0,2],[5,10],[13,23],[24,25]], secondList = [[1,5],[8,12],[15,24],[25,26]]
Output: [[1,2],[5,5],[8,10],[15,23],[24,24],[25,25]]
```

**Example 2:**
```
Input: firstList = [[1,3],[5,9]], secondList = []
Output: []
```

**Constraints:**
- 0 <= firstList.length, secondList.length <= 1000
- firstList.length + secondList.length >= 1
- 0 <= start < end <= 10^9
- end < nextStart for consecutive intervals in each list

## Approach

Both lists are already sorted and internally non-overlapping, so this is a two-pointer merge, same family as merging two sorted arrays. Keep a pointer `i` into `firstList` and `j` into `secondList`.

At each step, compute the overlap between `firstList[i]` and `secondList[j]`: `lo = max(firstList[i].start, secondList[j].start)`, `hi = min(firstList[i].end, secondList[j].end)`. If `lo <= hi`, that's a valid (possibly zero-length, since these are closed intervals) intersection — add `[lo, hi]` to the answer.

Then advance whichever interval ends first: if `firstList[i].end < secondList[j].end`, increment `i` (that interval can't overlap anything further in `secondList`); otherwise increment `j`. Repeat until either list is exhausted.

**Time complexity:** O(n + m) where n and m are the lengths of the two lists — each pointer only moves forward.

**Space complexity:** O(1) extra space, not counting the output.
