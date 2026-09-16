# 701. Insert into a Binary Search Tree

**Commonly asked at:** Amazon, Microsoft

You're given the root of a binary search tree and a value `val`. Insert `val` into the tree so the result is still a valid BST, and return the root. There can be multiple valid trees after the insertion — any of them is acceptable.

**Example 1:**
```
Input: root = [4,2,7,1,3], val = 5
Output: [4,2,7,1,3,5]
```

**Example 2:**
```
Input: root = [40,20,60,10,30,50,70], val = 25
Output: [40,20,60,10,30,50,70,null,null,25]
```

**Example 3:**
```
Input: root = [], val = 5
Output: [5]
```

**Constraints:**
- The number of nodes is in the range [0, 10^4]
- All node values are unique
- -10^8 <= Node.val, val <= 10^8

## Approach

Since a new value only needs to land *somewhere* that keeps the BST property valid — not in any particular spot — the simplest place to put it is wherever a search for it would "fall off" the tree.

Walk down from the root the same way a BST lookup would: if `val` is less than the current node's value, go left; if greater, go right. Because all values are guaranteed unique, `val` will never equal an existing node, so this walk always terminates by reaching a `null` child slot rather than finding a match. That null slot is exactly the correct place to attach a new leaf node holding `val`, since everything in the path down to it already confirms it belongs there relative to every ancestor.

If the tree is empty to begin with, the new node just becomes the root.

**Time complexity:** O(h) where h is the tree height — one walk down from the root to find the insertion point.

**Space complexity:** O(h) for the recursion stack (O(1) if done iteratively).
