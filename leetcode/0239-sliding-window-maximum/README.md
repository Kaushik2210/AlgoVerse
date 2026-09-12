# 239. Sliding Window Maximum

You're given an array `nums` and a window size `k`. A window of size `k` slides from the very left of the array to the very right, one position at a time — you can only see the `k` numbers currently inside it. Return the maximum value in the window at each position it stops.

**Example 1:**
```
Input: nums = [1,3,-1,-3,5,3,6,7], k = 3
Output: [3,3,5,5,6,7]
Explanation:
Window position                Max
---------------               -----
[1  3  -1] -3  5  3  6  7       3
 1 [3  -1  -3] 5  3  6  7       3
 1  3 [-1  -3  5] 3  6  7       5
 1  3  -1 [-3  5  3] 6  7       5
 1  3  -1  -3 [5  3  6] 7       6
 1  3  -1  -3  5 [3  6  7]      7
```

**Example 2:**
```
Input: nums = [1], k = 1
Output: [1]
```

**Constraints:**
- 1 <= nums.length <= 10^5
- -10^4 <= nums[i] <= 10^4
- 1 <= k <= nums.length

## Approach

Recomputing the max of every window from scratch is O(n*k), which is too slow for large inputs — the naive approach re-scans elements that were already looked at in the previous window. What's actually needed is a way to track "the current max" that updates in O(1) amortized time as the window slides.

The tool for that is a monotonic deque holding *indices*, kept in decreasing order of their values — so the largest value's index always sits at the front. For each new number coming in from the right:

- Pop from the back of the deque while the value there is smaller than the new number. Those popped elements can never be the max of any future window (the new number is both later, so it'll be in the window longer, and bigger, so it always wins), so they're safe to discard forever.
- Push the new index onto the back.
- Pop from the front of the deque if that index has slid outside the current window (i.e., it's more than `k` positions behind the current right edge) — it's expired and can't be this window's max anymore.
- Once the window has reached size `k`, the front of the deque is the max for the current window.

Because each index is pushed and popped from the deque at most once total, the whole pass stays linear.

**Time complexity:** O(n) — every index enters and leaves the deque at most once.

**Space complexity:** O(k) — the deque holds at most k indices at a time.
