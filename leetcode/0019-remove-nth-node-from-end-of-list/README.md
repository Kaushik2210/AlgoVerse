# 19. Remove Nth Node From End of List

Given the head of a linked list, remove the nth node from the end of the list and return the head.

**Example 1:**
```
Input: head = [1,2,3,4,5], n = 2
Output: [1,2,3,5]
```

**Example 2:**
```
Input: head = [1], n = 1
Output: []
```

**Example 3:**
```
Input: head = [1,2], n = 1
Output: [1]
```

**Constraints:**
- The number of nodes in the list is sz
- 1 <= sz <= 30
- 0 <= Node.val <= 100
- 1 <= n <= sz

## Approach

The straightforward way is two passes: walk the list once to count its length `L`, then walk it again to the `(L - n)`th node (the one just before the target) and unlink the next node. That works fine, but it touches the list twice.

A one-pass trick does it with two pointers kept `n` apart. Start a `dummy` node in front of `head` (so removing the actual head node doesn't need special-casing), then advance a `fast` pointer `n + 1` steps ahead of a `slow` pointer that starts at `dummy`. Now move both one step at a time until `fast` falls off the end — at that point `slow` is sitting right before the node that needs removing, because the gap between them was always exactly `n + 1`. Splice it out with `slow.next = slow.next.next`.

**Time complexity:** O(L) — a single pass over the list, where L is its length.

**Space complexity:** O(1) — only a couple of pointers, no extra structures.
