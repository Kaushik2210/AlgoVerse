# 418. Sentence Screen Fitting

> **Note:** This is a LeetCode premium problem, so it can't be opened or submitted on a free account. Solved and verified independently against hand-built test cases.

Given a `rows x cols` screen and a `sentence` (an array of words), the words of the sentence are placed on the screen in order, left to right, top to bottom, wrapping to the next row when a word would overflow the current row (a word is never split across rows — if it doesn't fit, the rest of that row is left blank and the word starts the next row), and the sentence repeats from the beginning once it's fully placed, with a single space separating consecutive words (including across the wrap where the sentence loops back to its first word). Return how many times the entire sentence is fitted on the screen.

**Example 1:**
```
Input: sentence = ["hello","world"], rows = 2, cols = 8
Output: 1
Explanation:
hello---
world---
The word "hello" then "world" fill each row (with trailing blanks), completing the sentence once.
```

**Example 2:**
```
Input: sentence = ["a","bcd","e"], rows = 3, cols = 6
Output: 2
Explanation:
a-bcd-
e-a---
bcd-e-
```

**Constraints:**
- 1 <= rows, cols <= 2 * 10^4
- 1 <= sentence.length <= 100
- 1 <= sentence[i].length <= 10
- sentence[i] consists of lowercase English letters
- 1 <= rows * cols <= 2 * 10^6

## Approach

Simulating word-by-word placement across up to 2*10^4 rows and repeating the sentence over and over would be far too slow for large inputs. The trick is to treat the whole sentence as one repeating string and track a single running position (in units of characters) instead of tracking word indices.

Build `s = " ".join(sentence) + " "` — the sentence with a single trailing space, so that wrapping from the end back to the start behaves exactly like wrapping mid-sentence (there's always a space before the next word starts, even the very first word of a fresh repetition). This string conceptually repeats forever; position `start` in the infinite repetition corresponds to character `s[start % len(s)]` in one copy of it.

For each row, first optimistically advance `start` by `cols` (as if the whole row could be filled edge to edge). Then fix up for the fact that a word can't be split: if the character right at the new `start` position is a space, the row boundary landed cleanly between words — the row fit perfectly. Otherwise, the row cut a word in half, so walk `start` backward until it lands right after a space (i.e. right after the space that ended the previous word), pushing that partial word entirely onto the next row.

After processing all `rows` rows, `start` is the total number of characters typed across the whole screen (as if the sentence string repeated indefinitely). Since each full copy of `s` is exactly one complete repetition of the sentence, the number of full sentences fitted is `start // len(s)`.

**Time complexity:** O(rows) — each row does O(1) amortized work; a word can only be at most `cols`-long worth of backward stepping, and in practice each row's fix-up is bounded and doesn't blow up the total.

**Space complexity:** O(L) where L is the total length of the joined sentence — for building the string `s`.
