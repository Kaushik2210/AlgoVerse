from typing import Optional


# Definition for a binary tree node.
class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right


class Solution:
    def recoverTree(self, root: Optional[TreeNode]) -> None:
        """
        Do not return anything, modify root in-place instead.
        """
        first = second = prev = None
        stack = []
        node = root

        while stack or node is not None:
            while node is not None:
                stack.append(node)
                node = node.left

            node = stack.pop()

            if prev is not None and prev.val > node.val:
                if first is None:
                    first = prev
                second = node
            prev = node

            node = node.right

        if first is not None and second is not None:
            first.val, second.val = second.val, first.val
