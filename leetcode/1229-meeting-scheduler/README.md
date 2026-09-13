# 1229. Meeting Scheduler

> **Note:** This is a LeetCode premium problem, so it can't be opened or submitted on a free account. Solved and verified independently against hand-built test cases.

You're given the availability schedules of two people as lists of non-overlapping time slots (`slots1` and `slots2`, each `[start, end]`), and a meeting `duration`. Return the earliest time slot `[start, end]` that works for both people and is at least `duration` minutes long. If there's no such slot, return an empty array.

**Example 1:**
```
Input: slots1 = [[10,50],[60,120],[140,210]], slots2 = [[0,15],[60,70]], duration = 8
Output: [60,68]
```

**Example 2:**
```
Input: slots1 = [[10,50],[60,120],[140,210]], slots2 = [[0,15],[60,70]], duration = 12
Output: []
```

**Constraints:**
- 1 <= slots1.length, slots2.length <= 10^4
- slots1[i].length, slots2[i].length == 2
- slots1[i][0] < slots1[i][1]
- slots2[i][0] < slots2[i][1]
- 0 <= slots1[i][j], slots2[i][j] <= 10^9
- 1 <= duration <= 10^6

## Approach

The brute force is to compare every slot in `slots1` against every slot in `slots2`, which is O(n*m). We can do better by sorting both lists by start time first, then walking them together with two pointers, the same way you'd merge two sorted lists.

At each step, look at the current slot from each list and compute their overlap: `overlap_start = max(slot1.start, slot2.start)` and `overlap_end = min(slot1.end, slot2.end)`. If that overlap is at least `duration` long, we've found the earliest valid meeting window — return `[overlap_start, overlap_start + duration]` immediately, since both lists are sorted and we're scanning in time order.

If the overlap isn't big enough (or the slots don't overlap at all), advance whichever pointer has the earlier `end` time — that slot is exhausted and can't contribute to any later, larger overlap, so move past it.

**Time complexity:** O(n log n + m log m) for sorting, then O(n + m) for the merge walk.

**Space complexity:** O(log n + log m) for the sort, O(1) otherwise.
