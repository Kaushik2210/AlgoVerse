# 28. Find the Index of the First Occurrence in a String

Given two strings `haystack` and `needle`, return the index of the first occurrence of `needle` in `haystack`, or `-1` if `needle` is not part of `haystack`.

**Example 1:**
```
Input: haystack = "sadbutsad", needle = "sad"
Output: 0
Explanation: "sad" occurs at index 0 and 6, the first occurrence is at index 0.
```

**Example 2:**
```
Input: haystack = "leftosee", needle = "leeto"
Output: -1
Explanation: "leeto" does not appear in "leftosee".
```

**Constraints:**
- 1 <= haystack.length, needle.length <= 10^4

## Approach

The brute-force approach tries every starting position in `haystack` and checks whether `needle` matches there character by character, bailing out on the first mismatch. That's O(n*m) in the worst case (think `haystack = "aaaa...a"`, `needle = "aaa...ab"`), because a partial match can fail late and force restarting the comparison from scratch at the next position, throwing away everything already learned about the partial match.

KMP fixes that by never re-examining characters of `haystack` unnecessarily. The key insight is a precomputed "failure function" (LPS array — longest proper prefix that's also a suffix) built once over `needle`: for every prefix of `needle`, it tells you the length of the longest prefix of `needle` that is also a suffix of that prefix. When a mismatch happens partway through a match, this table tells you exactly how far the needle pointer can safely "fall back" to — reusing the fact that the characters already matched form a known prefix of `needle` — instead of restarting the needle pointer at 0 and re-scanning haystack characters that were already consumed.

Building the LPS array is itself a two-pointer scan over `needle`: track the length of the current matching prefix/suffix as you extend a candidate pointer through `needle`, falling back within the LPS table itself on a mismatch. Then the main scan walks `haystack` once with a needle pointer that only ever moves forward or falls back via the table — it never revisits a haystack character, giving strict O(n + m).

**Time complexity:** O(n + m) — building the LPS table is O(m), and the main scan is O(n), where n = len(haystack), m = len(needle).

**Space complexity:** O(m) for the LPS table.
