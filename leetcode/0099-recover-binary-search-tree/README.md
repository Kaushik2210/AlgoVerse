# 99. Recover Binary Search Tree

You're given the root of a binary search tree where exactly two nodes had their values mistakenly swapped. Fix the tree in place (without changing its structure) so it's a valid BST again.

**Example 1:**
```
Input: root = [1,3,null,null,2]
Output: [3,1,null,null,2]
Explanation: 3 cannot be a left child of 1 because 3 > 1. Swapping 1 and 3 makes the BST valid.
```

**Example 2:**
```
Input: root = [3,1,4,null,null,2]
Output: [2,1,4,null,null,3]
Explanation: 2 cannot be in the right subtree of 3 because 2 < 3. Swapping 2 and 3 makes the BST valid.
```

**Constraints:**
- The number of nodes is in the range [2, 1000]
- -2^31 <= Node.val <= 2^31 - 1

## Approach

A valid BST's in-order traversal is always strictly increasing. Swapping two node values breaks that in exactly one of two recognizable ways depending on whether the swapped nodes are adjacent or not in the in-order sequence, so the fix is to walk the in-order traversal and look for places where the sequence dips instead of rises.

Do an in-order traversal while tracking the previous node visited. Whenever `prev.val > current.val`, that's a violation. Two violations can occur:
- **Swapped nodes are adjacent in the sequence** (e.g. `1, 3, 2, 4` — swapping 3 and 2 gives one dip at `3 -> 2`): there's exactly one violation, and the two involved nodes (`prev` and `current` at that point) are the ones to swap back.
- **Swapped nodes are far apart** (e.g. `1, 4, 3, 2, 5` — swapping 1's actual position... concretely `3, 1, 4, 2` becomes two dips): there are two violations. The first violation's `prev` (the earlier, larger-than-it-should-be node) and the second violation's `current` (the later, smaller-than-it-should-be node) are the two misplaced values — everything strictly between them in the sequence is still in the correct relative order.

So track two candidate node pointers, `first` and `second`. On the first violation seen, set `first = prev` and provisionally `second = current`. On a second violation (if one occurs), overwrite `second = current` only — `first` stays fixed at the node from the first violation. After the traversal, swap `first.val` and `second.val`.

A simple way to implement this without recursion headaches is to collect the in-order node list first (or do it with an explicit stack), then scan it once for the out-of-order pair(s). This uses O(n) space; the O(1)-space follow-up uses Morris traversal (threading temporary links through the tree instead of a stack), but the simple inorder-list approach is a fully correct primary solution.

**Time complexity:** O(n) — one full in-order traversal.

**Space complexity:** O(n) for the traversal list/stack (O(h) if implemented with recursion only, without materializing a full list; O(1) with the Morris traversal follow-up).
