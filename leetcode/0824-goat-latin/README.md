# 824. Goat Latin

**Commonly asked at:** Amazon

You're given a sentence `sentence` made of words separated by single spaces. Convert it to "Goat Latin" using these rules: if a word starts with a vowel (a, e, i, o, u, either case), just append "ma" to it. Otherwise, move the first letter to the end, then append "ma". Finally, append one extra letter 'a' to the word, where the number of 'a's equals the word's 1-indexed position in the sentence. Return the resulting sentence.

**Example 1:**
```
Input: sentence = "I speak Goat Latin"
Output: "Imaa peaksmaaa oatGmaaaa atinLmaaaaa"
```

**Example 2:**
```
Input: sentence = "The quick brown fox jumped over the lazy dog"
Output: "heTmaa uickqmaaa rownbmaaaa oxfmaaaaa umpedjmaaaaaa overmaaaaaaa hetmaaaaaaaa azylmaaaaaaaaa ogdmaaaaaaaaaa"
```

**Constraints:**
- 1 <= sentence.length <= 150
- sentence consists of English letters and spaces
- sentence has no leading or trailing spaces
- All words in sentence are separated by a single space

## Approach

This is a direct rule-following transformation with no tricky part beyond careful string building. Split the sentence into words and process each one with its 1-indexed position `i`:

1. If the first character is a vowel (checked against a small set covering both cases), just tack "ma" onto the end.
2. Otherwise, slice off the first character, append it to the rest of the word, then append "ma" — equivalent to a one-character left rotation followed by "ma".
3. Append `i` copies of the letter 'a' (using the word's 1-based position in the sentence).

Join the transformed words back together with single spaces.

**Time complexity:** O(n^2) in the worst case (or O(n) with an amortized-string-builder view), where n is the sentence length — the total number of 'a' characters appended across all words is 1 + 2 + ... + (word count), which is quadratic in the number of words in the worst case of many short words.

**Space complexity:** O(n) for the output sentence (plus the same for the trailing 'a's, which dominates the output size for a sentence with many words).
