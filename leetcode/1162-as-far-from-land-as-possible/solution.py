from collections import deque
from typing import List


class Solution:
    def maxDistance(self, grid: List[List[int]]) -> int:
        n = len(grid)
        queue = deque()
        for r in range(n):
            for c in range(n):
                if grid[r][c] == 1:
                    queue.append((r, c, 0))

        if not queue or len(queue) == n * n:
            return -1

        visited = [[grid[r][c] == 1 for c in range(n)] for r in range(n)]
        max_dist = 0

        while queue:
            r, c, dist = queue.popleft()
            max_dist = max(max_dist, dist)
            for dr, dc in ((1, 0), (-1, 0), (0, 1), (0, -1)):
                nr, nc = r + dr, c + dc
                if 0 <= nr < n and 0 <= nc < n and not visited[nr][nc]:
                    visited[nr][nc] = True
                    queue.append((nr, nc, dist + 1))

        return max_dist
