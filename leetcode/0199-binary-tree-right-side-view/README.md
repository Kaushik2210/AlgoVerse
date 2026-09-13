# 199. Binary Tree Right Side View

You're given the root of a binary tree. Imagine standing to the right of it — return the values of the nodes you can see, ordered from top to bottom.

**Example 1:**
```
Input: root = [1,2,3,null,5,null,4]
Output: [1,3,4]
```

**Example 2:**
```
Input: root = [1,2,3,4,null,null,null,5]
Output: [1,3,4,5]
```

**Example 3:**
```
Input: root = []
Output: []
```

**Constraints:**
- The number of nodes is in the range [0, 100]
- -100 <= Node.val <= 100

## Approach

"What you'd see standing to the right" is just the rightmost node at every depth level — so the problem reduces to a level-order traversal where only the last node visited on each level gets kept.

Do a standard BFS, processing the tree one full level at a time using the queue-size trick (record `len(queue)` before the loop, then process exactly that many nodes so children pushed during this level don't get mixed into it). While iterating through a level, whichever node is last in that iteration's inner loop is the rightmost node at that depth — append its value to the answer.

Equivalently, this can be done with a right-first DFS: recurse into the right child before the left child, tracking depth, and whenever a depth is visited for the first time, that value is the one to record (since right-first DFS reaches the rightmost node at each depth before any node further left at the same depth). Both approaches are O(n); BFS is usually the more intuitive one to reason about here.

**Time complexity:** O(n) — every node is visited exactly once.

**Space complexity:** O(n) for the BFS queue in the worst case (a wide tree, e.g. a complete tree's last level holds about n/2 nodes).
