# 3. Longest Substring Without Repeating Characters

Given a string `s`, find the length of the longest substring (contiguous chunk) that doesn't contain any repeated characters.

**Example 1:**
```
Input: s = "abcabcbb"
Output: 3
Explanation: "abc" is the longest run without a repeat
```

**Example 2:**
```
Input: s = "bbbbb"
Output: 1
```

**Example 3:**
```
Input: s = "pwwkew"
Output: 3
Explanation: "wke" — note "pwke" isn't a substring since the letters aren't contiguous
```

**Constraints:**
- 0 <= s.length <= 5 * 10^4
- `s` consists of English letters, digits, symbols, and spaces

## Approach

The brute-force approach checks every possible substring and tests each for repeated characters — that's O(n^2) or O(n^3) depending on how you check for repeats, way too slow for 5 * 10^4 characters.

This is a classic **sliding window** problem. Keep two pointers, `left` and `right`, marking the boundaries of a window that currently has no repeated characters, plus a hash map remembering the most recent index where each character was seen. Expand the window by moving `right` forward one character at a time. If the character at `right` has been seen before *and* that previous occurrence is inside the current window, that's a repeat — so jump `left` forward to just past that previous occurrence, shrinking the window until the repeat is excluded. At every step, update the character's last-seen index and track the best (longest) window size found so far.

The key insight is that `left` only ever moves forward, never backward — so even though it looks like there might be two nested loops, each pointer sweeps across the string at most once, making the whole thing linear.

**Time complexity:** O(n) — both pointers traverse the string once, each character visited a constant number of times.

**Space complexity:** O(min(n, m)) — where m is the size of the character set, since the map holds at most one entry per unique character in the window.
