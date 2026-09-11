# 94. Binary Tree Inorder Traversal

Given the root of a binary tree, return the values of its nodes visited in inorder (left subtree, then the node itself, then right subtree).

**Example 1:**
```
Input: root = [1,null,2,3]
Output: [1,3,2]
```

**Example 2:**
```
Input: root = []
Output: []
```

**Example 3:**
```
Input: root = [1]
Output: [1]
```

**Constraints:**
- The number of nodes in the tree is in the range [0, 100]
- -100 <= Node.val <= 100

## Approach

The recursive definition of inorder is literally the traversal order: recurse left, visit the node, recurse right. That's the simplest correct solution and it's worth writing first.

```
inorder(node):
    if node is None: return
    inorder(node.left)
    visit(node.val)
    inorder(node.right)
```

LeetCode also likes to ask for this iteratively, using an explicit stack instead of the call stack — useful since Python's recursion depth is capped and it's a common follow-up. The idea: keep pushing left children onto a stack until you hit `None`. Then pop a node, visit it, and move to its right child (pushing that subtree's left spine next). This mirrors exactly what the recursive call stack would have done.

```
stack = []
current = root
result = []
while stack or current:
    while current:
        stack.append(current)
        current = current.left
    current = stack.pop()
    result.append(current.val)
    current = current.right
```

**Time complexity:** O(n) — every node is visited exactly once.

**Space complexity:** O(h) for the call stack / explicit stack, where h is the tree's height (O(n) worst case for a skewed tree, O(log n) for a balanced one). Not counting the O(n) output list.
