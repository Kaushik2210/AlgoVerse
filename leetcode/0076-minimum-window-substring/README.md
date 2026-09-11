# 76. Minimum Window Substring

Given two strings `s` and `t`, return the smallest substring of `s` that contains every character of `t` (including duplicates — if `t` has two `'a'`s, the window needs at least two `'a'`s). If no such substring exists, return an empty string.

**Example 1:**
```
Input: s = "ADOBECODEBANC", t = "ABC"
Output: "BANC"
Explanation: The minimum window substring "BANC" includes 'A', 'B', and 'C' from t.
```

**Example 2:**
```
Input: s = "a", t = "a"
Output: "a"
```

**Example 3:**
```
Input: s = "a", t = "aa"
Output: ""
Explanation: t needs two 'a's but s only has one, so no window can satisfy it.
```

**Constraints:**
- 1 <= s.length, t.length <= 10^5
- s and t consist of uppercase and lowercase English letters

## Approach

Brute force would check every substring of `s` and test whether it contains all of `t` — that's O(n^2) substrings, each expensive to validate, so it's way too slow.

This is a classic sliding window problem. Keep a frequency count of what characters `t` needs (`need`). Expand a window over `s` with a `right` pointer, and every time a character you add is one `t` cares about, decrement its need and, if that character's need just hit zero, increment a `formed` counter. Once `formed` equals the number of *distinct* characters `t` requires, the window is currently valid — now try to shrink it from the `left` as much as possible while it stays valid, recording the smallest valid window seen. Shrinking works the same way in reverse: as you remove the character at `left`, if removing it would break validity (need for that char goes from 0 to positive), stop shrinking and record the window if it's the best one so far, then continue expanding `right`.

The key insight is that both pointers only ever move forward — each character is added to the window once and removed at most once, so the whole scan is linear despite looking like a nested loop.

**Time complexity:** O(|s| + |t|) — building the need-count is O(|t|), and each pointer sweeps across `s` at most once.

**Space complexity:** O(|t|) — for the character count maps (bounded by the alphabet size, 52 letters, so effectively O(1) in practice).
