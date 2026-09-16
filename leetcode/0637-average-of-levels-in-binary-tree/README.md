# 637. Average of Levels in Binary Tree

**Commonly asked at:** Amazon, Facebook

Given the root of a binary tree, return the average value of the nodes on each level, as an array ordered from top to bottom.

**Example 1:**
```
Input: root = [3,9,20,null,null,15,7]
Output: [3.0, 14.5, 11.0]
```

**Example 2:**
```
Input: root = [3,9,20,15,7]
Output: [3.0, 14.5, 11.0]
```

**Constraints:**
- The number of nodes is in [1, 10^4]
- -2^31 <= Node.val <= 2^31 - 1

## Approach

This is the standard level-order (BFS) traversal, just with a running sum instead of collecting the actual values. Use a queue starting with the root. On each iteration of the outer loop, the queue holds exactly the nodes of one level — capture that count with `len(queue)` before touching the queue further, since the queue will grow with the next level's nodes as this level is processed.

Pop exactly that many nodes off the front, accumulating their sum and pushing any children onto the back of the queue for the next round. After processing all nodes of the current level, divide the accumulated sum by the level's node count to get its average, and append it to the results.

**Time complexity:** O(n) — every node is visited and enqueued/dequeued exactly once.

**Space complexity:** O(w) where w is the maximum width of the tree — the queue holds at most one full level at a time, worst case O(n) for a wide tree.
