# 115. Distinct Subsequences

Given two strings `s` and `t`, return the number of distinct subsequences of `s` that equal `t`. A subsequence is formed by deleting some (possibly zero) characters from `s` without changing the order of the remaining characters.

**Example 1:**
```
Input: s = "rabbbit", t = "rabbit"
Output: 3
Explanation: There are 3 ways to pick "rabbit" out of "rabbbit" — you choose which of the three 'b's to drop.
```

**Example 2:**
```
Input: s = "babgbag", t = "bag"
Output: 5
```

**Constraints:**
- 1 <= s.length, t.length <= 1000
- s and t consist of English letters

## Approach

Define `dp[i][j]` as the number of ways the first `i` characters of `s` contain the first `j` characters of `t` as a subsequence.

**Base cases:** `dp[i][0] = 1` for every `i` — there's exactly one way to form the empty string as a subsequence of anything (pick nothing). `dp[0][j] = 0` for `j > 0` — an empty `s` can't contain any non-empty target.

**Transition:** for `dp[i][j]` with `i, j >= 1`, think about whether `s[i-1]` (the newest character of `s`) participates in matching `t[j-1]` (the newest character we need from `t`):
- We can always choose to **skip** `s[i-1]` and rely on the first `i-1` characters of `s` to already contain all of `t[:j]`: contributes `dp[i-1][j]`.
- If `s[i-1] == t[j-1]`, we can additionally **use** `s[i-1]` to match `t[j-1]`, which means the first `i-1` characters of `s` need to supply `t[:j-1]`: contributes `dp[i-1][j-1]`.

So `dp[i][j] = dp[i-1][j] + (dp[i-1][j-1] if s[i-1] == t[j-1] else 0)`. The "skip" option is always available (that's why it's outside the condition), while the "match" option only adds when the characters actually agree — this additive combination is what correctly counts *all* distinct index-choices rather than just checking feasibility.

The answer is `dp[len(s)][len(t)]`.

**Time complexity:** O(m * n) where m = len(s), n = len(t).

**Space complexity:** O(m * n) for the table (rollable to O(n) with a 1D array iterated right-to-left, since each row only reads from the row above).
