from typing import List, Optional


# Definition for a binary tree node.
class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right


class Solution:
    def boundaryOfBinaryTree(self, root: Optional[TreeNode]) -> List[int]:
        if root is None:
            return []

        def is_leaf(node: TreeNode) -> bool:
            return node.left is None and node.right is None

        result = []

        if not is_leaf(root):
            result.append(root.val)

        # Left boundary, excluding leaves.
        node = root.left
        while node is not None:
            if not is_leaf(node):
                result.append(node.val)
            node = node.left if node.left is not None else node.right

        # All leaves, left to right.
        def collect_leaves(node: Optional[TreeNode]) -> None:
            if node is None:
                return
            if is_leaf(node):
                result.append(node.val)
                return
            collect_leaves(node.left)
            collect_leaves(node.right)

        collect_leaves(root)

        # Right boundary, excluding leaves, collected top-down then reversed.
        right_boundary = []
        node = root.right
        while node is not None:
            if not is_leaf(node):
                right_boundary.append(node.val)
            node = node.right if node.right is not None else node.left

        result.extend(reversed(right_boundary))

        return result
