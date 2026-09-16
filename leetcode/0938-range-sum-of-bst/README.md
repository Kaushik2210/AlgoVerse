# 938. Range Sum of BST

**Commonly asked at:** Facebook

Given the root of a binary search tree and two integers `low` and `high`, return the sum of every node's value that falls within the inclusive range `[low, high]`.

**Example 1:**
```
Input: root = [10,5,15,3,7,null,18], low = 7, high = 15
Output: 32
Explanation: 7 + 10 + 15 = 32
```

**Example 2:**
```
Input: root = [10,5,15,3,7,13,18,1,null,6], low = 6, high = 10
Output: 23
```

**Constraints:**
- The number of nodes is in [1, 2 * 10^4]
- 1 <= Node.val <= 10^5
- All node values are unique
- low <= high

## Approach

Summing every node in the tree and filtering by range works, but it visits nodes that a BST's ordering already tells you can't possibly be in range — that's wasted work worth pruning.

At each node, use the BST property to decide which subtrees are even worth visiting. If the current node's value is less than `low`, then by BST ordering its entire left subtree is also less than `low` — skip it entirely and only recurse right. Symmetrically, if the current node's value is greater than `high`, its entire right subtree is too large — skip it and only recurse left. Otherwise the current node is in range (add its value) and both subtrees might still contain qualifying nodes, so recurse into both.

**Time complexity:** O(n) worst case (e.g. every node lies in range), but typically less since out-of-range subtrees get pruned entirely without being visited.

**Space complexity:** O(h) for the recursion stack.
