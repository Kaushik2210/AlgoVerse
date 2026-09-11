# 104. Maximum Depth of Binary Tree

Given the root of a binary tree, find its maximum depth — the number of nodes along the longest path from the root down to the farthest leaf.

**Example 1:**
```
Input: root = [3,9,20,null,null,15,7]
Output: 3
```

**Example 2:**
```
Input: root = [1,null,2]
Output: 2
```

**Constraints:**
- The number of nodes is in the range [0, 10^4]

## Approach

There isn't really a "slow" brute force to avoid here — the interesting part is picking a clean way to think about the recursion. The depth of a tree rooted at any node is just 1 (for that node itself) plus whichever of its two subtrees is deeper. That statement is true at every level of the tree, which makes it a textbook case for recursion.

So define the function on a node: if the node is `null`, its depth is 0 (an empty tree has no depth). Otherwise, recursively find the depth of the left subtree and the depth of the right subtree, take the bigger of the two, and add 1 for the current node. That's it — the base case (null node) stops the recursion, and every other call just combines the answers from its two children.

An equivalent iterative version does a level-by-level breadth-first traversal, counting how many full layers you process — useful if you want to avoid recursion depth limits on a very unbalanced tree, but the recursive version is the cleanest expression of the idea.

**Time complexity:** O(n) — every node is visited exactly once.

**Space complexity:** O(h) — the recursion stack grows with the tree's height h; O(log n) for a balanced tree, up to O(n) for a completely skewed one.
