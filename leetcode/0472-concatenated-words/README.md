# 472. Concatenated Words

**Commonly asked at:** Google, Amazon

You're given a list of distinct strings `words` (no duplicates, no empty strings). Return every word in the list that can be formed entirely by concatenating **at least two** other, shorter words from the same list. Order of the returned words doesn't matter.

**Example 1:**
```
Input: words = ["cat","cats","catsdogcats","dog","dogcatsdog","hippopotamuses","rat","ratcatdogcat"]
Output: ["catsdogcats","dogcatsdog","ratcatdogcat"]
Explanation: "catsdogcats" = "cats" + "dog" + "cats", "dogcatsdog" = "dog" + "cats" + "dog", "ratcatdogcat" = "rat" + "cat" + "dog" + "cat".
```

**Example 2:**
```
Input: words = ["cat","dog","catdog"]
Output: ["catdog"]
```

**Constraints:**
- 1 <= words.length <= 10^4
- 0 <= words[i].length <= 1000
- words[i] consists of only lowercase English letters
- All words are unique

## Approach

This is word-break, run once per word, against the dictionary of *all other* words. Put every word into a hash set for O(1) lookups, then for each candidate word run the standard word-break DP: `dp[i]` is true if the prefix `word[0:i]` can be split into pieces that are all present in the set. `dp[0] = True` (empty prefix), and `dp[i]` becomes true if there's some split point `j` where `dp[j]` is true and `word[j:i]` is a word in the set.

The one twist versus plain word-break is the "at least two other words" requirement — a word can't just match itself whole. That's handled by explicitly rejecting the piece `word[0:n]` (the entire word) as a valid single piece when checking `dp[n]`; every other piece is strictly shorter than the full word, so if `dp[n]` becomes true through them it necessarily took two or more pieces to get there.

Memoizing results per word avoids redoing the DP if the same word gets used as a candidate more than once (not strictly needed since each word is only checked once as the "target", but it's cheap insurance and keeps the function reusable).

**Time complexity:** O(sum of L^2) — for each word of length L, the DP is O(L^2) (an outer loop over end positions, an inner loop over split points, plus O(L) for the substring/hash lookup), summed across all words.

**Space complexity:** O(sum of L) for the hash set of words, plus O(L) for the DP array per word being checked.
