from typing import Optional


# Definition for a binary tree node.
class Node:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right


class Solution:
    def treeToDoublyList(self, root: Optional['Node']) -> Optional['Node']:
        if not root:
            return None

        self.first = None
        self.last = None

        def inorder(node: Optional['Node']) -> None:
            if not node:
                return
            inorder(node.left)

            if self.last:
                self.last.right = node
                node.left = self.last
            else:
                self.first = node
            self.last = node

            inorder(node.right)

        inorder(root)

        # close the circle
        self.last.right = self.first
        self.first.left = self.last

        return self.first
