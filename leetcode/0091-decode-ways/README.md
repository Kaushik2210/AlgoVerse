# 91. Decode Ways

A message made of digits can be decoded back to letters using the mapping `'1' -> 'A'`, `'2' -> 'B'`, ..., `'26' -> 'Z'`. Given a digit string `s`, return how many distinct ways it can be decoded.

**Example 1:**
```
Input: s = "12"
Output: 2
Explanation: "12" could be decoded as "AB" (1 2) or "L" (12).
```

**Example 2:**
```
Input: s = "226"
Output: 3
Explanation: "226" could be "BZ" (2 26), "VF" (22 6), or "BBF" (2 2 6).
```

**Constraints:**
- 1 <= s.length <= 100
- `s` consists of digits and may contain leading zeros

## Approach

At each position in the string, there are (at most) two choices: decode the current digit on its own, or pair it with the next digit and decode both together. That branching structure, where a decision reduces the problem to a smaller version of itself, is a strong signal for dynamic programming — the number of ways to decode `s` from position `i` onward only depends on what comes after `i`, so overlapping subproblems get recomputed unless you cache them.

Let `ways[i]` be the number of ways to decode the prefix `s[:i]`. `ways[i]` can come from two places: `ways[i-1]`, if `s[i-1]` (the single most recent digit) is a valid standalone letter (non-zero), and `ways[i-2]`, if the two-digit chunk `s[i-2:i]` falls between "10" and "26" (a valid two-letter pairing). Add up whichever of those are valid; if neither is, `ways[i]` is 0, meaning the whole string is undecodable from there on, and you can short-circuit. The base case: `ways[0] = 1` (an empty prefix has exactly one, trivial, way to be decoded), and the string can't start with `'0'` at all, since there's no letter mapped to it.

Since `ways[i]` only ever depends on the two values right before it, there's no need to keep the whole array — just carry `prev1` and `prev2` forward as you scan left to right.

**Time complexity:** O(n) — one pass through the string, constant work per position.

**Space complexity:** O(1) — only the last two counts are kept at any time.
