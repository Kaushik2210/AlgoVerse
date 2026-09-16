# 647. Palindromic Substrings

**Commonly asked at:** Amazon, Facebook

You're given a string `s`. Return the number of palindromic substrings in it. Substrings occupying different index ranges count separately even if they contain the same characters.

**Example 1:**
```
Input: s = "abc"
Output: 3
Explanation: "a", "b", "c" are each their own palindrome. No longer substring is.
```

**Example 2:**
```
Input: s = "aaa"
Output: 6
Explanation: "a", "a", "a", "aa", "aa", "aaa" — 6 palindromic substrings.
```

**Constraints:**
- 1 <= s.length <= 1000
- s consists of lowercase English letters

## Approach

Checking every one of the O(n^2) substrings for palindrome-ness by re-scanning each one is O(n^3) overall — too slow, and also wasteful since a palindrome check redoes work another check already did.

The fast way flips the direction of the check: instead of asking "is this substring a palindrome," pick every possible *center* and expand outward while both sides keep matching, counting each successful expansion as one more palindromic substring found. Every palindrome has a unique center, but that center can either be a single character (odd-length palindromes, like the middle letter of "aba") or the gap between two characters (even-length palindromes, like the gap between the two `a`s in "aa"). So there are `2n - 1` centers to try: n single-character centers and n-1 between-character centers.

For each center, expand a left and right pointer outward one step at a time as long as they point at matching characters and stay in bounds; each successful expansion (including the initial center itself) is one more palindromic substring, so increment a counter every time the expansion succeeds before checking whether to expand further.

**Time complexity:** O(n^2) — there are O(n) centers, and each center's expansion can run up to O(n) steps in the worst case (e.g. a string of all the same character).

**Space complexity:** O(1) extra — only a counter and a couple of pointers are used, no auxiliary data structure needed.
