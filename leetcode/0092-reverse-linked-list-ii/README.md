# 92. Reverse Linked List II

Given the head of a singly linked list and two integers `left` and `right` where `left <= right`, reverse the nodes of the list from position `left` to position `right` (1-indexed), and return the resulting list. Do it in one pass if you can.

**Example 1:**
```
Input: head = [1,2,3,4,5], left = 2, right = 4
Output: [1,4,3,2,5]
```

**Example 2:**
```
Input: head = [5], left = 1, right = 1
Output: [5]
```

**Constraints:**
- The number of nodes in the list is n
- 1 <= n <= 500
- -500 <= Node.val <= 500
- 1 <= left <= right <= n

## Approach

Use a dummy node ahead of `head` so "position 1" never needs to be a special case. Walk `left - 1` steps from the dummy to land on `prev`, the node right before the sub-list to reverse; `prev.next` (call it `cur`) is the first node of that sub-list.

Now reverse in place with a single pass using the **"move to front" head-insertion trick**: repeatedly take the node right after `cur` (call it `nxt`) and move it to sit right after `prev`, `right - left` times. Since `cur` never moves during this process (its `next` pointer just keeps getting reassigned to whatever used to be two nodes ahead), each iteration effectively pops the next unreversed node from where it is and re-inserts it right at the front of the already-reversed segment. After the loop, `cur` has naturally ended up as the *last* node of the reversed segment (correctly pointing to whatever comes after), and everything between `prev` and `cur` is reversed.

This avoids a second pass to relink the head/tail of the reversed segment back into the list — the relinking happens incrementally as part of the same walk.

**Time complexity:** O(n) — one pass to reach `left`, one pass of length `right - left` to reverse.

**Space complexity:** O(1) — only a constant number of pointers are used.
