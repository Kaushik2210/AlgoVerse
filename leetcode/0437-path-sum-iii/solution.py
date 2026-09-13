from collections import defaultdict
from typing import Optional


# Definition for a binary tree node.
class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right


class Solution:
    def pathSum(self, root: Optional[TreeNode], targetSum: int) -> int:
        prefix_counts = defaultdict(int)
        prefix_counts[0] = 1
        count = 0

        def dfs(node: Optional[TreeNode], running_sum: int) -> None:
            nonlocal count
            if node is None:
                return
            running_sum += node.val
            count += prefix_counts[running_sum - targetSum]
            prefix_counts[running_sum] += 1
            dfs(node.left, running_sum)
            dfs(node.right, running_sum)
            prefix_counts[running_sum] -= 1

        dfs(root, 0)
        return count
