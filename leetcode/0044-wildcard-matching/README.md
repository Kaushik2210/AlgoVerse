# 44. Wildcard Matching

Given an input string `s` and a pattern `p`, implement wildcard pattern matching supporting `'?'` and `'*'`, where `'?'` matches any single character and `'*'` matches any sequence of characters (including the empty sequence). The matching should cover the **entire** input string, not just a prefix.

**Example 1:**
```
Input: s = "aa", p = "a"
Output: false
Explanation: "a" doesn't match the whole string "aa".
```

**Example 2:**
```
Input: s = "aa", p = "*"
Output: true
Explanation: '*' matches any sequence.
```

**Example 3:**
```
Input: s = "cb", p = "?a"
Output: false
Explanation: '?' matches 'c', but the second letter is 'a', which does not match 'b'.
```

**Constraints:**
- 0 <= s.length, p.length <= 2000
- s consists of only lowercase English letters
- p consists of only lowercase English letters, '?' or '*'

## Approach

Define `dp[i][j]` as: does `p[:j]` match `s[:i]`? We build this bottom-up over a `(len(s)+1) x (len(p)+1)` grid.

**Base case:** `dp[0][0] = True` — empty pattern matches empty string. `dp[0][j]` for `j > 0` is true only if `p[:j]` consists entirely of `*` characters (each can match zero characters, so a run of stars can vanish entirely against an empty string) — precompute this as a prefix scan. `dp[i][0]` for `i > 0` is always false (a non-empty string can't match an empty pattern).

**Transition:** for `dp[i][j]` with `i, j >= 1`, look at `p[j-1]`:
- If `p[j-1] == '?'` or `p[j-1] == s[i-1]` (literal match): this pattern character consumes exactly one character of `s`, so `dp[i][j] = dp[i-1][j-1]`.
- If `p[j-1] == '*'`: the star has two ways to be used, and `dp[i][j]` is true if *either* works:
  - Treat it as matching **zero** characters: `dp[i][j-1]` (drop the star from the pattern, `s` unchanged).
  - Treat it as matching **one more character** of `s` (extending whatever it already matched): `dp[i-1][j]` (keep the star in play, consume one more character of `s`).
  - `dp[i][j] = dp[i][j-1] or dp[i-1][j]`
- Otherwise (a literal character that doesn't match `s[i-1]`): `dp[i][j] = False`.

The answer is `dp[len(s)][len(p)]`.

The key insight distinguishing this from problem 10 (Regular Expression Matching) is that `*` here is a standalone wildcard token (matches any sequence by itself), not tied to "zero or more of the preceding character" — so there's no need to look two pattern positions back; `*`'s own transition only ever references the immediately adjacent `dp` cells.

**Time complexity:** O(m * n) where m = len(s), n = len(p).

**Space complexity:** O(m * n) for the table (rollable to O(n) with a 1D array, updated left to right, since each cell only depends on the row above and the current row's previous column).
