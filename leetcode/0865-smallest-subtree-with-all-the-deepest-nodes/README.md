# 865. Smallest Subtree with all the Deepest Nodes

**Commonly asked at:** Google

*Note: this is a LeetCode Premium (subscriber-only) problem, not freely accessible on LeetCode. It's included here anyway since it's the classic phrasing of the same problem as "Lowest Common Ancestor of Deepest Leaves" (1123), which is freely accessible — the two are worth doing together.*

Given the root of a binary tree, find the deepest leaves (the ones farthest from the root), and return the smallest subtree that contains **all** of them.

**Example 1:**
```
Input: root = [3,5,1,6,2,0,8,null,null,7,4]
Output: [2,7,4]
Explanation: nodes 7 and 4 are the deepest leaves (depth 3). Their lowest common ancestor is node 2, and the subtree rooted at 2 is the smallest one containing both.
```

**Example 2:**
```
Input: root = [1]
Output: [1]
Explanation: the root is itself the only, and therefore deepest, leaf.
```

**Example 3:**
```
Input: root = [0,1,3,null,2]
Output: [2]
Explanation: node 2 is the single deepest leaf, so the smallest subtree containing "all" deepest nodes is just that one node.
```

**Constraints:**
- The number of nodes in the tree is in the range `[1, 500]`
- `0 <= Node.val <= 500`
- Node values are unique

## Approach

The answer node is always the lowest common ancestor (LCA) of the full set of deepest leaves — if it weren't, some deepest leaf would fall outside the chosen subtree, and if a smaller subtree were chosen instead, it would be missing at least one deepest leaf on one side. So the question reduces to: find the LCA of the deepest leaves.

A single postorder DFS gets both the depth information and the LCA simultaneously by having each call return a pair: `(depth of the deepest leaf found below this node, the LCA of the deepest leaves below this node)`. At a leaf (or `None`), depth is 0 (or -1 conceptually, but treating `None` as depth 0 with no node works out cleanly with the `+1` at each level).

At an internal node, compare what came back from the left and right subtrees:
- If both sides report the same depth, the deepest leaves are split evenly across both children, which makes the current node itself their LCA — return `(that depth + 1, current node)`.
- If one side is deeper than the other, all the deepest leaves live entirely in that deeper side, so its own reported LCA is passed straight up unchanged (just with depth incremented by 1 to account for this level).

The DFS's final return value at the root is exactly the answer.

**Time complexity:** O(n) — each node is visited exactly once.

**Space complexity:** O(h) for the recursion stack, where h is the tree's height.
