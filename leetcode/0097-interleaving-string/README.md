# 97. Interleaving String

Given three strings `s1`, `s2`, and `s3`, determine if `s3` can be formed by interleaving `s1` and `s2`. An interleaving means `s3` is built by picking characters from `s1` and `s2` one at a time, always taking the next unused character from whichever string you pick, without reordering the characters within `s1` or within `s2`.

**Example 1:**
```
Input: s1 = "aabcc", s2 = "dbbca", s3 = "aadbbcbcac"
Output: true
```

**Example 2:**
```
Input: s1 = "aabcc", s2 = "dbbca", s3 = "aadbbbaccc"
Output: false
```

**Example 3:**
```
Input: s1 = "", s2 = "", s3 = ""
Output: true
```

**Constraints:**
- 0 <= s1.length, s2.length <= 100
- 0 <= s3.length <= 200
- s1, s2, and s3 consist of lowercase English letters

## Approach

First, a quick precondition: if `len(s1) + len(s2) != len(s3)`, it's immediately impossible — return false without doing any work.

Otherwise this is a 2D DP over how much of each source string has been consumed. Define `dp[i][j]` as: can the first `i + j` characters of `s3` be formed by interleaving the first `i` characters of `s1` with the first `j` characters of `s2`?

**Base case:** `dp[0][0] = True` (empty interleaves into empty).

**Transition:** `dp[i][j]` is true if *either* of these holds:
- The last character consumed came from `s1`: `i > 0`, `s1[i-1] == s3[i+j-1]`, and `dp[i-1][j]` was already true (the rest interleaves correctly).
- The last character consumed came from `s2`: `j > 0`, `s2[j-1] == s3[i+j-1]`, and `dp[i][j-1]` was already true.

So `dp[i][j] = (i > 0 and s1[i-1] == s3[i+j-1] and dp[i-1][j]) or (j > 0 and s2[j-1] == s3[i+j-1] and dp[i][j-1])`.

The key insight is that at position `i+j` in `s3`, the character must have come from exactly one of `s1[i-1]` or `s2[j-1]` (whichever was consumed last), and we only need to know *whether* a valid interleaving exists up to that point, not which specific choices were made — a classic "reachability" DP where a boolean grid replaces an exponential search over 2-way choices at every position.

The answer is `dp[len(s1)][len(s2)]`.

**Time complexity:** O(m * n) where m = len(s1), n = len(s2) — one boolean computed per cell.

**Space complexity:** O(m * n) for the table (can be rolled down to O(n) with a 1D array since each row only depends on the previous row and itself).
