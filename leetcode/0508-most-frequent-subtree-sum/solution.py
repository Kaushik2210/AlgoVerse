from typing import List, Optional
from collections import defaultdict


# Definition for a binary tree node.
class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right


class Solution:
    def findFrequentTreeSum(self, root: Optional[TreeNode]) -> List[int]:
        counts = defaultdict(int)

        def dfs(node):
            if node is None:
                return 0
            total = node.val + dfs(node.left) + dfs(node.right)
            counts[total] += 1
            return total

        dfs(root)
        if not counts:
            return []

        max_freq = max(counts.values())
        return [s for s, freq in counts.items() if freq == max_freq]
