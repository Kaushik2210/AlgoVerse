# 1035. Uncrossed Lines

**Commonly asked at:** Amazon

You're given two integer arrays `nums1` and `nums2`. Draw connecting lines between equal values (one line per pair), where each number can only be used by one line, and lines cannot cross. Return the maximum number of lines you can draw this way.

**Example 1:**
```
Input: nums1 = [1,4,2], nums2 = [1,2,4]
Output: 2
Explanation: Connect the two 1s and the two 4s (or the two 1s and the two 2s) — the lines drawn in matching left-to-right order don't cross.
```

**Example 2:**
```
Input: nums1 = [2,5,1,2,5], nums2 = [10,5,2,1,5,2]
Output: 3
```

**Constraints:**
- 1 <= nums1.length, nums2.length <= 500
- 1 <= nums1[i], nums2[j] <= 2000

## Approach

Two lines cross exactly when they connect pairs out of relative order — so a valid, non-crossing set of connections is exactly a common subsequence of `nums1` and `nums2`: both sequences of connected values have to appear in the same relative order in each array. Maximizing the number of connections is therefore maximizing the length of the longest common subsequence (LCS), just applied to arrays of numbers instead of strings.

The DP is identical to the LCS recurrence: `dp[i][j]` is the LCS length of `nums1[:i]` and `nums2[:j]`. When `nums1[i-1] == nums2[j-1]`, that value can be connected, extending the LCS from the diagonal by one. Otherwise, take the best of skipping one element from either array.

**Time complexity:** O(m*n), where m and n are the two array lengths.

**Space complexity:** O(m*n) for the DP table.
