# 993. Cousins in Binary Tree

You're given the root of a binary tree with unique values, and the values of two different nodes `x` and `y`. Return `true` if `x` and `y` are cousins — meaning they're at the same depth but have different parents.

**Example 1:**
```
Input: root = [1,2,3,4], x = 4, y = 3
Output: false
Explanation: 4 is at depth 2, 3 is at depth 1 — different depths, so not cousins.
```

**Example 2:**
```
Input: root = [1,2,3,null,4,null,5], x = 5, y = 4
Output: true
Explanation: Both 4 and 5 are at depth 2, and their parents (2 and 3) are different.
```

**Example 3:**
```
Input: root = [1,2,3,null,4], x = 2, y = 3
Output: false
Explanation: 2 and 3 are both at depth 1, but they share the same parent (1), so they're siblings, not cousins.
```

**Constraints:**
- The number of nodes is in the range [2, 100]
- 1 <= Node.val <= 100
- All node values are unique
- x != y

## Approach

Two conditions need to hold at once — same depth, different parent — so the natural approach is a level-order (BFS) traversal, since it naturally groups nodes by depth and makes checking "same level" trivial: `x` and `y` are cousins only if they turn up within the *same* BFS level, and are not siblings.

Do a standard BFS with a queue, but push `(node, parent)` pairs instead of bare nodes. At each level, scan through everyone in that level looking for `x` and `y`. If exactly one of them is found in this level, they can't be cousins (different depths) — return `false` immediately, no need to search deeper. If both are found in this level, check whether their recorded parents are different — if they are, it's a cousin match; if the parents are the same, they're siblings and the answer is `false`. If neither is found, just move to the next level as usual.

An equivalent and slightly simpler-to-code version does two independent depth-first searches, one for `x` and one for `y`, each tracking `(depth, parent)` as it recurses, then compares the two results at the end — but the level-by-level BFS check is the more direct way to see why the answer works.

**Time complexity:** O(n) — every node is visited at most once across the traversal.

**Space complexity:** O(n) for the BFS queue in the worst case (a wide tree).
