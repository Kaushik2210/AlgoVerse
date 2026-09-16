# 1092. Shortest Common Supersequence

**Commonly asked at:** Google

You're given two strings `str1` and `str2`. Return the shortest string that has both `str1` and `str2` as subsequences. If there are multiple valid answers, return any of them.

**Example 1:**
```
Input: str1 = "abac", str2 = "cab"
Output: "cabac"
Explanation: str1 = "abac" is a subsequence of "cabac" (drop the leading c). str2 = "cab" is also a subsequence of "cabac" (drop the middle "ac").
```

**Example 2:**
```
Input: str1 = "abc", str2 = "abc"
Output: "abc"
```

**Constraints:**
- 1 <= str1.length, str2.length <= 1000
- str1 and str2 consist of lowercase English letters

## Approach

Every character that the two strings share in their longest common subsequence (LCS) only needs to appear once in the supersequence — the rest of each string's characters have to appear too, just squeezed in around that shared backbone. So the length of the answer is always `len(str1) + len(str2) - len(LCS)`, and the real work is building the actual string, not just its length.

Start by building the standard LCS table: `dp[i][j]` is the length of the LCS of `str1[:i]` and `str2[:j]`. Once that table exists, walk backward from `dp[m][n]` to reconstruct the supersequence directly, character by character:

- If `str1[i-1] == str2[j-1]`, that character is part of the shared LCS — take it once, and step both `i` and `j` back.
- Otherwise, one of the two strings has a character here that isn't part of the LCS at this position. Take whichever character belongs to the side with the larger `dp` value at the neighboring cell (`dp[i-1][j]` vs `dp[i][j-1]`), since that's the side still carrying more of the eventual LCS forward, and step only that pointer back.
- Once one string is exhausted, dump the rest of the other string in — nothing left to interleave against.

Because we're walking backward, the characters come out in reverse order, so reverse the built string at the end.

**Time complexity:** O(m*n) to build the LCS table, where m and n are the two string lengths; reconstruction is O(m+n).

**Space complexity:** O(m*n) for the DP table.
