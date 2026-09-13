# 1493. Longest Subarray of 1's After Deleting One Element

Given a binary array `nums`, you must delete exactly one element from it. Return the length of the longest subarray containing only 1s after that deletion.

**Example 1:**
```
Input: nums = [1,1,0,1]
Output: 3
Explanation: Delete the 0 to get [1,1,1], length 3.
```

**Example 2:**
```
Input: nums = [0,1,1,1,0,1,1,0,1]
Output: 5
Explanation: Delete one of the 0s at index 4 or 7 to get a run of 5 ones, e.g. [1,1,1,_,1,1] after deleting index 4.
```

**Example 3:**
```
Input: nums = [1,1,1]
Output: 2
Explanation: You must delete an element, so the best remaining run is length 2.
```

**Constraints:**
- 1 <= nums.length <= 10^5
- nums[i] is 0 or 1

## Approach

"Delete exactly one element" is a variant of "at most one zero allowed" — find the longest window containing at most one 0, then subtract 1 from the window length, because that one 0 (or, if the window happens to have no 0, an arbitrary element) is the one getting deleted. The mandatory deletion is exactly why it's `right - left` and not `right - left + 1`: one slot from every valid window is reserved for the forced deletion.

This is the same variable-size sliding window as Max Consecutive Ones III with `k` fixed at 1: expand with `right`, track a running zero count, and shrink from the left whenever the count exceeds 1. Because deletion is mandatory even when the window is all 1s, a window with zero zeros still only contributes `right - left` to the answer, correctly accounting for the one element you're forced to remove.

**Time complexity:** O(n) — each index enters and leaves the window at most once.

**Space complexity:** O(1) — a couple of counters.
