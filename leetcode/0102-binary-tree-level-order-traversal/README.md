# 102. Binary Tree Level Order Traversal

Given the root of a binary tree, return the values of its nodes level by level, from left to right (each level as its own sub-list).

**Example 1:**
```
Input: root = [3,9,20,null,null,15,7]
Output: [[3],[9,20],[15,7]]
```

**Example 2:**
```
Input: root = [1]
Output: [[1]]
```

**Constraints:**
- The number of nodes is in [0, 2000]
- -1000 <= Node.val <= 1000

## Approach

A regular recursive traversal (preorder/inorder/postorder) naturally walks depth-first, which doesn't line up with "group nodes by level" — you'd have to bolt on extra bookkeeping to track depth and bucket nodes after the fact. Breadth-first search is the natural fit instead, since a BFS queue processes nodes in exactly the depth order this problem wants.

Use a queue, seeded with just the root. The trick to separating levels cleanly is snapshotting the queue's size at the start of each iteration of the outer loop, before adding any children — that count tells you exactly how many nodes belong to the current level, since every node currently in the queue is from the same depth (any node just enqueued this round is a level ahead). Pop exactly that many nodes, record their values into a `level` list, and enqueue each one's children as you go (append left, then right, to end up left-to-right within the level).

Once you've popped `level_size` nodes, that whole level is complete — append `level` to the result, and by then the queue only contains the next level's nodes, and the process repeats until the queue empties.

**Time complexity:** O(n) — every node is enqueued and dequeued exactly once.

**Space complexity:** O(n) — the queue holds up to one full level at a time, which in the worst case (widest level of a balanced tree) is O(n); the output also stores every node's value once.
