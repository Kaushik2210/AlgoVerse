# 139. Word Break

You're given a string `s` and a list of words `wordDict`. Determine if `s` can be split into a sequence of one or more words from `wordDict`, where the same word can be reused as many times as needed.

**Example 1:**
```
Input: s = "leetcode", wordDict = ["leet","code"]
Output: true
Explanation: "leetcode" splits into "leet" + "code"
```

**Example 2:**
```
Input: s = "applepenapple", wordDict = ["apple","pen"]
Output: true
Explanation: "apple" + "pen" + "apple", reusing "apple"
```

**Example 3:**
```
Input: s = "catsandog", wordDict = ["cats","dog","sand","and","cat"]
Output: false
Explanation: no combination of the dictionary words covers the whole string
```

**Constraints:**
- 1 <= s.length <= 300
- 1 <= wordDict.length <= 1000
- All strings consist of lowercase English letters

## Approach

The brute-force instinct is to try every way of cutting the string into pieces and check if each piece is a dictionary word — but that's exponential, since at every position you could choose to cut or not.

The key insight: whether the string starting at some position can be fully broken up doesn't depend on how you got there, only on where you are. So define `dp[i]` as "can the prefix `s[0:i]` be fully broken into dictionary words?" `dp[0]` is `True` — the empty prefix needs no words at all. For every later position `i`, `dp[i]` is `True` if there's some earlier cut point `j` where `dp[j]` is already `True` *and* the chunk `s[j:i]` is a word in the dictionary. That means you found a valid word ending exactly at `i`, glued onto an already-valid prefix ending at `j`.

Build this up left to right: for each `i` from 1 to `n`, scan every possible starting point `j` before it, and if `dp[j]` holds and `s[j:i]` is in the dictionary, mark `dp[i] = True`. The answer is `dp[n]` — can the entire string be broken up. Putting `wordDict` into a set first makes each membership check O(1) instead of O(k) per word.

**Time complexity:** O(n^2) for the double loop over cut points, times O(n) for slicing/hashing each substring, so O(n^3) worst case (n up to 300, so this is fine in practice).

**Space complexity:** O(n) for the dp array, plus O(sum of word lengths) for the word set.
