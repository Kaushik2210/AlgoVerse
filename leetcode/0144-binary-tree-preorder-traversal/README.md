# 144. Binary Tree Preorder Traversal

Given the root of a binary tree, return the preorder traversal of its node values (visit the node itself, then its left subtree, then its right subtree).

**Example 1:**
```
Input: root = [1,null,2,3]
Output: [1,2,3]
```

**Example 2:**
```
Input: root = [1,2,3,4,5,null,8,null,null,6,7,null,9]
Output: [1,2,4,5,6,7,3,8,9]
```

**Example 3:**
```
Input: root = []
Output: []
```

**Constraints:**
- Number of nodes in the tree is in [0, 100]
- -100 <= Node.val <= 100

## Approach

Recursively this is a one-liner: visit the node, recurse left, recurse right. The iterative version (useful because it avoids recursion depth limits and is a common follow-up ask) uses an explicit stack, and the trick is getting the push order right so nodes pop off in the correct root-left-right order.

Push the root onto a stack. Then repeatedly pop a node, record its value, and push its children — but push right before left, so that left is on top of the stack and gets processed first (stacks are LIFO, so the last thing pushed is the first thing popped). Skip pushing null children. Keep going until the stack is empty.

**Time complexity:** O(n) — every node is visited and pushed/popped exactly once.

**Space complexity:** O(n) — the stack holds up to O(h) nodes at a time in the worst case for a balanced tree, but can hold up to O(n) for a completely skewed tree; the output list itself is also O(n).
