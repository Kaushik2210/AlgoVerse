# 1145. Binary Tree Coloring Game

Two players take turns coloring nodes of a binary tree with `n` nodes (uniquely valued `1` to `n`). Player one colors node `x` first. Player two then must pick any uncolored node `y` to color. After that, each turn a player must color an uncolored node adjacent to one of their own already-colored nodes; a player who can't move loses. Given the tree, `n`, and `x`, return whether player two can pick some `y` that guarantees a win, assuming both players play optimally.

**Example 1:**
```
Input: root = [1,2,3,4,5,6,7,8,9,10,11], n = 11, x = 3
Output: true
Explanation: player two colors node 2. That splits the tree into three separated regions from x=3's perspective — everything through node 2's side, and node 3's own left/right children's sides — and node 2's region alone contains more than half of the remaining nodes, guaranteeing player two the majority.
```

**Example 2:**
```
Input: root = [1,2,3], n = 3, x = 1
Output: false
```

**Constraints:**
- The number of nodes in the tree is `n`
- `1 <= x <= n <= 100`
- `n` is odd
- Every node has a unique value in the range `[1, n]`

## Approach

Once player one colors `x`, the tree effectively splits from `x`'s point of view into exactly three regions, since a node can only ever be reached by expanding from a colored node to its direct neighbors: `x`'s left subtree, `x`'s right subtree, and everything reachable through `x`'s parent (the rest of the tree). Player two's only winning move is to color one of `x`'s three direct neighbors — its left child, right child, or parent — because doing so lets player two claim that entire region and permanently cuts `x` off from ever reaching into it (colored nodes block movement, so `x` can never cross into a region whose entry point player two owns).

So the problem reduces to: compute the size of each of those three regions, and check whether any one of them is bigger than all the others combined — i.e., bigger than `n // 2` (since `n` is odd, no region can tie with the rest).

A single DFS computes this: recursively count each subtree's size, and when the node equal to `x` is reached, record its left and right subtree sizes. The third region's size falls out arithmetically: `n - left_size - right_size - 1` (everything except `x` itself and its two subtrees).

If the largest of the three regions exceeds `n // 2`, player two wins by claiming it.

**Time complexity:** O(n) — one DFS pass over the tree.

**Space complexity:** O(h) for the recursion stack, where h is the tree's height (up to O(n) for a skewed tree).
