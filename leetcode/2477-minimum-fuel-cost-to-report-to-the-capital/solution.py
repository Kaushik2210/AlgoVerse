from typing import List


class Solution:
    def minimumFuelCost(self, roads: List[List[int]], seats: int) -> int:
        n = len(roads) + 1
        graph = [[] for _ in range(n)]
        for a, b in roads:
            graph[a].append(b)
            graph[b].append(a)

        subtree_size = [1] * n
        total_fuel = 0

        # Iterative DFS from the capital (node 0), processed in post-order so
        # a node's subtree size (how many representatives pass up through
        # the edge to its parent) is finalized before that edge's cost is
        # charged, and so a 10^5-node tree can't blow a recursive call stack.
        parent = [-1] * n
        order = []
        stack = [0]
        visited = [False] * n
        visited[0] = True
        while stack:
            u = stack.pop()
            order.append(u)
            for v in graph[u]:
                if not visited[v]:
                    visited[v] = True
                    parent[v] = u
                    stack.append(v)

        for u in reversed(order):
            if parent[u] != -1:
                subtree_size[parent[u]] += subtree_size[u]
                # every representative in u's subtree needs a car ride
                # across this one edge, ceil-divided into car-loads
                total_fuel += -(-subtree_size[u] // seats)

        return total_fuel
