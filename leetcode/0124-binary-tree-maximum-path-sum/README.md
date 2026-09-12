# 124. Binary Tree Maximum Path Sum

A **path** in a binary tree is any sequence of nodes connected by parent-child edges, where each node appears at most once — the path does not need to pass through the root, and doesn't need to go in any particular direction (it can go up through a node and back down into a different subtree, forming a "V" shape at that node). The path sum is the sum of the node values along the path. Given the `root` of a binary tree, return the maximum path sum of any non-empty path.

**Example 1:**
```
Input: root = [1,2,3]
Output: 6
Explanation: The path 2 -> 1 -> 3 has sum 6.
```

**Example 2:**
```
Input: root = [-10,9,20,null,null,15,7]
Output: 42
Explanation: The path 15 -> 20 -> 7 has sum 42 (it doesn't touch the root at all).
```

**Constraints:**
- The number of nodes is in the range [1, 3 * 10^4]
- -1000 <= Node.val <= 1000

## Approach

The tricky part is distinguishing two related but different quantities at every node:

1. **The best path *through* this node, usable by the node's parent** — if the parent wants to extend a path down into this subtree, it can only continue along *one* branch (left or right), because a path can't branch twice. So this value is `node.val + max(0, best_left, best_right)` — take the node itself plus whichever single child branch (if positive) helps more; ignore a branch if it would only hurt (contributes 0, i.e. don't take it).
2. **The best path sum *rooted at* this node used as a bend point** — a path can use *both* children simultaneously if it terminates at this node (goes up from the left subtree, through this node, back down into the right subtree). This is `node.val + max(0, best_left) + max(0, best_right)`. This can never be returned upward (the parent can't use both branches), but it's a valid candidate for the overall answer.

So the recursion computes quantity (1) to return to the caller (for building the "carry up" chain), while separately updating a global running maximum with quantity (2) at every node visited. Negative subtree contributions are clipped to 0 via `max(0, ...)` since a path is always free to stop early rather than drag down its sum.

Post-order DFS: recurse into left and right children first to get their "best extendable path" values, then compute both quantities for the current node, update the global max with (2), and return (1) to the parent.

Since node values can be as low as -1000, the initial global max must start at negative infinity (or the first node's value), not 0 — a tree of all-negative values still has an answer (the single largest node).

**Time complexity:** O(n) — each node visited once in the post-order traversal.

**Space complexity:** O(h) for the recursion stack, where h is the tree height (O(n) worst case for a skewed tree, O(log n) for a balanced one).
