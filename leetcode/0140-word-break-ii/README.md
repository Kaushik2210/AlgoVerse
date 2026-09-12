# 140. Word Break II

Given a string `s` and a dictionary of strings `wordDict`, add spaces in `s` to construct every possible sentence where each word is a valid dictionary word. Return all such sentences, in any order.

**Example 1:**
```
Input: s = "catsanddog", wordDict = ["cat","cats","and","sand","dog"]
Output: ["cats and dog","cat sand dog"]
```

**Example 2:**
```
Input: s = "pineapplepenapple", wordDict = ["apple","pen","applepen","pine","pineapple"]
Output: ["pine apple pen apple","pineapple pen apple","pine applepen apple"]
```

**Example 3:**
```
Input: s = "catsandog", wordDict = ["cats","dog","sand","and","cat"]
Output: []
```

**Constraints:**
- 1 <= s.length <= 20
- 1 <= wordDict.length <= 1000
- wordDict[i] and s consist of only lowercase English letters
- All the strings of wordDict are unique

## Approach

This is Word Break (139) taken one step further — instead of just answering yes/no, you have to actually produce every valid segmentation. The natural approach is recursion: for a given suffix of `s`, try every prefix that matches a dictionary word, and for each match recursively break the rest of the string, then glue the matched word onto the front of every sentence that recursion returns.

The naive version of that recursion re-solves the same suffix over and over (e.g. with heavy overlap like "aaaa..." against a dictionary of short words), and the number of sentences can blow up exponentially, so a plain recursive solution without caching times out on adversarial inputs. The fix is memoization: cache the list of sentences for each starting index so a suffix is only ever broken down once, no matter how many different paths lead to it.

Base case: an empty suffix produces one sentence — the empty sentence `[""]`, which lets the "glue a word onto the front" logic work uniformly even for the last word (avoids special-casing joining with a space at the boundary). For a non-empty suffix starting at index `i`, try every dictionary word that matches as a prefix starting at `i`; for each match, recursively get the sentences for the rest of the string, and for each of those sentences prepend the matched word (with a space if the rest of the sentence isn't empty). Memoize on `i` and return the final list for `i = 0`.

**Time complexity:** Bounded by the number of valid segmentations produced, which can itself be exponential in the worst case (this is inherent to the problem, not the algorithm) — but memoization guarantees each starting index is expanded only once, so no suffix's work is repeated needlessly. For inputs where the answer set is small/moderate this runs comfortably fast; the given constraints (`s.length <= 20`) keep worst case manageable.

**Space complexity:** O(2^n) in the worst case, dominated by storing all the generated sentences and the memoization cache.
