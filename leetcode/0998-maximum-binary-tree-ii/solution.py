from typing import Optional


# Definition for a binary tree node.
class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right


class Solution:
    def insertIntoMaxTree(self, root: Optional[TreeNode], val: int) -> Optional[TreeNode]:
        if root is None:
            return TreeNode(val)

        if val > root.val:
            # val becomes the new overall max, so it becomes the new root,
            # and the whole previous tree hangs off its left (everything in
            # it came before val in the original array)
            new_node = TreeNode(val)
            new_node.left = root
            return new_node

        # val belongs somewhere in the right subtree, since it was appended
        # after everything already in this tree
        root.right = self.insertIntoMaxTree(root.right, val)
        return root
