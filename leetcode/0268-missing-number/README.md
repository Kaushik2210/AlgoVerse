# 268. Missing Number

Given an array `nums` containing `n` distinct numbers taken from the range `[0, n]`, find the one number in that range that's missing from the array.

**Example 1:**
```
Input: nums = [3,0,1]
Output: 2
Explanation: n = 3, range is [0,3], and 2 is missing
```

**Example 2:**
```
Input: nums = [0,1]
Output: 2
Explanation: n = 2, range is [0,2], and 2 is missing
```

**Example 3:**
```
Input: nums = [9,6,4,2,3,5,7,0,1]
Output: 8
```

**Constraints:**
- n == nums.length
- 1 <= n <= 10^4
- 0 <= nums[i] <= n
- All the numbers of nums are unique

## Approach

If every number from 0 to n were present, they'd sum to a known closed-form value: `n*(n+1)/2`. Since exactly one number from that range is missing, the actual sum of the array is short by exactly that missing value. So subtracting the array's real sum from the expected full sum gives the answer directly — no sorting, no searching.

An equally clean alternative avoids any risk of integer overflow on very large inputs by using XOR instead of sums: XOR every index `0..n` together with every value in the array. Every number that actually appears in the array gets XORed twice — once as an index, once as a value — and cancels itself out to 0 (since `x ^ x = 0`). The only number left un-cancelled is the missing one, since it only ever appears as an index and never as a value.

**Time complexity:** O(n) — a single pass to compute the sum (or XOR).

**Space complexity:** O(1).
