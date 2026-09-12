# 127. Word Ladder

You're given a `beginWord`, an `endWord`, and a dictionary `wordList`. Find the length of the shortest transformation sequence from `beginWord` to `endWord`, where each step changes exactly one letter, and every intermediate word (including `endWord`) must exist in `wordList`. If no such sequence exists, return 0.

**Example 1:**
```
Input: beginWord = "hit", endWord = "cog", wordList = ["hot","dot","dog","lot","log","cog"]
Output: 5
Explanation: "hit" -> "hot" -> "dot" -> "dog" -> "cog", 5 words in the sequence
```

**Example 2:**
```
Input: beginWord = "hit", endWord = "cog", wordList = ["hot","dot","dog","lot","log"]
Output: 0
Explanation: endWord "cog" is not in wordList, so no valid sequence exists
```

**Constraints:**
- 1 <= beginWord.length <= 10
- endWord.length == beginWord.length
- 1 <= wordList.length <= 5000
- All words consist of lowercase English letters

## Approach

Each word is a node, and there's an edge between two words if they differ by exactly one letter. The question "shortest sequence of single-letter swaps" is then just "shortest path between two nodes in an unweighted graph", which is exactly what BFS is built for — BFS explores level by level, so the first time it reaches `endWord` is guaranteed to be via the shortest path.

The brute-force way to find neighbors of a word would be to compare it against every other word in the list, character by character — O(L) per comparison, O(N) words, so O(N*L) per BFS step. Instead, generate neighbors directly: for each position in the current word, try substituting all 26 letters and check if the result is a real word (via a hash set for O(1) lookup). That's O(L * 26) per word regardless of how big the dictionary is.

Put `wordList` into a set first (also handles the "endWord must be in wordList" check for free — if it's missing, BFS just never reaches it). Start BFS from `beginWord` with distance 1. At each word, for each of its L positions, swap in each of the 26 letters; if the resulting word is in the set, it's an unvisited neighbor — remove it from the set immediately (this doubles as the visited marker, since revisiting is never useful in BFS) and queue it with distance+1. If `endWord` is ever dequeued, return its distance. If the queue empties without hitting `endWord`, return 0.

**Time complexity:** O(N * L^2) — for each of up to N words processed, generating variants is O(L * 26) to build and each candidate string reconstruction/hash costs O(L), and 26 is a constant.

**Space complexity:** O(N * L) for the word set and the BFS queue.
