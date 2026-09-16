# 100. Same Tree

**Commonly asked at:** Amazon, Bloomberg

You're given the roots of two binary trees `p` and `q`. Return `true` if the two trees are structurally identical and every corresponding node holds the same value, otherwise return `false`.

**Example 1:**
```
Input: p = [1,2,3], q = [1,2,3]
Output: true
```

**Example 2:**
```
Input: p = [1,2], q = [1,null,2]
Output: false
Explanation: Same values but different shapes.
```

**Example 3:**
```
Input: p = [1,2,1], q = [1,1,2]
Output: false
Explanation: Same shape but different values.
```

**Constraints:**
- The number of nodes in both trees is in the range [0, 100]
- -10^4 <= Node.val <= 10^4

## Approach

The brute force instinct is to serialize both trees and compare the strings, but that's more machinery than the problem needs.

Compare the trees the same way they're built: recursively, from the root down. Two trees rooted at `p` and `q` are the same exactly when:
- both are `null` (trivially equal), or
- both are non-null, their values match, AND their left subtrees are the same, AND their right subtrees are the same.

If one is `null` and the other isn't, or the values differ, they can't be equal — return `false` immediately. Otherwise recurse into the left and right children and require both recursive calls to succeed. This is just a synchronized preorder walk of both trees at once, bailing out at the first mismatch.

**Time complexity:** O(min(n, m)) where n and m are the node counts — the walk stops as soon as it finds a structural or value mismatch, and in the matching case it visits every node of the smaller (here, equal-sized) tree once.

**Space complexity:** O(h) for the recursion stack, where h is the height of the tree (O(n) worst case for a skewed tree, O(log n) for a balanced one).
