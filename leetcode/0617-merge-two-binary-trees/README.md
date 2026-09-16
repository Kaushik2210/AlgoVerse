# 617. Merge Two Binary Trees

**Commonly asked at:** Amazon, Microsoft

You're given the roots of two binary trees, `root1` and `root2`. Merge them into a new tree: where both trees have a node at the same position, sum their values into the merged node; where only one tree has a node, that node (and its whole subtree) is used as-is. Return the merged tree's root.

**Example 1:**
```
Input: root1 = [1,3,2,5], root2 = [2,1,3,null,4,null,7]
Output: [3,4,5,5,4,null,7]
Explanation: the roots (1+2=3), then position by position — 3+1=4, 2+3=5, 5's position only exists in root1 so it stays 5, 4 and 7 only exist in root2 so they stay as-is.
```

**Example 2:**
```
Input: root1 = [1], root2 = [1,2]
Output: [2,2]
```

**Constraints:**
- The number of nodes in both trees is in the range `[0, 2000]`
- `-10^4 <= Node.val <= 10^4`

## Approach

This is a simultaneous DFS over both trees, walking them position by position and building a new tree as it goes.

At each pair of positions: if one of the two nodes is `None`, the merged subtree at this position is just whatever the other tree has there (including everything below it) — there's nothing to sum, and no need to recurse further into it, since the whole subtree can be reused directly. If neither is `None`, create a new node whose value is the sum of both, then recursively merge the left children into its left child and the right children into its right child.

Because a new node is only created when both inputs are non-null, this naturally builds a brand-new tree without mutating either input (an alternative in-place approach could merge into `root1` directly by reusing its nodes, which saves allocations but destroys the original tree — worth keeping in mind if the inputs need to be preserved).

**Time complexity:** O(min(n1, n2)) — recursion only descends as far as both trees still have nodes; once one side hits `None`, that whole branch is copied in O(1) per remaining node without further comparison.

**Space complexity:** O(min(h1, h2)) for the recursion stack, plus O(n) for the newly built merged tree.
