# 161. One Edit Distance

**Commonly asked at:** Meta

> **Note:** This is a LeetCode premium problem, so it can't be opened or submitted on a free account. Solved and verified independently against hand-built test cases.

You're given two strings `s` and `t`. Return `true` if they are exactly one edit apart, where an edit is one of: inserting a character, deleting a character, or replacing a character.

**Example 1:**
```
Input: s = "ab", t = "acb"
Output: true
Explanation: Insert 'c' into s to get t.
```

**Example 2:**
```
Input: s = "cab", t = "ad"
Output: false
Explanation: This requires two edits.
```

**Example 3:**
```
Input: s = "1203", t = "1213"
Output: true
Explanation: Replace '0' with '1'.
```

**Constraints:**
- 0 <= s.length, t.length <= 100
- `s` and `t` consist of lowercase and uppercase English letters and digits

## Approach

Full edit-distance DP is overkill here, since we don't need the actual minimum edit count — just whether it's exactly 1. A single replace, insert, or delete can only ever change lengths by at most 1, so first check `abs(len(s) - len(t)) > 1` and immediately return `false` if so.

From there, split into two cases based on whether the lengths are equal:

- **Equal lengths:** the only possible single edit is a replace. Walk both strings together and count mismatched positions — if exactly one position differs, it's a valid single replace; zero differences means the strings are identical (zero edits, not one); more than one is too many edits.
- **Lengths differ by exactly 1:** the only possible single edit is an insert/delete, meaning the shorter string must be a "subsequence" of the longer one that skips exactly one character. Walk both strings with two pointers; advance both while characters match. The moment they diverge, that single mismatch must be the one extra character in the longer string — skip past it in the longer string only, then the two pointers must walk in perfect lockstep matching for the rest of both strings. If a second mismatch shows up, it's not a single edit.

**Time complexity:** O(n) where n is the length of the longer string — each case is a single linear scan.

**Space complexity:** O(1) beyond the input strings.
