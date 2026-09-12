# 252. Meeting Rooms

*Note: this is a LeetCode Premium (subscriber-only) problem, not freely accessible on LeetCode. It's included here anyway since it's the simpler, more fundamental version of "Meeting Rooms II" and a natural warm-up for interval scheduling questions.*

Given an array of meeting time intervals `intervals` where `intervals[i] = [starti, endi]`, determine if a single person could attend all the meetings (i.e., no two meetings overlap).

**Example 1:**
```
Input: intervals = [[0,30],[5,10],[15,20]]
Output: false
Explanation: [0,30] overlaps with both [5,10] and [15,20].
```

**Example 2:**
```
Input: intervals = [[7,10],[2,4]]
Output: true
```

**Constraints:**
- 0 <= intervals.length <= 10^4
- intervals[i].length == 2
- 0 <= starti < endi <= 10^6

## Approach

Checking every pair of intervals for overlap is O(n^2), but there's a much simpler way to spot any conflict: sort the intervals by start time. Once sorted, meetings that overlap must always be *adjacent* in that sorted order — if meeting `i` and meeting `j` (with `i < j` after sorting by start) overlapped without some meeting in between also overlapping one of them, meeting `j`'s start would have to fall before meeting `i`'s end while somehow not conflicting with whatever sorts between them, which can't happen once everything is ordered by start time. So a single linear scan over the sorted list is enough — no need to compare every pair.

After sorting, walk through consecutive pairs: if the current meeting's start time is earlier than the previous meeting's end time, they overlap, so return `false` immediately. If the scan finishes without ever finding such a conflict, every meeting fits into a single timeline with no double-booking, so return `true`.

**Time complexity:** O(n log n) for the sort; the scan afterward is O(n).

**Space complexity:** O(n) or O(log n) depending on the sort implementation's auxiliary space (O(1) extra if sorting in place with an in-place algorithm).
