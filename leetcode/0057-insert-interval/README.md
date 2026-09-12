# 57. Insert Interval

You're given a list of non-overlapping intervals sorted by start time, and a new interval to insert. Insert the new interval into the list, merging any overlaps so the result is still sorted and non-overlapping.

**Example 1:**
```
Input: intervals = [[1,3],[6,9]], newInterval = [2,5]
Output: [[1,5],[6,9]]
```

**Example 2:**
```
Input: intervals = [[1,2],[3,5],[6,7],[8,10],[12,16]], newInterval = [4,8]
Output: [[1,2],[3,10],[12,16]]
Explanation: newInterval = [4,8] overlaps with [3,5],[6,7],[8,10].
```

**Constraints:**
- 0 <= intervals.length <= 10^4
- `intervals` is sorted by start time and non-overlapping
- 0 <= start <= end <= 10^5

## Approach

Since the input is already sorted and non-overlapping, there's no need for the general "merge intervals" approach of sorting everything and scanning — that would throw away the sortedness we're handed for free. Instead, the list naturally splits into three contiguous chunks relative to `newInterval`: intervals that come entirely before it, intervals that overlap with it, and intervals that come entirely after it.

Walk through `intervals` once, left to right, in three phases:

1. **Before:** while the current interval ends strictly before `newInterval` starts (`intervals[i][1] < newInterval[0]`), there's no overlap possible — copy it straight into the result.
2. **Overlapping:** while the current interval's start is `<= end` of the interval being merged, it overlaps — absorb it by expanding `start = min(start, intervals[i][0])` and `end = max(end, intervals[i][1])`. This keeps widening the merged interval as long as overlaps continue. Once this phase ends, push the single merged `[start, end]` interval.
3. **After:** whatever's left didn't overlap (its start is past the merged interval's end) — copy the rest straight through.

The key insight is that because the input is sorted, once an interval fails the "before" condition it's guaranteed to either overlap or come after, so a single linear scan with two simple comparisons handles the whole classification — no backtracking or re-sorting needed.

**Time complexity:** O(n) — one pass through the intervals.

**Space complexity:** O(n) for the result list (excluding the space to store the output itself, this is O(1) extra).
