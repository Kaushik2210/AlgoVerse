# 404. Sum of Left Leaves

Given the root of a binary tree, add up the values of all leaves that are a left child of their parent.

**Example 1:**
```
Input: root = [3,9,20,null,null,15,7]
Output: 24
Explanation: the left leaves are 9 and 15, which sum to 24.
```

**Example 2:**
```
Input: root = [1]
Output: 0
Explanation: the root has no children, so there are no left leaves.
```

**Constraints:**
- The number of nodes is in [1, 1000]
- -1000 <= Node.val <= 1000

## Approach

A leaf by itself doesn't know whether it's a "left leaf" — that's a property of its relationship to its parent, not of the node itself. So the check has to happen one level up: whenever a node looks at its left child, it can tell right away whether that child is a leaf.

The cleanest way to carry that information down is to pass a flag through the recursion telling each node whether it was reached via a left edge. Start the root with `is_left = False` (the root is nobody's child). When recursing into `node.left`, pass `True`; into `node.right`, pass `False`. At each node, if it's a leaf (no children) and it was reached via a left edge, its value counts — otherwise it contributes 0. Non-leaf nodes just pass the sum of both subtrees up.

**Time complexity:** O(n) — every node is visited exactly once.

**Space complexity:** O(h) — recursion stack depth, worst case O(n) for a skewed tree.
