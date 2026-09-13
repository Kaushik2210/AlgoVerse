from typing import List
from collections import deque


class Solution:
    def findShortestCycle(self, n: int, edges: List[List[int]]) -> int:
        graph = [[] for _ in range(n)]
        for a, b in edges:
            graph[a].append(b)
            graph[b].append(a)

        best = float('inf')

        # Run a BFS rooted at every node. Any edge found connecting two
        # already-visited nodes (other than the tree edge to the node's own
        # parent) closes a cycle whose length is the sum of both nodes'
        # BFS depths plus that one connecting edge.
        for start in range(n):
            dist = [-1] * n
            parent = [-1] * n
            dist[start] = 0
            queue = deque([start])

            while queue:
                u = queue.popleft()
                for v in graph[u]:
                    if dist[v] == -1:
                        dist[v] = dist[u] + 1
                        parent[v] = u
                        queue.append(v)
                    elif v != parent[u]:
                        best = min(best, dist[u] + dist[v] + 1)

        return -1 if best == float('inf') else best
