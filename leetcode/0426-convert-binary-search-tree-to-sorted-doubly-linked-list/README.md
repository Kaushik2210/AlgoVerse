# 426. Convert Binary Search Tree to Sorted Doubly Linked List

*Note: this is a LeetCode Premium (subscriber-only) problem, not freely accessible on LeetCode. It's included here anyway because the in-order-traversal-plus-pointer-rewiring technique is a very common tree/linked-list crossover interview question.*

Convert a Binary Search Tree into a sorted **circular doubly linked list**, in place. Each node's `left` pointer should point to its predecessor and its `right` pointer should point to its successor, forming a circle (the smallest node's `left` points to the largest, and the largest node's `right` points to the smallest). Return a pointer to the smallest node.

**Example 1:**
```
Input: root = [4,2,5,1,3]
     4
    / \
   2   5
  / \
 1   3

Output: a circular doubly linked list 1 <-> 2 <-> 3 <-> 4 <-> 5 <-> (back to 1)
Returned pointer: node with value 1
```

**Example 2:**
```
Input: root = [2,1,3]
Output: circular doubly linked list 1 <-> 2 <-> 3 <-> (back to 1)
```

**Constraints:**
- The number of nodes in the tree is in the range [0, 2000]
- -1000 <= Node.val <= 1000
- All values are unique

## Approach

An in-order traversal of a BST visits nodes in ascending sorted order — exactly the order the final linked list needs. So the plan is: do an in-order traversal, and instead of collecting values, rewire each node's `left`/`right` pointers on the fly to link it to the previously-visited node and vice versa.

Keep a `last` pointer to the most recently visited (i.e., second-to-last-in-sorted-order-so-far) node, starting as `None`. During the in-order walk, when visiting node `cur`:
- if `last` exists, link `last.right = cur` and `cur.left = last` (connect the previous node to this one);
- also remember the very first node visited — that becomes the head of the list (and the tail's `right` needs to eventually wrap to it);
- update `last = cur` and continue into the right subtree.

After the traversal finishes, `last` is the largest node and `first` is the smallest — close the circle by setting `last.right = first` and `first.left = last`.

This reuses the tree's own `left`/`right` fields as the list's `prev`/`next` fields, so no extra nodes are allocated — the tree is transformed into the list structure in place.

**Time complexity:** O(n) — every node is visited exactly once.

**Space complexity:** O(h) for the recursion stack, where h is the tree height (O(log n) balanced, O(n) worst case skewed).
