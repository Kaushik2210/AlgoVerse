# 58. Length of Last Word

Given a string `s` made of words separated by spaces, return the length of the last word — the last maximal substring of non-space characters.

**Example 1:**
```
Input: s = "Hello World"
Output: 5
```

**Example 2:**
```
Input: s = "   fly me   to   the moon  "
Output: 4
```

**Example 3:**
```
Input: s = "luffy is still joyboy"
Output: 6
```

**Constraints:**
- 1 <= s.length <= 10^4
- s consists of only English letters and spaces ' '
- There will be at least one word in s

## Approach

The tricky part is purely the trailing whitespace — the string can end with any number of spaces, so scanning from the front and splitting naively needs care, and scanning from the back is more direct anyway.

Start a pointer at the end of the string and walk it backward past any trailing spaces until it lands on the last actual character. From there, keep walking backward while the characters are non-space, counting how many are consumed — that count is the length of the last word. No need to build any substrings or split the whole string.

**Time complexity:** O(n) in the worst case (e.g. a string that's all spaces except for one leading word), though in practice it only scans the trailing portion needed.

**Space complexity:** O(1) — just two index pointers, no extra data structures.
