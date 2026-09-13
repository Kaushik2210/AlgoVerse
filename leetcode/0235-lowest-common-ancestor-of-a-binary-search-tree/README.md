# 235. Lowest Common Ancestor of a Binary Search Tree

You're given the root of a binary search tree and two nodes `p` and `q` that exist in it. Find their lowest common ancestor: the deepest node that has both `p` and `q` as descendants (a node counts as a descendant of itself).

**Example 1:**
```
Input: root = [6,2,8,0,4,7,9,null,null,3,5], p = 2, q = 8
Output: 6
Explanation: The LCA of nodes 2 and 8 is 6.
```

**Example 2:**
```
Input: root = [6,2,8,0,4,7,9,null,null,3,5], p = 2, q = 4
Output: 2
Explanation: The LCA of nodes 2 and 4 is 2, since a node can be a descendant of itself.
```

**Constraints:**
- The number of nodes is in the range [2, 10^5]
- All node values are unique
- p != q, and both exist in the tree

## Approach

This is the same question as the general binary tree version (LeetCode 236), but the BST ordering property means it doesn't need to explore both children at every node or search the whole tree at all.

At any node, compare its value against `p.val` and `q.val`:
- If both `p` and `q` are smaller than the current node's value, the LCA must live in the left subtree — every node there is still an ancestor candidate, and going right would only move away from both targets.
- If both are larger, the LCA must be in the right subtree, symmetric logic.
- Otherwise — one is smaller (or equal) and the other is larger (or equal) — the current node is exactly the split point where the paths to `p` and `q` diverge (or where the current node *is* one of them). That makes the current node the LCA.

Because this only needs one direction at each step, it can be done iteratively with a simple `while` loop walking down from the root, no recursion or stack needed at all.

**Time complexity:** O(h) where h is the tree height — O(log n) for a balanced BST, O(n) worst case for a completely skewed one.

**Space complexity:** O(1) — the iterative walk uses no extra data structures.
