# 142. Linked List Cycle II

You're given the head of a linked list. If the list has a cycle, return the node where the cycle begins. If there's no cycle, return `null`. (You must not modify the list — the "cycle" is just conceptual, defined by a node's `next` pointer eventually looping back to a node already visited.)

**Example 1:**
```
Input: head = [3,2,0,-4], pos = 1
Output: node with value 2
Explanation: the tail's next points into the node at index 1, forming a cycle whose entry point is that node
```

**Example 2:**
```
Input: head = [1,2], pos = -1
Output: null
Explanation: no cycle
```

**Constraints:**
- The number of nodes is in the range [0, 10^4]
- -10^5 <= Node.val <= 10^5
- pos is -1 or a valid index representing the tail's connection

## Approach

The brute-force way is a hash set of visited nodes: walk the list, and the moment you see a node you've already visited, that's the cycle's start. That works in O(n) time and space, but there's a classic O(1)-space trick that gets the same answer: Floyd's cycle detection ("tortoise and hare"), extended with a second phase to actually locate the entry point, not just detect that a cycle exists.

Phase 1 — detect: move a slow pointer one step at a time and a fast pointer two steps at a time. If there's no cycle, fast hits the end and you return null. If there is a cycle, they're guaranteed to meet somewhere inside it (fast is gaining one step on slow every iteration, so it can't skip over slow while they're both looping the same cycle).

Phase 2 — locate the entry: this relies on the math of where they meet. Let the distance from head to the cycle's start be `a`, and the distance from the cycle's start to the meeting point be `b`. By the time they meet, slow has traveled `a + b`, and fast has traveled `a + b + k*C` for some number of extra full loops `k` around a cycle of length `C`, and since fast moves twice as fast, `2(a+b) = a+b+kC`, which simplifies to `a = kC - b`. That means: if you place one pointer back at `head` and leave the other at the meeting point, and advance both one step at a time, they'll meet exactly at the cycle's start — walking `a` steps from head lands on the entry, and walking `kC - b` steps from the meeting point (which is the same as walking forward until wrapping around) lands there too.

**Time complexity:** O(n) — each phase is a bounded number of linear passes.

**Space complexity:** O(1) — only a couple of pointers, no extra data structure.
