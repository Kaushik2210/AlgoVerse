# 145. Binary Tree Postorder Traversal

Given the root of a binary tree, return the postorder traversal of its node values (visit the left subtree, then the right subtree, then the node itself).

**Example 1:**
```
Input: root = [1,null,2,3]
Output: [3,2,1]
```

**Example 2:**
```
Input: root = [1,2,3,4,5,null,8,null,null,6,7,null,9]
Output: [4,6,7,5,2,9,8,3,1]
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

Postorder (left, right, node) is the trickiest of the three traversals to do iteratively directly, but there's a neat shortcut: it's the reverse of "node, right, left." And "node, right, left" is just preorder ("node, left, right") with the push order of the children flipped.

So do a preorder-style traversal but push left before right (instead of right before left), which yields visits in "node, right, left" order — then reverse the collected result at the end to get "left, right, node," which is postorder.

Concretely: push the root, and while the stack isn't empty, pop a node, append its value, then push its left child and then its right child (in that order, so right ends up on top and gets visited before left). At the end, reverse the output list.

**Time complexity:** O(n) — each node is visited, pushed, and popped exactly once, plus one O(n) reversal at the end.

**Space complexity:** O(n) — the stack and the result list are both bounded by the number of nodes.
