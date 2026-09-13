from typing import List
from collections import defaultdict, deque


class Solution:
    def sequenceReconstruction(self, nums: List[int], sequences: List[List[int]]) -> bool:
        n = len(nums)
        graph = defaultdict(set)
        in_degree = {v: 0 for v in range(1, n + 1)}
        seen = set()

        for seq in sequences:
            for v in seq:
                seen.add(v)
            for a, b in zip(seq, seq[1:]):
                if b not in graph[a]:
                    graph[a].add(b)
                    in_degree[b] += 1

        # Every value 1..n must actually show up somewhere in sequences,
        # otherwise nums can't be reconstructed from them at all.
        if seen != set(range(1, n + 1)):
            return False

        queue = deque([v for v in range(1, n + 1) if in_degree[v] == 0])
        order = []

        while queue:
            # For the reconstruction to be unique, there must be exactly one
            # choice available at every step of the topological sort.
            if len(queue) != 1:
                return False
            v = queue.popleft()
            order.append(v)
            for nxt in graph[v]:
                in_degree[nxt] -= 1
                if in_degree[nxt] == 0:
                    queue.append(nxt)

        return order == nums
