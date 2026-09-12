# 10. Regular Expression Matching

Given an input string `s` and a pattern `p`, implement regular expression matching supporting `'.'` and `'*'` where `'.'` matches any single character and `'*'` matches zero or more of the **preceding** element. The matching should cover the **entire** input string, not just a prefix.

**Example 1:**
```
Input: s = "aa", p = "a"
Output: false
Explanation: "a" does not match the entire string "aa".
```

**Example 2:**
```
Input: s = "aa", p = "a*"
Output: true
Explanation: '*' means zero or more of the preceding element, 'a'. Here it matches 'a' twice.
```

**Example 3:**
```
Input: s = "ab", p = ".*"
Output: true
Explanation: ".*" means "zero or more of any character", which covers "ab" entirely.
```

**Constraints:**
- 1 <= s.length <= 20
- 1 <= p.length <= 20
- s consists of only lowercase English letters
- p consists of only lowercase English letters, '.', and '*'
- It is guaranteed for each appearance of the character '*', there will be a previous valid character to match

## Approach

The crucial difference from Wildcard Matching (problem 44) is that `*` here is **not a standalone token** — it always modifies the character immediately before it in the pattern, meaning "zero or more of that specific preceding character (or `.`)." So the DP transition has to look *two* pattern positions back whenever it encounters a `*`, not one.

Define `dp[i][j]` as: does `p[:j]` match `s[:i]`?

**Base case:** `dp[0][0] = True`. `dp[i][0]` for `i > 0` is always false (nothing but an empty pattern matches an empty string, and an empty pattern can't match a non-empty string). `dp[0][j]` for `j > 0` can be true if the pattern can collapse to nothing — specifically when `p[j-1] == '*'` and `dp[0][j-2]` is true (the `x*` pair vanishes, matching zero occurrences of `x`).

**Transition:** for `dp[i][j]` with `i, j >= 1`, look at `p[j-1]`:
- If `p[j-1]` is a literal character or `'.'` (not `*`), and it matches `s[i-1]` (literal equality, or `.` matches anything): `dp[i][j] = dp[i-1][j-1]`. Otherwise `dp[i][j] = False`.
- If `p[j-1] == '*'`, it pairs with `p[j-2]` (the character it repeats). This gives two options, and `dp[i][j]` is true if *either* holds:
  - **Zero occurrences:** skip the `x*` pair entirely, treating it as consuming nothing from `s`: `dp[i][j-2]`.
  - **One or more occurrences:** only valid if `p[j-2]` matches `s[i-1]` (literal match or `p[j-2] == '.'`). If so, we can "use" the star to cover this character of `s` while keeping the `x*` pair available to match further repeats: `dp[i-1][j]`.
  - `dp[i][j] = dp[i][j-2] or (matches(s[i-1], p[j-2]) and dp[i-1][j])`

The answer is `dp[len(s)][len(p)]`.

**Why this is easy to get wrong:** it's tempting to treat `*` like problem 44's wildcard (referencing only `dp[i][j-1]` / `dp[i-1][j]`), but that ignores that `*` is bound to a specific preceding character — `a*` can only ever produce `a`'s, never arbitrary characters, and the zero-occurrence case must drop *both* `p[j-2]` and `p[j-1]` together, not just the star. Getting the "look back two positions" and the "guard the one-or-more branch with a character match" parts right is what this problem hinges on.

Tested carefully against tricky cases: `s="aa", p="a*"` (repeat expansion), `s="mississippi", p="mis*is*p*."` (multiple stars chained with a wildcard-dot at the end), and `s="", p="a*a*a*"` (an entire pattern collapsing to empty via repeated zero-occurrence choices).

**Time complexity:** O(m * n) where m = len(s), n = len(p).

**Space complexity:** O(m * n) for the table (rollable to O(n) with two 1D arrays, since each row only depends on the row above and the current row).
