# 337. House Robber III

The houses in this neighborhood form a binary tree — a thief starting at the `root` can rob any subset of houses, but can't rob two directly-connected houses (a node and its immediate parent or child). Each node has a `val` amount of money. Return the maximum amount the thief can rob without robbing two linked houses.

**Example 1:**
```
Input: root = [3,2,3,null,3,null,1]
Output: 7
Explanation: Rob 3 (root) + 3 + 1 = 7 (the two houses at depth 2), skipping the depth-1 houses.
```

**Example 2:**
```
Input: root = [3,4,5,1,3,null,1]
Output: 9
Explanation: Rob 4 + 5 = 9 (the two depth-1 houses), skipping the root.
```

**Constraints:**
- The number of nodes is in the range [1, 10^4]
- 0 <= Node.val <= 10^4

## Approach

A naive recursion that just computes "best result for this subtree" and separately checks "was the parent robbed" runs into overlapping subproblems if done carelessly — you'd end up recomputing "best result if this node's parent wasn't robbed" repeatedly from scratch as recursion depth grows, since a parent's decision depends on children whose own decision already depended on constraints from further down.

The trick is to have every node return *two* numbers instead of one: the best result for its subtree if this node itself is robbed, and the best result if it is not. If a node is robbed, its own value counts, but neither child can be robbed, so the node's "robbed" total is `node.val + left.not_robbed + right.not_robbed`. If a node is not robbed, there's no constraint on the children, so the node's "not robbed" total is `max(left.robbed, left.not_robbed) + max(right.robbed, right.not_robbed)` — take whichever result was better for each child independently. This pair fully summarizes everything a parent needs to know about a subtree, computed bottom-up with one post-order traversal, so nothing is ever recomputed.

The final answer is the max of the two values returned for the root.

**Time complexity:** O(n) — each node is visited exactly once, doing O(1) work per node.

**Space complexity:** O(h) for the recursion stack, where h is the tree's height (O(n) worst case for a skewed tree, O(log n) for a balanced one).
