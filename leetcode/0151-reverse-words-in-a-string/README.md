# 151. Reverse Words in a String

Given an input string `s`, reverse the order of the words. A word is a sequence of non-space characters. Return a string with words in reverse order, joined by a single space — collapse any leading, trailing, or multiple spaces between words down to single spaces between words.

**Example 1:**
```
Input: s = "the sky is blue"
Output: "blue is sky the"
```

**Example 2:**
```
Input: s = "  hello world  "
Output: "world hello"
Explanation: Leading and trailing spaces are removed.
```

**Example 3:**
```
Input: s = "a good   example"
Output: "example good a"
Explanation: Multiple spaces between words are reduced to a single space.
```

**Constraints:**
- 1 <= s.length <= 10^4
- s contains English letters, digits, and spaces ' '
- There's at least one word in s

## Approach

The clean way is to lean on the string's built-in `split()` with no argument, which splits on any run of whitespace and automatically drops empty strings from leading/trailing/repeated spaces — that alone handles the "collapse to single spaces" part for free. Once split into a list of words, reverse the list and join with a single space.

For an interview follow-up ("do it in-place with O(1) extra space in a language that supports mutable char arrays"), the manual approach is: first reverse the whole character array, then reverse each individual word back to normal order (which naturally puts words in the reversed overall order while keeping letters within each word correct), and finally do a pass to squeeze out extra spaces. Since Python strings are immutable, the split/reverse/join approach is what's shown here, but the core idea is the same either way — reversing the sequence of words is the goal, and letter-level in-place reversal is just an implementation trick.

**Time complexity:** O(n) — splitting, reversing, and joining are all linear in the length of the string.

**Space complexity:** O(n) — for the list of words and the resulting string.
