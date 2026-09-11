# 129. Sum Root to Leaf Numbers

Each root-to-leaf path in a binary tree represents a number, formed by concatenating the digits along the path (the root is the most significant digit). Given the root of a tree where every node has a digit 0-9, return the total sum of all root-to-leaf numbers.

**Example 1:**
```
Input: root = [1,2,3]
Output: 25
Explanation: The root-to-leaf path 1->2 represents 12, and 1->3 represents 13. Total = 12 + 13 = 25.
```

**Example 2:**
```
Input: root = [4,9,0,5,1]
Output: 1026
Explanation: Paths give 495, 491, 40. Total = 495 + 491 + 40 = 1026.
```

**Constraints:**
- The number of nodes in the tree is in the range [1, 1000]
- 0 <= Node.val <= 9
- The depth of the tree will not exceed 10

## Approach

The natural way to build a number digit by digit as you walk down is to carry the "number so far" through the recursion, and every time you step to a child, update it as `number_so_far * 10 + child.val` — same as how you'd build up an integer from digits one at a time. When you reach a leaf, that running number *is* the complete root-to-leaf number for this path, so add it to a running total.

DFS from the root with `number_so_far` starting at 0. At each node, compute `current = number_so_far * 10 + node.val`. If it's a leaf, add `current` to the total. Otherwise, recurse into both children, passing `current` down as their `number_so_far`.

**Time complexity:** O(n) — every node is visited exactly once.

**Space complexity:** O(h) — for the recursion stack, where h is the tree's height.
