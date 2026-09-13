# 549. Binary Tree Longest Consecutive Sequence II

> **Note:** This is a LeetCode premium problem, so it can't be opened or submitted on a free account. Solved and verified independently against hand-built test cases.

Given the root of a binary tree, find the length of the longest path where adjacent nodes have consecutive values. Unlike the simpler version of this problem, the path here can go in either direction (increasing or decreasing), and it can "bend" at a node — go up from one child and down into the other — as long as parent and child differ by exactly 1 at every step.

**Example 1:**
```
Input: root = [1,2,3]
Output: 2
Explanation: The longest consecutive path is 1 -> 2 or 2 -> 3, both length 2.
```

**Example 2:**
```
Input: root = [2,1,3]
Output: 3
Explanation: The longest consecutive path is 1 -> 2 -> 3, bending at the root: up from the left child (1) then down into the right child (3).
```

**Constraints:**
- The number of nodes in the tree is in the range [1, 3 * 10^4]
- -3 * 10^4 <= Node.val <= 3 * 10^4

## Approach

This builds on the "longest consecutive path going strictly downward" idea, but now a path can turn at a node. So for each node, compute two things via post-order DFS:

- `incr`: the length of the longest run **starting at this node and increasing** as it goes down (i.e. this node's value, then a child one greater, then a grandchild one greater than that, ...).
- `decr`: the length of the longest run **starting at this node and decreasing** as it goes down.

For each child, check its value against the parent: if `child.val == node.val + 1`, that child can extend `incr` (`1 + child's own incr`); if `child.val == node.val - 1`, it can extend `decr` (`1 + child's own decr`). A child can't extend both, since it can't simultaneously be `+1` and `-1`.

The key insight for allowing bends: the best path *through* this node combines an increasing run down one side with a decreasing run down the other — e.g. go up from a child that's one less than the node (part of a decreasing run ending here) then back down into a child that's one more (continuing as an increasing run). That combined length is `incr + decr - 1` (subtracting 1 because the node itself is shared, not counted twice). Track this as the running global maximum at every node, since the winning path doesn't have to touch the root.

**Time complexity:** O(n) — a single post-order pass, each node processed once.

**Space complexity:** O(h) for the recursion stack, where h is the tree height (worst case O(n) for a skewed tree).
