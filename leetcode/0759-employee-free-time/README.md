# 759. Employee Free Time

> **Note:** This is a LeetCode premium problem, so it can't be opened or submitted on a free account. Solved and verified independently against hand-built test cases.

You're given a list `schedule` of employees, where each employee's schedule is a list of non-overlapping `Interval`s, already sorted, representing the times they're busy. Return a list of finite intervals representing the common, positive-length free time shared by **all** employees, also sorted.

(Even though `Interval`s within a single employee's own schedule never overlap, intervals from *different* employees can overlap each other.)

**Example 1:**
```
Input: schedule = [[[1,2],[5,6]],[[1,3]],[[4,10]]]
Output: [[3,4]]
Explanation:
Merging all busy intervals gives [1,3], [1,2], [4,10], [5,6] -> merged: [1,3], [4,10].
The only gap shared by everyone between the earliest and latest busy time is [3,4].
```

**Example 2:**
```
Input: schedule = [[[1,3],[6,7]],[[2,4]],[[2,5],[9,12]]]
Output: [[5,6],[7,9]]
```

**Constraints:**
- 1 <= schedule.length, schedule[i].length <= 50
- 0 <= schedule[i][j].start < schedule[i][j].end <= 10^8

## Approach

The company-wide free time is exactly the gaps between everyone's busy time, once all the busy intervals (from every employee, mixed together) are merged. So the problem reduces to: flatten every `Interval` from every employee into one big list, merge overlapping/touching intervals the standard way, and then read off the gaps between consecutive merged intervals.

Steps:
1. Collect every `Interval` across all employees into a single flat list.
2. Sort that list by start time.
3. Merge overlapping intervals: walk through in order, keeping a "current merged interval." If the next interval's start is <= the current merged interval's end, extend the current interval's end to cover it (`max` of the two ends); otherwise, close off the current merged interval and start a new one.
4. Walk the merged list and, for each consecutive pair, if there's a gap between one's end and the next's start, that gap is a period of free time for everyone — add it to the answer.

**Time complexity:** O(n log n) where n is the total number of intervals across all employees, dominated by the sort.

**Space complexity:** O(n) to hold the flattened and merged interval lists.
