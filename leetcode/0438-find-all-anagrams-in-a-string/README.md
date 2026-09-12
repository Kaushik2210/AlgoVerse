# 438. Find All Anagrams in a String

You're given two strings `s` and `p`. Return the starting indices of every substring of `s` that is an anagram of `p`.

**Example 1:**
```
Input: s = "cbaebabacd", p = "abc"
Output: [0,6]
Explanation: "cba" starting at 0 and "bac" starting at 6 are both anagrams of "abc".
```

**Example 2:**
```
Input: s = "abab", p = "ab"
Output: [0,1,2]
```

**Constraints:**
- 1 <= s.length, p.length <= 3*10^4
- s and p consist of lowercase English letters

## Approach

This is the same fixed-size sliding window idea as checking for a permutation as a substring, just collecting every match instead of stopping at the first one.

Build a frequency counter `need` for `p`, and a frequency counter `window` for the first `len(p)` characters of `s`. Compare them — if equal, index 0 is a match. Then slide the window across `s` one character at a time: add the character entering on the right, remove the one leaving on the left, and check equality again after each slide. Every index where the counters match gets added to the result.

Since anagram just means "same letter multiset," comparing frequency counters is exactly the right equality check — order inside the window doesn't matter.

**Time complexity:** O(n) where n = len(s) — each position enters and leaves the window once; counter comparisons are bounded by the 26-letter alphabet.

**Space complexity:** O(1) for the counters (at most 26 entries each), plus O(k) for the output list of matched indices.
