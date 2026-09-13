from typing import List, Optional


# Definition for a binary tree node.
class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right


class Solution:
    def constructMaximumBinaryTree(self, nums: List[int]) -> Optional[TreeNode]:
        def build(lo, hi):
            if lo > hi:
                return None

            max_idx = lo
            for i in range(lo + 1, hi + 1):
                if nums[i] > nums[max_idx]:
                    max_idx = i

            node = TreeNode(nums[max_idx])
            node.left = build(lo, max_idx - 1)
            node.right = build(max_idx + 1, hi)
            return node

        return build(0, len(nums) - 1)
