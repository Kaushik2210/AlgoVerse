from typing import Optional


# Definition for a binary tree node.
class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right


class Solution:
    def longestConsecutive(self, root: Optional[TreeNode]) -> int:
        best = 0

        def dfs(node):
            nonlocal best
            if node is None:
                return 0
            length = 1
            for child in (node.left, node.right):
                if child is not None and child.val == node.val + 1:
                    length = max(length, 1 + dfs(child))
                else:
                    dfs(child)
            best = max(best, length)
            return length

        dfs(root)
        return best
