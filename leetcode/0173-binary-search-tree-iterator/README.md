# 173. Binary Search Tree Iterator

Implement an iterator over the in-order traversal of a binary search tree. `BSTIterator(root)` initializes the iterator with the root node. `next()` returns the next smallest number in the BST. `hasNext()` returns `true` if there are more numbers left. Both `next()` and `hasNext()` should run in O(1) average time and use O(h) memory, where h is the tree height.

**Example 1:**
```
Input:
["BSTIterator", "next", "next", "hasNext", "next", "hasNext", "next", "hasNext", "next", "hasNext"]
[[[7, 3, 15, null, null, 9, 20]], [], [], [], [], [], [], [], [], []]
Output:
[null, 3, 7, true, 9, true, 15, true, 20, false]
```

**Constraints:**
- The number of nodes is in the range [1, 10^5]
- 0 <= Node.val <= 10^6
- At most 10^5 calls will be made to `next()` and `hasNext()`

## Approach

Doing a full in-order traversal upfront into a list and just indexing into it works, but it's O(n) space and defeats the point of an "iterator" — it materializes everything immediately instead of producing values lazily.

The O(h) space way to do it is to simulate the *call stack* an in-order traversal would use, but keep only the part of it that's "in progress." Push every left-spine node starting from the root onto a stack — root, root.left, root.left.left, and so on down to the leftmost node. The top of the stack is always the next smallest unvisited value, because everything smaller than it (if anything) is already popped and returned.

`next()` pops the top of the stack — that's the answer to return. Then, since an in-order traversal visits a node's right subtree right after the node itself, push that popped node's right child and then that child's entire left spine onto the stack, so the new top is once again the correct next-smallest value.

`hasNext()` is just checking whether the stack is non-empty.

Each node is pushed and popped from the stack exactly once over the iterator's whole lifetime, so even though a single `next()` call can occasionally walk down a long left spine, the total work across all calls is O(n), which averages out to O(1) per call.

**Time complexity:** O(1) amortized per `next()`/`hasNext()` call; O(h) worst case for a single call that walks down a long spine, but O(n) total across all n calls.

**Space complexity:** O(h) for the stack, where h is the tree height.
