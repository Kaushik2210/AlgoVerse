# 671. Second Minimum Node In a Binary Tree

Given a binary tree where every node has either 0 or 2 children, and where a node's value is always less than or equal to the value of each of its children, find the second smallest **distinct** value in the whole tree. Return -1 if it doesn't exist (i.e. every value in the tree is the same).

**Example 1:**
```
Input: root = [2,2,5,null,null,5,7]
Output: 5
Explanation: the smallest value is 2, and the second smallest distinct value is 5.
```

**Example 2:**
```
Input: root = [2,2,2]
Output: -1
Explanation: every node has the same value, so there is no second minimum.
```

**Constraints:**
- The number of nodes is in [1, 25]
- 1 <= Node.val <= 2^31 - 1
- root.val is the minimum value in the tree

## Approach

Because of the special ordering property, the root's value is guaranteed to be the tree's minimum — that part's free. The naive approach of collecting every value into a set and sorting works, but it throws away the structure the problem hands you for free, and it's worth exploiting.

Since `root.val` is the global minimum, any node whose value differs from it is automatically a candidate for "second minimum" — no need to look past it, and no need to explore its subtree further, since everything below an already-larger node is also `>= ` that value (the ordering property holds recursively). So DFS down the tree: whenever a node's value doesn't equal the root's value, just return it as a candidate straight away without recursing further. Whenever it does equal the root's value, recurse into both children and combine their answers, taking the smaller of the two (treating a "no candidate found" result as -1 and preferring the other side when one side comes back empty).

This prunes large parts of the tree — once a subtree's root already differs from the global minimum, none of its descendants need visiting since they can't be smaller.

**Time complexity:** O(n) worst case (e.g. all values equal except the very last node), though pruning skips large parts of the tree whenever an early divergence is found.

**Space complexity:** O(h) for the recursion stack.
