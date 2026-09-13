from typing import Optional


# Definition for a binary tree node.
class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right


class Solution:
    def findSecondMinimumValue(self, root: Optional[TreeNode]) -> int:
        if root is None:
            return -1
        root_val = root.val

        def dfs(node: Optional[TreeNode]) -> int:
            if node is None:
                return -1
            if node.val != root_val:
                return node.val
            left = dfs(node.left)
            right = dfs(node.right)
            if left == -1:
                return right
            if right == -1:
                return left
            return min(left, right)

        return dfs(root)
