# 113. Path Sum II

Given the root of a binary tree and an integer `targetSum`, return all root-to-leaf paths where the sum of the node values along the path equals `targetSum`. Each path should be returned as a list of node values.

**Example 1:**
```
Input: root = [5,4,8,11,null,13,4,7,2,null,null,5,1], targetSum = 22
Output: [[5,4,11,2],[5,8,4,5]]
```

**Example 2:**
```
Input: root = [1,2,3], targetSum = 5
Output: []
```

**Example 3:**
```
Input: root = [1,2], targetSum = 0
Output: []
```

**Constraints:**
- The number of nodes in the tree is in the range [0, 5000]
- -1000 <= Node.val <= 1000
- -1000 <= targetSum <= 1000

## Approach

This is a depth-first search where you carry the "path so far" and the "remaining sum needed" down the recursion, and only record a path when you land on a leaf with exactly zero remaining.

Do a DFS from the root, appending each node's value onto a running `path` list and subtracting its value from `remaining`. At a leaf (`node.left is None and node.right is None`), check if `remaining` has hit exactly the node's own value (equivalently, if subtracting it hits zero) — if so, the current `path` is a valid answer, so copy it into the results. Then recurse into both children with the updated path and remaining sum. The crucial bit for correctness is backtracking: after exploring both children, pop the current node back off `path` before returning to the parent call, so sibling subtrees don't see stale values left over from this branch. Appending a *copy* of `path` (not the list itself) when recording a match matters too, since `path` keeps getting mutated as the DFS continues.

**Time complexity:** O(n^2) worst case — O(n) nodes visited, and each valid path found can cost up to O(n) to copy into the results (a skewed tree with many matching paths hits this bound; on average it's much better).

**Space complexity:** O(h) for the recursion stack and the running path, not counting the output.
