# 737. Sentence Similarity II

> **Note:** This is a LeetCode premium problem, so it can't be opened or submitted on a free account. Solved and verified independently against hand-built test cases.

Given two sentences `sentence1` and `sentence2`, each an array of words, and a list `similarPairs` of word pairs that are considered similar, determine whether the two sentences are similar. This is the same setup as Sentence Similarity (734), except similarity **is transitive** here: if `"great"` is similar to `"fine"` and `"fine"` is similar to `"good"`, then `"great"` and `"good"` are also considered similar, even without a direct pair for them.

**Example 1:**
```
Input: sentence1 = ["great","acting","skills"], sentence2 = ["fine","drama","talent"],
       similarPairs = [["great","good"],["fine","good"],["acting","drama"],["skills","talent"]]
Output: true
Explanation: "great" and "fine" are both similar to "good", so transitively similar to each other.
```

**Example 2:**
```
Input: sentence1 = ["I","love","leetcode"], sentence2 = ["I","love","onepiece"], similarPairs = [["manga","onepiece"]]
Output: false
Explanation: "leetcode" and "onepiece" have no similarity chain connecting them.
```

**Constraints:**
- 1 <= sentence1.length, sentence2.length <= 1000
- 1 <= sentence1[i].length, sentence2[i].length <= 20
- sentence1[i] and sentence2[i] consist of English letters
- 0 <= similarPairs.length <= 2000
- similarPairs[i].length == 2
- 1 <= similarPairs[i][0].length, similarPairs[i][1].length <= 20
- All pairs (similarPairs[i][0], similarPairs[i][1]) are distinct

## Approach

Transitive similarity is exactly what union-find (disjoint set union) is built for: words that are directly or transitively similar all belong in the same connected component. Build a union-find structure over words (a hash map from word to parent, since words aren't pre-numbered like in typical union-find problems), then union the two words in every pair from `similarPairs`.

After processing all pairs, every group of mutually similar words shares the same root. First check the lengths of the two sentences match — different lengths can never be similar. Then walk both sentences index by index: for each position, if the words are identical, it's fine. Otherwise, look up both words' roots (a word with no recorded parent is its own root, i.e. it was never mentioned in `similarPairs` and only matches itself) — if the roots differ, the sentences aren't similar, so return `false`. If every index passes, return `true`.

**Time complexity:** O((p + n) * alpha(p)) where p is the number of similar pairs and n is the sentence length, alpha being the inverse Ackermann function from path compression — effectively linear.

**Space complexity:** O(p) for the union-find parent map.
