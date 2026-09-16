# 298. Binary Tree Longest Consecutive Sequence

**Commonly asked at:** Amazon, Google, Meta, TikTok

> **Note:** This is a LeetCode premium problem, so it can't be opened or submitted on a free account. Solved and verified independently against hand-built test cases.

Given the root of a binary tree, find the length of the longest path where the node values are strictly consecutive increasing integers, and the path only moves from parent to child (a child must be exactly one more than its parent). The path doesn't need to start at the root or end at a leaf.

**Example 1:**
```
Input: root = [1,null,3,2,4,null,null,null,5]
Output: 3
Explanation: The longest consecutive path is 3 -> 4 -> 5.
```

**Example 2:**
```
Input: root = [2,null,3,2,null,1]
Output: 2
Explanation: The longest consecutive path is 2 -> 3, not 3 -> 2 -> 1 since the path must be increasing going down.
```

**Constraints:**
- The number of nodes in the tree is in the range [1, 3 * 10^4]
- -3 * 10^4 <= Node.val <= 3 * 10^4

## Approach

Do a post-order DFS where each call returns the length of the longest consecutive run starting *at* that node and extending downward. For a node, look at each child: if the child's value is exactly `node.val + 1`, that child can extend the current run, so the candidate length through that child is `1 + dfs(child)`. If it doesn't extend (or there's no child), the run rooted at this node is just length 1, but the child's own subtree still needs to be explored for its own local runs — recurse into it regardless so its answer contributes to the global best.

Keep a running global maximum updated at every node with the best length found rooted there, since the best consecutive run overall doesn't have to pass through the root — it can live entirely inside any subtree, starting wherever a run happens to begin.

**Time complexity:** O(n) — every node is visited exactly once by the DFS.

**Space complexity:** O(h) for the recursion stack, where h is the tree height (worst case O(n) for a skewed tree).
