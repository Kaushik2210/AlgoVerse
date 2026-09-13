# 236. Lowest Common Ancestor of a Binary Tree

You're given the root of a binary tree (not a BST — no ordering guarantee) and two nodes `p` and `q` that are guaranteed to exist in the tree. Find their lowest common ancestor: the deepest node that has both `p` and `q` as descendants (a node is allowed to be a descendant of itself).

**Example 1:**
```
Input: root = [3,5,1,6,2,0,8,null,null,7,4], p = 5, q = 1
Output: 3
Explanation: The LCA of nodes 5 and 1 is 3.
```

**Example 2:**
```
Input: root = [3,5,1,6,2,0,8,null,null,7,4], p = 5, q = 4
Output: 5
Explanation: The LCA of nodes 5 and 4 is 5, since a node can be a descendant of itself.
```

**Constraints:**
- The number of nodes is in the range [2, 10^5]
- All node values are unique
- p != q, and both exist in the tree

## Approach

Without BST ordering there's no way to steer left/right based on value comparisons — every node has to actually be searched. The clean way to think about it is: ask each subtree "do you contain `p`, `q`, neither, or is your root itself one of them?" and combine those answers on the way back up.

Write a recursive function `find(node)` that returns `node` if `node` is `null`, or equals `p`, or equals `q` — that's the "found something interesting here" signal. Otherwise recurse into `find(node.left)` and `find(node.right)`. Three cases come back:
- Both sides return a non-null result: that means `p` was found in one subtree and `q` in the other (or one of them is `node` itself and the other is below). Either way, `node` is the point where their paths from the root diverge — so `node` *is* the LCA. Return `node`.
- Exactly one side returns non-null: neither target lives in the other subtree, so whatever that one side found (which could itself already be the LCA, found deeper down) is passed straight up unchanged.
- Both sides return null: this subtree has nothing to do with `p` or `q`, propagate null up.

Since the problem guarantees `p` and `q` are both present, the very first node where both sides report "something found" is guaranteed to be their LCA, and it's found on the way back up the recursion without ever needing explicit parent pointers or path lists.

**Time complexity:** O(n) — in the worst case the whole tree is visited once.

**Space complexity:** O(h) for the recursion stack, where h is the tree height (O(n) worst case, O(log n) balanced).
