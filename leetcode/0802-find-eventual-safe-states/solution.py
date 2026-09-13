from typing import List
from collections import deque


class Solution:
    def eventualSafeNodes(self, graph: List[List[int]]) -> List[int]:
        n = len(graph)
        reverse = [[] for _ in range(n)]
        out_degree = [0] * n

        for u in range(n):
            out_degree[u] = len(graph[u])
            for v in graph[u]:
                reverse[v].append(u)

        # A node with no outgoing edges is trivially safe (terminal node).
        # Work backward: a node becomes safe once every node it points to
        # has been confirmed safe, i.e. its out-degree in the "still
        # unresolved" graph drops to 0.
        queue = deque(u for u in range(n) if out_degree[u] == 0)
        safe = [False] * n

        while queue:
            u = queue.popleft()
            safe[u] = True
            for p in reverse[u]:
                out_degree[p] -= 1
                if out_degree[p] == 0:
                    queue.append(p)

        return [u for u in range(n) if safe[u]]
