from typing import List, Optional


# Definition for a binary tree node.
class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right


class Solution:
    def verticalTraversal(self, root: Optional[TreeNode]) -> List[List[int]]:
        triples = []

        def dfs(node: Optional[TreeNode], row: int, col: int) -> None:
            if node is None:
                return
            triples.append((col, row, node.val))
            dfs(node.left, row + 1, col - 1)
            dfs(node.right, row + 1, col + 1)

        dfs(root, 0, 0)
        triples.sort()

        result = []
        current_col = None
        for col, row, val in triples:
            if col != current_col:
                result.append([])
                current_col = col
            result[-1].append(val)

        return result
