# 270. Closest Binary Search Tree Value

*Note: this is a LeetCode Premium (subscriber-only) problem, not freely accessible on LeetCode. It's included here anyway because BST-navigation questions like this come up often in interviews.*

Given the root of a binary search tree and a target value `target`, return the value in the BST that's closest to `target`. It's guaranteed there's a unique answer.

**Example 1:**
```
Input: root = [4,2,5,1,3], target = 3.714286
Output: 4
```

**Example 2:**
```
Input: root = [1], target = 4.428571
Output: 1
```

**Constraints:**
- The number of nodes is in the range [1, 10^4]
- 0 <= Node.val <= 10^9
- -10^9 <= target <= 10^9

## Approach

Checking every node's distance to `target` would work in O(n), but the BST ordering property means there's no need to look at most of the tree — at each node, the BST structure directly tells you which subtree could possibly contain something closer.

Walk down from the root, keeping track of the closest value seen so far (starting with the root itself). At each node, compare its value to the current best — if it's closer to `target`, it becomes the new best. Then decide which way to go: if `target` is less than the current node's value, the only nodes that could be smaller than the current node — and therefore possibly closer if `target` is small — are in the left subtree, so go left. Otherwise go right. This mirrors a standard BST search, just tracking the best answer seen along the way instead of stopping at an exact match (which likely doesn't exist, since `target` can be any real number).

**Time complexity:** O(h) where h is the height of the tree — O(log n) for a balanced BST, O(n) worst case for a completely skewed one.

**Space complexity:** O(1) with an iterative walk (O(h) if done recursively, for the call stack).
