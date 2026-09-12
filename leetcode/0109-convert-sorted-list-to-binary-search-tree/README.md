# 109. Convert Sorted List to Binary Search Tree

Given the head of a singly linked list where elements are sorted in ascending order, convert it to a height-balanced binary search tree.

**Example 1:**
```
Input: head = [-10,-3,0,5,9]
Output: [0,-3,9,-10,null,5]
Explanation: One valid balanced BST from this list is [0,-3,9,-10,null,5,null,null,null,null,null].
```

**Example 2:**
```
Input: head = []
Output: []
```

**Constraints:**
- The number of nodes is in the range [0, 2 * 10^4]

## Approach

A sorted array converts to a height-balanced BST naturally by always picking the middle element as the root — that guarantees the left and right subtrees carry roughly equal amounts of the remaining data, which is exactly what height-balance requires. The same idea applies to a sorted linked list, but finding "the middle" isn't a free O(1) index lookup like it is with an array — you have to walk the list.

Find the middle node with the classic slow/fast pointer technique: advance `slow` one step and `fast` two steps at a time; when `fast` runs off the end, `slow` sits on the middle. That middle node becomes the root of this subtree. Then recurse: the sublist strictly before the middle becomes the left subtree, and the sublist strictly after the middle becomes the right subtree. To split there, track the node just before `slow` while finding the middle, and cut its `next` pointer to null — that terminates the left half's list so the recursive call doesn't wander into the right half.

Each recursive call re-scans its sublist to find its own middle, so the total work across all levels comes out to O(n log n) rather than O(n) (an array-based approach with a passed `[l, r]` index range would be O(n), but for a linked list, re-walking is unavoidable without first converting to an array or a value list). An equivalent, often cleaner alternative is to first collect all values into a list (O(n)), then build the balanced BST from the array by index-splitting in O(n) — trading a bit of extra space for a tidier, faster recursion. The pointer-splitting version below favors O(1) extra space (besides recursion) over raw speed.

**Time complexity:** O(n log n) — at each of the O(log n) levels of recursion, finding the middle of a sublist of length k costs O(k), and the sublist lengths at each level sum to n.

**Space complexity:** O(log n) for the recursion stack (height-balanced tree), not counting the output tree itself.
