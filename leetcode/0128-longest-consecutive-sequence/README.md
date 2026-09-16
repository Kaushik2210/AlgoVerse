# 128. Longest Consecutive Sequence

**Commonly asked at:** Google, Amazon, Meta

Given an unsorted array of integers, find the length of the longest run of consecutive integers (e.g. `[100, 4, 200, 1, 3, 2]` contains the run `1, 2, 3, 4`). Must run in O(n) time.

**Example 1:**
```
Input: nums = [100,4,200,1,3,2]
Output: 4
Explanation: the longest run is [1, 2, 3, 4].
```

**Example 2:**
```
Input: nums = [0,3,7,2,5,8,4,6,0,1]
Output: 9
```

**Constraints:**
- 0 <= nums.length <= 10^5
- -10^9 <= nums[i] <= 10^9

## Approach

Sorting first and scanning for runs would work but costs O(n log n), and the problem explicitly wants O(n). The trick is a hash set plus a careful choice of *where* to start counting each run, so that no run ever gets walked more than once in total.

Put every number into a hash set for O(1) membership checks. Then for each number, decide whether it's a valid "run start" — a number `num` is only worth starting a count from if `num - 1` is *not* in the set. If `num - 1` is present, `num` is somewhere in the middle (or end) of a run, and whichever number is the true start of that run will already discover the whole thing when its turn comes; counting from the middle too would just redo the same work.

For each valid start, walk forward (`num + 1`, `num + 2`, ...) as long as each next value is in the set, counting the length. Track the maximum length seen across all starts.

The reason this is O(n) overall rather than O(n^2): every number is only ever the target of a forward walk from its own run's single start — a number in the middle of a run is visited exactly once (as part of that one walk), and never re-walked, because only the true start triggers a walk at all. So the total work across all starts, summed over the whole array, is bounded by the total number of elements.

**Time complexity:** O(n) — every element triggers at most one hash lookup as a "start" check, and is visited at most once inside exactly one run's forward walk.

**Space complexity:** O(n) for the hash set.
