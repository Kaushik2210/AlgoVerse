# 669. Trim a Binary Search Tree

Given the root of a binary search tree and a range `[low, high]`, trim the tree so that every remaining node's value lies within that range. Nodes outside the range should be removed, but the BST structure and ordering of what remains must be preserved — a removed node's in-range descendants should be reattached appropriately, not discarded.

**Example 1:**
```
Input: root = [1,0,2], low = 1, high = 2
Output: [1,null,2]
```

**Example 2:**
```
Input: root = [3,0,4,null,2,null,null,1], low = 1, high = 3
Output: [3,2,null,1]
```

**Constraints:**
- The number of nodes is in [1, 10^4]
- 0 <= Node.val <= 10^4
- All node values are unique
- root is guaranteed to be a valid BST
- low <= high

## Approach

The key realization is that trimming a subtree can return a *different* node as its new root — when the current node itself falls outside `[low, high]`, it has to be dropped, but part of its subtree might still belong in the final tree and needs to bubble up to take its place.

Process recursively with a function that returns "the trimmed version of this subtree." If the current node's value is less than `low`, the node itself and everything in its left subtree are too small (by BST ordering) — discard both and recurse into the right subtree, returning whatever that trim produces as the replacement. Symmetrically, if the node's value is greater than `high`, discard it and its right subtree, recursing into the left subtree instead.

If the node's value is already within range, keep the node, but its children might still need trimming — recursively trim both the left and right subtrees and reassign the results back onto `root.left` and `root.right` (this is what correctly splices in a promoted grandchild when a direct child got discarded). Return the node itself.

**Time complexity:** O(n) worst case — every node is visited once, though out-of-range subtrees can be pruned without recursing into both children.

**Space complexity:** O(h) for the recursion stack.
