# 1110. Delete Nodes And Return Forest

**Commonly asked at:** Amazon, Google

Given the root of a binary tree and a list `to_delete` of values to delete, delete every node whose value appears in `to_delete`. When a node is deleted, its children (if not also deleted) become roots of their own separate trees. Return the roots of every resulting tree, in any order.

**Example 1:**
```
Input: root = [1,2,3,4,5,6,7], to_delete = [3,5]
Output: [[1,2,null,4],[6],[7]]
Explanation: deleting 5 (a leaf) just removes it. Deleting 3 detaches its children 6 and 7, which become standalone trees since neither 6 nor 7 is itself deleted.
```

**Example 2:**
```
Input: root = [1,2,4,null,3], to_delete = [3]
Output: [[1,2,4]]
```

**Constraints:**
- The number of nodes in the tree is at most `1000`
- Each node has a distinct value between `1` and `1000`
- `to_delete.length <= 1000`
- `to_delete` contains distinct values between `1` and `1000`

## Approach

A node becomes the root of a new tree in the output whenever it survives (isn't itself deleted) but its connection to its parent is gone — either because it's the original root, or because its actual parent just got deleted. So the collection process just needs to track, for each node visited, "is my parent link about to be severed" (i.e., is this node's parent either nonexistent or deleted).

Do a DFS passing down a flag: `is_root`, meaning "this node's parent is gone, so if this node survives, it belongs in the result." At each node: check whether it's in the `to_delete` set. If it's not deleted and `is_root` is true, add it to the results. Then recurse into both children, passing `deleted` (whether *this* node was deleted) as their new `is_root` flag — because if this node gets deleted, both its children lose their parent and become new roots (if they themselves survive).

The recursion also has to actually detach deleted nodes from the tree structure, not just record them: each call reattaches `node.left`/`node.right` to whatever its recursive call returns, and returns `None` for itself if it was deleted (so its parent stops pointing at it) or the (possibly mutated) node itself otherwise.

**Time complexity:** O(n) — each node is visited once.

**Space complexity:** O(h) for the recursion stack, plus O(k) for the delete-lookup set where k is `to_delete.length`.
