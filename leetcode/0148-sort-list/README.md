# 148. Sort List

Given the head of a singly linked list, sort it in ascending order and return the sorted list.

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

**Example 3:**
```
Input: head = []
Output: []
```

**Constraints:**
- The number of nodes in the list is in the range [0, 5 * 10^4]
- -10^5 <= Node.val <= 10^5
- Follow up: Can you sort the linked list in O(n log n) time and O(1) memory (i.e. constant space)?

## Approach

The simplest baseline: dump every value into an array, sort the array, and rebuild the list (or just overwrite the node values in order). That's O(n log n) time but O(n) extra space for the array, which sidesteps the whole point of the follow-up.

To actually get O(n log n) time with O(1) *extra* space (ignoring recursion stack), do merge sort directly on the list structure:

1. **Split.** Find the middle of the list with the slow/fast pointer technique — `slow` moves one step, `fast` moves two, and when `fast` runs off the end, `slow` sits at the midpoint. Cut the list into two halves there (set the node before `slow` to `None` at its `next`).
2. **Recurse.** Sort each half the same way, recursively, down to lists of length 0 or 1 (already sorted).
3. **Merge.** Merge the two sorted halves back together the same way as in Merge Two Sorted Lists — walk both lists, always take the smaller head, and splice nodes onto a dummy tail (no new nodes are ever allocated, only re-linked).

Because splitting keeps halving the list (log n levels) and merging at each level touches every node once (n work per level), the total is O(n log n) time. No auxiliary array is used — only pointer rewiring — so it's O(1) extra space beyond the O(log n) recursion stack the split/merge calls use.

**Time complexity:** O(n log n) — log n levels of splitting, O(n) merge work per level.

**Space complexity:** O(log n) for the recursion stack (O(1) if done iteratively bottom-up); the array-based baseline is O(n).
