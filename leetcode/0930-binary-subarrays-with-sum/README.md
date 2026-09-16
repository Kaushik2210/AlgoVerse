# 930. Binary Subarrays With Sum

**Commonly asked at:** Google, Facebook

Given a binary array `nums` and an integer `goal`, return the number of non-empty contiguous subarrays whose sum equals `goal`.

**Example 1:**
```
Input: nums = [1,0,1,0,1], goal = 2
Output: 4
Explanation: The subarrays are [1,0,1], [1,0,1,0], [0,1,0,1], [1,0,1] (starting at different indices).
```

**Example 2:**
```
Input: nums = [0,0,0,0,0], goal = 0
Output: 15
Explanation: Every one of the 5+4+3+2+1 = 15 subarrays has sum 0.
```

**Example 3:**
```
Input: nums = [0,0,1,0,0], goal = 0
Output: 6
Explanation: The zero-run on the left ([0,0]) contributes 3 subarrays with sum 0, and the zero-run on the right ([0,0]) contributes another 3, for 6 total.
```

**Constraints:**
- 1 <= nums.length <= 3 * 10^4
- nums[i] is 0 or 1
- 0 <= goal <= nums.length

## Approach

A direct sliding window for "sum exactly equals goal" doesn't work cleanly, because shrinking the window when the sum is too big can also skip past valid windows when zeros are involved. The standard fix is the "exactly = at most(goal) - at most(goal - 1)" trick: count subarrays with sum **at most** k using a normal sliding window (which does work cleanly for "at most", since all values are non-negative and the sum is monotonic in window size), then get the exact count by subtracting the at-most-(goal-1) count from the at-most-goal count. Every subarray with sum exactly `goal` is counted in the first term but not the second, and everything else cancels.

`at_most(k)` is the same window-counting idea as Subarray Product Less Than K: expand with `right`, shrink from the left while the running sum exceeds `k`, and add `right - left + 1` to the count at each step, since every subarray ending at `right` and starting from `left` onward has sum at most `k`.

Guard `k < 0` to return 0 directly — this matters when `goal` is 0, since `at_most(-1)` must contribute nothing.

**Time complexity:** O(n) — two linear passes (one per `at_most` call).

**Space complexity:** O(1) — a running sum and pointers.
