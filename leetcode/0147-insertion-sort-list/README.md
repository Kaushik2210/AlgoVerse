# 147. Insertion Sort List

Given the head of a singly linked list, sort it using **insertion sort**, and return the sorted list's head.

Insertion sort builds the final sorted list one element at a time: it repeatedly takes the next unsorted element and inserts it into its correct position among the elements already sorted.

**Example 1:**
```
Input: head = [4,2,1,3]
Output: [1,2,3,4]
```

**Example 2:**
```
Input: head = [-1,5,3,4,0]
Output: [-1,0,3,4,5]
```

**Constraints:**
- The number of nodes in the list is in the range [1, 5000]
- -5000 <= Node.val <= 5000

## Approach

Keep a separate sorted list (starting empty, tracked with a dummy head) and repeatedly pull the next node off the front of the original unsorted list, then insert it into the correct spot in the sorted list.

- Detach the current node from the input list first (`cur.next` moves on before we touch the node's own `next`, otherwise we'd lose our place).
- Walk the sorted list from its dummy head to find the first node whose value is greater than the one being inserted (or reach the end) — that's where the new node goes, spliced in between the node before it and that point.
- Because the sorted list is always genuinely sorted going in, this "walk from the front to find the insertion point" is correct every time, even though it means each insertion can take O(k) where k is how many sorted elements come before it.

This mirrors doing insertion sort on an array, just with pointer relinking instead of shifting elements over.

**Time complexity:** O(n^2) worst case — each of the n insertions can require scanning up to n sorted nodes.

**Space complexity:** O(1) extra — nodes are relinked in place, no new nodes are allocated (aside from the dummy head).
