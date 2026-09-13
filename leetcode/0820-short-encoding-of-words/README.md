# 820. Short Encoding of Words

You're given a list of words `words`. Build a "reference string" `s` and an array of indices, such that:
- `s` ends with `'#'`, and each word can be found in `s` starting from one of the indices, reading up to (not including) the next `'#'`.
- Words can share suffixes: if one word is a suffix of another (e.g. "me" is a suffix of "time"), it doesn't need its own separate entry — it can just point into the middle of the longer word's entry.

Return the minimum possible length of `s`.

**Example 1:**
```
Input: words = ["time","me","bell"]
Output: 10
Explanation: s = "time#bell#" and indexes = [0, 2, 5]. "time" is s[0..3], "me" is s[2..3] (a suffix of "time"), "bell" is s[5..8].
```

**Example 2:**
```
Input: words = ["t"]
Output: 2
Explanation: s = "t#".
```

**Constraints:**
- 1 <= words.length <= 2000
- 1 <= words[i].length <= 7
- words[i] consists of only lowercase letters

## Approach

A word only needs its own slot in the encoding if it isn't a suffix of some *other* word in the list — if it is, it rides along for free inside that longer word's entry. So the whole problem reduces to: find every word that is **not** a proper suffix of any other word, and sum up `len(word) + 1` (the `+1` for the trailing `'#'`) across just those.

Put all the words into a set for O(1) lookups. Then for each word, walk through its proper suffixes (skip the empty one and the full word itself) and remove any of them that also happen to sit in the word set — a suffix that matches another word in the list means that other, shorter word is redundant, since this longer word's entry already covers it. After processing every word this way, whatever's left in the set is exactly the "necessary" words — the ones that aren't a proper suffix of anything else in the list — and the answer is the sum of their lengths plus one `'#'` each.

Duplicate words in the input collapse automatically since they land in the same set entry, and a word that happens to be a suffix of itself only at k=0 (the whole word) is skipped by only checking proper (non-empty, shorter) suffixes.

**Time complexity:** O(sum of L^2) — for each word of length L, checking each of its L-1 proper suffixes costs O(L) to slice and hash, giving O(L^2) per word. Could be sped up to O(sum of L) with a trie built from the *reversed* words (checking whether a word's node is a leaf), but for L <= 7 the simpler set-based approach is plenty fast.

**Space complexity:** O(sum of L) for the word set.
