# 53. Maximum Subarray

Given an integer array `nums`, find the contiguous subarray (containing at least one number) that has the largest sum, and return that sum.

**Example 1:**
```
Input: nums = [-2,1,-3,4,-1,2,1,-5,4]
Output: 6
Explanation: [4,-1,2,1] has the largest sum = 6
```

**Example 2:**
```
Input: nums = [1]
Output: 1
```

**Constraints:**
- 1 <= nums.length <= 10^5
- -10^4 <= nums[i] <= 10^4

## Approach

The brute-force approach checks every possible subarray (every start, every end) and sums each one, which is O(n^2) or O(n^3) depending on how naively you compute the sums. Way too slow for 10^5 elements.

The key insight (this is the classic "Kadane's algorithm" pattern): as you walk through the array, keep track of the best sum of a subarray *ending right at the current position*. At each element, you have a choice — either extend the previous subarray by including the current element, or abandon everything before it and start a brand new subarray right here. You should start fresh whenever the running sum so far has gone negative, because a negative prefix can only drag down anything that follows it — it's never helpful to keep it around.

So: keep a running sum. At each element, set running sum = max(current element alone, running sum + current element). Track the best running sum you've seen across the whole walk — that's your answer.

**Time complexity:** O(n) — single pass through the array.

**Space complexity:** O(1) — just two running variables (current sum and best sum so far).
