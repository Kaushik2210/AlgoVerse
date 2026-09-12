# 208. Implement Trie (Prefix Tree)

A trie (pronounced "try") is a tree-like data structure for efficiently storing and retrieving keys from a set of strings. Implement one with these operations:

- `Trie()` — initialize the trie object.
- `void insert(String word)` — insert the string `word` into the trie.
- `boolean search(String word)` — return `true` if `word` was previously inserted into the trie, `false` otherwise.
- `boolean startsWith(String prefix)` — return `true` if any previously inserted word has `prefix` as a prefix, `false` otherwise.

**Example:**
```
Input:
["Trie", "insert", "search", "search", "startsWith", "insert", "search"]
[[], ["apple"], ["apple"], ["app"], ["app"], ["app"], ["app"]]

Output:
[null, null, true, false, true, null, true]

Explanation:
Trie trie = new Trie();
trie.insert("apple");
trie.search("apple");   // return true
trie.search("app");     // return false (only "apple" was inserted, not "app" itself)
trie.startsWith("app"); // return true ("apple" starts with "app")
trie.insert("app");
trie.search("app");     // return true (now "app" was inserted directly)
```

**Constraints:**
- 1 <= word.length, prefix.length <= 2000
- word and prefix consist only of lowercase English letters
- At most 3 * 10^4 calls in total will be made to insert, search, and startsWith

## Approach

A hashset of strings could answer `search` in O(1), but it can't answer `startsWith` efficiently — you'd have to scan every stored word and check if it starts with the prefix, which is wasteful. The right structure is a **trie**: a tree where each node represents one character, and following a path from the root spells out a string. Words that share a prefix share the same path down from the root, which is exactly what makes prefix lookups fast.

- Each `TrieNode` holds a map (or fixed-size array) of `children` keyed by character, plus a boolean flag `is_end` marking whether a word actually ends at this node.
- `insert(word)`: start at the root, and for each character, move to the corresponding child, creating a new node if it doesn't exist yet. After processing the last character, mark that node's `is_end` as `true`.
- `search(word)`: walk the trie one character at a time the same way; if any character has no matching child, the word was never inserted, return `false`. If you make it through every character, return `true` only if the final node's `is_end` is `true` — this is the piece that distinguishes "the word was inserted" from "the word is merely a prefix of something else that was inserted."
- `startsWith(prefix)`: identical walk, but return `true` as soon as you successfully consume every character of the prefix, regardless of `is_end` — you don't care whether a word ends there, only that the path exists.

The `is_end` flag is what makes `search("app")` correctly return `false` when only `"apple"` was inserted, while `startsWith("app")` still returns `true` since the path for `"app"` exists as a prefix of `"apple"`.

**Time complexity:** O(L) for each operation, where L is the length of the word/prefix being inserted or looked up.

**Space complexity:** O(N * L) in the worst case, where N is the number of inserted words and L is their average length — each unique character path takes up a node, though shared prefixes get reused.
