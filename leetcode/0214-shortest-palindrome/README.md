# 214. Shortest Palindrome

You're given a string `s`. You can add characters in front of it to make it a palindrome. Return the shortest possible palindrome you can build by doing this.

**Example 1:**
```
Input: s = "aacecaaa"
Output: "aaacecaaa"
```

**Example 2:**
```
Input: s = "abcd"
Output: "dcbabcd"
```

**Constraints:**
- 0 <= s.length <= 5 * 10^4
- `s` consists of lowercase English letters only

## Approach

Since you can only prepend characters (never remove or reorder anything already in `s`), the *end* of `s` is fixed as-is. The only way to make the whole thing a palindrome is to make sure `s` itself, read backward, appears as a prefix of the final answer — which means: find the longest prefix of `s` that is already a palindrome, then prepend the reverse of everything that comes *after* that prefix. That leftover suffix (reversed) mirrors the tail of `s` that isn't part of the palindromic prefix, and gluing it to the front makes the whole string symmetric while keeping `s` completely intact at the end.

The brute-force way to find that longest palindromic prefix is to check, for each length from `len(s)` down to 0, whether `s[:length]` is a palindrome, and stop at the first one that works — O(n^2).

The efficient way reuses the KMP failure function. Build the string `s + '#' + reverse(s)` (the separator prevents any overlap between the two halves from being mistaken for a real match) and compute its KMP failure array — the array where each position records the length of the longest prefix of the whole string that is also a suffix ending at that position. The value at the very last position tells you the longest prefix of `s` that matches a suffix of `reverse(s)`, which is exactly the longest palindromic prefix of `s` (since a suffix of `reverse(s)` is a reversed prefix of `s`, and a prefix of `s` matching a reversed prefix of itself is precisely a palindrome). Everything in `s` after that palindromic prefix, reversed, is what needs to be prepended.

**Time complexity:** O(n) — building the combined string and computing the KMP failure array are both linear.

**Space complexity:** O(n) for the combined string and the failure array.
