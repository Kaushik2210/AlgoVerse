# 215. Kth Largest Element in an Array

You're given an integer array `nums` and an integer `k`. Find the `k`th largest element in the array — not the `k`th distinct one, so duplicates count separately.

**Example 1:**
```
Input: nums = [3,2,1,5,6,4], k = 2
Output: 5
Explanation: sorted descending it's [6,5,4,3,2,1], and the 2nd largest is 5
```

**Example 2:**
```
Input: nums = [3,2,3,1,2,4,5,5,6], k = 4
Output: 4
Explanation: sorted descending it's [6,5,5,4,3,3,2,2,1], and the 4th largest is 4
```

**Constraints:**
- 1 <= k <= nums.length <= 10^5
- -10^4 <= nums[i] <= 10^4

## Approach

The obvious brute force is to sort the whole array and index into it — that works and is easy to verify, but it's O(n log n) when you don't actually need the full ordering, just one value.

A better way is to keep a min-heap capped at size `k`. Walk through the array and push every number onto the heap. Whenever the heap grows past size `k`, pop the smallest element off. The idea: you only ever want to remember the `k` largest numbers seen so far, and the smallest among those `k` is always the first one to get evicted when a bigger number shows up. By the time you've processed the whole array, the heap holds exactly the `k` largest numbers, and the smallest of those — sitting at the top of the min-heap — is the `k`th largest overall.

This is more efficient than a full sort because the heap never grows past size `k`, so each push/pop is O(log k) instead of O(log n).

(A quickselect partition-based approach gets this down to average O(n), but the heap version is simpler to reason about and plenty fast for the constraints here.)

**Time complexity:** O(n log k) — n pushes/pops, each O(log k) since the heap is capped at size k.

**Space complexity:** O(k) — the heap never holds more than k elements.
