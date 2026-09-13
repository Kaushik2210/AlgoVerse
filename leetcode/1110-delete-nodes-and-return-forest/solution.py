from typing import List, Optional


# Definition for a binary tree node.
class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right


class Solution:
    def delNodes(self, root: Optional[TreeNode], to_delete: List[int]) -> List[TreeNode]:
        to_delete_set = set(to_delete)
        result = []

        def dfs(node, is_root):
            if node is None:
                return None

            deleted = node.val in to_delete_set
            # a node becomes a new tree root if it survives and its parent link
            # is about to be cut off (either it's the overall root, or its
            # parent was deleted)
            if is_root and not deleted:
                result.append(node)

            node.left = dfs(node.left, deleted)
            node.right = dfs(node.right, deleted)

            return None if deleted else node

        dfs(root, True)
        return result
