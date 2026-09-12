# 86. Partition List

Given the head of a linked list and a value `x`, rearrange the list so that all nodes with a value less than `x` come before all nodes with a value greater than or equal to `x`. The relative order of the nodes within each of the two groups should stay the same as in the original list.

**Example 1:**
```
Input: head = [1,4,3,2,5,2], x = 3
Output: [1,2,2,4,3,5]
```

**Example 2:**
```
Input: head = [2,1], x = 2
Output: [1,2]
```

**Constraints:**
- The number of nodes is in the range [0, 200]
- -100 <= Node.val <= 100
- -200 <= x <= 200

## Approach

Trying to do this by shuffling nodes around within a single list gets messy fast, since you'd be tracking multiple pointers just to insert nodes in the right spot while walking forward. It's much cleaner to build two separate lists as you go and glue them together at the end.

Walk the original list once, and for each node, decide which of two buckets it belongs in based on `node.val < x`: a "less" chain or a "greater-or-equal" chain. Use a dummy head for each chain plus a tail pointer, so appending a node is just `tail.next = node; tail = tail.next` — no special-casing the first node. Since you're just re-pointing `next` on the existing nodes (not creating new ones), the relative order within each chain is naturally preserved, because you visit the original list left to right.

Once the scan is done, splice the two chains together: `less_tail.next = greater_dummy.next` connects the end of the "less" chain to the start of the "greater" chain. The one trap here is that the last node of the original list still has its old `next` pointer dangling from wherever it used to point — so `greater_tail.next` must be explicitly set to `None` before splicing, otherwise you can end up with a cycle or a dangling reference to a node that got moved to the other chain.

**Time complexity:** O(n) — one pass through the list.

**Space complexity:** O(1) — nodes are relinked in place, no new nodes are allocated.
