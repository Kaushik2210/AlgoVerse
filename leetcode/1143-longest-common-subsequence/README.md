# 1143. Longest Common Subsequence

You're given two strings `text1` and `text2`. Return the length of their longest common subsequence — a sequence that appears in both strings in the same relative order, but not necessarily contiguously. If there's no common subsequence, return 0.

**Example 1:**
```
Input: text1 = "abcde", text2 = "ace"
Output: 3
Explanation: "ace" is a subsequence of both strings.
```

**Example 2:**
```
Input: text1 = "abc", text2 = "abc"
Output: 3
```

**Example 3:**
```
Input: text1 = "abc", text2 = "def"
Output: 0
Explanation: There is no common subsequence.
```

**Constraints:**
- 1 <= text1.length, text2.length <= 1000
- text1 and text2 consist of lowercase English characters

## Approach

Trying every subsequence of one string and checking whether it appears in the other blows up exponentially, so this calls for dynamic programming instead.

Build a 2D table `dp[i][j]` representing the LCS length between the first `i` characters of `text1` and the first `j` characters of `text2`. There are only two things that can happen when comparing `text1[i-1]` and `text2[j-1]`:

- If the characters match, they can both be part of the common subsequence, so `dp[i][j] = dp[i-1][j-1] + 1` — extend whatever the best answer was without these two characters.
- If they don't match, one of the two characters can't help extend an LCS ending here, so take the better of dropping either one: `dp[i][j] = max(dp[i-1][j], dp[i][j-1])`.

The base case is that an empty prefix of either string gives an LCS of 0, which is exactly what a table initialized to all zeros already represents. Fill row by row, and the answer ends up in the bottom-right corner, `dp[m][n]`.

**Time complexity:** O(m*n) — one pass filling an m+1 by n+1 table.

**Space complexity:** O(m*n) for the table (can be reduced to O(min(m, n)) by keeping only two rows, but the full table is simpler to read).
