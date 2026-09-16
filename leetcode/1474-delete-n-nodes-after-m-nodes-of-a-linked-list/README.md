# 1474. Delete N Nodes After M Nodes of a Linked List

**Commonly asked at:** Microsoft

> **Note:** This is a LeetCode premium problem, so it can't be opened or submitted on a free account. Solved and verified independently against hand-built test cases.

Given the head of a linked list and two integers `m` and `n`, repeatedly keep the next `m` nodes and then delete the next `n` nodes, continuing this pattern until the end of the list is reached. Return the head of the modified list.

**Example 1:**
```
Input: head = [1,2,3,4,5,6,7,8,9,10,11,12,13], m = 2, n = 3
Output: [1,2,6,7,11,12]
Explanation: Keep 1,2; delete 3,4,5; keep 6,7; delete 8,9,10; keep 11,12; delete 13.
```

**Example 2:**
```
Input: head = [1,2,3,4,5,6,7,8,9,10,11], m = 1, n = 3
Output: [1,5,9]
```

**Constraints:**
- The number of nodes is in the range [1, 10^4]
- 1 <= Node.val <= 10^6
- 1 <= m, n <= 1000

## Approach

This is direct simulation — there's no shortcut needed since it's already linear, just some care with the bookkeeping and the edge cases at the end of the list.

Walk a pointer `curr` forward `m - 1` steps to land on the last node of a "keep" group (if the list runs out partway through this walk, everything remaining is a keep group and nothing more needs deleting — return as is). From there, walk a second pointer `toDelete` starting at `curr.next` forward up to `n` steps (stopping early if it falls off the list), landing on the first node *after* the group to delete. Splice the deleted group out by setting `curr.next = toDelete`, then resume the whole process with `curr = toDelete`. The loop naturally terminates once `curr` becomes null, whether that happens mid-keep-group or mid-delete-group.

**Time complexity:** O(n_total) — every node in the list is visited a constant number of times across the keep/delete walks.

**Space complexity:** O(1) — only a couple of pointers, modifying the list in place.
