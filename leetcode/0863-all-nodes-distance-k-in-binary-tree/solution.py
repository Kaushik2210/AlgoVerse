from typing import List, Optional
from collections import deque


# Definition for a binary tree node.
class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right


class Solution:
    def distanceK(
        self, root: TreeNode, target: TreeNode, k: int
    ) -> List[int]:
        parent = {}

        def build_parents(node: Optional[TreeNode], par: Optional[TreeNode]) -> None:
            if node is None:
                return
            parent[node] = par
            build_parents(node.left, node)
            build_parents(node.right, node)

        build_parents(root, None)

        visited = {target}
        queue = deque([target])
        distance = 0

        while queue and distance < k:
            for _ in range(len(queue)):
                node = queue.popleft()
                for neighbor in (node.left, node.right, parent[node]):
                    if neighbor is not None and neighbor not in visited:
                        visited.add(neighbor)
                        queue.append(neighbor)
            distance += 1

        return [node.val for node in queue]
