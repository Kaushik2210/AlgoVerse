from typing import Optional


# Definition for a binary tree node.
class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right


class Solution:
    def flatten(self, root: Optional[TreeNode]) -> None:
        node = root

        while node:
            if node.left:
                # find the rightmost node of the left subtree
                rightmost = node.left
                while rightmost.right:
                    rightmost = rightmost.right

                # graft the original right subtree onto that rightmost node
                rightmost.right = node.right

                # the left subtree becomes the new right subtree, left is cleared
                node.right = node.left
                node.left = None

            node = node.right
