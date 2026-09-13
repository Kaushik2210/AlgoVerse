# 516. Longest Palindromic Subsequence

You're given a string `s`. Return the length of the longest palindromic *subsequence* in it (a subsequence keeps the relative order of characters but doesn't need them to be contiguous, unlike a substring).

**Example 1:**
```
Input: s = "bbbab"
Output: 4
Explanation: One longest palindromic subsequence is "bbbb".
```

**Example 2:**
```
Input: s = "cbbd"
Output: 2
Explanation: One longest palindromic subsequence is "bb".
```

**Constraints:**
- 1 <= s.length <= 1000
- s consists only of lowercase English letters

## Approach

This is a different problem from Palindromic Substrings (#647) despite the similar name — that one counts *contiguous* palindromic substrings via expand-around-center, this one finds the *longest* palindromic *subsequence*, where characters can be skipped. Expand-around-center doesn't apply here since a palindromic subsequence doesn't need to occupy a contiguous range.

The clean way to think about it: the longest palindromic subsequence of `s` is exactly the longest common subsequence between `s` and its reverse. But there's also a direct interval DP that captures the same idea without needing to build the reversed string. Define `dp[i][j]` as the length of the longest palindromic subsequence within the substring `s[i..j]` (inclusive on both ends). If `s[i] == s[j]`, those two matching ends can both be included in the palindrome, wrapping around whatever's found in between: `dp[i][j] = dp[i+1][j-1] + 2`. If `s[i] != s[j]`, the two ends can't both be used together, so take the best of leaving off one end or the other: `dp[i][j] = max(dp[i+1][j], dp[i][j-1])`.

Base case: a single character is a palindrome of length 1, so `dp[i][i] = 1`. Fill the table by increasing substring length (or equivalently iterate `i` from the end of the string backward and `j` from `i` forward), since `dp[i][j]` depends on strictly smaller subproblems. The final answer is `dp[0][n-1]`.

**Time complexity:** O(n^2) — the dp table has O(n^2) cells, each filled in O(1).

**Space complexity:** O(n^2) for the dp table (reducible to O(n) with careful diagonal-by-diagonal rolling, but the 2D table is clearer).
