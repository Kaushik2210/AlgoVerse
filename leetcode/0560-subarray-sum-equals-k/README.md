# 560. Subarray Sum Equals K

You're given an integer array `nums` and an integer `k`. Return the number of contiguous subarrays whose sum equals `k`.

**Example 1:**
```
Input: nums = [1,1,1], k = 2
Output: 2
Explanation: [1,1] appears twice as a subarray summing to 2.
```

**Example 2:**
```
Input: nums = [1,2,3], k = 3
Output: 2
Explanation: [1,2] and [3] both sum to 3.
```

**Constraints:**
- 1 <= nums.length <= 2*10^4
- -1000 <= nums[i] <= 1000
- -10^7 <= k <= 10^7

## Approach

Because `nums` can contain negative numbers, a sliding window doesn't work here — shrinking the window doesn't reliably decrease the sum, so there's no monotonic relationship to exploit. This calls for prefix sums instead.

Let `prefix_sum[i]` be the sum of everything up to index `i`. The sum of any subarray `nums[j+1..i]` is `prefix_sum[i] - prefix_sum[j]`. That subarray sums to `k` exactly when `prefix_sum[i] - prefix_sum[j] == k`, i.e. `prefix_sum[j] == prefix_sum[i] - k`. So for every index `i`, the number of valid subarrays ending at `i` is just the number of earlier prefix sums equal to `prefix_sum[i] - k`.

Track a running prefix sum while walking the array once, and keep a hash map counting how many times each prefix sum value has occurred so far. At each step, look up `prefix_sum - k` in the map and add its count to the answer — that's the number of subarrays ending here that sum to `k`. Then record the current prefix sum in the map before moving on. Seed the map with `{0: 1}` up front, which is what correctly accounts for subarrays starting at index 0 (a prefix sum of exactly `k` needs a "sum of 0 before the array started" to subtract against).

**Time complexity:** O(n) — one pass with O(1) average hash map operations.

**Space complexity:** O(n) — the map can hold up to n distinct prefix sums.
