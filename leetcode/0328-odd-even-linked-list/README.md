# 328. Odd Even Linked List

Given the head of a singly linked list, group all the nodes with odd indices together followed by the nodes with even indices, and return the reordered list. The first node is considered odd, the second node even, and so on — note it's 1-indexed by position, not by value. You must solve it in O(1) extra space and O(n) time, and the relative order inside each group must stay the same as in the original list.

**Example 1:**
```
Input: head = [1,2,3,4,5]
Output: [1,3,5,2,4]
```

**Example 2:**
```
Input: head = [2,1,3,5,6,4,7]
Output: [2,3,6,7,1,5,4]
```

**Constraints:**
- Number of nodes is in [0, 10^4]
- -10^6 <= Node.val <= 10^6

## Approach

The key thing to get right is that "odd" and "even" refer to 1-indexed position in the list, not the node's value — so it's about every-other node by position, not filtering by parity of the data. That means the target output is simply: take every node at position 1, 3, 5, ... in original order, followed by every node at position 2, 4, 6, ... in original order.

That's doable with a single pass and two running pointers. Keep `odd` pointing at the current tail of the odd chain (starting at the head) and `even` pointing at the current tail of the even chain (starting at the second node) — also remember the head of the even chain separately, since it needs to be spliced onto the end of the odd chain at the very end. Then repeatedly: link `odd.next` to `even.next` (skip over the even node to grab the next odd node) and advance `odd`; link `even.next` to `odd.next` (skip over the now-current odd node to grab the next even node) and advance `even`. Stop once `even` or `even.next` becomes null. Finally, attach `odd.next = evenHead` to join the two chains.

**Time complexity:** O(n) — one pass through the list, touching each node a constant number of times.

**Space complexity:** O(1) — no new nodes are allocated, only existing pointers are rewired.
