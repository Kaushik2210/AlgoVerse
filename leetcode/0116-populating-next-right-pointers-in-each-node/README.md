# 116. Populating Next Right Pointers in Each Node

You're given a **perfect** binary tree (every level is completely filled, and every parent has exactly two children) where each node also has a `next` pointer. Populate each `next` pointer to point to its next right node on the same level. If there is no next right node, that node's `next` should stay `null`. Initially, every `next` pointer is set to `null`.

You should solve it using only O(1) extra space, not counting the recursion stack.

**Example 1:**
```
Input: root = [1,2,3,4,5,6,7]
Output: [1,#,2,3,#,4,5,6,7,#]
Explanation: '#' marks the end of each level.
```

**Example 2:**
```
Input: root = []
Output: []
```

**Constraints:**
- The number of nodes in the tree is in the range [0, 2^12 - 1]
- -1000 <= Node.val <= 1000

## Approach

The obvious way is a plain BFS with a queue: process level by level, and while dequeuing each level's nodes, link consecutive ones together. That's correct and O(n) time, but it uses O(n) extra space for the queue — the problem explicitly wants O(1) extra space instead.

Since the tree is perfect, there's a trick: once you've fully linked level `i` with `next` pointers, you can use those very pointers to walk across level `i` *without a queue*, and use that walk to link up level `i + 1` as you go. Concretely: keep a `leftmost` pointer marking the start of the current level. For each node on that level, connect its `left` child to its `right` child, and connect its `right` child to `leftmost.next`'s `left` child (i.e. the first child of the next node over on the same level) — that second link is what actually stitches two different parents' children together. Then walk `leftmost` forward to `leftmost.next` and repeat until you fall off the end of the level, at which point `leftmost` drops down to `leftmost.left` to start on the next level down.

**Time complexity:** O(n) — every node is visited a constant number of times.

**Space complexity:** O(1) — no queue, just a couple of pointers (the recursion stack of a recursive version would be O(log n), but this iterative version needs no extra structure at all).
