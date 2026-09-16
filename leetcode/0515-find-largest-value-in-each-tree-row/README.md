# 515. Find Largest Value in Each Tree Row

**Commonly asked at:** Amazon, Microsoft

Given the root of a binary tree, return an array containing the largest value in each row (each level, top to bottom).

**Example 1:**
```
Input: root = [1,3,2,5,3,null,9]
Output: [1,3,9]
Explanation: row 0 is just {1}, row 1 is {3,2} (max 3), row 2 is {5,3,9} (max 9).
```

**Example 2:**
```
Input: root = [1,2,3]
Output: [1,3]
```

**Constraints:**
- The number of nodes in the tree is in the range `[0, 10^4]`
- `-2^31 <= Node.val <= 2^31 - 1`

## Approach

This is a textbook level-order BFS, tracking the max within each level instead of collecting the full level.

Use a queue seeded with the root. On each iteration of the outer loop, `len(queue)` at that moment is exactly the number of nodes in the current level (a standard trick for level-by-level BFS) — pop exactly that many nodes, track the running maximum among their values, and enqueue their children for the next round. After processing all nodes at the current level, append that level's max to the results.

An empty tree returns an empty list immediately, since there are no rows at all.

**Time complexity:** O(n) — every node is visited and enqueued exactly once.

**Space complexity:** O(w) for the queue, where w is the maximum width of the tree (the largest number of nodes at any single level), plus O(d) for the output where d is the tree's depth.
