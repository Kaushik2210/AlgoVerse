# 796. Rotate String

You're given two strings `s` and `goal`. Return `true` if `s` can become `goal` after some number of shifts on `s`, where a shift moves the leftmost character of `s` to the rightmost position.

**Example 1:**
```
Input: s = "abcde", goal = "cdeab"
Output: true
```

**Example 2:**
```
Input: s = "abcde", goal = "abced"
Output: false
```

**Constraints:**
- 1 <= s.length, goal.length <= 100
- `s` and `goal` consist of lowercase English letters

## Approach

The brute-force way is to actually perform every possible shift of `s` (there are only `len(s)` of them) and compare against `goal` each time. That's fine at this size, but there's a slicker one-liner trick.

Any rotation of `s` is just some suffix of `s` followed by the remaining prefix. If you glue `s` to itself (`s + s`), every possible rotation of `s` shows up as a contiguous substring of that doubled string — sliding the window one position at a time steps through every rotation. So the whole problem collapses to: check the lengths match, then check whether `goal` is a substring of `s + s`.

**Time complexity:** O(n^2) worst case for the substring search (or O(n) with a linear-time substring algorithm like KMP), where n is the length of `s`.

**Space complexity:** O(n) for the doubled string.
