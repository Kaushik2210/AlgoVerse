# 108. Convert Sorted Array to Binary Search Tree

Given an integer array `nums` sorted in ascending order, convert it into a height-balanced binary search tree — one where, for every node, the depths of its two subtrees differ by no more than one.

**Example 1:**
```
Input: nums = [-10,-3,0,5,9]
Output: [0,-3,9,-10,null,5]
Explanation: [0,-10,5,null,-3,null,9] is also accepted.
```

**Example 2:**
```
Input: nums = [1,3]
Output: [3,1] or [1,null,3]
```

**Constraints:**
- 1 <= nums.length <= 10^4
- nums is sorted in strictly increasing order

## Approach

Since the array is already sorted, any contiguous slice of it, treated as a BST, needs its middle element as the root — everything to the left of the middle is smaller and becomes the left subtree, everything to the right is bigger and becomes the right subtree. That's just the BST property falling out naturally from the array already being in order.

Balance comes for free if you always pick the actual middle: splitting a range of length `k` down the middle guarantees the two halves differ in size by at most one, which is exactly the height-balanced condition applied recursively at every level. So the algorithm is straightforward recursion: given a range `[lo, hi]` of the array, pick `mid = (lo + hi) // 2` as the current node's value, then recurse on `[lo, mid - 1]` for the left child and `[mid + 1, hi]` for the right child. The base case is an empty range, which produces `null`.

No searching or comparisons are needed at all — the sortedness of the input does all the work, you're just repeatedly bisecting it.

**Time complexity:** O(n) — every element becomes exactly one node, visited once.

**Space complexity:** O(log n) for the recursion stack on a balanced tree (not counting the O(n) output tree itself).
