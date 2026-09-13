from typing import Optional


# Definition for a binary tree node.
class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right


class Solution:
    def diameterOfBinaryTree(self, root: Optional[TreeNode]) -> int:
        self.best = 0

        def depth(node: Optional[TreeNode]) -> int:
            if node is None:
                return 0
            left = depth(node.left)
            right = depth(node.right)
            self.best = max(self.best, left + right)
            return 1 + max(left, right)

        depth(root)
        return self.best
