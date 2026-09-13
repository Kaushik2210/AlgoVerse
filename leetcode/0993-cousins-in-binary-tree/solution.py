from typing import Optional
from collections import deque


# Definition for a binary tree node.
class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right


class Solution:
    def isCousins(self, root: Optional[TreeNode], x: int, y: int) -> bool:
        queue = deque([(root, None)])

        while queue:
            level_size = len(queue)
            found = []

            for _ in range(level_size):
                node, parent = queue.popleft()
                if node.val == x or node.val == y:
                    found.append(parent)
                if node.left:
                    queue.append((node.left, node))
                if node.right:
                    queue.append((node.right, node))

            if len(found) == 2:
                return found[0] is not found[1]
            if len(found) == 1:
                return False

        return False
