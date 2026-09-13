from typing import List, Optional
from collections import defaultdict


# Definition for a binary tree node.
class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right


class Solution:
    def findDuplicateSubtrees(self, root: Optional[TreeNode]) -> List[Optional[TreeNode]]:
        counts = defaultdict(int)
        result = []

        def serialize(node: Optional[TreeNode]) -> str:
            if node is None:
                return '#'

            left = serialize(node.left)
            right = serialize(node.right)
            key = f'{node.val},{left},{right}'

            counts[key] += 1
            if counts[key] == 2:
                result.append(node)

            return key

        serialize(root)
        return result
