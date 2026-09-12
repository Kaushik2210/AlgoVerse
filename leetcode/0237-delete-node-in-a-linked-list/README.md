# 237. Delete Node in a Linked List

There's a singly linked list, and you're given direct access only to one node you need to delete — not the head of the list. Write a function that deletes that given node from the list. You're guaranteed the node to delete isn't the tail.

After the function returns, the linked list should reflect the node's removal.

**Example 1:**
```
Input: head = [4,5,1,9], node = 5 (the second node)
Output: [4,1,9]
```

**Example 2:**
```
Input: head = [4,5,1,9], node = 1 (the third node)
Output: [4,5,9]
```

**Constraints:**
- The number of nodes is in the range [2, 1000]
- -1000 <= Node.val <= 1000
- The value of each node is unique
- The given node is not the tail and is a valid node

## Approach

Normally deleting a node from a singly linked list means finding the node *before* it and re-pointing its `next` — but here there's no access to the head or any previous node, only the node itself. Since you can't reach backward, the trick is to not actually delete this node at all: instead, overwrite it so it becomes indistinguishable from the node after it, then delete *that* next node instead, which you do have direct access to.

Concretely: copy the value from `node.next` into `node.val`, then skip over `node.next` by setting `node.next = node.next.next`. From the outside, the list now looks exactly as if the original node had been removed — the node that used to hold the target's value is gone, and everything shifted correctly. This only works because we're guaranteed the given node isn't the tail, so `node.next` always exists.

**Time complexity:** O(1) — just a value copy and a pointer update, no traversal needed.

**Space complexity:** O(1).
