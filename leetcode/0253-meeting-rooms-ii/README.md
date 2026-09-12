# 253. Meeting Rooms II

*Note: this is a LeetCode Premium (subscriber-only) problem, not freely accessible on LeetCode. It's included here anyway because it's an extremely common interview question, especially for scheduling/interval problems.*

Given an array of meeting time intervals `intervals` where `intervals[i] = [start_i, end_i]`, return the minimum number of conference rooms required so that no two overlapping meetings need the same room at the same time.

**Example 1:**
```
Input: intervals = [[0,30],[5,10],[15,20]]
Output: 2
Explanation: [0,30] overlaps with both [5,10] and [15,20], so at least 2 rooms are needed
```

**Example 2:**
```
Input: intervals = [[7,10],[2,4]]
Output: 1
Explanation: [7,10] and [2,4] don't overlap, one room handles both
```

**Constraints:**
- 1 <= intervals.length <= 10^4
- 0 <= start_i < end_i <= 10^6

## Approach

The number of rooms needed at any given moment equals the number of meetings currently in progress at that moment — so the answer is really "what's the maximum number of meetings simultaneously overlapping, at the worst point in time?"

Split every interval into two separate events: a start event and an end event, and sort each list independently. Then walk through time using two pointers, one over the sorted starts and one over the sorted ends. Whenever the next event chronologically is a start, that meeting needs a room — increment a running room counter. Whenever it's an end (and it happens at or before the current start being considered), a room frees up — decrement the counter. Track the maximum value the counter ever reaches; that peak is the minimum number of rooms required, since a room freed by an ending meeting at the same time a new one starts can be reused (a meeting ending at time `t` doesn't conflict with one starting at time `t`).

An equivalent alternative is a min-heap of end times: sort meetings by start time, and for each new meeting, check whether the earliest-ending room (the heap's top) has already freed up by comparing its end time to the new meeting's start — if so, reuse that room (pop and push the new end time); otherwise, allocate a new room (just push). The heap's size at the end is the answer.

**Time complexity:** O(n log n) — dominated by sorting the start and end times (or building/maintaining the heap).

**Space complexity:** O(n) — for the separated start/end arrays (or the heap).
