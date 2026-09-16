# 1480. Running Sum of 1d Array

**Commonly asked at:** Amazon

Given an array `nums`, return its running sum, where `runningSum[i] = nums[0] + nums[1] + ... + nums[i]`.

**Example 1:**
```
Input: nums = [1,2,3,4]
Output: [1,3,6,10]
```

**Example 2:**
```
Input: nums = [1,1,1,1,1]
Output: [1,2,3,4,5]
```

**Example 3:**
```
Input: nums = [3,1,2,10,1]
Output: [3,4,6,16,17]
```

**Constraints:**
- 1 <= nums.length <= 1000
- -10^6 <= nums[i] <= 10^6

## Approach

This is prefix sums in its purest, most direct form — no derived quantity to compute, the running sum itself is the answer. Walk through the array once, keeping a running total that accumulates each element as it's visited, and append that running total to the result at every step.

**Time complexity:** O(n) — a single pass over the array.

**Space complexity:** O(n) for the output array (O(1) extra beyond that).
