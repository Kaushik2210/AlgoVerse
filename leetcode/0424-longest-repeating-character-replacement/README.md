# 424. Longest Repeating Character Replacement

You're given a string `s` of uppercase English letters and an integer `k`. You may change up to `k` characters in the string to any other uppercase letter. Return the length of the longest substring that can be made to contain only one repeating character after doing so.

**Example 1:**
```
Input: s = "ABAB", k = 2
Output: 4
Explanation: Replace the two 'A's (or two 'B's) with the other letter to get "AAAA" or "BBBB".
```

**Example 2:**
```
Input: s = "AABABBA", k = 1
Output: 4
Explanation: Replace the 'A' at index 3 to get "AABBBBA". The substring "BBBB" has length 4.
```

**Constraints:**
- 1 <= s.length <= 10^5
- s consists of only uppercase English letters
- 0 <= k <= s.length

## Approach

A window `[left, right]` of length `window_len` can be turned into all one character with at most `k` replacements exactly when `window_len - max_freq <= k`, where `max_freq` is the count of whichever letter is most common in that window — everything that isn't the majority letter needs to be replaced, and that count has to fit within the budget `k`.

That turns this into a sliding window problem. Expand `right` one step at a time, updating a frequency count of the current window and tracking `max_freq` seen so far. If the window's replacement need (`window_len - max_freq`) exceeds `k`, shrink from the left by one.

One subtlety: `max_freq` is only ever updated upward as `right` moves, never recalculated downward when the window shrinks. That's fine — a stale, too-high `max_freq` can never make the window shrink *less* than it should, it can only make the algorithm briefly think a window is still valid when it's actually just as good as an earlier window of the same size. Since the goal is only to track the best window length ever seen, not to keep the window continuously "tight," this shortcut doesn't cost correctness: the window can never grow larger than the best valid window found so far without a genuinely higher true max_freq to justify it.

**Time complexity:** O(n) — each index enters and leaves the window at most once.

**Space complexity:** O(1) — the frequency counter has at most 26 entries (uppercase letters).
