# 98. Validate Binary Search Tree

Given the root of a binary tree, determine if it's a valid binary search tree. A valid BST means: every node in a left subtree is strictly less than the node, every node in a right subtree is strictly greater than the node, and both subtrees are themselves valid BSTs.

**Example 1:**
```
Input: root = [2,1,3]
Output: true
```

**Example 2:**
```
Input: root = [5,1,4,null,null,3,6]
Output: false
Explanation: the root's value is 5, but its right subtree contains 3, which is less than 5.
```

**Constraints:**
- The number of nodes is in [1, 10^4]
- -2^31 <= Node.val <= 2^31 - 1

## Approach

The tempting but wrong shortcut is to only compare each node against its immediate parent (left child < parent < right child) — that misses violations further down the tree. Consider a root of 10 with a left child of 5, and that 5 has a right child of 15: the 15 is greater than its immediate parent 5, so a parent-only check passes it, but 15 also needs to be less than 10 (since it's still in the root's left subtree), and it isn't. A local check isn't enough; validity has to account for the full chain of ancestors.

The fix is to carry a valid range `(low, high)` down through the recursion instead of just comparing to the parent. Every node must fall strictly between its own `low` and `high` bounds. When recursing into the left child, that child's `high` becomes the current node's value (nothing in the left subtree can be >= the current node), while its `low` stays whatever it already was. Symmetrically, recursing into the right child tightens `low` to the current node's value and leaves `high` unchanged. The root starts with no constraints at all, `(-infinity, infinity)`.

At each node, first check it satisfies `low < node.val < high` (strict, since duplicates aren't allowed in a valid BST) — if it fails, short-circuit false immediately. Otherwise recurse into both children with their tightened ranges, and the tree is valid only if both subtrees report valid too.

**Time complexity:** O(n) — every node is visited exactly once.

**Space complexity:** O(h) — the recursion stack depth matches the tree's height, worst case O(n) for a completely skewed tree.
