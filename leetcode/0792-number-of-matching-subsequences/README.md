# 792. Number of Matching Subsequences

**Commonly asked at:** Google

You're given a string `s` and an array of strings `words`. Return the number of words in `words` that are a subsequence of `s`.

**Example 1:**
```
Input: s = "abcde", words = ["a","bb","acd","ace"]
Output: 3
Explanation: "a", "acd", and "ace" are subsequences of "abcde". "bb" is not.
```

**Example 2:**
```
Input: s = "dsahjpjauf", words = ["ahjpjau","ja","ahbwzgqnuk","tnmlanowax"]
Output: 2
```

**Constraints:**
- 1 <= s.length <= 5 * 10^4
- 1 <= words.length <= 5000
- 1 <= words[i].length <= 50
- s and words[i] consist of only lowercase English letters

## Approach

Checking each word against `s` independently with the standard two-pointer subsequence check works, but it's O(len(s)) per word in the worst case, which adds up when there are thousands of words — that's up to 5000 * 50000 character comparisons.

Instead, do one single pass over `s` and let it drive progress on every word simultaneously. For each word, all we ever need to know is which single character it's currently waiting to match next. Group words into 26 buckets keyed by that next-needed character (using each word's own progress pointer, not its full content).

Then scan `s` once. At character `ch`, grab the entire bucket of words currently waiting on `ch` — every one of them just got its next character satisfied. Advance each of those words' pointers by one: if a word's pointer reaches its end, it's fully matched, so count it; otherwise, re-file it into the bucket for whatever character it needs next. Empty out the bucket for `ch` as you process it, since none of those words are waiting on `ch` any more.

Because each word only ever gets touched from a bucket when the current `s` character happens to be exactly what it needs, and it gets touched at most once per character of the word, the total work across all words is proportional to the total length of `words`, not len(s) times the number of words.

**Time complexity:** O(len(s) + sum of len(words[i])) — each character of `s` does O(1) work amortized per word currently pending on it, and each word gets advanced exactly as many times as its own length.

**Space complexity:** O(sum of len(words[i])) for the buckets holding word/pointer pairs, plus O(1) extra buckets (26 of them).
