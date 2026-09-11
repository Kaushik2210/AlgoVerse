# 101. Symmetric Tree

Given the root of a binary tree, check whether it is a mirror of itself around its center (i.e., whether the left and right subtrees are mirror images of each other).

**Example 1:**
```
Input: root = [1,2,2,3,4,4,3]
Output: true
```

**Example 2:**
```
Input: root = [1,2,2,null,3,null,3]
Output: false
```

**Constraints:**
- The number of nodes in the tree is in the range [1, 1000]
- -100 <= Node.val <= 100

## Approach

The tempting-but-wrong shortcut is to just compare the left subtree to the right subtree for plain equality — that checks if they're identical copies, not mirror images. A tree like `[1,2,2,null,3,null,3]` has two subtrees that look "the same" in structure but the 3s hang off the wrong sides to actually mirror each other, so a naive equality check gets this one wrong.

The right way to frame it: write a helper that checks whether two trees, `left` and `right`, are *mirrors* of each other, and call it on `root.left` and `root.right`. Two trees are mirrors when:
- both are `None` (symmetric, trivially), or
- both are non-`None`, their values match, `left.left` mirrors `right.right`, AND `left.right` mirrors `right.left` — note the outer-to-outer and inner-to-inner pairing, that's what makes it a mirror check instead of an equality check.

If exactly one of the two is `None` while the other isn't, or the values differ, it's not symmetric.

An iterative version does the same comparison with a queue (or stack), pushing pairs of nodes to compare instead of recursing.

**Time complexity:** O(n) — every node is visited once across the two mirrored traversals.

**Space complexity:** O(h) — for the recursion stack (or explicit queue in the iterative version), where h is the tree's height.
