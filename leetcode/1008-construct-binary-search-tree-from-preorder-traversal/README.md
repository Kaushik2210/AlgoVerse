# 1008. Construct Binary Search Tree from Preorder Traversal

**Commonly asked at:** Amazon

Given an array `preorder` representing the preorder traversal of a binary search tree, reconstruct that tree and return its root. The tree is guaranteed to have unique values, and the input always corresponds to exactly one valid BST.

**Example 1:**
```
Input: preorder = [8,5,1,7,10,12]
Output: [8,5,10,1,7,null,12]
```

**Example 2:**
```
Input: preorder = [1,3]
Output: [1,null,3]
```

**Constraints:**
- 1 <= preorder.length <= 100
- 0 <= preorder[i] <= 1000
- All values are distinct
- preorder is guaranteed to be the preorder traversal of a BST

## Approach

The naive approach — insert each value one at a time into a BST using standard BST insertion — works and is simple, but there's a neater O(n) way that reads the array in one linear pass by exploiting what "preorder" plus "BST" together guarantee.

In a preorder traversal (root, then left subtree, then right subtree) of a BST, once you've placed a node, every subsequent value that's smaller than it belongs somewhere in its left subtree, and this holds recursively — so the left subtree of a node consists of exactly the maximal run of following values that stay below that node's value, and the right subtree picks up wherever that run ends (up to some upper bound from further up the ancestor chain).

So build recursively with an upper bound parameter. `build(bound)` looks at `preorder[i]`: if it's past the end of the array, or its value exceeds `bound`, there's no node here — return null without consuming anything. Otherwise, this value becomes the current node, advance `i`, then recursively build its left subtree with `node.val` as the new bound (anything from here up to node.val belongs on the left), and build its right subtree with the original `bound` still in effect (things belong on the right as long as they still satisfy whatever constraint an ancestor imposed).

Because `i` is shared mutable state across the whole recursion (not reset per call), each array value gets consumed exactly once, and the recursive bound-checking naturally sorts every value into the correct left-or-right slot without needing to search or partition the array explicitly.

**Time complexity:** O(n) — each array element is examined and consumed exactly once.

**Space complexity:** O(h) for the recursion stack, up to O(n) for a skewed tree.
