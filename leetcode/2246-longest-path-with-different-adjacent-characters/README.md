# 2246. Longest Path With Different Adjacent Characters

**Commonly asked at:** Amazon, Microsoft, Uber

You're given a tree with `n` nodes rooted at node 0, described by a `parent` array (`parent[0] = -1`, and `parent[i]` is the parent of node `i` for `i >= 1`), plus a string `s` where `s[i]` is the character assigned to node `i`. Return the length (number of nodes) of the longest path in the tree where no two adjacent nodes on the path share the same character.

**Example 1:**
```
Input: parent = [-1,0,0,1,1,2], s = "abacbe"
Output: 3
Explanation: the longest valid path is 3 -> 1 -> 4 (characters c, b, e), or similarly one going through node 2.
```

**Example 2:**
```
Input: parent = [-1,0,0,0], s = "aabc"
Output: 3
Explanation: the path 2 -> 0 -> 3 works (characters b, a, c); node 1 shares its character "a" with the root so it can't extend past it.
```

**Constraints:**
- n == parent.length == s.length
- 1 <= n <= 10^5
- 0 <= parent[i] <= n - 1 for i >= 1
- parent[0] == -1
- parent represents a valid tree
- s consists of only lowercase English letters

## Approach

This is a tree-diameter style problem: the longest valid path either stays entirely within one subtree or passes through some node as its "peak," combining its two best downward branches. The twist here is that a branch only counts if consecutive characters along it actually differ.

Do a post-order traversal (children fully processed before their parent). For each node `u`, define `longest_down[u]` as the length of the longest valid chain starting at `u` and going strictly downward. To compute it, look at every child `c` of `u`: if `s[c] != s[u]`, that child's own `longest_down[c]` chain can be appended onto `u`, giving a candidate chain length of `longest_down[c] + 1` through `u`. Children with a matching character can't extend a path through `u` at all, so they're skipped entirely.

Track the best and second-best such child chain lengths (`best1` and `best2`) among valid children. `longest_down[u] = 1 + best1` (just `u` extended by its best usable child). The best path with `u` as its peak connects both branches: `1 + best1 + best2` — `u` itself plus its two best distinct valid downward chains. Update the running answer with this value at every node, since the true longest path's peak could be anywhere in the tree.

Because n can reach 10^5, the post-order traversal is done iteratively (first push nodes onto a stack in a normal top-down order to record a valid post-order processing sequence, then process that sequence in reverse) rather than with plain recursion, avoiding a stack overflow on a long skinny tree.

**Time complexity:** O(n) — every node and every parent-child edge is visited a constant number of times.

**Space complexity:** O(n) for the children lists, the traversal order, and the `longest_down` array.
