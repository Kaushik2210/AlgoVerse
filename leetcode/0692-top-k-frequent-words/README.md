# 692. Top K Frequent Words

**Commonly asked at:** Amazon, Bloomberg

Given an array of strings `words` and an integer `k`, return the `k` most frequent strings, sorted by frequency from highest to lowest. If two words have the same frequency, the lexicographically smaller one should come first.

**Example 1:**
```
Input: words = ["i","love","leetcode","i","love","coding"], k = 2
Output: ["i","love"]
Explanation: "i" and "love" both appear twice, and "i" comes before "love" alphabetically.
```

**Example 2:**
```
Input: words = ["the","day","is","sunny","the","the","the","sunny","is","is"], k = 4
Output: ["the","is","sunny","day"]
```

**Constraints:**
- 1 <= words.length <= 500
- 1 <= words[i].length <= 10
- words[i] consists of lowercase English letters
- k is in the range [1, the number of unique words[i]]

## Approach

The ordering rule is a direct tie-breaking sort key: primarily by frequency descending, and secondarily by the word itself ascending. Rather than reaching for a heap with a custom comparator, this maps cleanly onto Python's tuple sort — sort each unique word by `(-count, word)`, which naturally puts higher counts first and, among equal counts, alphabetically earlier words first.

Count every word's frequency with a hash map, then sort the unique words by that key and take the first `k`.

**Time complexity:** O(u log u) where u is the number of unique words — dominated by the sort.

**Space complexity:** O(u) for the frequency map and the sorted list of unique words.
