# 876. Middle of the Linked List

Given the head of a singly linked list, return the middle node. If there are two middle nodes (an even number of nodes), return the second one.

**Example 1:**
```
Input: head = [1,2,3,4,5]
Output: [3,4,5]
Explanation: The middle node of the list is node 3.
```

**Example 2:**
```
Input: head = [1,2,3,4,5,6]
Output: [4,5,6]
Explanation: Since the list has two middle nodes with values 3 and 4, return the second one.
```

**Constraints:**
- The number of nodes in the list is in the range [1, 100]
- 1 <= Node.val <= 100

## Approach

The naive way is to walk the list once to count its length n, then walk again to node `n // 2` (0-indexed) — two passes, O(n) each.

One pass is enough with the classic **slow/fast pointer** technique: `slow` advances one node per step, `fast` advances two. When `fast` reaches the end of the list (or falls one short, for even length), `slow` has covered exactly half the distance and lands on the middle. Because `fast` moves twice as fast, by the time it's traveled the full length, `slow` has traveled half — landing exactly at the middle index. For even-length lists this naturally lands on the *second* middle node (works out because `fast` starting a full step ahead each iteration shifts the landing spot by one), matching what the problem wants without extra casing.

**Time complexity:** O(n) — a single pass, each pointer visits at most n nodes.

**Space complexity:** O(1) — only two pointers used.
