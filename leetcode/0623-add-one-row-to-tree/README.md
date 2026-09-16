# 623. Add One Row to Tree

**Commonly asked at:** Google, Bloomberg

Given the root of a binary tree, and two integers `val` and `depth`, add a new row of nodes all holding value `val` at the given `depth`. Every existing node currently at `depth - 1` gets both a new left child and a new right child holding `val`; the node's original left subtree hangs off the new left child's left, and the original right subtree hangs off the new right child's right. Depth of the root is 1. If `depth == 1`, a brand new root holding `val` is created, with the entire original tree as its left child.

**Example 1:**
```
Input: root = [4,2,6,3,1,5], val = 1, depth = 2
Output: [4,1,1,2,null,null,6,3,1,5]
Explanation: at depth 2, nodes 2 and 6 each get a new pair of "1" children wrapped around their existing subtrees.
```

**Example 2:**
```
Input: root = [4,2,null,3,1], val = 1, depth = 3
Output: [4,2,null,1,1,3,null,null,1]
```

**Constraints:**
- The number of nodes in the tree is in the range `[1, 10^4]`
- `1 <= Node.val <= 10^4`
- `-100 <= val <= 100`
- `1 <= depth <= the depth of tree + 1`

## Approach

This is a DFS that tracks the current depth, with the actual insertion happening one level above the target: to insert a row at `depth`, walk down to every node currently sitting at `depth - 1` and splice new nodes in between it and its existing children.

Special case: if `depth == 1`, there's no "level 0" node to attach a new row under — the entire tree just gets wrapped by a brand new root, with the original tree as its left child.

Otherwise, DFS from the root tracking `current_depth`. When `current_depth == depth - 1`, that's the target level — for the current node, create a new node holding `val` whose left child is the current node's existing left subtree, and set that as the current node's new left child (and symmetrically for the right side, new node's right child is the old right subtree, becoming the current node's new right child). When `current_depth` is anything less than `depth - 1`, just recurse into both children with `current_depth + 1`, without touching anything yet.

**Time complexity:** O(n) — in the worst case (a `depth` reaching the tree's full height) every node is visited.

**Space complexity:** O(h) for the recursion stack, where h is the tree's height.
