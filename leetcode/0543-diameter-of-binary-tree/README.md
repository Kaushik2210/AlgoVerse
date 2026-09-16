# 543. Diameter of Binary Tree

**Commonly asked at:** Facebook, Amazon, LinkedIn

You're given the root of a binary tree. Return the diameter of the tree — the length (in number of edges) of the longest path between any two nodes. This path does not have to pass through the root.

**Example 1:**
```
Input: root = [1,2,3,4,5]
Output: 3
Explanation: The longest path is [4,2,1,3] or [5,2,1,3], with length 3 (3 edges).
```

**Example 2:**
```
Input: root = [1,2]
Output: 1
```

**Constraints:**
- The number of nodes is in the range [1, 10^4]
- -100 <= Node.val <= 100

## Approach

The tempting but wrong first idea is "the diameter is the depth of the left subtree plus the depth of the right subtree, computed at the root." That's true only if the longest path happens to pass through the root — but it might not. The real longest path could be entirely tucked away inside one subtree, between two nodes that never touch the root at all.

So the diameter has to be checked at *every* node, not just the root, since any node could be the "peak" where the longest path bends from going down-left to going down-right. This is the exact same shape as Binary Tree Maximum Path Sum: write a helper that returns the depth of a subtree upward to its parent, but have it quietly update a global best value along the way using `left_depth + right_depth` — the length of the longest path that peaks at the current node.

Concretely, `depth(node)` returns 0 for a null node. Otherwise it recursively computes `left = depth(node.left)` and `right = depth(node.right)`, updates `best = max(best, left + right)`, and returns `1 + max(left, right)` as the depth to hand back up to the caller. The `left + right` sum is the number of edges in the path that goes from the deepest node in the left subtree, up through the current node, down to the deepest node in the right subtree — exactly a candidate diameter. Since every node gets its turn as the "peak," the true maximum is captured somewhere during the walk.

**Time complexity:** O(n) — each node is visited exactly once, doing O(1) work per visit.

**Space complexity:** O(h) for the recursion stack, where h is the tree height (O(n) worst case, O(log n) if balanced).
