from typing import Optional
from collections import deque


# Definition for a binary tree node.
class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right


class Solution:
    def widthOfBinaryTree(self, root: Optional[TreeNode]) -> int:
        if root is None:
            return 0

        max_width = 0
        queue = deque([(root, 0)])

        while queue:
            level_size = len(queue)
            _, first_index = queue[0]
            last_index = first_index

            for _ in range(level_size):
                node, index = queue.popleft()
                index -= first_index  # re-base to avoid overflow
                last_index = index

                if node.left:
                    queue.append((node.left, 2 * index))
                if node.right:
                    queue.append((node.right, 2 * index + 1))

            max_width = max(max_width, last_index + 1)

        return max_width
