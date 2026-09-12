# 24. Swap Nodes in Pairs

Given a linked list, swap every two adjacent nodes and return the head of the modified list. You have to actually rewire the nodes — you can't just swap the values sitting inside them.

**Example 1:**
```
Input: head = [1,2,3,4]
Output: [2,1,4,3]
```

**Example 2:**
```
Input: head = []
Output: []
```

**Example 3:**
```
Input: head = [1]
Output: [1]
```

**Constraints:**
- The number of nodes is in the range [0, 100]
- 0 <= Node.val <= 100

## Approach

Use a dummy node before the head so the first pair doesn't need special-casing — `prev` always points to the node just before the pair currently being swapped.

For each pair, grab `first = prev.next` and `second = first.next`. If `second` doesn't exist, there's nothing left to swap and you're done. Otherwise rewire in this order: `first.next = second.next` (first now points past the pair), `second.next = first` (second now points to first, completing the swap), then `prev.next = second` (the previous part of the list now points into the swapped pair). Advance `prev` to `first` (which is now the second node of the swapped pair, i.e. the one right before the next pair) and repeat.

The order of those three pointer updates matters — reassigning `first.next` before reading `second.next` would lose the rest of the list, so `second.next` must be captured (or used) before it's overwritten.

**Time complexity:** O(n) — every node is visited once.

**Space complexity:** O(1) — only a few pointers, no new nodes are allocated (the existing nodes are just rewired).
