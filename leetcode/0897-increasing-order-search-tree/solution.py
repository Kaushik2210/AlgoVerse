from typing import Optional


# Definition for a binary tree node.
class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right


class Solution:
    def increasingBST(self, root: Optional[TreeNode]) -> Optional[TreeNode]:
        dummy = TreeNode()
        self.prev = dummy

        def inorder(node: Optional[TreeNode]) -> None:
            if node is None:
                return
            inorder(node.left)
            node.left = None
            self.prev.right = node
            self.prev = node
            inorder(node.right)

        inorder(root)
        return dummy.right
