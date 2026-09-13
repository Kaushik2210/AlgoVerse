# 713. Subarray Product Less Than K

Given an array of positive integers `nums` and an integer `k`, return the number of contiguous subarrays where the product of all the elements is strictly less than `k`.

**Example 1:**
```
Input: nums = [10,5,2,6], k = 100
Output: 8
Explanation: The 8 subarrays are [10], [5], [2], [6], [10,5], [5,2], [2,6], [5,2,6]. Note [10,5,2] is excluded since 10*5*2 = 100 is not < 100.
```

**Example 2:**
```
Input: nums = [1,2,3], k = 0
Output: 0
```

**Constraints:**
- 1 <= nums.length <= 3 * 10^4
- 1 <= nums[i] <= 1000
- 0 <= k <= 10^6

## Approach

Since every element is positive, the product of a window only moves in one direction as the window changes: growing the window (extending `right`) can only increase or keep the product the same, and shrinking it (advancing `left`) can only decrease it. That monotonic property is exactly what makes a sliding window work here.

Expand the window by multiplying in `nums[right]`. If the product is no longer strictly less than `k`, shrink from the left — dividing out `nums[left]` and advancing `left` — until it is again (or the window becomes empty). Handle `k <= 1` as an immediate 0 up front, since no positive product can ever be less than 1.

The neat trick for counting is that once the window `[left, right]` is valid, every subarray ending at `right` and starting anywhere from `left` to `right` is also valid, because shrinking a valid window's right edge only decreases its product further. So each `right` contributes `right - left + 1` new subarrays to the count — no need to enumerate them individually.

**Time complexity:** O(n) — `left` and `right` each advance at most n times total.

**Space complexity:** O(1) — just a running product and a couple of pointers.
