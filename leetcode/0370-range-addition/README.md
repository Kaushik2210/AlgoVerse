# 370. Range Addition

> **Note:** This is a LeetCode premium problem, so it can't be opened or submitted on a free account. Solved and verified independently against hand-built test cases.

You're given an integer `length` and a list of `updates`, where each `updates[i] = [startIdx, endIdx, inc]` means: add `inc` to every element of an initially-all-zero array of size `length`, from index `startIdx` to `endIdx` inclusive. Return the array after applying all updates.

**Example 1:**
```
Input: length = 5, updates = [[1,3,2],[2,4,3],[0,2,-2]]
Output: [-2,0,3,5,3]
```

**Example 2:**
```
Input: length = 3, updates = [[1,1,5]]
Output: [0,5,0]
```

**Constraints:**
- 1 <= length <= 10^5
- 0 <= updates.length <= 10^4
- 0 <= startIdx <= endIdx < length
- -1000 <= inc <= 1000

## Approach

Applying each update by walking its whole range and adding `inc` to every element is O(length) per update, O(length * updates.length) overall — slow when both are large. The difference array technique gets each update down to O(1) by recording only where a change *starts* and *stops*, then materializing the actual array with a single final prefix sum.

Keep a `diff` array one longer than `length`. For an update `[start, end, inc]`, add `inc` at `diff[start]` (the increase kicks in from here) and subtract `inc` at `diff[end + 1]` (the increase cancels out right after the range ends). This records the *change in slope* of the running total, not the total itself.

After all updates are recorded this way, do one pass computing a running sum of `diff` — at each index, the running sum is exactly the total of all increments currently "active" at that position, which is precisely the answer.

**Time complexity:** O(length + updates.length) — O(1) per update to record, then one linear pass to reconstruct.

**Space complexity:** O(length) for the diff array (result array not counted as extra).
