# 22. Generate Parentheses

Given `n` pairs of parentheses, return all combinations of well-formed (valid) parentheses strings that can be made with them.

**Example 1:**
```
Input: n = 3
Output: ["((()))","(()())","(())()","()(())","()()()"]
```

**Example 2:**
```
Input: n = 1
Output: ["()"]
```

**Constraints:**
- 1 <= n <= 8

## Approach

Rather than generating every string of length `2n` and filtering for validity (which wastes huge amounts of work on strings that go invalid early), build the string left to right and only ever place a character that keeps it a *possible* prefix of a valid string. That's backtracking with pruning baked in.

Track how many `(` and `)` have been placed so far. At any point you're allowed to place `(` as long as you haven't used all `n` of them yet. You're allowed to place `)` only if the count of `)` placed so far is less than the count of `(` placed so far — that's exactly the condition that guarantees you never close a parenthesis that hasn't been opened. When both counts reach `n`, the string is complete and valid, so record it.

This naturally only ever explores valid prefixes, so no post-hoc validity check or filtering step is needed at all.

**Time complexity:** O(4^n / sqrt(n)) — the number of valid sequences is the nth Catalan number, and each one takes O(n) to build, but the standard bound quoted for this problem is the Catalan-number growth rate itself.

**Space complexity:** O(n) for the recursion depth and current string, aside from the output.
