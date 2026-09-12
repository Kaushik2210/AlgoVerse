# 269. Alien Dictionary

*Note: this is a LeetCode Premium (subscriber-only) problem, not freely accessible on LeetCode. It's included here anyway because it's a classic interview question for topological sort on a derived graph.*

There's a new alien language that uses the English alphabet, but the order among the letters is unknown. You're given a list of `words` from this language's dictionary, where the words are sorted lexicographically according to the rules of this new language. Derive the order of letters in this language. If the order is invalid (the given words can't be sorted consistently by any letter order), return an empty string. If there are multiple valid orders, any one of them is acceptable. If no valid order exists because it isn't possible to determine one, return an empty string too.

**Example 1:**
```
Input: words = ["wrt","wrf","er","ett","rftt"]
Output: "wertf"
```

**Example 2:**
```
Input: words = ["z","x"]
Output: "zx"
```

**Example 3:**
```
Input: words = ["z","x","z"]
Output: ""
Explanation: "z" needs to come before "x", but also after it — contradiction, no valid order
```

**Constraints:**
- 1 <= words.length <= 100
- 1 <= words[i].length <= 100
- words[i] consists of lowercase English letters

## Approach

The only information available about the alphabet's order comes from comparing each pair of adjacent words in the dictionary — since the list is already sorted according to the alien alphabet, the first position where two adjacent words differ tells you that the differing character in the earlier word comes before the differing character in the later word. That's one directed edge in a "comes before" graph over the letters.

Build that graph: for each pair of adjacent words, walk both simultaneously until you find the first index where their characters differ, and add an edge from that earlier word's character to that later word's character. There's one important invalid case to catch here: if the earlier word is longer than the later word AND the later word is a prefix of the earlier one (e.g. `["abc", "ab"]`), that's contradictory input — a longer word can't correctly sort before its own prefix — so return `""` immediately.

Once the graph is built (with every letter that appears anywhere as a node, even ones with no edges), this becomes exactly topological sort — Kahn's algorithm works well here: track in-degrees, start a queue with all letters that have in-degree 0, repeatedly pop a letter, append it to the result, and decrement its neighbors' in-degrees, queuing any that hit 0. If the final result doesn't include every letter that appeared in the input, there's a cycle in the "comes before" relationships, meaning no valid order exists — return `""`.

**Time complexity:** O(C) where C is the total number of characters across all words — building the graph is proportional to the total input size, and the topological sort itself is O(V + E) where V is at most 26 letters.

**Space complexity:** O(1) effectively, since the alphabet is bounded at 26 letters, though technically O(V + E) for the graph.
