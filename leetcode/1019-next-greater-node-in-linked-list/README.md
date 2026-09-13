# 1019. Next Greater Node In Linked List

Given the head of a linked list with `n` nodes, for each node find the value of the first node further along the list that's strictly greater than it. If no such node exists, use 0. Return the answers as an array `answer` where `answer[i]` corresponds to the `i`th node (0-indexed).

**Example 1:**
```
Input: head = [2,1,5]
Output: [5,5,0]
```

**Example 2:**
```
Input: head = [2,7,4,3,5]
Output: [7,0,5,5,0]
```

**Constraints:**
- The number of nodes is in the range [1, 10^4]
- 1 <= Node.val <= 10^9

## Approach

For each node, checking every node after it for the first larger value is the brute-force way — O(n^2) in the worst case (e.g. a strictly decreasing list, where every node has to scan all the way to the end and find nothing).

This is the classic "next greater element" pattern, solved with a **monotonic decreasing stack** of indices. First copy the list into an array (its length isn't known upfront, and array indexing makes the stack logic cleaner than juggling list pointers). Then scan left to right, keeping the stack holding indices whose next-greater value hasn't been found yet, from bottom to top in decreasing order of value. For each new value `val`: pop every index off the stack whose value is smaller than `val` — for each one, `val` is exactly its answer, since `val` is the first thing encountered after it that's bigger. Once the stack only holds indices with values >= `val` (or is empty), push the current index. Any index still on the stack once the scan finishes never found a bigger value later, so its answer stays 0. Each index is pushed once and popped at most once, so the whole scan is linear.

**Time complexity:** O(n) — every index enters and leaves the stack at most once.

**Space complexity:** O(n) for the values array and the stack.
