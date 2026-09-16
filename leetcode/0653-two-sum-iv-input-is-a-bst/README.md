# 653. Two Sum IV - Input is a BST

**Commonly asked at:** Amazon, Microsoft

Given the root of a binary search tree and an integer `k`, determine if there exist two different nodes in the tree whose values add up to `k`.

**Example 1:**
```
Input: root = [5,3,6,2,4,null,7], k = 9
Output: true
Explanation: 5 + 4 = 9
```

**Example 2:**
```
Input: root = [5,3,6,2,4,null,7], k = 28
Output: false
```

**Constraints:**
- The number of nodes is in [1, 10^4]
- -10^4 <= Node.val <= 10^4
- root is guaranteed to be a valid binary search tree
- -10^5 <= k <= 10^5

## Approach

This is just Two Sum wearing a tree costume. The BST ordering property doesn't actually save you much work here — you still need to check every node against every value seen so far, since a matching pair could live anywhere in the tree relative to each other, not necessarily along the same root-to-leaf path.

Walk the tree with any traversal (DFS works fine, order doesn't matter) while keeping a hash set of every value visited so far. At each node, before adding it to the set, check whether `k - node.val` is already in the set. If it is, some earlier node paired with this one sums to `k`, so return true immediately. If not, add the current value and keep going into both children.

The only subtlety is checking before inserting, so a single node can't pair with itself when `k` happens to equal `2 * node.val`.

**Time complexity:** O(n) — every node is visited once, with O(1) average set operations.

**Space complexity:** O(n) — the hash set can hold up to every node's value, plus O(h) for the recursion stack.
