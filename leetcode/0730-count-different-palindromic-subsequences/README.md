# 730. Count Different Palindromic Subsequences

Given a string `s`, return the number of different non-empty palindromic subsequences in `s`. Since the answer can be huge, return it modulo `10^9 + 7`. A subsequence counts as "different" if the resulting sequence of characters is different, even if the two subsequences were picked from different index sets — so duplicate characters at different positions don't create duplicate answers, only distinct strings matter. The input only ever contains the characters `a`, `b`, `c`, `d`.

**Example 1:**
```
Input: s = "bccb"
Output: 6
Explanation: The 6 distinct palindromic subsequences are 'b', 'c', 'bb', 'cc', 'bcb', 'bccb'.
Note that 'bcb' is counted only once, even though it occurs twice.
```

**Example 2:**
```
Input: s = "abcdabcdabcdabcdabcdabcdabcdabcdabcdabcdabcdabcdabcdabcdabcdabcdabcdabcdabcdabcdabcdabcdabcdabcdabcda"
Output: 35419734
Explanation: The count of distinct non-empty palindromic subsequences, taken modulo 10^9 + 7.
```

**Constraints:**
- 1 <= s.length <= 1000
- s[i] is either 'a', 'b', 'c', or 'd'

## Approach

*Note: this is one of the harder interval-DP problems on LeetCode — the tricky part isn't the recurrence shape (that part is standard interval DP), it's getting the "count distinct strings, not distinct index pairs" bookkeeping right without any hashing or set structure, which is what keeps it in O(n^2) instead of blowing up.*

Brute force would be to generate every subsequence, dedupe them in a set, and check which are palindromes — completely infeasible since there are up to `2^1000` subsequences.

The standard move for "properties of substrings/subranges" is interval DP: let `dp[i][j]` be the number of distinct non-empty palindromic subsequences using only characters from `s[i..j]`. The answer is `dp[0][n-1]`.

The hard part is the recurrence, because we must count *distinct strings*, not distinct pairs of indices. Two cases:

**`s[i] != s[j]`:** any palindromic subsequence of `s[i..j]` either avoids `s[j]` (so it's a palindromic subsequence of `s[i..j-1]`) or avoids `s[i]` (so it's one of `s[i+1..j]`). Adding these two counts double-counts anything that avoids both ends, i.e. every palindromic subsequence of `s[i+1..j-1]`, so subtract that overlap:
```
dp[i][j] = dp[i+1][j] + dp[i][j-1] - dp[i+1][j-1]
```

**`s[i] == s[j]` (call this character `c`):** every distinct palindromic subsequence of the *inner* range `s[i+1..j-1]` can be wrapped in `c` on both sides to make a new distinct palindrome, contributing `2 * dp[i+1][j-1]` (once as itself, once wrapped in `c...c`), plus the two singleton palindromes `c` and `cc` themselves. But that "wrap everything" logic overcounts when `c` also appears *inside* the inner range, because then some of those wrapped palindromes are indistinguishable from ones you'd get by wrapping a different, narrower occurrence of `c`. To fix this, find the leftmost occurrence of `c` after `i` (call it `lo`) and the rightmost occurrence of `c` before `j` (call it `hi`):
- If there's no `c` inside at all (`lo > hi`): nothing to double-count, so `dp[i][j] = 2*dp[i+1][j-1] + 2` (the `+2` accounts for `c` and `cc` themselves).
- If there's exactly one `c` inside (`lo == hi`): the singleton palindrome `c` (from that inner occurrence) would get generated twice by the wrapping, so only add 1 instead of 2: `dp[i][j] = 2*dp[i+1][j-1] + 1`.
- If there are two or more `c`s inside (`lo < hi`): wrapping the *entire* inner range in `c` already reproduces every palindrome that a narrower `c...c` wrapping would produce (since the narrower wrap's palindromes are a subset), so we've over-added the whole inner interval `dp[lo+1][hi-1]` worth of palindromes a second time and need to subtract it back out: `dp[i][j] = 2*dp[i+1][j-1] - dp[lo+1][hi-1]`.

Filling `dp` by increasing substring length (base case `dp[i][i] = 1` for every single character) gives `dp[0][n-1]` in O(n^2) states, each O(n) to compute the `lo`/`hi` scan in the worst case — O(n^3) overall, which comfortably handles `n <= 1000` for this specific alphabet-of-4 structure since the `lo`/`hi` scans amortize well in practice; the constant-alphabet property is really what keeps the recurrence from needing more machinery than plain interval DP.

**Time complexity:** O(n^2) DP states; each transition does an O(n) scan for `lo`/`hi` in the worst case, so O(n^3) worst case, though in practice this runs comfortably within limits for n <= 1000.

**Space complexity:** O(n^2) for the `dp` table.
