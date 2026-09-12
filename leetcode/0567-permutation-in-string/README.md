# 567. Permutation in String

You're given two strings `s1` and `s2`. Return `true` if `s2` contains a permutation of `s1` as a substring — in other words, if some contiguous chunk of `s2` is made up of exactly the same letters as `s1`, in any order.

**Example 1:**
```
Input: s1 = "ab", s2 = "eidbaooo"
Output: true
Explanation: "ba" is a permutation of "ab" and appears in s2.
```

**Example 2:**
```
Input: s1 = "ab", s2 = "eidboaoo"
Output: false
```

**Constraints:**
- 1 <= s1.length, s2.length <= 10^4
- s1 and s2 consist of lowercase English letters

## Approach

A permutation of `s1` appearing in `s2` just means some window of `s2` the same length as `s1` has an identical letter-frequency count. That turns this into a fixed-size sliding window problem.

Build a frequency counter for `s1` (`need`), and a frequency counter for the first window of `s2` of the same length (`window`). If they already match, done. Otherwise slide the window one character at a time: add the new character entering on the right, remove the character leaving on the left, and check for equality again.

Since the window size never changes, this is just "add one, remove one" at every step rather than a variable-size expand/shrink — much simpler than a general sliding window. Comparing two 26-letter frequency counters for equality is effectively O(1) work each step (bounded by the alphabet size), so the whole scan stays linear in the length of `s2`.

**Time complexity:** O(n) where n = len(s2) — each position enters and leaves the window once, and counter comparisons are O(26).

**Space complexity:** O(1) — the two frequency counters hold at most 26 entries each (lowercase letters).
