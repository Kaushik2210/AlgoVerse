# 114. Flatten Binary Tree to Linked List

You're given the root of a binary tree. Flatten it into a "linked list" in place:

- The linked list should use the same `TreeNode` objects, just via the `right` pointer.
- Every `left` pointer should end up `null`.
- The order of nodes should match a **preorder** traversal (root, then left subtree, then right subtree).

**Example**

```
Input:
        1
       / \
      2   5
     / \   \
    3   4   6

Output (as a right-chain):
1 -> 2 -> 3 -> 4 -> 5 -> 6
```

## Brute force

You could do a preorder traversal, collect the values into a list, then rebuild a new
right-only chain from that list. That works, but it throws away the original nodes and
builds fresh ones — O(n) extra space for the list, plus you're not really using the
structure that's already there.

## The actual approach

The trick is to do this **in place**, one subtree at a time, without recursion or extra
storage. Walk down the tree with a pointer `node`, starting at `root`. At each step:

1. If `node.left` exists, that whole left subtree needs to get spliced in between
   `node` and `node.right`.
2. Find the **rightmost** node of `node.left` — that's where, in preorder, `node`'s
   original right subtree needs to reattach (since preorder always finishes an entire
   left subtree before touching the right one).
3. Graft `node.right` onto that rightmost node's `right` pointer.
4. Move `node.left` over to become the new `node.right`, and clear `node.left`.
5. Advance `node` to `node.right` (which is now what used to be the left subtree) and
   repeat.

Once `node.left` is `null`, just move on to `node.right` — there's nothing to splice.

The neat part: because you always fully flatten what used to be the left subtree before
you ever step into it, this naturally produces preorder order without needing to track
anything explicitly.

## Complexity

- **Time:** O(n) — each node's `right` pointer gets grafted onto exactly once, and
  finding the rightmost node of a subtree only ever walks nodes that are about to be
  passed anyway (amortizes to linear over the whole traversal, same idea as the
  Morris traversal trick).
- **Space:** O(1) extra — no recursion stack, no auxiliary list, just pointer
  rewiring.
