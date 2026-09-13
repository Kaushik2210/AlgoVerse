from collections import defaultdict, deque
from typing import List


class Solution:
    def minJumps(self, arr: List[int]) -> int:
        n = len(arr)
        if n == 1:
            return 0

        value_to_indices = defaultdict(list)
        for i, v in enumerate(arr):
            value_to_indices[v].append(i)

        visited = [False] * n
        visited[0] = True
        queue = deque([0])
        steps = 0

        while queue:
            for _ in range(len(queue)):
                i = queue.popleft()
                if i == n - 1:
                    return steps

                neighbors = value_to_indices[arr[i]] + [i - 1, i + 1]
                value_to_indices[arr[i]] = []  # consume the whole group once

                for j in neighbors:
                    if 0 <= j < n and not visited[j]:
                        visited[j] = True
                        queue.append(j)
            steps += 1

        return -1
