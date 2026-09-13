from typing import Optional


# Definition for a binary tree node.
class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right


class Solution:
    def rob(self, root: Optional[TreeNode]) -> int:
        def helper(node: Optional[TreeNode]):
            if node is None:
                return (0, 0)  # (robbed, not_robbed)

            left_robbed, left_not = helper(node.left)
            right_robbed, right_not = helper(node.right)

            robbed = node.val + left_not + right_not
            not_robbed = max(left_robbed, left_not) + max(right_robbed, right_not)

            return (robbed, not_robbed)

        return max(helper(root))
