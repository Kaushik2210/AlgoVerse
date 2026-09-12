# 126. Word Ladder II

A transformation sequence from `beginWord` to `endWord` using a dictionary `wordList` is a sequence `beginWord -> s1 -> s2 -> ... -> sk` where each adjacent pair of words differs by exactly one letter, every intermediate word `s1...sk` exists in `wordList` (`beginWord` does not need to), and `sk == endWord`. Given `beginWord`, `endWord`, and `wordList`, return **all** the shortest such transformation sequences as a list of word-lists. If no sequence exists, return an empty list.

**Example 1:**
```
Input: beginWord = "hit", endWord = "cog", wordList = ["hot","dot","dog","lot","log","cog"]
Output: [["hit","hot","dot","dog","cog"],["hit","hot","lot","log","cog"]]
Explanation: There are 2 shortest transformation sequences, both length 5.
```

**Example 2:**
```
Input: beginWord = "hit", endWord = "cog", wordList = ["hot","dot","dog","lot","log"]
Output: []
Explanation: endWord "cog" is not in wordList, so no valid sequence exists.
```

**Constraints:**
- 1 <= beginWord.length <= 5
- endWord.length == beginWord.length
- 1 <= wordList.length <= 5000
- wordList[i].length == beginWord.length
- beginWord, endWord, and wordList[i] consist of lowercase English letters
- beginWord != endWord
- All words in wordList are unique

## Approach

Finding *a* shortest path is a straightforward BFS (that's problem 127). Finding *all* shortest paths needs a bit more bookkeeping, done in two phases.

**Phase 1 — BFS layer by layer, recording parents.** Do a standard BFS from `beginWord`, but process it **one full layer (BFS level) at a time** rather than word by word, and for every word discovered, record which word(s) in the *previous* layer could reach it — its `parents` map. The critical subtlety: a word must only be marked "visited" (removed from the candidate word set) after its *entire* layer finishes processing, not immediately when first reached. This matters because two different words in the same layer might both be able to reach the same word in the next layer — both are valid shortest-path parents, and removing the candidate word too early (after only one predecessor claims it) would silently drop that second valid parent link. So: collect all `(child, parent)` edges found while expanding the current layer into a temporary set first, then after the whole layer is done, merge those into the permanent `parents` map and remove the newly-discovered children from the pool of remaining candidate words all at once.

Stop the BFS as soon as `endWord` is found in the layer just processed — going further would only find longer (non-shortest) paths.

**Phase 2 — backtrack from endWord to beginWord using the parent map.** With `parents[word]` giving every word that could precede `word` on some shortest path, DFS backward from `endWord`: at each step, try every parent, prepend it to the path being built, and recurse, until `beginWord` is reached (base case: append the completed path, reversed, to the answer). This naturally enumerates every shortest path since we only backtrack through recorded shortest-path parent edges.

If `endWord` is never reached during the BFS, return an empty list immediately (also handle the trivial precondition that `endWord` must be in `wordList` up front).

**Time complexity:** O(N * L^2 * 26) for the BFS (N words, L word length, each word tries L positions × 26 letters, each candidate hashed/compared in O(L)), plus the cost of the backtracking DFS which is bounded by the total size of all output paths — this can be large in the worst case since the number of shortest paths can itself be exponential, but is bounded by what the problem's constraints allow in practice.

**Space complexity:** O(N * L) for the word set and parent map, plus the space for the output paths.
