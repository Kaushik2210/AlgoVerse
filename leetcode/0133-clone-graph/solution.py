from typing import Optional


# Definition for a graph node.
class Node:
    def __init__(self, val=0, neighbors=None):
        self.val = val
        self.neighbors = neighbors if neighbors is not None else []


class Solution:
    def cloneGraph(self, node: Optional['Node']) -> Optional['Node']:
        if node is None:
            return None

        cloned = {}

        def dfs(orig: 'Node') -> 'Node':
            if orig in cloned:
                return cloned[orig]

            copy = Node(orig.val)
            cloned[orig] = copy
            for neighbor in orig.neighbors:
                copy.neighbors.append(dfs(neighbor))

            return copy

        return dfs(node)
