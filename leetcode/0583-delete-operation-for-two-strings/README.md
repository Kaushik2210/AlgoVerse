# 583. Delete Operation for Two Strings

You're given two strings `word1` and `word2`. In one step you can delete exactly one character from either string. Return the minimum number of steps needed to make `word1` and `word2` the same.

**Example 1:**
```
Input: word1 = "sea", word2 = "eat"
Output: 2
Explanation: Delete "s" from "sea" to get "ea", then delete "t" from "eat" to get "ea".
```

**Example 2:**
```
Input: word1 = "leetcode", word2 = "etco"
Output: 4
```

**Constraints:**
- 1 <= word1.length, word2.length <= 500
- word1 and word2 consist of only lowercase English letters

## Approach

Whatever characters end up staying (untouched) in both strings after deletions have to form a common subsequence of the two — and since we want to delete as few characters as possible, we want to keep as many as possible, meaning we want the *longest* common subsequence (LCS).

So first find the LCS length between `word1` and `word2` with the standard DP: `dp[i][j]` is the LCS length of `word1[:i]` and `word2[:j]`, matching characters extend the diagonal and mismatches take the best of dropping one character from either side.

Once we have the LCS length, every character in `word1` that isn't part of it must be deleted, and same for `word2`. So the answer is just `(len(word1) - lcs) + (len(word2) - lcs)`.

**Time complexity:** O(m*n) for the LCS table, where m and n are the two string lengths.

**Space complexity:** O(m*n) for the DP table.
