# 152. Maximum Product Subarray

Given an integer array `nums`, find a contiguous non-empty subarray that has the largest product, and return that product.

**Example 1:**
```
Input: nums = [2, 3, -2, 4]
Output: 6
Explanation: [2, 3] has the largest product 6.
```

**Example 2:**
```
Input: nums = [-2, 0, -1]
Output: 0
Explanation: The result cannot be 2, because [-2, -1] is not a contiguous subarray.
```

**Constraints:**
- 1 <= nums.length <= 2 * 10^4
- -10 <= nums[i] <= 10
- The product of any subarray of nums is guaranteed to fit in a 32-bit integer

## Approach

This looks like Kadane's algorithm (max subarray sum, problem 53) but products break the usual "reset if the running total goes negative" logic, because multiplying by a negative number flips the sign — a very negative running product can suddenly become the best positive product if it's multiplied by another negative number. So the fix is to track both the maximum AND minimum product ending at each position, since the current minimum (which could be a large negative number) might become the new maximum after multiplying by a negative `nums[i]`.

At each index, compute both candidates before overwriting anything: `current_max = max(nums[i], nums[i] * prev_max, nums[i] * prev_min)` and `current_min = min(nums[i], nums[i] * prev_max, nums[i] * prev_min)`. Taking `nums[i]` alone as a candidate handles the case where starting fresh at this element beats extending the previous subarray (e.g. after a zero). Track the running best-of-all-current_max seen so far.

**Time complexity:** O(n) — a single pass, constant work per element.

**Space complexity:** O(1) — only a few running variables are kept.
