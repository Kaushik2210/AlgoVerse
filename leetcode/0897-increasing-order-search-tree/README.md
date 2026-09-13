# 897. Increasing Order Search Tree

Given the root of a binary search tree, rearrange it so that the tree is a straight right-leaning chain: every node has no left child, and the nodes appear in ascending sorted order following the right pointers, with the leftmost node of the original tree becoming the new root.

**Example 1:**
```
Input: root = [5,3,6,2,4,null,8,1,null,null,null,7,9]
Output: [1,null,2,null,3,null,4,null,5,null,6,null,7,null,8,null,9]
```

**Example 2:**
```
Input: root = [5,1,7]
Output: [1,null,5,null,7]
```

**Constraints:**
- The number of nodes is in [1, 100]
- 0 <= Node.val <= 1000

## Approach

An inorder traversal of a BST visits nodes in ascending order — that's exactly the order the final chain needs. So instead of collecting values into a list and rebuilding a new tree, rewire the existing nodes in place as the inorder traversal visits them.

Keep a `prev` pointer to the last node placed into the output chain, starting it at a dummy sentinel node so there's no special case for attaching the very first real node. During the inorder traversal (left, then visit, then right), when visiting a node: clear its `left` pointer (it doesn't belong in a right-leaning chain), attach it as `prev.right`, then advance `prev` to this node before recursing into what was originally its right subtree.

Because the traversal processes `node.left` before touching `node` itself, the left subtree is already fully unspooled into the chain before the node gets appended — everything lines up in sorted order automatically. Returning `dummy.right` at the end gives the real new root.

**Time complexity:** O(n) — every node is visited and rewired exactly once.

**Space complexity:** O(h) for the recursion stack (O(1) extra beyond that, since nodes are rewired in place rather than copied).
