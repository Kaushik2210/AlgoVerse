# 712. Minimum ASCII Delete Sum for Two Strings

**Commonly asked at:** Google, Amazon

You're given two strings `s1` and `s2`. Find the lowest total ASCII sum of characters you need to delete so that the two strings become equal.

**Example 1:**
```
Input: s1 = "sea", s2 = "eat"
Output: 231
Explanation: Deleting "s" from "sea" adds ord("s") = 115 to the sum. Deleting "t" from "eat" adds ord("t") = 116. 115 + 116 = 231.
```

**Example 2:**
```
Input: s1 = "delete", s2 = "leet"
Output: 403
Explanation: Deleting "dee" from "delete" to get "let" adds 100+101+101=302. Deleting "e" from "leet" to get "let" adds 101. 302+101 = 403. Both are left with "let".
```

**Constraints:**
- 1 <= s1.length, s2.length <= 1000
- s1 and s2 consist of lowercase English letters

## Approach

This is the same shape as the "delete operation for two strings" problem, except now each deleted character costs its ASCII value instead of counting as one flat step, so we can't just look at LCS *length* — we need the actual cheapest path.

Build a DP table where `dp[i][j]` is the minimum ASCII delete-sum needed to make `s1[:i]` and `s2[:j]` equal:

- Base cases: turning a prefix of one string against an empty prefix of the other means deleting every character in it, so `dp[i][0]` accumulates the ASCII values of `s1[:i]`, and `dp[0][j]` accumulates those of `s2[:j]`.
- If `s1[i-1] == s2[j-1]`, that character can stay in both strings for free, so `dp[i][j] = dp[i-1][j-1]`.
- Otherwise, we have to delete one of the two mismatched characters — either drop `s1[i-1]` (cost `dp[i-1][j] + ord(s1[i-1])`) or drop `s2[j-1]` (cost `dp[i][j-1] + ord(s2[j-1])`) — and take whichever is cheaper.

The final answer sits at `dp[m][n]`.

**Time complexity:** O(m*n) for the DP table, where m and n are the two string lengths.

**Space complexity:** O(m*n) for the DP table.
