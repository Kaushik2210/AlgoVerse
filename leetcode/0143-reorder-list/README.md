# 143. Reorder List

You're given the head of a singly linked list, with nodes numbered `L0 -> L1 -> ... -> Ln-1 -> Ln`. Reorder it in place to `L0 -> Ln -> L1 -> Ln-1 -> L2 -> Ln-2 -> ...`, alternating from the front and back of the original list. You can't just swap node values — the actual node links have to be rearranged.

**Example 1:**
```
Input: head = [1,2,3,4]
Output: [1,4,2,3]
```

**Example 2:**
```
Input: head = [1,2,3,4,5]
Output: [1,5,2,4,3]
```

**Constraints:**
- Number of nodes in the list is in [1, 5 * 10^4]
- 1 <= Node.val <= 1000

## Approach

The pattern is "front, back, front+1, back-1, ..." — which is exactly what you'd get by taking the second half of the list, reversing it, and merging it with the first half one node at a time. That splits the problem into three well-known sub-problems chained together.

1. **Find the middle.** Use slow/fast pointers — when fast reaches the end, slow is at the midpoint. This splits the list into a first half and a second half.
2. **Reverse the second half.** Standard in-place linked list reversal, same as problem 206.
3. **Merge the two halves alternately.** Walk both halves at once, splicing one node from the second half in after each node from the first half.

The only fiddly part is getting the split point exactly right when the list length is odd vs. even, and making sure the merge stops correctly (the second half is always the same length or one shorter than the first, so the merge loop is driven by the second list running out).

**Time complexity:** O(n) — finding the middle, reversing, and merging are each a single linear pass.

**Space complexity:** O(1) — everything is done via pointer rewiring, no extra data structures.
