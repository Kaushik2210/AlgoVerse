# 1032. Stream of Characters

**Commonly asked at:** Google

> **Note:** This is a LeetCode premium problem, so it can't be opened or submitted on a free account. Solved and verified independently against hand-built test cases.

Design a class `StreamChecker` that receives one character at a time from a stream and, after each character, reports whether the suffix formed by the characters seen so far ends with any complete word from a given list `words`.

- `StreamChecker(String[] words)` initializes the object with the word list.
- `boolean query(char letter)` accepts a new character from the stream and returns `true` if some suffix of the stream (read up to and including this new character) forms one of `words`.

**Example:**
```
Input: words = ["cd","f","kl"]
Stream (one char at a time): a b c d e f g h i j k l
Output:                       F F F T F T F F F F F T
Explanation: after 'd', the stream ends "...cd" -> true. After 'f', it ends "...f" -> true. After 'l', it ends "...kl" -> true.
```

**Constraints:**
- 1 <= words.length <= 2000
- 1 <= words[i].length <= 200
- words[i] consists of lowercase English letters
- letter is a lowercase English letter
- At most 4 * 10^4 calls will be made to query

## Approach

The natural question — "does the stream so far end with one of these words?" — is really "does the *reverse* of the recent stream start with one of these *reversed* words?" That reframing is what makes a trie useful here: insert every word into the trie **reversed**, so each trie path spells a word backward from its last letter to its first.

Then keep a running buffer of the most recently seen stream characters (newest at the end), capped at the length of the longest word — nothing older than that could ever complete a match. On each `query`, append the new letter to the buffer, trim it if it's grown past the max word length, then walk the trie starting from the root, consuming buffer characters from the newest backward. If at any point the current trie node is marked as the end of a word, some suffix of the stream matches — return true immediately. If a character isn't found among the current node's children, no word matches — return false.

Capping the buffer at `max_len` (the longest word length) keeps each query's walk bounded regardless of how long the stream has run so far.

**Time complexity:** Building the trie is O(sum of word lengths). Each `query` call is O(max_len) — walking back through at most the longest word's length of trie nodes.

**Space complexity:** O(sum of word lengths) for the trie, plus O(max_len) for the stream buffer.
