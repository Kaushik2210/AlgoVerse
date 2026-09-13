# 1430. Check If a String Is a Valid Sequence from Root to Leaves Path in a Binary Tree

> **Note:** This is a LeetCode premium problem, so it can't be opened or submitted on a free account. Solved and verified independently against hand-built test cases.

You're given the root of a binary tree and an array `arr`. Return `true` if `arr` represents the values along some root-to-**leaf** path in the tree, in order — meaning the path must actually end at a leaf (a node with no children), not just stop partway through the tree.

**Example 1:**
```
Input: root = [0,1,0,0,1,0,null,null,1,0,0], arr = [0,1,0,1]
Output: true
Explanation: The path 0 -> 1 -> 0 -> 1 exists and ends at a leaf.
```

**Example 2:**
```
Input: root = [0,1,0,0,1,0,null,null,1,0,0], arr = [0,0,1]
Output: false
Explanation: Following 0 -> 0 reaches a node whose only child has value 0, not 1, so no root-to-leaf path spells out 0, 0, 1.
```

**Example 3:**
```
Input: root = [0,1,0,0,1,0,null,null,1,0,0], arr = [0,1,1]
Output: false
Explanation: The path 0 -> 1 -> 1 does not exist as a root-to-leaf path.
```

**Constraints:**
- The number of nodes in the tree is in the range [1, 5000]
- 0 <= Node.val <= 9
- 1 <= arr.length <= 5000
- 0 <= arr[i] <= 9

## Approach

This is a direct depth-first search with two extra conditions beyond a normal "does this path exist" check. Walk the tree and the array in lockstep, one index at a time:

- If the current node is missing, or we've run past the end of `arr`, or the node's value doesn't match `arr[i]`, the path is broken — return false immediately.
- If `i` is the *last* index of `arr`, this node has to actually be a leaf for the sequence to count — matching the values isn't enough if the path keeps going past where `arr` ends, and it isn't enough if the path ends before `arr` does either (that's covered by the node-missing check above). So require `node.left is None and node.right is None`.
- Otherwise, recurse into both children at `i + 1` and return true if either branch works — the sequence only has to exist along *some* root-to-leaf path, not every path.

Because the search stops as soon as a value mismatches, it never explores subtrees that can't possibly match, so in practice it's much faster than a full O(nodes) traversal on most inputs, though the worst case is still bounded by the size of the tree.

**Time complexity:** O(n) where n is the number of nodes in the tree — each node is visited at most once.

**Space complexity:** O(h) for the recursion stack, where h is the height of the tree (worst case O(n) for a skewed tree).
