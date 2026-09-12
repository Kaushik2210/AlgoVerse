# 680. Valid Palindrome II

You're given a string `s`. Return `true` if `s` can become a palindrome after deleting at most one character from it.

**Example 1:**
```
Input: s = "aba"
Output: true
Explanation: Already a palindrome.
```

**Example 2:**
```
Input: s = "abca"
Output: true
Explanation: Delete the 'c' (or the 'b') to get "aba".
```

**Example 3:**
```
Input: s = "abc"
Output: false
```

**Constraints:**
- 1 <= s.length <= 10^5
- s consists of lowercase English letters

## Approach

Use the standard two-pointer palindrome check, closing in from both ends. As long as characters match, keep moving inward — that part is free, no deletion needed.

The moment a mismatch is found at `s[left] != s[right]`, there are only two possible fixes, since only one deletion is allowed: either the character at `left` is the odd one out, or the character at `right` is. Skip one and check if what's left (`s[left+1..right]`) is a palindrome, or skip the other and check `s[left..right-1]`. If either of those inner ranges is a clean palindrome, one deletion is enough.

The very first mismatch found is the only place a decision needs to be made — everything up to that point had to match exactly (no way to "save" a deletion for later), so this greedy check-both-branches-once approach is both correct and efficient.

**Time complexity:** O(n) — the initial pointer walk is O(n), and each of the two candidate inner palindrome checks (invoked at most once, at the first mismatch) is also O(n) in the worst case.

**Space complexity:** O(1) — just a few index pointers, no extra data structures.
