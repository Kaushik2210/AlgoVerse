# 125. Valid Palindrome

You're given a string `s`. After converting all uppercase letters to lowercase and removing every character that isn't a letter or digit, return `true` if the result reads the same forwards and backwards.

**Example 1:**
```
Input: s = "A man, a plan, a canal: Panama"
Output: true
Explanation: "amanaplanacanalpanama" is a palindrome.
```

**Example 2:**
```
Input: s = "race a car"
Output: false
Explanation: "raceacar" is not a palindrome.
```

**Example 3:**
```
Input: s = " "
Output: true
Explanation: After removing non-alphanumeric characters, s becomes an empty string, and an empty string reads the same forward and backward.
```

**Constraints:**
- 1 <= s.length <= 2*10^5

## Approach

Building a cleaned-up string first (stripped of punctuation/spaces, lowercased) and then checking if it equals its reverse would work, but it's unnecessary extra allocation — the check can be done directly on the original string with two pointers.

Start `left` at the beginning and `right` at the end. Before comparing, skip `left` forward past any character that isn't alphanumeric, and skip `right` backward the same way — these inner skip loops are what let the comparison ignore punctuation and spaces without building a new string. Once both pointers land on real characters, compare them case-insensitively; if they differ, it's not a palindrome. Otherwise move both pointers inward and repeat until they meet or cross.

**Time complexity:** O(n) — each character is visited (and skipped, or compared) at most once total across both pointers.

**Space complexity:** O(1) — no new string is built, just two index pointers.
