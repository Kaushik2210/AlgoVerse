from typing import List, Optional


# Definition for a binary tree node.
class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right


class Solution:
    def isValidSequence(self, root: Optional[TreeNode], arr: List[int]) -> bool:
        def dfs(node, i):
            if node is None or i >= len(arr) or node.val != arr[i]:
                return False
            if i == len(arr) - 1:
                return node.left is None and node.right is None
            return dfs(node.left, i + 1) or dfs(node.right, i + 1)

        return dfs(root, 0)
