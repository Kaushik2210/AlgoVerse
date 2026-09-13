# 998. Maximum Binary Tree II

`root` is the maximum binary tree (as defined in problem 654) built from some array. You're told a new value `val` was appended to the **end** of that original array, and asked to return the root of the maximum binary tree that would be built from the new, longer array — without rebuilding from scratch.

**Example 1:**
```
Input: root = [4,1,3,null,null,2], val = 5
Output: [5,4,null,1,3,null,null,2]
Explanation: 5 is bigger than everything already in the tree, and since it's appended at the end of the array, it becomes the new overall root with the entire old tree as its left subtree.
```

**Example 2:**
```
Input: root = [5,2,4,null,1], val = 3
Output: [5,2,4,null,1,null,3]
Explanation: 3 is smaller than the root (5), so it belongs somewhere in the right subtree. It's also smaller than 4 (the current right child), so it becomes 4's new right child.
```

**Constraints:**
- The number of nodes in the tree is in the range `[1, 100]`
- `1 <= Node.val <= 100`
- All values in the tree are distinct
- `val > 0`
- `val` is distinct from every value already in the tree

## Approach

Because `val` is appended to the *end* of the array, it only ever needs to be compared against values along the tree's **right spine** — root, then root's right child, then that node's right child, and so on — since the right spine is exactly the sequence of "current maximums of everything seen so far, scanning left to right" for a max-tree built incrementally.

Walk down: if `val` is bigger than the current node's value, `val` becomes the new maximum of everything up to this point in the (conceptual) array, so it takes over as this node's replacement — a new node with `val` becomes the parent, and the entire current subtree becomes its left child (since everything in that subtree came from array positions before `val`, matching how problem 654 builds left subtrees from the elements before the maximum).

If `val` is smaller, it can't unseat this node as a local maximum, so it must belong further right, recursively inserted into the right subtree the same way. Since it's simply appended to the end, it never needs to touch anything left of the current node.

Base case: recursing into a `None` right child means there's nowhere left to compare against, so `val` becomes a new leaf there.

**Time complexity:** O(h) where h is the height of the tree — the recursion only ever walks down the right spine, never branching left.

**Space complexity:** O(h) for the recursion stack.
