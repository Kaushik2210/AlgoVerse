# 20. Valid Parentheses

You're given a string that contains only the characters `(`, `)`, `{`, `}`, `[`, and `]`. Decide whether the string is "valid" — meaning every opening bracket has a matching closing bracket of the same type, and the brackets close in the right order (no crossing pairs).

**Example 1:**
```
Input: s = "()[]{}"
Output: true
```

**Example 2:**
```
Input: s = "(]"
Output: false
```

**Example 3:**
```
Input: s = "([)]"
Output: false
Explanation: the brackets cross each other — the "(" needs to close before the "]" does.
```

**Constraints:**
- 1 <= s.length <= 10^4
- `s` consists only of bracket characters

## Approach

You could try to repeatedly find and remove adjacent matching pairs like `()`, `[]`, `{}` from the string until nothing changes, then check if the string is empty — but that's messy and slow, potentially O(n^2) if you're not careful about how you scan and rescan.

The cleaner way to think about it: the *most recently opened* bracket has to be the *next one closed*. That "most recent first" behavior is exactly what a stack gives you for free. So walk through the string once. Every time you see an opening bracket, push it onto the stack. Every time you see a closing bracket, check the top of the stack — it has to be the matching opener. If it is, pop it and move on. If it isn't (or the stack is empty when you hit a closer), the string is invalid immediately.

At the very end, the string is valid only if the stack is completely empty — otherwise there are unmatched openers left dangling.

**Time complexity:** O(n) — one pass through the string, each character pushed/popped at most once.

**Space complexity:** O(n) — worst case (all openers) the stack holds every character.
