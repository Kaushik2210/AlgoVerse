# 30. Substring with Concatenation of All Words

You're given a string `s` and an array `words`, where every word in `words` has the same length. Find every starting index in `s` where a substring is a concatenation of each word in `words` exactly once, in any order (with no extra characters between them). Return all such starting indices, in any order.

**Example 1:**
```
Input: s = "barfoothefoobarman", words = ["foo","bar"]
Output: [0,9]
Explanation: The substring starting at 0 is "barfoo" which is "bar" + "foo".
The substring starting at 9 is "foobar" which is "foo" + "bar".
```

**Example 2:**
```
Input: s = "wordgoodgoodgoodbestword", words = ["word","good","best","word"]
Output: []
```

**Example 3:**
```
Input: s = "barfoofoo", words = ["foo","bar"]
Output: [0]
```

**Constraints:**
- 1 <= s.length <= 10^4
- 1 <= words.length <= 5000
- 1 <= words[i].length <= 30
- words[i] and s consist of lowercase English letters
- Every word in `words` has the same length

## Approach

Since every word has the same fixed length `wordLen`, a valid window has a fixed total length `windowLen = wordLen * len(words)`. The brute-force idea is: for every possible starting index, chop the next `windowLen` characters into `wordLen`-sized chunks and check whether that multiset of chunks exactly matches the multiset of `words`. That's already reasonably direct, just needs to be efficient.

Build a frequency map (Counter) of `words` once up front. Then for each candidate start index from 0 to `len(s) - windowLen`, walk through the window in `wordLen` steps, looking up each chunk in a fresh copy of the counter, decrementing as you go. If a chunk isn't a needed word, or its count drops below zero (meaning it was used too many times), abandon that start index immediately — no need to check the rest of the window. If every chunk in the window gets accounted for, this start index is a match.

There's a smarter O(n) sliding-window variant (offset by `wordLen` positions and slide by one word at a time, using two pointers to shrink the window when a word's count is exceeded), but given the constraints (`s` up to 10^4, so at most a few hundred starting positions times `words.length` chunk checks), the more direct chunk-matching approach is simple, correct, and fast enough.

**Time complexity:** O(n * m) where n is the number of valid start positions to try (~`len(s)`) and m is `len(words)` (window is checked chunk by chunk, m chunks per window, each chunk lookup/slice is O(wordLen), which is folded into the constant here for simplicity — precisely O((len(s) - windowLen) * len(words) * wordLen)).

**Space complexity:** O(len(words)) for the word-count map, rebuilt (as a copy) per start index.
