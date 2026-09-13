# 734. Sentence Similarity

> **Note:** This is a LeetCode premium problem, so it can't be opened or submitted on a free account. Solved and verified independently against hand-built test cases.

Given two sentences `sentence1` and `sentence2`, each represented as an array of words, and a list `similarPairs` of word pairs that are considered similar, determine whether the two sentences are similar. Two sentences are similar if they have the same length and each pair of words at the same index are either identical or appear together (in either order) in `similarPairs`. Similarity is **not transitive** here — if `"great"` is similar to `"fine"` and `"fine"` is similar to `"good"`, that doesn't make `"great"` similar to `"good"` unless that pair is explicitly listed.

**Example 1:**
```
Input: sentence1 = ["great","acting","skills"], sentence2 = ["fine","drama","talent"],
       similarPairs = [["great","fine"],["drama","acting"],["skills","talent"]]
Output: true
```

**Example 2:**
```
Input: sentence1 = ["great"], sentence2 = ["great"], similarPairs = []
Output: true
Explanation: Identical words are always similar, even with no pairs given.
```

**Example 3:**
```
Input: sentence1 = ["great"], sentence2 = ["doubleplus","good"], similarPairs = [["great","doubleplus"]]
Output: false
Explanation: Different lengths can never be similar.
```

**Constraints:**
- 1 <= sentence1.length, sentence2.length <= 1000
- 1 <= sentence1[i].length, sentence2[i].length <= 20
- sentence1[i] and sentence2[i] consist of English letters
- 0 <= similarPairs.length <= 1000
- similarPairs[i].length == 2
- 1 <= similarPairs[i][0].length, similarPairs[i][1].length <= 20
- All pairs (similarPairs[i][0], similarPairs[i][1]) are distinct

## Approach

First check the easy disqualifier: if `sentence1` and `sentence2` have different lengths, they can never be similar, so return `false` immediately.

For the pairwise check, put every similar pair into a hash set as both orderings — store `(a, b)` and `(b, a)` (or just check both directions when looking things up) so a single lookup handles "similar regardless of order." Then walk both sentences index by index: for each position, if the two words are identical, that index is fine. Otherwise, check whether the pair appears in the similarity set; if it doesn't (in either order), the sentences aren't similar, so return `false`. If every index passes, return `true`.

**Time complexity:** O(p + n) where p is the number of similar pairs and n is the sentence length — O(p) to build the set, O(n) to check the sentences (each lookup is O(1) average).

**Space complexity:** O(p) for the set of similar pairs.
