# 257. Binary Tree Paths

Given the root of a binary tree, return all root-to-leaf paths, in any order. Each path should be formatted as a string like `"1->2->5"`.

**Example 1:**
```
Input: root = [1,2,3,null,5]
Output: ["1->2->5","1->3"]
```

**Example 2:**
```
Input: root = [1]
Output: ["1"]
```

**Constraints:**
- The number of nodes is in the range [1, 100]
- -100 <= Node.val <= 100

## Approach

This is a straight DFS where the only thing that needs tracking is the path taken so far to reach the current node. Walk down from the root, appending each node's value to a running path. Whenever a leaf (a node with no left and no right child) is reached, that running path represents a complete root-to-leaf path — join it into the `"->"`-separated string and add it to the results.

At any non-leaf node, recurse into whichever children exist, each carrying forward the path built so far plus this node's value. Because each recursive call gets its own extended copy of the path (rather than one shared mutable list that needs popping), there's no need for explicit backtracking — the path for one branch never leaks into another.

**Time complexity:** O(n^2) in the worst case for a skewed tree — n nodes visited, and each leaf can involve rebuilding a path string of length up to n; O(n log n) for a balanced tree.

**Space complexity:** O(n^2) worst case to store all the resulting path strings (a skewed tree has one path of length n), plus O(n) recursion depth.
