# 290. Word Pattern

You're given a pattern string `pattern` and a string `s` containing words separated by single spaces. Return `true` if `s` follows the same pattern, meaning there's a bijection between each letter in `pattern` and each word in `s` — the same letter always maps to the same word, and the same word always maps to the same letter.

**Example 1:**
```
Input: pattern = "abba", s = "dog cat cat dog"
Output: true
```

**Example 2:**
```
Input: pattern = "abba", s = "dog cat cat fish"
Output: false
```

**Example 3:**
```
Input: pattern = "aaaa", s = "dog cat cat dog"
Output: false
```

**Constraints:**
- 1 <= pattern.length <= 300
- `pattern` contains only lowercase English letters
- 1 <= s.length <= 3000
- `s` contains only lowercase English letters and spaces
- `s` does not contain leading or trailing spaces, and words are separated by a single space

## Approach

Split `s` on spaces to get the list of words, and immediately bail if the number of words doesn't match the length of `pattern` — they have to line up one-to-one.

Then walk both sequences together, maintaining two hash maps: one from letter to word, and one from word back to letter. For each position, check that the letter's mapped word (if it has one) matches the current word, and that the word's mapped letter (if it has one) matches the current letter. If either mapping already exists and disagrees, it's not a valid bijection, so return `false`. If neither has been seen yet, record both mappings and move on. Needing both directions is the key detail — checking only letter-to-word would wrongly accept two different letters mapping to the same word.

**Time complexity:** O(n + m) where n is the length of `pattern` and m is the length of `s` — splitting the string and one pass through the letters.

**Space complexity:** O(n) for the two hash maps.
