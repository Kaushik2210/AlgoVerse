from typing import List, Optional


# Definition for a binary tree node.
class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right


class Solution:
    def pathSum(self, root: Optional[TreeNode], targetSum: int) -> List[List[int]]:
        result = []
        path = []

        def dfs(node: Optional[TreeNode], remaining: int) -> None:
            if node is None:
                return

            path.append(node.val)
            remaining -= node.val

            if node.left is None and node.right is None and remaining == 0:
                result.append(path[:])
            else:
                dfs(node.left, remaining)
                dfs(node.right, remaining)

            path.pop()

        dfs(root, targetSum)
        return result
