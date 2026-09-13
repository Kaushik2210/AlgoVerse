from typing import List, Optional


# Definition for a binary tree node.
class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right


class Solution:
    def bstFromPreorder(self, preorder: List[int]) -> Optional[TreeNode]:
        self.i = 0

        def build(bound: int) -> Optional[TreeNode]:
            if self.i == len(preorder) or preorder[self.i] > bound:
                return None
            node = TreeNode(preorder[self.i])
            self.i += 1
            node.left = build(node.val)
            node.right = build(bound)
            return node

        return build(float('inf'))
