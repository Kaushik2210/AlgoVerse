# 376. Wiggle Subsequence

A sequence is called a **wiggle sequence** if the differences between consecutive elements strictly alternate between positive and negative — the first difference (if any) can be either. Given an integer array `nums`, return the length of the longest wiggle subsequence you can obtain by deleting some (possibly zero) elements.

**Example 1:**
```
Input: nums = [1,7,4,9,2,5]
Output: 6
Explanation: The entire sequence is a wiggle sequence: differences are 6,-3,5,-7,3.
```

**Example 2:**
```
Input: nums = [1,17,5,10,13,15,10,5,16,8]
Output: 7
```

**Constraints:**
- 1 <= nums.length <= 1000
- 0 <= nums[i] <= 1000

## Approach

The brute-force way is a DP where `up[i]` is the length of the longest wiggle subsequence ending at index `i` with the last move going up, and `down[i]` the same for the last move going down — for each `i`, scan all `j < i` and update based on whether `nums[i] > nums[j]` or `nums[i] < nums[j]`. That's O(n^2) and works, but there's a greedy O(n) way once you see the pattern.

**The greedy insight.** Only the "turning points" — local peaks and local valleys — of the array can ever extend a wiggle sequence. Any run of consecutive increases or consecutive decreases only ever contributes its endpoints to an optimal wiggle subsequence; the elements strictly between the start and end of a monotonic run are useless because keeping just the run's two endpoints (or even just following the trend to the next actual turn) preserves the same wiggle count while giving more flexibility later. So walking through the array once, count how many times the direction of the difference flips.

Track `prevDiff`, the sign of the difference between the last two elements *counted* into the wiggle sequence so far (0 initially, since nothing has been counted). Start a running `length = 1` (a single element is trivially a wiggle sequence of length 1). Walk through consecutive pairs; for each, compute `diff = nums[i] - nums[i-1]`:
- If `diff > 0` and `prevDiff <= 0`, this is a new upward wiggle: `length += 1`, `prevDiff = 1`.
- If `diff < 0` and `prevDiff >= 0`, this is a new downward wiggle: `length += 1`, `prevDiff = -1`.
- Otherwise (same direction as before, or `diff == 0`), skip — it doesn't extend the wiggle.

At the end, `length` is the answer.

**Time complexity:** O(n) — one pass through the array.

**Space complexity:** O(1) — only a couple of scalar variables tracked.
