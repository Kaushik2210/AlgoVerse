# 325. Maximum Size Subarray Sum Equals k

**Commonly asked at:** Meta

> **Note:** This is a LeetCode premium problem, so it can't be opened or submitted on a free account. Solved and verified independently against hand-built test cases.

Given an integer array `nums` and an integer `k`, return the length of the longest subarray that sums to `k`. If there isn't one, return 0.

**Example 1:**
```
Input: nums = [1,-1,5,-2,3], k = 3
Output: 4
Explanation: The subarray [1,-1,5,-2] sums to 3 and has length 4.
```

**Example 2:**
```
Input: nums = [-2,-1,2,1], k = 1
Output: 2
Explanation: The subarray [-1,2] sums to 1 and has length 2.
```

**Constraints:**
- 1 <= nums.length <= 2 * 10^5
- -10^4 <= nums[i] <= 10^4
- -10^9 <= k <= 10^9

## Approach

Since `nums` can contain negative numbers, a sliding window doesn't work directly — the running sum isn't monotonic, so you can't tell whether to shrink or grow the window just by comparing to `k`. Prefix sums plus a hash map handle this cleanly instead.

Let `prefix[j]` be the sum of everything up to and including index `j`. A subarray `(i, j]` sums to `k` exactly when `prefix[j] - prefix[i] == k`, i.e. `prefix[i] == prefix[j] - k`. So at each index `j`, compute the running prefix sum, then check whether `prefix[j] - k` was seen as a prefix sum at some earlier index — if so, the gap between that earlier index and `j` is a candidate answer.

The map should only ever store the *first* index each prefix sum was seen at, since that maximizes the length of any subarray found later using it — overwriting with a later index would only shrink future candidates. Seed the map with prefix sum 0 at index -1 to correctly handle subarrays that start from index 0.

**Time complexity:** O(n) — one pass, O(1) average map operations per element.

**Space complexity:** O(n) — the map can hold up to n+1 distinct prefix sums.
