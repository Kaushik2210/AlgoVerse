# 230. Kth Smallest Element in a BST

Given the root of a binary search tree and an integer `k`, return the `k`th smallest value (1-indexed) among all the values of the nodes in the tree.

**Example 1:**
```
Input: root = [3,1,4,null,2], k = 1
Output: 1
```

**Example 2:**
```
Input: root = [5,3,6,2,4,null,null,1], k = 3
Output: 3
```

**Constraints:**
- The number of nodes in the tree is n
- 1 <= k <= n <= 10^4
- 0 <= Node.val <= 10^4

## Approach

A brute-force option is to walk the whole tree, dump every value into a list, sort it, and index into position `k - 1`. That works but does more sorting than the problem needs.

The key insight is that a BST's **in-order traversal** (left, node, right) visits nodes in ascending sorted order for free — no sorting required. So instead of collecting everything and sorting, just do an in-order traversal and count nodes as you visit them; the moment the count reaches `k`, that node's value is the answer, and you can stop right there without visiting the rest of the tree.

- Traverse in-order: recurse left, visit the current node, recurse right.
- Keep a running counter of how many nodes have been visited.
- When the counter hits `k`, record that node's value as the answer (and short-circuit further traversal once found).

**Time complexity:** O(H + k) where H is the tree's height — in the worst case (a skewed tree, or k close to n) this is O(n), but the traversal stops as soon as the kth node is found rather than always visiting every node.

**Space complexity:** O(H) for the recursion stack, where H is the height of the tree (O(log n) for a balanced tree, O(n) for a skewed one).
