# 724. Find Pivot Index

Given an array of integers `nums`, find the leftmost pivot index — an index where the sum of every number strictly to its left equals the sum of every number strictly to its right. If no such index exists, return -1.

**Example 1:**
```
Input: nums = [1,7,3,6,5,6]
Output: 3
Explanation: The sum to the left of index 3 is 1+7+3 = 11, and to the right is 5+6 = 11.
```

**Example 2:**
```
Input: nums = [1,2,3]
Output: -1
Explanation: No index has equal left and right sums.
```

**Example 3:**
```
Input: nums = [2,1,-1]
Output: 0
Explanation: Left sum is 0 (nothing to the left), right sum is 1 + -1 = 0.
```

**Constraints:**
- 1 <= nums.length <= 10^4
- -1000 <= nums[i] <= 1000

## Approach

Recomputing the left and right sums from scratch at every index is O(n) per index, O(n^2) total. Instead, compute the total sum once, then walk through the array keeping a running `left_sum` of everything seen so far. At each index `i`, the right sum can be derived without ever summing anything again: `right_sum = total - left_sum - nums[i]` (everything, minus the left side, minus the current element itself).

If `left_sum == right_sum` at some index, that's the pivot — return it immediately, since we're scanning left to right the first match is automatically the leftmost one. Otherwise, fold `nums[i]` into `left_sum` and move to the next index. If nothing matches by the end, return -1.

**Time complexity:** O(n) — one pass for the total, one pass for the scan.

**Space complexity:** O(1) — a couple of running sums.
