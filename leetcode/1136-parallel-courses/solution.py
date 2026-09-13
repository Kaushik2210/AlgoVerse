from collections import deque
from typing import List


class Solution:
    def minimumSemesters(self, n: int, relations: List[List[int]]) -> int:
        graph = [[] for _ in range(n + 1)]
        indegree = [0] * (n + 1)
        for prev_course, next_course in relations:
            graph[prev_course].append(next_course)
            indegree[next_course] += 1

        queue = deque(c for c in range(1, n + 1) if indegree[c] == 0)
        studied = 0
        semesters = 0

        while queue:
            semesters += 1
            for _ in range(len(queue)):
                course = queue.popleft()
                studied += 1
                for nxt in graph[course]:
                    indegree[nxt] -= 1
                    if indegree[nxt] == 0:
                        queue.append(nxt)

        return semesters if studied == n else -1
