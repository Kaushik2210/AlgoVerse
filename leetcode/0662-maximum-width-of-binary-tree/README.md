# 662. Maximum Width of Binary Tree

You're given the root of a binary tree. The width of one level is the number of positions between the leftmost and rightmost non-null nodes at that level (inclusive), counting the null positions in between as if the tree were a complete binary tree — those gaps count toward the width even though the nodes aren't actually there. Return the maximum width across all levels. The answer is guaranteed to fit in a 32-bit signed integer.

**Example 1:**
```
Input: root = [1,3,2,5,3,null,9]
Output: 4
Explanation: The last level has nodes at positions 2, 3, 4, 5 (0-indexed from that level's start), giving width 5 - 2 + 1 = 4.
```

**Example 2:**
```
Input: root = [1,3,2,5,null,null,9,6,null,7]
Output: 7
Explanation: The last level has nodes at positions 0 and 6 (with only 6 and 7 actually present, the rest null), giving width 6 - 0 + 1 = 7.
```

**Example 3:**
```
Input: root = [1,3,2,5]
Output: 2
```

**Constraints:**
- The number of nodes is in the range [1, 3000]
- -100 <= Node.val <= 100

## Approach

Because null gaps between nodes still count toward the width, plain BFS with a running "how many nodes on this level" counter doesn't capture it — the counter would just track *actual* node count, not the span between the leftmost and rightmost.

The fix is to give every node a positional index as if the tree were laid out as a complete binary tree array, the same way a binary heap is indexed: the root gets index `0`, and a node at index `i` has its left child at `2*i` and right child at `2*i + 1`. Do a level-order BFS, but push `(node, index)` pairs onto the queue instead of bare nodes. At each level, the width is `last_index - first_index + 1`, comparing just the first and last node actually present at that level — the null gaps in between are automatically already accounted for since they're baked into the index arithmetic.

One practical wrinkle: these indices can grow exponentially with depth and overflow standard integer types on a very unbalanced tree. The fix is to re-base the indices at the start of every level, subtracting the first index of that level from every index computed for that level (so the leftmost node of each level is always treated as index `0` before computing children). This keeps the numbers small while still preserving the relative left/right spacing needed for correct width comparisons within a level.

**Time complexity:** O(n) — a standard BFS visiting every node once.

**Space complexity:** O(n) for the BFS queue at its widest level.
