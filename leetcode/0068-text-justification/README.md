# 68. Text Justification

Given an array of `words` and a width `maxWidth`, format the text so each line has exactly `maxWidth` characters and is fully (left and right) justified. Pack as many words as possible per line, pad extra spaces between words so they're distributed as evenly as possible (extra spaces go to the leftmost gaps first when they don't divide evenly), and every line except the last should have no leading spaces with words separated by at least one space. The last line should be left-justified with a single space between words and padded with trailing spaces to reach `maxWidth`. A line with only one word is padded with trailing spaces (no space needs distributing).

**Example 1:**
```
Input: words = ["This", "is", "an", "example", "of", "text", "justification."], maxWidth = 16
Output:
[
   "This    is    an",
   "example  of text",
   "justification.  "
]
```

**Example 2:**
```
Input: words = ["What","must","be","acknowledgment","shall","be"], maxWidth = 16
Output:
[
  "What   must   be",
  "acknowledgment  ",
  "shall be        "
]
```

**Constraints:**
- 1 <= words.length <= 300
- 1 <= words[i].length <= 20
- words[i] consists of only English letters and digits
- 1 <= maxWidth <= 100
- words[i].length <= maxWidth

## Approach

This is two separate subproblems chained together: (1) greedily group words into lines, (2) format each line's spacing according to the rules, with the last line as a special case.

**Grouping:** Walk through `words`, greedily adding words to the current line as long as the line (words plus at least one space between each) still fits within `maxWidth`. Track the running character count of just the words themselves; a line with `count` words needs at least `sum(len(w) for w in line) + (count - 1)` characters (one space minimum between each pair) to fit. The moment adding the next word would exceed `maxWidth`, close out the current line and start a new one with that word.

**Formatting a line:**
- If it's the last line, or the line has only one word, join the words with a single space and pad the end with spaces to reach `maxWidth`.
- Otherwise, compute `total_spaces = maxWidth - sum(len(w) for w in line)` and `gaps = len(line) - 1`. Every gap gets at least `total_spaces // gaps` spaces; the first `total_spaces % gaps` gaps (from the left) get one extra space each, which is exactly what "extra spaces assigned first to left gaps" means.

Build each line by placing words with their computed gap sizes in between.

**Time complexity:** O(total characters across all words + maxWidth * number of lines) — every word and every output character is touched a constant number of times.

**Space complexity:** O(maxWidth * number of lines) for the output, not counting input.
