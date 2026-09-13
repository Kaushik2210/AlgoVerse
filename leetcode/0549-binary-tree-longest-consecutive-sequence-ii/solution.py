from typing import Optional


# Definition for a binary tree node.
class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right


class Solution:
    def longestConsecutive(self, root: Optional[TreeNode]) -> int:
        best = 0

        def dfs(node):
            nonlocal best
            if node is None:
                return 0, 0  # (longest increasing run down, longest decreasing run down)

            incr = decr = 1
            for child in (node.left, node.right):
                if child is None:
                    continue
                child_incr, child_decr = dfs(child)
                if child.val == node.val + 1:
                    incr = max(incr, 1 + child_incr)
                elif child.val == node.val - 1:
                    decr = max(decr, 1 + child_decr)

            # a path can bend at this node: come up increasing from one
            # side and continue down decreasing on the other
            best = max(best, incr + decr - 1)
            return incr, decr

        dfs(root)
        return best
