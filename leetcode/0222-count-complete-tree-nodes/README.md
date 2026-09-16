# 222. Count Complete Tree Nodes

**Commonly asked at:** Google

You're given the root of a complete binary tree — every level is fully filled except possibly the last, and all nodes in the last level are pushed as far left as possible. Count the total number of nodes, faster than the trivial O(n) full traversal.

**Example 1:**
```
Input: root = [1,2,3,4,5,6]
Output: 6
```

**Example 2:**
```
Input: root = []
Output: 0
```

**Example 3:**
```
Input: root = [1]
Output: 1
```

**Constraints:**
- The number of nodes is in the range [0, 5 * 10^4]
- Design an algorithm faster than O(n)

## Approach

Just walking the whole tree and counting every node is O(n) and always correct, but it ignores the "complete tree" structure the problem hands over for free — that structure lets a lot of subtrees be counted without visiting them node by node.

The key fact about a complete binary tree: for any node, compute the height of its *leftmost* spine (always going left) and the height of its *rightmost* spine (always going right). If those two heights are equal, the subtree rooted there is a **perfect** binary tree — every level completely filled — and its node count is exactly `2^height - 1`, computable in O(1) without visiting a single other node.

If the two spine heights differ, the subtree isn't perfect (the last level is partially filled somewhere inside it), so recurse: count `1` for the current node, plus a recursive count of the left subtree, plus a recursive count of the right subtree. Because the tree is guaranteed complete, at least one of those two children's subtrees is guaranteed perfect and gets resolved in O(1) — only the side that still isn't perfect needs further recursion. That means at each level of recursion, only one of the two branches actually keeps recursing, giving O(log n) recursive levels instead of O(n) total node visits.

Computing a spine height is O(log n) (just walking down one path), and it's done O(log n) times (once per recursive level that doesn't short-circuit), giving O(log^2 n) overall — a real improvement over O(n) for large trees.

**Time complexity:** O(log^2 n) — O(log n) levels of recursion, each doing O(log n) work to compute the two spine heights.

**Space complexity:** O(log n) for the recursion stack.
