# 61. Rotate List

Given the head of a linked list, rotate the list to the right by `k` places.

**Example 1:**
```
Input: head = [1,2,3,4,5], k = 2
Output: [4,5,1,2,3]
```

**Example 2:**
```
Input: head = [0,1,2], k = 4
Output: [2,0,1]
```

**Constraints:**
- The number of nodes is in the range [0, 500]
- -100 <= Node.val <= 100
- 0 <= k <= 2 * 10^9

## Approach

Rotating right by `k` is equivalent to: find the node that's `k` positions from the end (the new tail), and the node right after it becomes the new head — the list splits there and the front piece gets reattached after the back piece.

First handle the trivial cases: empty list, single node, or `k = 0` all mean no rotation happens. Otherwise, walk the list once to get its length `n`, and reduce `k` with `k %= n` since rotating by a multiple of `n` is a no-op (this also handles `k` being much larger than the list length, and if `k` becomes 0 after the mod, return early). Connect the tail to the head to make it circular temporarily — this makes the "wrap around" trivial.

Now walk forward `n - k` steps from the head to land on what will become the new tail (the node just before the new head). The node after it is the new head. Break the circle there: set the new tail's `next` to null, and return the new head.

**Time complexity:** O(n) — one pass to find the length, another (at most) to find the new tail.

**Space complexity:** O(1) — only pointer rewiring, no new nodes.
