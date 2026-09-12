# 103. Binary Tree Zigzag Level Order Traversal

Given the root of a binary tree, return its nodes' values arranged level by level, but alternate the direction each level reads in: the first level left-to-right, the second right-to-left, the third left-to-right again, and so on.

**Example 1:**
```
Input: root = [3,9,20,null,null,15,7]
Output: [[3],[20,9],[15,7]]
```

**Example 2:**
```
Input: root = [1]
Output: [[1]]
```

**Example 3:**
```
Input: root = []
Output: []
```

**Constraints:**
- The number of nodes in the tree is in the range [0, 2000]
- -100 <= Node.val <= 100

## Approach

This is regular BFS level order traversal with one small twist. Do the standard thing: use a queue, and process the tree one full level at a time by tracking how many nodes are currently in the queue before you start dequeuing (`level_size`), so you know exactly where one level ends and the next begins.

The only change from plain level order is what you do with each level's collected values before appending it to the result — every other level needs to be reversed. Keep a boolean flag (or just check the current level's index for parity) that flips after each level, and reverse the level's list right before you save it whenever that flag says so. Everything else about the traversal — enqueuing children left-then-right — stays exactly the same; only the output order for alternating levels changes, not the actual traversal order.

**Time complexity:** O(n) — every node is visited once and each level's values are reversed at most once, which is still linear in total across all levels.

**Space complexity:** O(n) — the queue holds up to one full level's worth of nodes, and the result stores every node's value.
