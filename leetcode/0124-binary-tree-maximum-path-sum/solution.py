from typing import Optional


# Definition for a binary tree node.
class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right


class Solution:
    def maxPathSum(self, root: Optional[TreeNode]) -> int:
        self.best = float("-inf")

        def dfs(node: Optional[TreeNode]) -> int:
            if node is None:
                return 0

            left = max(dfs(node.left), 0)
            right = max(dfs(node.right), 0)

            self.best = max(self.best, node.val + left + right)

            return node.val + max(left, right)

        dfs(root)
        return self.best
