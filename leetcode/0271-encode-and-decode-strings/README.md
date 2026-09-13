# 271. Encode and Decode Strings

> **Note:** This is a LeetCode premium problem, so it can't be opened or submitted on a free account. Solved and verified independently against hand-built test cases.

Design an algorithm to encode a list of strings into a single string, and decode that string back into the original list of strings. The strings can contain any possible character (including commas, delimiters, or even the encoding scheme's own special characters), so a naive join-with-a-delimiter approach isn't safe.

**Example 1:**
```
Input: ["hello", "world"]
Encoded: some string produced by encode
Output after decode: ["hello", "world"]
```

**Example 2:**
```
Input: ["", ""]
Output after decode: ["", ""]
```

**Constraints:**
- Strings can be empty and can contain any character, including delimiters you might otherwise pick

## Approach

Since a string can contain literally anything, you can't just join everything with a comma or a fixed separator character — the data itself might contain that separator, and decoding would then split in the wrong places.

The standard trick is length-prefixing: before writing each string, write its length followed by a delimiter character that can't be confused with a digit (like `#`), then the string itself. So `"hello"` becomes `"5#hello"`. To decode, scan from the current position, read digits until hitting the `#` delimiter to recover the length, then read exactly that many characters as the next string regardless of what's in them — no ambiguity is possible because the length tells you exactly where the string ends, so any delimiter-looking characters inside the string are simply skipped over as data.

**Time complexity:** O(n) for both encode and decode, where n is the total number of characters across all strings.

**Space complexity:** O(n) for the encoded string / decoded list.
