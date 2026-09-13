# 720. Longest Word in Dictionary

You're given a list of strings `words`. Find the longest word in `words` that can be built one character at a time by other words in `words`. That means every prefix of the word (stopping at each length) must also appear somewhere in the list. If there's a tie in length, return the lexicographically smallest one. If no word qualifies, return the empty string.

**Example 1:**
```
Input: words = ["w","wo","wor","worl","world"]
Output: "world"
Explanation: "world" can be built one letter at a time: "w" -> "wo" -> "wor" -> "worl" -> "world", and each prefix is itself in words.
```

**Example 2:**
```
Input: words = ["a","banana","app","appl","ap","apply","apple"]
Output: "apple"
Explanation: Both "apply" and "apple" are buildable ("a" -> "ap" -> "app" -> "appl" -> "apple"/"apply"), so the lexicographically smaller one wins.
```

**Constraints:**
- 1 <= words.length <= 1000
- 1 <= words[i].length <= 30
- words[i] consists of lowercase English letters

## Approach

A word is "buildable" exactly when all of its prefixes — including itself — sit somewhere in the word list. So put every word into a hash set first for O(1) membership checks, then for each candidate word just check every one of its prefixes against that set. If they're all present, it's a valid candidate; keep the best one seen so far, breaking ties by picking the lexicographically smaller word (and preferring longer words overall).

This is effectively checking trie-reachability from the root without actually building a trie — since a word's prefix set fully determines whether you can "walk" to it one letter at a time, the hash set does the same job a trie would, just with a little more per-word work (checking O(L) prefixes, each an O(L) string slice/hash) instead of O(L) single-character trie steps. For this input size it's simpler and plenty fast.

**Time complexity:** O(sum of L^2) where L is a word's length — building each prefix string and hashing it costs O(L) per prefix, and there are L prefixes per word. Could be brought down to O(sum of L) with a trie, but isn't necessary here.

**Space complexity:** O(sum of L) for the hash set of all words.
