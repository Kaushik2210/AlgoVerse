# 105. Construct Binary Tree from Preorder and Inorder Traversal

You're given two integer arrays `preorder` and `inorder`, representing the preorder and inorder traversal of the same binary tree (values are unique). Rebuild the tree and return its root.

**Example 1:**
```
Input: preorder = [3,9,20,15,7], inorder = [9,3,15,20,7]
Output: [3,9,20,null,null,15,7]
```

**Example 2:**
```
Input: preorder = [-1], inorder = [-1]
Output: [-1]
```

**Constraints:**
- 1 <= preorder.length <= 3000
- inorder.length == preorder.length
- All values in each traversal are unique

## Approach

The key fact that makes this solvable is what each traversal order tells you. Preorder visits root, then left subtree, then right subtree — so the very first element of any preorder slice is always the root of that subtree. Inorder visits left subtree, then root, then right subtree — so once you know which value is the root, its position in the inorder slice splits everything to its left (the whole left subtree) from everything to its right (the whole right subtree).

So: the first value in `preorder` is the overall root. Look that value up in `inorder` to find its index — everything before that index in `inorder` belongs to the left subtree, everything after belongs to the right subtree, and their sizes tell you exactly how many elements of `preorder` (after the root) belong to each side too. Recurse: build the left subtree from the corresponding preorder/inorder slices, then the right subtree from theirs, and attach them to the root.

To avoid the overhead of literally slicing arrays at every call, use index ranges into the original arrays instead, plus a hash map from value to its index in `inorder` for O(1) lookups (instead of scanning to find the root each time). Also keep a single pointer that always points to the next unused element of `preorder` — since preorder is consumed strictly left to right no matter how the recursion branches, one shared pointer advances correctly across the whole build.

**Time complexity:** O(n) — each node is created once, and the hash map turns each root lookup in `inorder` into O(1).

**Space complexity:** O(n) — O(n) for the hash map, plus O(h) recursion depth (worst case O(n) for a skewed tree).
