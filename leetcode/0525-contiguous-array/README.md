# 525. Contiguous Array

**Commonly asked at:** Amazon, Facebook

Given a binary array `nums`, return the maximum length of a contiguous subarray that contains an equal number of 0s and 1s.

**Example 1:**
```
Input: nums = [0,1]
Output: 2
Explanation: [0,1] is the longest subarray with an equal number of 0s and 1s.
```

**Example 2:**
```
Input: nums = [0,1,0]
Output: 2
Explanation: [0,1] or [1,0] both work.
```

**Example 3:**
```
Input: nums = [0,0,1,0,1,1]
Output: 6
Explanation: The whole array has three 0s and three 1s.
```

**Constraints:**
- 1 <= nums.length <= 10^5
- nums[i] is 0 or 1

## Approach

Treat every 0 as -1 and every 1 as +1. A subarray has an equal count of 0s and 1s exactly when the sum of its transformed values is 0. In prefix-sum terms, if `prefix[j]` is the running balance after index `j-1`, a subarray `(i, j]` has balance 0 whenever `prefix[i] == prefix[j]` — so the problem becomes: find the two equal prefix-sum values that are farthest apart.

Walk through the array once, maintaining a running balance (add 1 for a 1, subtract 1 for a 0) and a hash map from balance value to the *first* index it was seen at (seed the map with balance 0 at index -1, representing the empty prefix before the array starts). Whenever the current balance has been seen before, the subarray between that earlier index and now has balance 0 — a candidate answer. Only the first occurrence of each balance value is ever worth keeping, since it maximizes the distance to any later occurrence of the same balance.

**Time complexity:** O(n) — one pass, O(1) map operations per element.

**Space complexity:** O(n) — the map can hold up to n+1 distinct balance values in the worst case.
