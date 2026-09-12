from collections import deque
from typing import List


class Solution:
    def findMinHeightTrees(self, n: int, edges: List[List[int]]) -> List[int]:
        if n == 1:
            return [0]

        graph = [set() for _ in range(n)]
        for a, b in edges:
            graph[a].add(b)
            graph[b].add(a)

        leaves = deque(node for node in range(n) if len(graph[node]) == 1)
        remaining = n

        while remaining > 2:
            leaf_count = len(leaves)
            remaining -= leaf_count
            for _ in range(leaf_count):
                leaf = leaves.popleft()
                neighbor = graph[leaf].pop()
                graph[neighbor].discard(leaf)
                if len(graph[neighbor]) == 1:
                    leaves.append(neighbor)

        return list(leaves)
