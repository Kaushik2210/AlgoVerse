# 242. Valid Anagram

Given two strings `s` and `t`, figure out whether `t` is an anagram of `s` — meaning it uses exactly the same letters, the same number of times, just possibly rearranged.

**Example 1:**
```
Input: s = "anagram", t = "nagaram"
Output: true
```

**Example 2:**
```
Input: s = "rat", t = "car"
Output: false
```

**Constraints:**
- 1 <= s.length, t.length <= 5 * 10^4
- `s` and `t` consist of lowercase English letters

## Approach

One obvious approach: sort both strings and compare — if they're anagrams, sorting both will produce identical strings. That works and is easy to write, but it costs O(n log n) because of the sort, when this problem doesn't actually need any ordering at all.

A faster way: anagram just means "same multiset of characters." So count how many times each letter appears in `s`, then walk through `t` and decrement those same counts. If `t` uses a letter more times than `s` did, or uses a letter `s` never had, the counts go negative or missing — not an anagram. If you make it through `t` and every count lands back at exactly zero, they matched perfectly (and since both strings are checked to be the same length first, there's no way `s` has leftover letters `t` didn't touch).

**Time complexity:** O(n) — one pass to count, one pass to decrement, both linear in string length.

**Space complexity:** O(1) — the count table has at most 26 entries (lowercase English letters), which is constant regardless of input size.
