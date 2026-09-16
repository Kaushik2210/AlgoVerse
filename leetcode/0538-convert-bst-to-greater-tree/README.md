# 538. Convert BST to Greater Tree

**Commonly asked at:** Amazon, Uber

Given the root of a binary search tree, transform it into a "Greater Tree" where every node's new value is the original value plus the sum of all values greater than it in the original tree.

**Example 1:**
```
Input: root = [4,1,6,0,2,5,7,null,null,null,3,null,null,null,8]
Output: [30,36,21,36,35,26,15,null,null,null,33,null,null,null,8]
```

**Example 2:**
```
Input: root = [0,null,1]
Output: [1,null,1]
```

**Constraints:**
- The number of nodes is in [0, 10^4]
- -10^4 <= Node.val <= 10^4
- All node values are unique
- root is guaranteed to be a valid BST

## Approach

"Sum of everything greater than this node" is exactly a suffix sum, if the nodes are visited from largest to smallest. A standard inorder traversal (left, node, right) visits BST nodes from smallest to largest — reversing it (right, node, left) visits them from largest to smallest instead, which is exactly the order needed.

Walk the tree with this reverse-inorder traversal while keeping a running sum that accumulates as larger nodes are visited first. At each node: recurse right first (visiting everything strictly greater), add the current node's original value to the running sum, overwrite the node's value with that updated running sum, then recurse left (visiting everything strictly smaller, which still needs the running sum as it stands now — including everything visited so far, which is everything greater than or equal to the current node).

Because the running sum already includes the current node's own value by the time it's assigned, each node ends up holding "original value + sum of everything strictly greater" as required.

**Time complexity:** O(n) — every node is visited exactly once.

**Space complexity:** O(h) for the recursion stack; the tree is modified in place with no extra data structures.
