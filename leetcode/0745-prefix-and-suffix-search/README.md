# 745. Prefix and Suffix Search

Design a class `WordFilter` that, given a list of `words`, supports queries of the form `f(prefix, suffix)`: return the largest index `i` such that `words[i]` starts with `prefix` **and** ends with `suffix`. If no such word exists, return -1.

**Example:**
```
Input: WordFilter(["apple"])
f("a", "e") -> 0   // "apple" starts with "a" and ends with "e"
```

**Constraints:**
- 1 <= words.length <= 10^4
- 1 <= words[i].length <= 7
- 1 <= prefix.length, suffix.length <= 7
- words[i], prefix and suffix consist of lowercase English letters only
- At most 10^4 calls will be made to the function f

## Approach

Checking prefix and suffix separately would mean intersecting two different index sets per query, which gets messy fast. The cleaner trick: turn "starts with prefix AND ends with suffix" into a single combined prefix-match problem. For each word, insert every one of its `suffix + "#" + word` combinations into a trie — one entry per possible suffix length, using `#` (a character that never appears in lowercase words) as a separator that can't be crossed accidentally.

For example "apple" contributes `"#apple"`, `"e#apple"`, `"le#apple"`, `"ple#apple"`, `"pple#apple"`, and `"apple#apple"` — one combined string per suffix of "apple" glued to the full word. Every node along each inserted path gets stamped with the word's index, and since words are processed in order and later (larger) indices simply overwrite earlier ones at a shared node, each node ends up holding the *largest* index of any word passing through it.

A query `f(prefix, suffix)` just builds the string `suffix + "#" + prefix` and walks the trie along that exact path. If the walk completes, the index sitting at the final node is guaranteed to be the largest index among all words matching both conditions — because that node is only reachable by words whose (suffix, prefix) combination matches, and its stored index was kept up to date as larger indices were inserted.

**Time complexity:** Building the trie is O(sum over words of L^2) since each word of length L contributes L+1 suffix combos each of length up to 2L+1. Each `f` query is O(P + S) for prefix length P and suffix length S.

**Space complexity:** O(sum of L^2) for the trie nodes, matching the insertion cost.
