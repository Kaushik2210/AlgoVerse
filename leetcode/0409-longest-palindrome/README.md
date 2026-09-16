# 409. Longest Palindrome

**Commonly asked at:** Amazon

You're given a string `s` consisting of upper and lowercase letters. Using the letters from `s` (you don't have to use all of them, and letters are case-sensitive), return the length of the longest palindrome that can be built.

**Example 1:**
```
Input: s = "abccccdd"
Output: 7
Explanation: One longest palindrome that can be built is "dccaccd", of length 7.
```

**Example 2:**
```
Input: s = "a"
Output: 1
```

**Constraints:**
- 1 <= s.length <= 2000
- `s` consists of lowercase and/or uppercase English letters only

## Approach

A palindrome mirrors around its center, so every letter used needs a partner on the other side — except possibly one letter that sits alone in the middle. That means any letter appearing an even number of times can be fully used (half on each side), and any letter appearing an odd number of times can still contribute all but one of its copies in pairs, with one leftover copy usable only as the single center character.

So count the frequency of each letter. For every letter, add the largest even number less than or equal to its count to the answer (that's `count - (count % 2)`, i.e. round down to even). Then, if at least one letter had an odd count, you're allowed to add exactly one more for a center character.

**Time complexity:** O(n) to count the letters, where n is the length of `s`.

**Space complexity:** O(1) — at most 52 distinct letters (upper and lowercase) can appear.
