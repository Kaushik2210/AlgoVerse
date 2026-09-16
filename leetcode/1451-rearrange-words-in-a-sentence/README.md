# 1451. Rearrange Words in a Sentence

**Commonly asked at:** Google, Microsoft

Given a sentence `text` (the first letter capitalized, rest lowercase, words separated by single spaces), rearrange the words by increasing length. If two words have the same length, keep their original relative order. Return the new sentence with the same capitalization convention (first word capitalized, everything else lowercase).

**Example 1:**
```
Input: text = "Leetcode is cool"
Output: "Is cool leetcode"
Explanation: Word lengths are 8, 2, 4 — sorted ascending gives "is", "cool", "leetcode".
```

**Example 2:**
```
Input: text = "Keep calm and code on"
Output: "On and keep calm code"
```

**Constraints:**
- text begins with a capital letter, contains only lowercase and uppercase English letters plus single spaces separating words, no leading or trailing spaces
- 1 <= text.length <= 10^5

## Approach

Split the sentence into words, then sort by length — using a stable sort (Python's `sort`/`sorted`, Java's `Collections.sort` on objects, `std::stable_sort` in C++) so that words of equal length keep the relative order they appeared in originally, matching the problem's tie-breaking rule for free.

The only wrinkle is capitalization: the original first word is capitalized only because it happens to be first, not because of what the word is. Lowercase it before sorting so its capital letter doesn't end up stuck in the middle of the rebuilt sentence. After sorting by length, capitalize whichever word landed first and make sure every other word is lowercase, then join everything with spaces.

**Time complexity:** O(n log n) where n is the number of words — dominated by the sort.

**Space complexity:** O(n) for the list of words and the output string.
