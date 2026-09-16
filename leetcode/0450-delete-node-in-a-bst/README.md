# 450. Delete Node in a BST

**Commonly asked at:** Microsoft, Meta, Google

You're given the root of a binary search tree and a value `key`. Delete the node with that value from the tree and return the new root, keeping the BST property intact. If no node has that value, return the tree unchanged.

**Example 1:**
```
Input: root = [5,3,6,2,4,null,7], key = 3
Output: [5,4,6,2,null,null,7]
Explanation: 3 is replaced by 4 (its in-order successor); one valid answer among several.
```

**Example 2:**
```
Input: root = [5,3,6,2,4,null,7], key = 0
Output: [5,3,6,2,4,null,7]
Explanation: There's no node with value 0, so nothing changes.
```

**Example 3:**
```
Input: root = [], key = 0
Output: []
```

**Constraints:**
- The number of nodes is in the range [0, 10^4]
- All node values are unique
- root is a valid BST

## Approach

First use the BST ordering to find the node: walk down from the root, going left if `key` is smaller and right if `key` is larger, until either the node is found or a null is hit (meaning `key` isn't in the tree).

Once the node to delete is located, there are three shapes it can come in:
- **No children (leaf):** just remove it — return `null` in its place.
- **One child:** the node is redundant, so splice it out by returning whichever child it has, promoting that subtree up to take its place.
- **Two children:** this is the interesting case. The node can't simply be removed because both of its subtrees need a new home. The standard trick is to replace the node's value with its in-order successor (the smallest value in its right subtree — keep going left from `node.right` until there's no more left child), and then recursively delete that successor's original node from the right subtree. Because the successor is the smallest node on the right side, it has no left child, so deleting *it* only ever reduces to the leaf or one-child case, never back into another two-child case.

All of this is naturally expressed as a recursive function that returns the (possibly new) root of the subtree it was called on, with the caller reassigning `node.left = delete(...)` or `node.right = delete(...)` as it unwinds.

**Time complexity:** O(h) where h is the tree height — one pass down to find the node, and (in the two-child case) one more pass down the right subtree to find and remove the successor.

**Space complexity:** O(h) for the recursion stack.
