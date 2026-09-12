# 211. Design Add and Search Words Data Structure

Design a data structure that supports adding new words and checking whether a given string matches any previously added word. Implement `WordDictionary` with:
- `addWord(word)` — adds `word` to the data structure
- `search(word)` — returns `true` if there's a previously added string that matches `word`. `word` may contain the wildcard character `'.'`, which can match any single letter.

**Example 1:**
```
Input:
["WordDictionary","addWord","addWord","addWord","search","search","search","search"]
[[],["bad"],["dad"],["mad"],["pad"],["bad"],[".ad"],["b.."]]

Output:
[null,null,null,null,false,true,true,true]

Explanation:
wordDictionary.addWord("bad");
wordDictionary.addWord("dad");
wordDictionary.addWord("mad");
wordDictionary.search("pad"); // false, not added
wordDictionary.search("bad"); // true
wordDictionary.search(".ad"); // true, matches bad/dad/mad
wordDictionary.search("b.."); // true, matches bad
```

**Constraints:**
- 1 <= word.length <= 25
- word in addWord consists of lowercase English letters
- word in search consists of '.' or lowercase English letters
- At most 2 dots in any search word
- At most 10^4 calls total to addWord and search

## Approach

`addWord` is exactly trie insertion — nothing special there. The interesting part is `search`, which needs to handle `'.'` matching any letter at that position. A plain trie lookup walks a single fixed path character by character; a `'.'` breaks that because it could branch into *any* of the current node's children, not just one.

The fix is to make the trie search itself recursive/backtracking instead of a simple loop. Walk the search string position by position, carrying the current trie node:
- If the current character is a regular letter, check whether the current node has a child for that exact letter. If not, no match, fail. If yes, recurse into that one child for the next position.
- If the current character is `'.'`, try *every* child of the current node — recurse into each one for the next position, and succeed as soon as any of those branches eventually succeeds (this is where it becomes a small DFS/backtracking search rather than a straight-line walk).

The base case: once every character of the search word has been consumed, the match succeeds only if the current trie node marks the end of a real added word (not just any node reachable along the path).

**Time complexity:** `addWord` is O(L) where L is the word length. `search` is O(L) in the best case (no dots), but can blow up to O(26^d * L) in the worst case where d is the number of dots, since each dot can branch into up to 26 children — bounded in practice here since the problem caps dots at 2 per search.

**Space complexity:** O(total characters across all added words) for the trie.
