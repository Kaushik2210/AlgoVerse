# 545. Boundary of Binary Tree

**Commonly asked at:** Google, Amazon

*Note: this is a LeetCode premium (subscriber-only) problem, so it can't be verified against the live judge, but it's implemented and tested against the interface described in the official problem statement below.*

You're given the root of a binary tree. Return the values of its boundary in anticlockwise order starting from the root: the root itself, then the left boundary (the left side of the tree, top to bottom, excluding leaves), then all the leaves (left to right), then the right boundary (the right side of the tree, bottom to top, excluding leaves). A node is not included twice if it plays more than one role (e.g. the root is a leaf when the tree has only one node, or the left boundary ends at a leaf that's also counted in the leaves section).

**Example 1:**
```
Input: root = [1,null,2,3,4]
Output: [1,3,4,2]
Explanation: Root is 1. There's no left boundary (root has no left child). Leaves are 3 and 4. Right boundary (excluding leaves) is 2.
```

**Example 2:**
```
Input: root = [1,2,3,4,5,6,null,null,null,7,8,9,10]
Output: [1,2,4,7,8,9,10,6,3]
```

**Constraints:**
- The number of nodes is in the range [1, 10^4]
- -1000 <= Node.val <= 1000

## Approach

The boundary is really three separate pieces glued together, and the trick is defining each piece precisely enough to avoid double-counting nodes that could belong to more than one:

1. **The root**, always included first (unless it's a leaf, in which case it'll get picked up by the leaves pass instead — handle that as a special case for a single-node tree).
2. **The left boundary**, excluding leaves: starting from `root.left`, keep going — prefer the left child if it exists, otherwise the right child — appending each node visited, but stop before adding a leaf (a node with no children at all). This traces the outer-left edge of the tree without duplicating any leaf.
3. **All leaves**, left to right: a straightforward DFS (order matters — visit left subtree before right) collecting any node with no children, wherever it sits in the tree, not just on the boundary.
4. **The right boundary**, excluding leaves, but added in *reverse*: starting from `root.right`, keep going — prefer the right child if it exists, otherwise the left child — appending each node visited (again stopping before a leaf), then reverse this collected list before appending it, since the right boundary is walked top-down but reported bottom-up.

Concatenating root + left-boundary + leaves + reversed-right-boundary gives the full anticlockwise boundary. The one edge case worth calling out: if the root has no children at all, it's handled entirely by the "root" step and the leaves step would otherwise re-add it — so skip the left/right boundary walks entirely when a child is missing (an empty walk naturally handles this), and make sure the leaf pass only adds the root as a leaf when the root truly has no children (single-node tree), not when it has at least one child.

**Time complexity:** O(n) — each of the three passes (left boundary, leaves, right boundary) visits at most all n nodes.

**Space complexity:** O(n) for the output list and O(h) recursion stack for the leaf DFS.
