# 111. Minimum Depth of Binary Tree

Given a binary tree, find its minimum depth — the number of nodes along the shortest path from the root down to the nearest leaf node.

**Example 1:**
```
Input: root = [3,9,20,null,null,15,7]
Output: 2
```

**Example 2:**
```
Input: root = [2,null,3,null,4,null,5,null,6]
Output: 5
```

**Constraints:**
- The number of nodes is in the range [0, 10^5]

## Approach

The obvious-looking recursive formula — `1 + min(depth(left), depth(right))` — has a trap: a leaf is a node with *no children*, not just any node that's missing one child. If a node has only a right child and no left child, the "shortest path" can't dead-end at the missing left child (that's not a leaf, it's just absent), so the min-depth calculation has to skip past a one-sided node rather than treating its missing side as depth 0.

So the recursion needs a special case: if a node has only one child, the minimum depth through that node is `1 + depth(the existing child)`, not `1 + min(0, depth(child))` — take the max of the depths when one side is null (equivalently, just recurse into whichever side exists). Only when both children are null (a true leaf) does depth become 1. When both children exist, take `1 + min(left, right)` as expected.

A breadth-first search is arguably more natural for a *minimum* depth question: BFS explores level by level, so the very first leaf node encountered (a node with no children) sits at the minimum possible depth, and the search can stop immediately without visiting the rest of the tree. This is the DFS version below since it stays close to the tree's own recursive shape and doesn't need an explicit queue, but it's worth noting BFS can short-circuit earlier on a lopsided tree.

**Time complexity:** O(n) — in the worst case (e.g. a tree that's really just a long chain to one leaf) every node is visited once.

**Space complexity:** O(h) for the recursion stack, where h is the tree's height — O(n) worst case for a completely skewed tree, O(log n) for a balanced one.
