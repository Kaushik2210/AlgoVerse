# 863. All Nodes Distance K in Binary Tree

**Commonly asked at:** Facebook, Amazon

You're given the root of a binary tree, a `target` node contained in it, and an integer `k`. Return the values of all nodes that are exactly distance `k` from `target`, where distance is measured in edges along the tree (parent, child, or any path connecting through ancestors).

**Example 1:**
```
Input: root = [3,5,1,6,2,0,8,null,null,7,4], target = 5, k = 2
Output: [7,4,1]
Explanation: The nodes at distance 2 from node 5 are 7, 4 (through 5's children) and 1 (through 5's parent 3).
```

**Example 2:**
```
Input: root = [1], target = 1, k = 3
Output: []
```

**Constraints:**
- The number of nodes is in the range [1, 500]
- All node values are unique
- target is a node in the tree
- 0 <= k <= 1000

## Approach

A binary tree only has parent-to-child pointers, but distance from `target` needs to reach in every direction — down into children, but also up through parents and back down other branches. That "reach in every direction" requirement is exactly what an undirected graph traversal (BFS) is built for, so the plan is to turn the tree into an undirected graph and then just BFS outward from `target` by exactly `k` steps.

First, do one traversal (DFS or BFS) of the whole tree building a map from each node to its parent — this is the missing "upward" edge the tree doesn't give directly. Now every node effectively has up to three neighbors: `left`, `right`, and `parent`.

Then do a standard BFS starting from `target`, expanding level by level through all three neighbor directions, while tracking visited nodes to avoid walking back the way you came (e.g. from a child straight back to the parent you just came from). After exactly `k` levels of BFS expansion, whatever nodes remain in the current frontier are exactly the nodes at distance `k` — collect their values and return them. If the BFS frontier empties out before reaching `k` levels (not enough of the tree that far away), the answer is just an empty list.

**Time complexity:** O(n) — building the parent map visits every node once, and the BFS also visits at most every node once.

**Space complexity:** O(n) for the parent map, visited set, and BFS queue.
