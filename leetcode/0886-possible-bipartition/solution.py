from collections import deque
from typing import List


class Solution:
    def possibleBipartition(self, n: int, dislikes: List[List[int]]) -> bool:
        graph = [[] for _ in range(n + 1)]
        for a, b in dislikes:
            graph[a].append(b)
            graph[b].append(a)

        group = [0] * (n + 1)  # 0 = unassigned, 1 or -1 = the two groups

        for start in range(1, n + 1):
            if group[start] != 0:
                continue
            group[start] = 1
            queue = deque([start])
            while queue:
                person = queue.popleft()
                for neighbor in graph[person]:
                    if group[neighbor] == 0:
                        group[neighbor] = -group[person]
                        queue.append(neighbor)
                    elif group[neighbor] == group[person]:
                        return False

        return True
