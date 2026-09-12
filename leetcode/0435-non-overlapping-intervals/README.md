# 435. Non-overlapping Intervals

You're given an array of intervals `intervals` where `intervals[i] = [start_i, end_i]`. Return the minimum number of intervals you need to remove so that the rest don't overlap each other.

**Example 1:**
```
Input: intervals = [[1,2],[2,3],[3,4],[1,3]]
Output: 1
Explanation: Remove [1,3] and the rest don't overlap.
```

**Example 2:**
```
Input: intervals = [[1,2],[1,2],[1,2]]
Output: 2
Explanation: Keep just one of the [1,2] intervals.
```

**Example 3:**
```
Input: intervals = [[1,2],[2,3]]
Output: 0
Explanation: Touching at a single point doesn't count as overlapping.
```

**Constraints:**
- 1 <= intervals.length <= 10^5
- intervals[i].length == 2

## Approach

Minimizing removals is the same as maximizing how many intervals you can keep without any overlap — this is the classic "activity selection" greedy problem.

Sort intervals by their **end** coordinate. Greedily walk through them keeping track of the end of the last interval you decided to keep. For each next interval:
- If its start is before that end, it overlaps the interval you kept — remove it (increment the removal count), and don't update `prev_end`, since the interval you already kept still has the earlier, more useful end point.
- Otherwise it starts at or after the previous interval ends, so keep it and update `prev_end` to its end.

Sorting by end coordinate is what makes the greedy choice correct: always keeping the interval that frees up the earliest "next available slot" leaves the most room for everything that comes after, which is provably optimal for this kind of scheduling problem.

**Time complexity:** O(n log n) for the sort, O(n) for the single greedy pass.

**Space complexity:** O(1) extra space beyond the sort.
