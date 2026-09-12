# 642. Design Search Autocomplete System

*Note: this is a LeetCode Premium (subscriber-only) problem, not freely accessible on LeetCode. It's included here anyway because "trie plus frequency ranking" is a classic pattern behind real-world autocomplete/search-suggestion features.*

Design a search autocomplete system for a search engine. Users type a sentence (ending with `#`) one character at a time. Implement the `AutocompleteSystem` class:

- `AutocompleteSystem(String[] sentences, int[] times)` — initializes the object with historical sentences and their search frequency.
- `List<String> input(char c)` — this is called every time the user types a character `c`.
  - If `c == '#'`, the user finished typing the current sentence: store it in the historical data (incrementing its frequency, or adding it with frequency 1 if it's new), and return an empty array.
  - Otherwise, return the top 3 historical sentences that start with what's been typed so far, sorted by frequency (descending), breaking frequency ties by ASCII/lexicographical order. If fewer than 3 such sentences exist, return all of them.

**Example:**
```
Input:
["AutocompleteSystem", "input", "input", "input", "input"]
[[["i love you","island","iroman","i love leetcode"],[5,3,2,2]], ["i"], [" "], ["a"], ["#"]]

Output:
[null, ["i love you","island","i love leetcode"], ["i love you","i love leetcode"], [], []]

Explanation:
Typing "i" matches all 4 historical sentences that start with "i" but only the top 3 by frequency are returned.
Typing " " (so far "i ") narrows it to sentences starting with "i ": "i love you" and "i love leetcode".
Typing "a" (so far "i a") matches nothing.
Typing "#" finishes "i a" as a new sentence with frequency 1, and returns [].
```

**Constraints:**
- n == sentences.length == times.length
- 1 <= n <= 100
- 1 <= sentences[i].length <= 100
- 1 <= times[i] <= 50
- Characters are lowercase English letters, spaces, or `'#'`
- At most 5000 calls total to input

## Approach

The core structure is a **trie** built from the historical sentences, where each node additionally stores the set of `(sentence, frequency)` pairs reachable through it — or more simply, each trie node just needs to know, among all complete sentences that pass through it, which ones exist and with what frequency, so a lookup at any prefix node can rank its candidates on demand.

Build the trie once in the constructor: insert every historical sentence character by character, and at the node marking the *end* of each sentence, record its frequency in a small map living at that node (so re-inserting a duplicate sentence just bumps the count). Also keep a global `sentence -> frequency` map for O(1) frequency updates on `#`.

For `input(c)`: maintain a running "current typed prefix" and a pointer that walks down the trie one node per character as the user types (this pointer only needs to move forward — no need to re-walk the whole prefix from the root on every keystroke). If `c == '#'`, finalize the currently-typed sentence: increment its frequency in the global map, reset the prefix and pointer back to the trie root, and return an empty list. If the pointer ever falls off the trie (the typed prefix matches no historical sentence), stay "off the trie" for the remainder of this sentence and just keep returning an empty list until the next `#`.

Otherwise, from the current trie node, collect every complete sentence reachable in its subtree (a DFS gathering `(sentence, frequency)` pairs), sort by frequency descending then lexicographically ascending as a tie-break, and return the top 3.

**Time complexity:** Building the trie is O(S) where S is the total length of all historical sentences. Each `input` call is O(L + K log K) where L is the prefix length walked and K is the number of matching sentences in the current subtree (for the sort) — acceptable since sentence counts and lengths are small.

**Space complexity:** O(S) for the trie plus the frequency maps.
