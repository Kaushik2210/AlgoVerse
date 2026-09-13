# 1004. Max Consecutive Ones III

You're given a binary array `nums` and an integer `k`. You're allowed to flip at most `k` zeros to ones. Return the length of the longest subarray of all 1s you can get after doing those flips.

**Example 1:**
```
Input: nums = [1,1,1,0,0,0,1,1,1,1,0], k = 2
Output: 6
Explanation: Flip the two 0s at index 5 and 10 (or any two within reach) — [1,1,1,0,0,1,1,1,1,1,1] underlines a run of 6 starting at index 5.
```

**Example 2:**
```
Input: nums = [0,0,1,1,0,0,1,1,1,0,1,1,0,0,0,1,1,1,1], k = 3
Output: 10
```

**Constraints:**
- 1 <= nums.length <= 10^5
- nums[i] is 0 or 1
- 0 <= k <= nums.length

## Approach

Reframe the problem: find the longest window that contains at most `k` zeros — every zero inside it gets flipped, everything else is already a 1. That's a classic variable-size sliding window.

Expand the window by moving `right` forward, and whenever `nums[right]` is 0, bump a zero counter. If the counter ever exceeds `k`, the window has more zeros than we're allowed to flip, so shrink from the left — if the element leaving was a zero, decrement the counter — until the window is valid again. At every step, once the window is valid, its length is a candidate for the answer.

The window never resets and both pointers only move forward, so the whole pass is O(n) even though it looks like it's doing nested work.

**Time complexity:** O(n) — each index is visited by `right` once and by `left` at most once.

**Space complexity:** O(1) — just a couple of counters.
