# 255. Verify Preorder Sequence in Binary Search Tree

**Commonly asked at:** Microsoft, Salesforce, TikTok

*Note: this is a LeetCode Premium (subscriber-only) problem, not freely accessible on LeetCode. It's included here anyway since it's a neat monotonic-stack application distinct from the more common preorder/inorder reconstruction problems.*

Given an array `preorder` of unique integers, return whether it could be the preorder traversal of a valid binary search tree, without actually building the tree.

**Example 1:**
```
Input: preorder = [5,2,1,3,6]
Output: true
Explanation: this is the preorder traversal of a valid BST: root 5, left subtree {2,1,3}, right subtree {6}.
```

**Example 2:**
```
Input: preorder = [5,2,6,1,3]
Output: false
Explanation: after 5 (root) and 2 (left subtree, values < 5), 6 shows up — but 6 > 5 means we've supposedly moved to the right subtree, yet 1 and 3 come right after it, and both are less than 5, which can't belong to the right subtree.
```

**Constraints:**
- `1 <= preorder.length <= 10^4`
- `1 <= preorder[i] <= 10^4`
- All values in `preorder` are unique

## Approach

In a BST's preorder traversal, a node is always followed immediately by its entire left subtree (all smaller values), and only once that's exhausted does a value from the right subtree (larger than the node) appear. So scanning left to right, a decreasing run of values represents descending down left children; the first value that breaks the decreasing run and is *larger* than something already seen marks a jump into some ancestor's right subtree.

Track this with a stack representing the current chain of "ancestors still open for a right-subtree jump," plus a `lower_bound` representing the smallest value any future number is allowed to be. For each incoming number: if it's less than `lower_bound`, the sequence is invalid immediately — it would mean going left after already having committed to a right subtree, which the BST property forbids. Otherwise, pop everything off the stack that's smaller than the current number — each pop represents "we're now done with that node's whole left subtree and this number belongs in its right subtree," and the last node popped becomes the new `lower_bound`, since every subsequent number must be at least that node's value (it's now that node's floor). Finally, push the current number, since it may itself become an ancestor for future numbers.

If the loop finishes without ever violating the bound, the sequence is a valid BST preorder.

**Time complexity:** O(n) — each element is pushed onto the stack once and popped at most once.

**Space complexity:** O(n) for the stack in the worst case (a sequence with no right turns, i.e. a strictly decreasing array).
