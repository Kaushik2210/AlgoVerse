# 449. Serialize and Deserialize BST

Design an algorithm to serialize and deserialize a binary search tree. `serialize(root)` turns the tree into a string, and `deserialize(data)` turns that string back into a tree with the identical structure. The two don't have to match any particular encoding, as long as a tree serialized and then deserialized reconstructs an equivalent BST.

**Example 1:**
```
Input: root = [2,1,3]
Output: [2,1,3]
Explanation: serialize(root) followed by deserialize(...) reconstructs a BST with the same structure.
```

**Example 2:**
```
Input: root = []
Output: []
```

**Constraints:**
- The number of nodes is in the range [0, 10^4]
- 0 <= Node.val <= 10^4
- All node values are unique
- The input tree is guaranteed to be a valid BST

## Approach

The general binary tree version of this problem (LeetCode 297) needs explicit null markers in the serialized string, because a plain preorder sequence of values alone is ambiguous — there's no way to tell where one subtree ends and another begins without some kind of structural marker.

A BST removes that ambiguity for free. Serialize the tree as a plain preorder traversal — node, then left subtree, then right subtree — with just the values, no null markers needed at all (a comma-separated string of values works fine). Reconstruction works because BST ordering pins down exactly which values in the sequence belong in the left subtree and which belong in the right: after the first value (the root), every subsequent value in the preorder sequence that's *less than* the root belongs to the left subtree (and they appear before any right-subtree values, since preorder always finishes an entire left subtree before touching the right one), and everything *greater* belongs to the right subtree.

Concretely, `deserialize` can recursively rebuild the tree from an index into the value list plus a `(lower, upper)` bound: take the next value as the current node (advance the index), then recursively build its left child while values stay less than the current node's value and within bounds, then build its right child the same way with an updated lower bound. Or, equivalently, do it the same way the BST insertion problem (700/701) works: walk the preorder values in order and insert each one into the BST being rebuilt using standard BST insertion — since inserting in preorder order reproduces the exact original shape.

**Time complexity:** O(n) for serialize (single traversal); O(n) for deserialize using the bounded-recursion approach (each value processed once) — O(n^2) worst case for the naive repeated-insertion approach on a skewed tree, though O(n log n) average case.

**Space complexity:** O(n) for the serialized string/value list, plus O(h) recursion stack for either direction.
