# 212. Word Search II

You're given an `m x n` grid of characters `board` and an array of strings `words`. Return every word from `words` that can be found on the board, built from letters of adjacent cells (horizontally or vertically neighboring), where the same cell may not be used more than once within a single word.

**Example 1:**
```
Input:
board = [["o","a","a","n"],
         ["e","t","a","e"],
         ["i","h","k","r"],
         ["i","f","l","v"]]
words = ["oath","pea","eat","rain"]
Output: ["eat","oath"]
```

**Example 2:**
```
Input:
board = [["a","b"],["c","d"]]
words = ["abcb"]
Output: []
Explanation: "abcb" would need to reuse the cell containing 'b'
```

**Constraints:**
- m == board.length, n == board[i].length
- 1 <= m, n <= 12
- 1 <= words.length <= 3*10^4
- 1 <= words[i].length <= 10
- All words[i] consist of lowercase English letters, all words are unique

## Approach

The straightforward extension of single-word "Word Search" — run a DFS from every cell for every word — works but is wasteful: with thousands of words, many of them share prefixes, and searching the whole board separately for each word re-explores the same paths over and over. A single grid DFS pass per word is also expensive because a failed search only fails at the very last character, having already walked most of the way.

The fix is to flip the loop nesting inside out: instead of "for each word, search the grid", build a trie out of all the words first, then do one DFS pass over the grid, at every step branching only into trie children that exist. This means the search naturally prunes itself — as soon as a partial path on the board doesn't match any remaining prefix in the trie, that branch dies immediately, rather than continuing to build a string that's checked against the word list only at the end.

Build the trie with each node carrying an optional `word` field, set at the node where a complete word ends (this lets a single DFS pass discover a complete word without needing a separate hash lookup on every step). DFS from every board cell: at each step, check whether the current trie node has a child for the current cell's letter. If not, backtrack. If yes, descend into that trie child, and if that child node's `word` field is set, add it to the result (then clear the field, so the same word can't be added twice if the board offers a second path to it). Mark the current cell visited (e.g. temporarily overwrite it) before recursing into all 4 neighbors, then restore it on backtrack — same in-place marking trick as the original word search.

A small but real efficiency bonus: once a trie leaf's word has been found and its subtree has no other words below it, that leaf can be pruned from the trie (remove it from its parent) so future DFS calls don't bother descending into a dead end. This is optional but keeps things fast when words share long prefixes.

**Time complexity:** O(m*n*4*3^(L-1)) worst case for the DFS itself (an outer loop over all m*n starting cells, each exploring up to 4 directions initially, then 3 directions thereafter since one direction is where it came from, to depth L = max word length), plus O(sum of word lengths) to build the trie up front — but the trie pruning in practice cuts the search space far below the naive per-word bound.

**Space complexity:** O(sum of word lengths) for the trie, plus O(L) for the recursion stack.
