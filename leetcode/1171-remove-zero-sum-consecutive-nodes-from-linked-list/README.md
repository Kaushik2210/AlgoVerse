# 1171. Remove Zero Sum Consecutive Nodes from Linked List

Given the head of a linked list, repeatedly delete consecutive sequences of nodes that sum to 0 until no such sequence exists, then return the head of the final list. Any answer with the same resulting list of values is accepted.

**Example 1:**
```
Input: head = [1,2,-3,3,1]
Output: [3,1]
Explanation: The whole list sums to 0, so it could also be removed entirely, leaving [1,2,1]. Both are accepted.
```

**Example 2:**
```
Input: head = [1,2,3,-3,4]
Output: [1,2,4]
```

**Example 3:**
```
Input: head = [1,2,3,-3,-2]
Output: [1]
```

**Constraints:**
- The number of nodes is in the range [1, 1000]
- -1000 <= Node.val <= 1000

## Approach

Trying to actually simulate "repeatedly find and delete a zero-sum run" is messy — after one deletion the list changes shape and you'd have to rescan. The clean way in is via **prefix sums**, the same idea used for "subarray sums to zero" problems: if the running prefix sum up to node A equals the running prefix sum up to some later node B, then the sum of everything strictly between A and B (exclusive of A, inclusive of B) is exactly zero.

So use a dummy node before the head (prefix sum 0 lives there), walk the list once computing the running prefix sum at each node, and record in a hash map the **last** node seen at each prefix-sum value — overwriting earlier entries on purpose, since if a prefix sum repeats three times, only the gap between the first and the very last occurrence needs to survive (everything in between nets to zero too, including nested zero-sum runs).

Then walk the list again from the dummy node. At each node, recompute its prefix sum and look up `last_seen[prefix_sum]` — that's the last node anywhere in the list sharing this same prefix sum. Point the current node's `next` directly at that node's `next`, splicing out everything in between (which summed to zero). Continue from the new `next`. This single relinking pass correctly handles overlapping and nested zero-sum runs because it always jumps to the *last* matching node, collapsing everything in one shot.

**Time complexity:** O(n) — one pass to build the prefix-sum map, one pass to relink.

**Space complexity:** O(n) for the hash map of prefix sums to nodes.
