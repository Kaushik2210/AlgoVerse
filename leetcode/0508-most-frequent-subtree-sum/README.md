# 508. Most Frequent Subtree Sum

**Commonly asked at:** Amazon, Microsoft, Bloomberg

> **Note:** This is a LeetCode premium problem, so it can't be opened or submitted on a free account. Solved and verified independently against hand-built test cases.

Given the root of a binary tree, find the sum of values in every subtree (a subtree rooted at any node, including single-node subtrees). Return all sum values that occur with the highest frequency, in any order.

**Example 1:**
```
Input: root = [5,2,-3]
Output: [2,-3,4]
Explanation: Every subtree sum (2, -3, and 5+2-3=4) occurs exactly once, so all are equally frequent.
```

**Example 2:**
```
Input: root = [5,2,-5]
Output: [2]
Explanation: Subtree sums are 2, -5, and 5+2-5=2. The sum 2 occurs twice (the leaf and the whole tree), more than any other.
```

**Constraints:**
- The number of nodes in the tree is in the range [1, 10^4]
- -10^5 <= Node.val <= 10^5

## Approach

A post-order DFS naturally computes the subtree sum at every node: the sum rooted at a node is its own value plus the sums of its left and right subtrees, which are only known once those subtrees have already been visited. So recurse into both children first, add up `node.val + leftSum + rightSum`, and that's the sum for this subtree.

While computing each subtree sum, tally it in a hash map counting how many times each sum value has appeared across the whole tree. Once every node's subtree sum has been counted, find the maximum frequency in the map, then collect every sum whose frequency matches that maximum — there can be ties, which is why the answer is a list rather than a single value.

**Time complexity:** O(n) — one post-order pass to compute all subtree sums, plus a linear pass over the frequency map (which has at most n distinct entries).

**Space complexity:** O(n) for the frequency map and the recursion stack.
