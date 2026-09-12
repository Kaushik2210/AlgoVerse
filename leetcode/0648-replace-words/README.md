# 648. Replace Words

In English, a **root** can have various words derived by adding a suffix, e.g. "help" gives "helper" and "helpful". Given a `dictionary` of roots and a `sentence`, replace every word in the sentence that has a root in the dictionary as a prefix with that root. If a word has multiple matching roots, use the one with the shortest length. Return the resulting sentence.

**Example 1:**
```
Input: dictionary = ["cat","bat","rat"], sentence = "the cattle was rattled by the battery"
Output: "the cat was rat by the bat"
```

**Example 2:**
```
Input: dictionary = ["a","b","c"], sentence = "aadsfasf absbs bbab cadsfafs"
Output: "a a b c"
```

**Constraints:**
- 1 <= dictionary.length <= 1000
- 1 <= dictionary[i].length <= 100
- dictionary[i] consists of only lowercase letters
- 1 <= sentence.length <= 10^6
- sentence consists of only lowercase letters and spaces
- The number of words in sentence is in the range [1, 1000]
- The length of each word is in the range [1, 1000]
- Every two words are separated by exactly one space
- sentence does not have leading or trailing spaces

## Approach

"Find the shortest root that's a prefix of this word" is exactly the kind of prefix-matching question a **trie** is built for. Insert every dictionary root into a trie, character by character, marking the node where each root ends. Because "shortest root wins" and no root is itself built from combining two dictionary roots in this problem, the *first* end-of-root marker hit while walking down the trie for any given word is automatically the shortest matching root — no need to keep searching further once one is found.

For each word in the sentence, walk it character by character down the trie starting from the root. At each step, check if the current node marks the end of some dictionary root — if so, stop and use that root as the replacement (it's the shortest one, by construction, since we hit it first). If the trie path runs out before any root-end is found (either the word diverges from every root, or the word is shorter than any prefix), keep the original word unchanged.

Split the sentence into words, run this replacement on each, and join them back together.

**Time complexity:** O(D + S) where D is the total length of all dictionary roots (for building the trie) and S is the total length of the sentence (each word's trie walk is bounded by the word's own length, and finding a match short-circuits early).

**Space complexity:** O(D) for the trie.
