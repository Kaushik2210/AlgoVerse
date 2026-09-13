# 1024. Video Stitching

You have a video of length `time` seconds you want to cover completely, from second 0 to second `time`. You're given `clips`, where `clips[i] = [start_i, end_i]` means you have a clip that plays from `start_i` to `end_i`. You can cut each clip to use any subrange of it, and you can use clips in any order (including not using some at all). Return the minimum number of clips needed to cover the entire `[0, time]` range, or -1 if it's impossible.

**Example 1:**
```
Input: clips = [[0,2],[4,6],[8,10],[1,9],[1,5],[5,9]], time = 10
Output: 3
Explanation: Take [0,2], [1,9], [8,10] to cover [0,10].
```

**Example 2:**
```
Input: clips = [[0,1],[1,2]], time = 5
Output: -1
Explanation: No clip covers [2,5].
```

**Constraints:**
- 1 <= clips.length <= 100
- 0 <= start_i <= end_i <= 100
- 1 <= time <= 100

## Approach

This is the classic "minimum jumps to cover a range" greedy problem — the same idea as Jump Game II, just phrased with intervals. For every starting point `s` from 0 up to 99, precompute the farthest `end` reachable by any single clip that begins at or before `s` (i.e. `s` falls inside `[start_i, end_i)`). Call this `farthest[s]`.

Then greedily sweep forward: maintain `currentEnd` (the farthest point covered by clips chosen so far) and `nextEnd` (the farthest point reachable using one more clip, scanning through all starting points up to `currentEnd`). Walk `s` from 0 to `time - 1`; at each point update `nextEnd = max(nextEnd, farthest[s])`. Whenever `s` catches up to `currentEnd` (meaning we've exhausted what the current set of clips covers), we're forced to use one more clip: increment the count and set `currentEnd = nextEnd`. If `nextEnd` never advanced past `currentEnd` at that point, it's impossible to go further, so return -1. If `currentEnd` reaches or passes `time`, return the count.

This mirrors "jump game": each "jump" is really "extend coverage using the best clip reachable so far", and the greedy is optimal because always picking the clip that reaches farthest never hurts future coverage.

**Time complexity:** O(n + time) — one pass to build `farthest`, one pass to sweep it.

**Space complexity:** O(time) for the `farthest` array.
