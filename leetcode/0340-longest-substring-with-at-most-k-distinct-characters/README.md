# 340. Longest Substring with At Most K Distinct Characters

*Note: this is a LeetCode Premium (subscriber-only) problem, not freely accessible on LeetCode. It's included here anyway because it's a very common sliding-window interview question, and a close relative of the well-known "at most 2 distinct characters" and "minimum window substring" problems.*

Given a string `s` and an integer `k`, return the length of the longest substring of `s` that contains at most `k` distinct characters.

**Example 1:**
```
Input: s = "eceba", k = 2
Output: 3
Explanation: the substring is "ece", with length 3
```

**Example 2:**
```
Input: s = "aa", k = 1
Output: 2
Explanation: the substring is "aa", with length 2
```

**Constraints:**
- 1 <= s.length <= 5 * 10^4
- 0 <= k <= 50

## Approach

Checking every substring for its distinct-character count would be O(n^2) or worse, but "longest substring satisfying some running condition" is exactly the shape of a sliding window problem — grow a window from the right, and only shrink it from the left when the condition breaks.

Keep a hash map of character counts within the current window `[left, right]`. Expand the window by moving `right` forward one character at a time, incrementing that character's count in the map. After each expansion, check whether the window now has more than `k` distinct characters (the map's size exceeds `k`). If it does, shrink from the left: decrement the count of `s[left]`, remove it from the map entirely if its count hits 0, and advance `left` — repeat until the distinct count is back to `k` or fewer.

At every point where the window is valid (at most `k` distinct characters), its length `right - left + 1` is a candidate for the answer — track the maximum seen. Since `left` only ever moves forward and never backward, and `right` sweeps the string once, this stays linear despite looking like a nested loop.

**Time complexity:** O(n) — both `left` and `right` traverse the string at most once each, so the total work across all shrink operations is bounded by n.

**Space complexity:** O(k) — the hash map holds at most k+1 distinct characters at any point (k plus the one that just triggered a shrink).
