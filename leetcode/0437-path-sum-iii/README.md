# 437. Path Sum III

**Commonly asked at:** Facebook, Amazon

Given the root of a binary tree and an integer `targetSum`, count the number of paths where the sum of the values along the path equals `targetSum`. A path doesn't need to start at the root or end at a leaf, but it must travel only downward (parent to child).

**Example 1:**
```
Input: root = [10,5,-3,3,2,null,11,3,-2,null,1], targetSum = 8
Output: 3
Explanation: the paths are 5->3, 5->2->1, and -3->11.
```

**Example 2:**
```
Input: root = [5,4,8,11,null,13,4,7,2,null,null,5,1], targetSum = 22
Output: 3
```

**Constraints:**
- The number of nodes is in [0, 1000]
- -10^9 <= Node.val <= 10^9
- -1000 <= targetSum <= 1000

## Approach

The brute force is to root a fresh downward-sum search at every single node, checking O(n) starting points each with an O(n) walk, giving O(n^2). Since paths can start anywhere, this works but doesn't scale.

There's a cleaner way that borrows the "prefix sum" idea from subarray sum problems. Do one DFS from the root, tracking the running sum from the root down to the current node. A path from some ancestor `a` down to the current node `c` sums to `targetSum` exactly when `runningSum(c) - runningSum(a) == targetSum`, i.e. `runningSum(a) == runningSum(c) - targetSum`. So at each node, instead of searching for ancestors explicitly, keep a hash map of how many times each prefix sum has occurred among the current node's ancestors (including a base case of prefix sum 0 occurring once, for paths that start at the root itself). Look up `runningSum(c) - targetSum` in that map — however many times it appears is how many valid paths end at the current node.

The map has to be scoped to the current root-to-node chain, not the whole tree, since a path can only use nodes on one straight downward line. That's handled by incrementing the current running sum's count before recursing into children, then decrementing it again after both children return (backtracking) — so sibling subtrees never see each other's prefix sums.

**Time complexity:** O(n) — one DFS pass, O(1) average hash map operations per node.

**Space complexity:** O(n) — the prefix sum map can hold one entry per node on the current root-to-leaf chain, plus O(h) recursion stack.
