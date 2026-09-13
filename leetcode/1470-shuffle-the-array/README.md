# 1470. Shuffle the Array

Given an array `nums` of length `2n`, consisting of the pattern `[x1, x2, ..., xn, y1, y2, ..., yn]`, return the array in the shuffled form `[x1, y1, x2, y2, ..., xn, yn]`.

**Example 1:**
```
Input: nums = [2,5,1,3,4,7], n = 3
Output: [2,3,5,4,1,7]
Explanation: x = [2,5,1], y = [3,4,7], interleaved gives [2,3,5,4,1,7].
```

**Example 2:**
```
Input: nums = [1,2,3,4,4,3,2,1], n = 4
Output: [1,4,2,3,3,2,4,1]
```

**Example 3:**
```
Input: nums = [1,1,2,2], n = 2
Output: [1,2,1,2]
```

**Constraints:**
- 1 <= n <= 500
- nums.length == 2n
- 1 <= nums[i] <= 10^3

## Approach

The first half of `nums` (indices `0` to `n-1`) is the `x` sequence and the second half (indices `n` to `2n-1`) is the `y` sequence. The target interleaving just walks both halves in lockstep: for each `i` from 0 to `n-1`, append `nums[i]` then `nums[i + n]`.

No extra bookkeeping is needed — the two halves are already contiguous and in order, so a single pass building the output directly from both indices does the job.

**Time complexity:** O(n) — one pass building the 2n-length result.

**Space complexity:** O(n) for the output array (O(1) extra beyond that).
