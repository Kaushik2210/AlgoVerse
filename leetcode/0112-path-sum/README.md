# 112. Path Sum

Given the root of a binary tree and an integer `targetSum`, return `true` if the tree has a root-to-leaf path such that the values along that path add up to `targetSum`.

A leaf is a node with no children.

**Example 1:**
```
Input: root = [5,4,8,11,null,13,4,7,2,null,null,null,1], targetSum = 22
Output: true
Explanation: 5 + 4 + 11 + 2 = 22
```

**Example 2:**
```
Input: root = [1,2,3], targetSum = 5
Output: false
```

**Example 3:**
```
Input: root = [], targetSum = 0
Output: false
```

**Constraints:**
- The number of nodes in the tree is in the range [0, 5000]
- -1000 <= Node.val <= 1000
- -1000 <= targetSum <= 1000

## Approach

This is a straightforward DFS, but the detail that trips people up is that it has to be a *root-to-leaf* path — matching the target sum at some internal node with children doesn't count, only at an actual leaf (both `left` and `right` are `null`).

Carry the remaining amount needed down the recursion: start with `targetSum`, and at each node subtract that node's value from it before passing it to the children. When you reach a leaf, check whether the remaining amount exactly equals that leaf's value (equivalently, whether subtracting the leaf's value too brings the remainder to zero) — if so, a valid path was found. If a node is `null`, there's no path through it, so return false immediately without checking anything. For an internal node (has at least one child), just recurse into whichever children exist and return true if either side finds a valid path.

An empty tree is handled as a base case returning false directly, since the problem defines an empty tree as having no root-to-leaf paths at all — even if targetSum happens to be 0.

**Time complexity:** O(n) — every node is visited at most once in the worst case (no matching path exists anywhere).

**Space complexity:** O(h) for the recursion stack, where h is the tree's height.
