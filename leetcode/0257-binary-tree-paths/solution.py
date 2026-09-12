from typing import List, Optional


# Definition for a binary tree node.
class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right


class Solution:
    def binaryTreePaths(self, root: Optional[TreeNode]) -> List[str]:
        paths = []

        def dfs(node: Optional[TreeNode], path: str) -> None:
            if node is None:
                return

            current = path + str(node.val) if not path else path + "->" + str(node.val)

            if node.left is None and node.right is None:
                paths.append(current)
                return

            dfs(node.left, current)
            dfs(node.right, current)

        dfs(root, "")
        return paths
