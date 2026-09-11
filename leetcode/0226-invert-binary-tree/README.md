# 226. Invert Binary Tree

Given the root of a binary tree, invert it — meaning every node's left and right children get swapped, all the way down — and return the new root.

**Example 1:**
```
Input: root = [4,2,7,1,3,6,9]
Output: [4,7,2,9,6,3,1]
```

**Example 2:**
```
Input: root = [2,1,3]
Output: [2,3,1]
```

**Example 3:**
```
Input: root = []
Output: []
```

**Constraints:**
- The number of nodes is in the range [0, 100]

## Approach

There's no real brute-force-vs-clever gap here — the whole problem is just "swap children recursively," and the natural recursive definition is also the efficient one.

Think about what "inverted" means for a single node: its left and right subtrees are swapped, *and* both of those subtrees are themselves fully inverted. That's a recursive definition begging to be implemented directly. For a given node: if it's null, there's nothing to do — return null. Otherwise, recursively invert the left subtree and recursively invert the right subtree, then swap the two results into the node's left and right fields, and return the node.

The order matters a little in how you write it (make sure you're not swapping before you've recursed into the *original* left/right, or you'll end up recursing into the same subtree twice) — the cleanest way is to invert both children first into local variables, then assign the swap.

**Time complexity:** O(n) — every node is visited and swapped exactly once.

**Space complexity:** O(h) — recursion stack proportional to tree height h, same reasoning as any other tree recursion.
