# 951. Flip Equivalent Binary Trees

**Commonly asked at:** Amazon, Google, Microsoft

A binary tree can be transformed by picking any nodes and swapping their left and right children, any number of times. Given the roots of two binary trees `root1` and `root2`, return whether one can be turned into the other through some sequence of such flips.

**Example 1:**
```
Input: root1 = [1,2,3,4,5,6,null,null,null,7,8], root2 = [1,3,2,null,6,4,5,null,null,7,8]
Output: true
Explanation: flipping the children of node 1 and node 5 in root1 produces root2.
```

**Example 2:**
```
Input: root1 = [], root2 = []
Output: true
```

**Example 3:**
```
Input: root1 = [], root2 = [1]
Output: false
```

**Constraints:**
- The number of nodes in each tree is in the range `[0, 100]`
- Node values are unique integers in the range `[0, 99]`

## Approach

This is a recursive tree comparison where, at every node, there are two ways the subtrees could still line up: either they match straight across (root1's left matches root2's left, and root1's right matches root2's right), or root2 has been flipped at this node (root1's left matches root2's right, and root1's right matches root2's left). Either possibility, checked recursively all the way down, counts as flip-equivalent — flips can happen at any node independently, so there's no need to decide globally whether "this side is flipped"; each node's comparison figures out its own best match on the fly.

Base cases: two `None` nodes are trivially equivalent; one `None` and one real node can never be equivalent; two real nodes with different values can never be equivalent regardless of how their children are arranged.

Otherwise, recursively check both pairings (straight and swapped) and return true if either one holds all the way down both subtrees.

**Time complexity:** O(min(n1, n2)) — the recursion can only descend as deep as both trees together allow, and it stops as soon as a mismatch is found; in the worst case (fully equivalent trees) it's O(n) where n is the number of nodes.

**Space complexity:** O(min(h1, h2)) for the recursion stack, bounded by the smaller tree's height.
