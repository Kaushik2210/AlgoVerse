# 203. Remove Linked List Elements

Given the head of a linked list and an integer `val`, remove all the nodes whose value equals `val` and return the new head.

**Example 1:**
```
Input: head = [1,2,6,3,4,5,6], val = 6
Output: [1,2,3,4,5]
```

**Example 2:**
```
Input: head = [], val = 1
Output: []
```

**Example 3:**
```
Input: head = [7,7,7,7], val = 7
Output: []
```

**Constraints:**
- The number of nodes in the list is in the range [0, 10^4]
- 1 <= Node.val <= 50
- 0 <= val <= 50

## Approach

The fiddly part of this problem without a trick is that the head itself might need removing (possibly several matching nodes in a row at the very front), which is a different code path than removing a node in the middle. A **dummy node** placed before `head` erases that distinction: every node to remove, including the original head, now has some node before it that can just have its `next` pointer skipped forward.

Walk a pointer `cur` starting at the dummy. At each step, look ahead to `cur.next`:
- if `cur.next.val == val`, skip it by setting `cur.next = cur.next.next` (don't advance `cur` — the new `cur.next` might *also* need removing, e.g. consecutive matches);
- otherwise advance `cur = cur.next`.

Return `dummy.next` as the new head.

**Time complexity:** O(n) — one pass through the list.

**Space complexity:** O(1) — only the dummy node and a couple of pointers.
