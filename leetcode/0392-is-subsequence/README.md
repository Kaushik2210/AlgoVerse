# 392. Is Subsequence

You're given two strings `s` and `t`. Return `true` if `s` is a subsequence of `t` — meaning you can get `s` by deleting some (possibly zero) characters from `t` without changing the order of what's left.

**Example 1:**
```
Input: s = "abc", t = "ahbgdc"
Output: true
```

**Example 2:**
```
Input: s = "axc", t = "ahbgdc"
Output: false
```

**Constraints:**
- 0 <= s.length <= 100
- 0 <= t.length <= 10^4
- s and t consist only of lowercase English letters

## Approach

No DP table is needed here — a single greedy scan does it. Walk through `t` once with a pointer `i` into `s` starting at 0. For every character of `t`, if it matches `s[i]`, advance `i`. By the end, if `i` has reached the end of `s`, every character of `s` was matched in order somewhere in `t`, so `s` is a subsequence.

This greedy match is always safe: matching a character of `s` as early as possible in `t` never hurts, since it only leaves more of `t` available for the remaining characters of `s`. There's never a reason to skip an available match and hope for a better one later.

**Time complexity:** O(n), where n is the length of `t` — one pass, one pointer.

**Space complexity:** O(1).

**Follow-up note:** if you had to check many strings `s` against the same `t`, it'd be worth precomputing, for each position in `t` and each letter, the next occurrence of that letter at or after that position — turning each subsequence check into O(len(s) * log(len(t))) or O(len(s)) instead of a fresh O(len(t)) scan.
