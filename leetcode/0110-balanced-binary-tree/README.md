# 110. Balanced Binary Tree

Given a binary tree, determine if it is height-balanced. A binary tree is height-balanced if, for every node in the tree, the heights of its left and right subtrees differ by no more than 1.

**Example 1:**
```
Input: root = [3,9,20,null,null,15,7]
Output: true
```

**Example 2:**
```
Input: root = [1,2,2,3,3,null,null,4,4]
Output: false
```

**Example 3:**
```
Input: root = []
Output: true
```

**Constraints:**
- The number of nodes in the tree is in the range [0, 5000]
- -10^4 <= Node.val <= 10^4

## Approach

The direct translation of the definition is: for every node, compute the height of its left subtree and its right subtree, check they differ by at most 1, and also check both subtrees are themselves balanced. Done naively — a separate height function called at every node — that recomputes heights over and over, giving O(n^2) in the worst case (a skewed tree).

The fix is to compute height and check balance in the same bottom-up pass. Write a recursive helper that returns the height of a subtree, but the moment it discovers an imbalance anywhere below, it short-circuits and propagates a sentinel value (like -1) straight up instead of a real height. Since a genuine height is always >= 0, -1 can never be confused with one, so any ancestor checking its children's "heights" immediately sees the -1, knows the subtree below is already broken, and just passes the -1 further up without doing any more work. Only if both children come back with real (non-negative) heights does the current node actually compare them and compute its own height normally.

This way, each node is visited exactly once no matter what, and a single traversal both proves the tree is balanced and short-circuits out of the rest of the tree as soon as it finds it isn't.

**Time complexity:** O(n) — every node is visited once, and the short-circuit still bounds each node's work to O(1) beyond its own recursive calls.

**Space complexity:** O(h) for the recursion stack, where h is the tree's height (O(log n) balanced, O(n) worst case skewed).
