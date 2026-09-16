# 1312. Minimum Insertion Steps to Make a String Palindrome

**Commonly asked at:** Google

You're given a string `s`. In one step you can insert any character at any position. Return the minimum number of insertions needed to make `s` a palindrome.

**Example 1:**
```
Input: s = "zzazz"
Output: 0
Explanation: "zzazz" is already a palindrome.
```

**Example 2:**
```
Input: s = "mbadm"
Output: 2
Explanation: "mbadm" can become "mbdadbm" or "mdbabdm" with 2 insertions.
```

**Example 3:**
```
Input: s = "leetcode"
Output: 5
```

**Constraints:**
- 1 <= s.length <= 500
- s consists of lowercase English letters

## Approach

The key connection: whatever characters of `s` are *not* part of its longest palindromic subsequence (#516) are exactly the characters that need a mirrored partner inserted somewhere to complete a palindrome — the longest palindromic subsequence is the largest part of the string that's "already symmetric" and can be left alone, and every other character needs one insertion to give it a matching pair. So the answer is simply `len(s) - longestPalindromeSubsequence(s)`.

This can be computed directly with the same interval DP as #516, just phrased in terms of insertions instead of subsequence length: define `dp[i][j]` as the minimum insertions needed to make `s[i..j]` a palindrome. If `s[i] == s[j]`, those two ends already match, so no insertion is needed for them and the cost is whatever's needed for the strictly smaller inner range: `dp[i][j] = dp[i+1][j-1]`. If `s[i] != s[j]`, one insertion is needed to fix up one of the two ends (either mirror `s[i]` on the right or mirror `s[j]` on the left), and it's best to take whichever leftover subproblem is cheaper: `dp[i][j] = 1 + min(dp[i+1][j], dp[i][j-1])`.

Base case: any single character or empty range needs 0 insertions (`dp[i][i] = 0`, and ranges where `i > j` are treated as 0). Fill by increasing range length; the answer is `dp[0][n-1]`.

**Time complexity:** O(n^2) — the dp table has O(n^2) cells, each filled in O(1).

**Space complexity:** O(n^2) for the dp table (reducible to O(n) with diagonal rolling).
