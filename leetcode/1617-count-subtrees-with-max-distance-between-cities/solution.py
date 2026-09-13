from typing import List
from collections import deque


class Solution:
    def countSubgraphsForEachDiameter(self, n: int, edges: List[List[int]]) -> List[int]:
        graph = [[] for _ in range(n)]
        for a, b in edges:
            graph[a - 1].append(b - 1)
            graph[b - 1].append(a - 1)

        answer = [0] * (n - 1)

        def bfs_farthest(start: int, mask: int):
            dist = {start: 0}
            queue = deque([start])
            farthest_dist = 0
            while queue:
                u = queue.popleft()
                for v in graph[u]:
                    if (mask & (1 << v)) and v not in dist:
                        dist[v] = dist[u] + 1
                        farthest_dist = max(farthest_dist, dist[v])
                        queue.append(v)
            return dist, farthest_dist

        # n is capped small (<= 15) for exactly this reason: brute force
        # every subset of cities directly.
        for mask in range(1, 1 << n):
            nodes = [i for i in range(n) if mask & (1 << i)]
            if len(nodes) < 2:
                continue

            start = nodes[0]
            dist, _ = bfs_farthest(start, mask)
            if len(dist) != len(nodes):
                continue  # this subset isn't a connected subtree

            # max distance in a tree is found between the two endpoints of
            # its longest path; one BFS from any node finds one endpoint,
            # a second BFS from that endpoint finds the true diameter
            farthest_node = max(dist, key=dist.get)
            _, diameter = bfs_farthest(farthest_node, mask)

            answer[diameter - 1] += 1

        return answer
