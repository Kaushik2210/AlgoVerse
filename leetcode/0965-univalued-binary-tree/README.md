# 965. Univalued Binary Tree

**Commonly asked at:** Amazon, Google

A binary tree is univalued if every node in it has the same value. Given the root of a binary tree, return whether it's univalued.

**Example 1:**
```
Input: root = [1,1,1,1,1,null,1]
Output: true
```

**Example 2:**
```
Input: root = [2,2,2,5,2]
Output: false
Explanation: node 5 breaks the pattern — every other node is 2.
```

**Constraints:**
- The number of nodes in the tree is in the range `[1, 100]`
- `0 <= Node.val <= 99`

## Approach

A simple DFS comparing every node's value against a single fixed target — the root's own value, since if any node differs from the root, the tree can't be univalued (and if the root matches everything, it trivially matches itself too).

Recurse: an empty subtree (`None`) is vacuously fine and contributes nothing to break the check. If the current node's value doesn't match `root.val`, the whole tree fails immediately. Otherwise, the check passes for this node, and the answer depends on whether both the left and right subtrees also pass the same check.

**Time complexity:** O(n) — every node is visited once, with the DFS short-circuiting as soon as a mismatch is found.

**Space complexity:** O(h) for the recursion stack, where h is the tree's height.
