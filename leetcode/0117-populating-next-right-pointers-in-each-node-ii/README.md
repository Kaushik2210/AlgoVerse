# 117. Populating Next Right Pointers in Each Node II

You're given a binary tree — this time not necessarily perfect or even complete — where each node also has a `next` pointer. Populate each `next` pointer to point to its next right node on the same level. If there is no next right node, that node's `next` should stay `null`. Initially, every `next` pointer is set to `null`.

You should solve it using only O(1) extra space, not counting the recursion stack.

**Example 1:**
```
Input: root = [1,2,3,4,5,null,7]
Output: [1,#,2,3,#,4,5,7,#]
Explanation: '#' marks the end of each level.
```

**Example 2:**
```
Input: root = []
Output: []
```

**Constraints:**
- The number of nodes in the tree is in the range [0, 6000]
- -100 <= Node.val <= 100

## Approach

This is the follow-up to the perfect-tree version, and the reason it's harder is that a node can now have just a left child, just a right child, or neither — so you can't assume `node.left` and `node.right` are both there to wire up.

The same overall trick still applies: once level `i` is fully linked with `next` pointers, walk across it using those pointers (no queue needed) and use that walk to link up level `i + 1`'s children as you encounter them. The twist is that level `i + 1` needs its own dummy head node while it's being built, because the first real child you find on that level might come from any node on level `i`, not necessarily the first one — a `dummy.next` pattern (like building a linked list) sidesteps needing to special-case "is this the first child I've linked on this level."

Concretely: keep a `tail` pointer that starts at a fresh dummy node for the level being built underneath the current one. Walk the current level via `next` pointers; at each node, check its left child — if it exists, attach it to `tail.next` and advance `tail`; then check the right child the same way. Once the current level's walk is exhausted, the next level starts at `dummy.next`, and a fresh dummy is created before descending into it. Stop when a level's dummy has no `next` — the tree is exhausted below.

**Time complexity:** O(n) — every node is visited a constant number of times.

**Space complexity:** O(1) — a dummy node and a couple of pointers per level, no queue (the recursion stack, if this were written recursively, would add up to O(n) in the worst skewed case, but this iterative version needs no extra structure that scales with the tree).
