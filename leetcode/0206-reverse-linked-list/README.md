# 206. Reverse Linked List

Given the head of a singly linked list, reverse the list and return the new head.

**Example 1:**
```
Input: head = [1,2,3,4,5]
Output: [5,4,3,2,1]
```

**Example 2:**
```
Input: head = []
Output: []
```

**Constraints:**
- The number of nodes is in the range [0, 5000]

## Approach

You could copy all the values into an array, reverse the array, and overwrite the node values in order — that works, but it's cheating a bit (you're not actually reversing the links) and it costs extra O(n) space for the array when the list itself already has everything you need.

The real way to do it in place: walk through the list once, and for each node, flip its `next` pointer to point *backward* instead of forward. You need three references as you go: `prev` (the node that should come after the current one in the reversed list — starts as `None`/`null`), `curr` (the node you're currently rewiring), and a temporary to hold `curr.next` before you overwrite it (otherwise you'd lose the rest of the list). At each step: save `curr.next`, point `curr.next` back to `prev`, then shift both `prev` and `curr` one step forward (using the saved next). When `curr` becomes null, `prev` is sitting on the new head — the old last node, which is now first.

**Time complexity:** O(n) — one pass through the list, each node's pointer flipped exactly once.

**Space complexity:** O(1) — just three pointer variables, no matter how long the list is.
