from typing import List
from collections import deque


class Solution:
    def getAncestors(self, n: int, edges: List[List[int]]) -> List[List[int]]:
        children = [[] for _ in range(n)]
        in_degree = [0] * n
        for u, v in edges:
            children[u].append(v)
            in_degree[v] += 1

        ancestors = [set() for _ in range(n)]

        queue = deque(v for v in range(n) if in_degree[v] == 0)
        while queue:
            u = queue.popleft()
            for v in children[u]:
                # v inherits u itself plus everything u already inherited
                ancestors[v].add(u)
                ancestors[v].update(ancestors[u])
                in_degree[v] -= 1
                if in_degree[v] == 0:
                    queue.append(v)

        return [sorted(s) for s in ancestors]
