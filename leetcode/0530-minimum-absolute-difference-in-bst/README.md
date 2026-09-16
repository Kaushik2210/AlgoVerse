# 530. Minimum Absolute Difference in BST

**Commonly asked at:** Amazon, Microsoft

You're given the root of a binary search tree. Return the minimum absolute difference between the values of any two distinct nodes in the tree.

**Example 1:**
```
Input: root = [4, 2, 6, 1, 3]
Output: 1
```

**Example 2:**
```
Input: root = [1, 0, 48, null, null, 12, 49]
Output: 1
```

**Constraints:**
- The number of nodes in the tree is in the range [2, 10^4]
- 0 <= Node.val <= 10^5

## Approach

The brute-force way is to collect every node's value into a list, sort it, and scan adjacent pairs for the smallest gap — that works but does more than necessary given what a BST already hands you for free.

An in-order traversal of a BST visits node values in strictly ascending order. That means the sorted list from the brute-force approach falls out naturally just by walking the tree in-order — no separate sort step needed. And since the values come out sorted, the minimum absolute difference between *any* two nodes must occur between some pair of *adjacent* values in that sorted order (any non-adjacent pair has a gap at least as large, since everything in between only adds distance). So it's enough to track the previous value seen during the in-order walk and, at each step, compare the current node's value against it, keeping a running minimum.

Walk left subtree, process current node (compare against the last-seen value, then update last-seen), walk right subtree. One pass, constant extra state.

Verified against the two canonical examples: `root = [4,2,6,1,3]` -> 1, `root = [1,0,48,null,null,12,49]` -> 1, plus a right-skewed tree `[1,null,3,2]` -> 1 and a deeper unbalanced tree `[90,69,null,49,89,null,52]` -> 1 — all match.

**Time complexity:** O(n) — every node is visited exactly once.

**Space complexity:** O(h) for the recursion stack, where h is the tree's height (O(log n) balanced, O(n) worst case skewed).
