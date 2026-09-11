# 56. Merge Intervals

You're given an array of intervals `intervals`, where `intervals[i] = [start_i, end_i]`. Merge all overlapping intervals and return the resulting set of non-overlapping intervals that covers all the ranges in the input.

**Example 1:**
```
Input: intervals = [[1,3],[2,6],[8,10],[15,18]]
Output: [[1,6],[8,10],[15,18]]
Explanation: [1,3] and [2,6] overlap, so merge them into [1,6].
```

**Example 2:**
```
Input: intervals = [[1,4],[4,5]]
Output: [[1,5]]
Explanation: intervals touching at an endpoint count as overlapping.
```

**Constraints:**
- 1 <= intervals.length <= 10^4
- intervals[i].length == 2
- 0 <= start_i <= end_i <= 10^4

## Approach

Comparing every pair of intervals to check for overlap is O(n^2), and it's unnecessary work — the moment you sort the intervals by start time, overlapping intervals are guaranteed to sit next to each other, so you only ever need to compare an interval to the one immediately before it.

Sort by start, then walk through once, keeping a `merged` list. For each interval, compare it against the last one already placed in `merged`. If the current interval's start is less than or equal to the last interval's end, they overlap (or touch) — so extend the last interval's end to cover whichever end is further out, `max(last.end, current.end)`. Otherwise, there's a gap, so the current interval starts a fresh entry in `merged`.

Because everything is sorted by start, once you've moved past an interval you'll never need to reconsider merging it with something further down the line — the only interval that could ever still be "open" for merging is the last one you placed.

**Time complexity:** O(n log n) — dominated by the sort; the single pass after that is O(n).

**Space complexity:** O(n) for the output (or O(log n) extra if you don't count the output and just consider the sort's space).
