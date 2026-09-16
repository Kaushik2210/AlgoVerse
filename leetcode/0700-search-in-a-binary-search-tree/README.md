# 700. Search in a Binary Search Tree

**Commonly asked at:** Amazon, Microsoft

You're given the root of a binary search tree and an integer `val`. Find the node in the tree whose value equals `val` and return the subtree rooted at that node. If no such node exists, return `null`.

**Example 1:**
```
Input: root = [4,2,7,1,3], val = 2
Output: [2,1,3]
```

**Example 2:**
```
Input: root = [4,2,7,1,3], val = 5
Output: []
```

**Constraints:**
- The number of nodes is in the range [1, 5000]
- 1 <= Node.val <= 10^7
- root is a valid BST

## Approach

A plain binary tree would need to check every node in the worst case, since there's no way to know which subtree a value might be hiding in. A BST removes that uncertainty: at every node, the ordering guarantees which side a target value has to be on.

Starting at the root, compare `val` to the current node's value. If they're equal, this is the node to return. If `val` is smaller, the target — if it exists — must be in the left subtree, since everything in the right subtree is guaranteed larger. Symmetrically, if `val` is larger, go right. If a `null` is ever reached before finding a match, the value simply isn't in the tree.

This can be written recursively or as a plain iterative loop — since only one branch is ever explored, there's no need for a stack or queue.

**Time complexity:** O(h) where h is the tree height — O(log n) for a balanced BST, O(n) worst case for a skewed one.

**Space complexity:** O(1) iteratively, or O(h) for the recursion stack if written recursively.
