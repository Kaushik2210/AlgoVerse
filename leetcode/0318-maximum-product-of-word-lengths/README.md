# 318. Maximum Product of Word Lengths

You're given a string array `words`. Find the maximum value of `length(words[i]) * length(words[j])` over all pairs of indices `i != j`, where `words[i]` and `words[j]` don't share any common letters. If no such pair exists, return 0.

**Example 1:**
```
Input: words = ["abcw","baz","foo","bar","xtfn","abcdef"]
Output: 16
Explanation: "abcw" and "xtfn" share no letters, lengths 4 and 4, product 16
```

**Example 2:**
```
Input: words = ["a","ab","abc","d","cd","bcd","abcd"]
Output: 4
Explanation: "ab" and "cd" share no letters, lengths 2 and 2, product 4
```

**Example 3:**
```
Input: words = ["a","aa","aaa","aaaa"]
Output: 0
Explanation: every word only contains 'a', so no valid pair exists
```

**Constraints:**
- 2 <= words.length <= 1000
- 1 <= words[i].length <= 1000
- words[i] consists only of lowercase English letters

## Approach

The brute-force check for "do these two words share a letter" is comparing every letter of one word against every letter of the other — O(L1 * L2) per pair, and with up to 1000 words that's slow when repeated for every pair.

Since the alphabet is fixed at 26 lowercase letters, each word's letter set fits in a single integer bitmask: bit `i` is set if the word contains the `i`-th letter. Building that mask for a word is O(L). Once every word has its mask precomputed, checking whether two words share any letter collapses to a single bitwise AND — `mask[i] & mask[j] == 0` means no shared letters, done in O(1) instead of O(L1*L2).

With that, the algorithm is: compute all masks and lengths up front (O(total characters)), then check every pair of words (O(n^2) pairs), and for each pair whose masks AND to zero, track the best `len(words[i]) * len(words[j])`.

**Time complexity:** O(n^2 + total characters) — building masks is linear in total input size, and the pairwise comparison is O(n^2) with O(1) work per pair thanks to the bitmask trick.

**Space complexity:** O(n) for the precomputed mask/length arrays.
